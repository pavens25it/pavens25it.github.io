"use client";

import { useEffect, useState } from "react";
import {
  PROJECTS,
  type Project,
  type ProjectCategory,
} from "@/data/portfolio";

const GITHUB_USERNAME = "pavens25it";
const IGNORED_REPOS = new Set(["pavens25it.github.io", "web-to-fun"]);
const CACHE_KEY = "pavens25it_github_repos_v2";
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

export interface PortfolioProject extends Project {
  isCurated: boolean;
  updatedAt?: string;
}

interface GitHubRepoAPI {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  fork: boolean;
  archived?: boolean;
  created_at: string;
  updated_at: string;
}

function inferCategory(repo: GitHubRepoAPI): ProjectCategory {
  const lang = (repo.language || "").toLowerCase();

  if (
    [
      "java",
      "python",
      "go",
      "rust",
      "c",
      "c++",
      "c#",
      "sql",
      "shell",
      "php",
      "kotlin",
    ].includes(lang)
  ) {
    return "Backend & Systems";
  }

  return "Frontend & Web";
}

function formatRepoTitle(repoName: string): string {
  return repoName
    .replace(/[-_]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .trim();
}

function normalizeUrl(url: string | null): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function mapGitHubRepoToProject(
  repo: GitHubRepoAPI,
  indexNumber: number
): PortfolioProject {
  const category = inferCategory(repo);
  const year = (repo.updated_at || repo.created_at || "2026").slice(0, 4);
  const cleanDescription =
    repo.description && repo.description.trim().length > 0
      ? repo.description.trim()
      : "Public software repository published on GitHub.";
  const liveDemoUrl = normalizeUrl(repo.homepage);
  const technologies: string[] = [];

  if (repo.language) {
    technologies.push(repo.language);
  }
  if (Array.isArray(repo.topics)) {
    for (const topic of repo.topics) {
      if (
        topic &&
        !technologies.some((t) => t.toLowerCase() === topic.toLowerCase())
      ) {
        technologies.push(topic);
      }
    }
  }
  if (technologies.length === 0) {
    technologies.push("GitHub");
  }

  return {
    slug: repo.name.toLowerCase().replace(/[^a-z0-9-]+/g, "-"),
    index: String(indexNumber).padStart(2, "0"),
    repoName: repo.name,
    title: formatRepoTitle(repo.name),
    subtitle: repo.language
      ? `${repo.language} Public Repository`
      : "Public GitHub Repository",
    category,
    year,
    featured: false,
    shortDescription: cleanDescription,
    overview: cleanDescription,
    problemStatement:
      "Synced automatically from the public GitHub repository metadata.",
    solution:
      "Inspect the source code, commits, and documentation directly on GitHub.",
    keyFeatures: [
      `Public repository: ${GITHUB_USERNAME}/${repo.name}.`,
      repo.language
        ? `Primary language detected by GitHub: ${repo.language}.`
        : "Hosted publicly on GitHub.",
      liveDemoUrl
        ? `Live deployment linked at ${liveDemoUrl}.`
        : "Source code available directly on GitHub.",
    ],
    technologies,
    developmentProcess: [
      "Published and maintained directly via GitHub.",
    ],
    visualCaption: `Live GitHub repository: ${GITHUB_USERNAME}/${repo.name}`,
    githubUrl: repo.html_url,
    liveDemoUrl,
    deploymentNote: liveDemoUrl
      ? "Live deployment linked from GitHub repository metadata."
      : "Public source repository on GitHub.",
    primaryLanguage: repo.language || "Repository",
    isCurated: false,
    updatedAt: repo.updated_at,
  };
}

const STATIC_PROJECTS: PortfolioProject[] = PROJECTS.map((project) => ({
  ...project,
  isCurated: true,
}));

function mergeProjects(repos: GitHubRepoAPI[]): PortfolioProject[] {
  const curatedByRepo = new Map<string, PortfolioProject>();
  for (const project of STATIC_PROJECTS) {
    curatedByRepo.set(project.repoName.toLowerCase(), { ...project });
  }

  const newRepos: GitHubRepoAPI[] = [];

  for (const repo of repos) {
    if (!repo || !repo.name) continue;
    const lower = repo.name.toLowerCase();
    if (IGNORED_REPOS.has(lower) || repo.fork || repo.archived) continue;

    const existing = curatedByRepo.get(lower);
    if (existing) {
      // Keep curated case study intact, but pick up any newly added homepage URL
      const liveUrl = normalizeUrl(repo.homepage);
      if (!existing.liveDemoUrl && liveUrl) {
        existing.liveDemoUrl = liveUrl;
      }
      existing.updatedAt = repo.updated_at;
    } else {
      newRepos.push(repo);
    }
  }

  const baseList = Array.from(curatedByRepo.values());
  const mappedNew = newRepos.map((repo, idx) =>
    mapGitHubRepoToProject(repo, baseList.length + idx + 1)
  );

  return [...baseList, ...mappedNew];
}

export function useSyncedProjects() {
  const [projects, setProjects] = useState<PortfolioProject[]>(STATIC_PROJECTS);
  const [syncStatus, setSyncStatus] = useState<"idle" | "synced" | "fallback">(
    "idle"
  );

  useEffect(() => {
    let cancelled = false;

    const applyRepos = (repos: GitHubRepoAPI[]) => {
      if (cancelled) return;
      setProjects(mergeProjects(repos));
      setSyncStatus("synced");
    };

    try {
      const cachedRaw = window.sessionStorage.getItem(CACHE_KEY);
      if (cachedRaw) {
        const cached = JSON.parse(cachedRaw) as {
          timestamp: number;
          repos: GitHubRepoAPI[];
        };
        if (
          cached &&
          Array.isArray(cached.repos) &&
          Date.now() - cached.timestamp < CACHE_TTL_MS
        ) {
          applyRepos(cached.repos);
          return;
        }
      }
    } catch {
      // Ignore storage access restrictions
    }

    const controller = new AbortController();

    fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      {
        headers: { Accept: "application/vnd.github+json" },
        signal: controller.signal,
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        return res.json() as Promise<GitHubRepoAPI[]>;
      })
      .then((repos) => {
        if (!Array.isArray(repos)) return;
        try {
          window.sessionStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ timestamp: Date.now(), repos })
          );
        } catch {
          // Ignore storage quota errors
        }
        applyRepos(repos);
      })
      .catch(() => {
        if (!cancelled) setSyncStatus("fallback");
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  return {
    projects,
    curatedProjects: projects.filter((p) => p.isCurated),
    newGitHubProjects: projects.filter((p) => !p.isCurated),
    syncStatus,
  };
}
