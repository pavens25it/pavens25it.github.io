"use client";

import React from "react";
import Link from "next/link";
import { useSyncedProjects } from "@/lib/github";
import { ArrowRightIcon, ArrowUpRightIcon, GitHubIcon } from "./Icons";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";

export function FeaturedProjectsSection() {
  const { projects, newGitHubProjects } = useSyncedProjects();
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <section id="projects" className="scroll-mt-24 border-b border-earth/45">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-32 lg:px-12">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 border-b border-earth/45 pb-10 lg:flex-row lg:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-earth">
                03 — Selected Works
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-[1.05] font-medium text-amber sm:text-5xl">
                Featured Projects
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-amber/80">
              A curated selection of public engineering projects spanning Java
              cloud systems, relational evaluation engines, and TypeScript web
              applications.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          {featuredProjects.map((project, idx) => (
            <Reveal key={project.slug} delayMs={idx * 70}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        {/* Automatically surfaces newly published public GitHub repositories */}
        {newGitHubProjects.length > 0 && (
          <div className="mt-12 border border-earth/55 bg-charcoal/85 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-earth/40 pb-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber">
                Latest Public Repositories (Auto-Synced)
              </p>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-earth">
                Live from GitHub
              </span>
            </div>

            <ul className="divide-y divide-earth/35">
              {newGitHubProjects.map((repo) => (
                <li
                  key={repo.repoName}
                  className="flex flex-col justify-between gap-4 py-5 sm:flex-row sm:items-center"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={repo.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-serif text-2xl text-amber transition-opacity hover:opacity-80"
                      >
                        {repo.title}
                      </a>
                      <span className="border border-earth/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-amber/80">
                        {repo.primaryLanguage}
                      </span>
                    </div>
                    <p className="mt-1.5 max-w-2xl text-sm text-amber/75">
                      {repo.shortDescription}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-4">
                    <a
                      href={repo.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-amber/85 transition-colors hover:text-amber"
                    >
                      <GitHubIcon className="h-3.5 w-3.5" />
                      <span>GitHub</span>
                    </a>
                    {repo.liveDemoUrl && (
                      <a
                        href={repo.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.14em] text-amber transition-opacity hover:opacity-80"
                      >
                        <span>Live</span>
                        <ArrowUpRightIcon className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <Reveal className="mt-14 flex justify-start sm:justify-end">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-4 border border-amber bg-charcoal/85 px-8 py-4 font-mono text-xs uppercase tracking-[0.18em] text-amber transition-colors duration-300 hover:bg-amber hover:text-charcoal"
          >
            <span>
              View All Projects ({String(projects.length).padStart(2, "0")})
            </span>
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
