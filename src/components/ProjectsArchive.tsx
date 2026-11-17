"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  PROJECT_CATEGORIES,
  PROJECTS,
  type ProjectCategory,
} from "@/data/portfolio";
import { ArrowRightIcon, ArrowUpRightIcon, GitHubIcon } from "./Icons";
import { ProjectVisual } from "./ProjectVisual";

export function ProjectsArchive() {
  const [selectedCategory, setSelectedCategory] = useState<
    "All" | ProjectCategory
  >("All");
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  const filteredProjects =
    selectedCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === selectedCategory);

  return (
    <div>
      {/* Filter bar */}
      <div
        role="tablist"
        aria-label="Filter projects by category"
        className="flex flex-wrap items-center justify-between gap-4 border-y border-earth/50 py-5"
      >
        <div className="flex flex-wrap gap-2">
          {PROJECT_CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            const count =
              category === "All"
                ? PROJECTS.length
                : PROJECTS.filter((p) => p.category === category).length;

            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedCategory(category)}
                className={`border px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] transition-colors duration-200 cursor-pointer ${
                  active
                    ? "border-amber bg-amber text-charcoal font-medium"
                    : "border-earth/60 bg-charcoal text-amber/80 hover:border-amber hover:text-amber"
                }`}
              >
                {category} ({String(count).padStart(2, "0")})
              </button>
            );
          })}
        </div>

        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber/65">
          Showing {String(filteredProjects.length).padStart(2, "0")} of{" "}
          {String(PROJECTS.length).padStart(2, "0")} repositories
        </p>
      </div>

      {/* Editorial project archive list / grid */}
      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        {filteredProjects.map((project, idx) => {
          const isExpanded = expandedSlug === project.slug;
          const isLead = idx === 0 && selectedCategory === "All";

          return (
            <article
              key={project.slug}
              className={`group flex flex-col border border-earth/55 bg-charcoal/85 transition-colors duration-300 hover:border-amber ${
                isLead ? "lg:col-span-2" : ""
              }`}
            >
              {/* Meta header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-earth/40 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em]">
                <span className="text-amber">
                  {project.index} — {project.repoName}
                </span>
                <div className="flex items-center gap-4 text-amber/70">
                  <span>{project.category}</span>
                  <span aria-hidden="true" className="text-earth">
                    /
                  </span>
                  <span>{project.year}</span>
                </div>
              </div>

              <div
                className={`grid flex-1 ${
                  isLead ? "lg:grid-cols-12" : "grid-cols-1"
                }`}
              >
                {/* Visual */}
                <Link
                  href={`/projects/${project.slug}`}
                  className={`block overflow-hidden border-b border-earth/40 ${
                    isLead ? "lg:col-span-6 lg:border-r lg:border-b-0" : ""
                  }`}
                  aria-label={`Open case study for ${project.title}`}
                >
                  <div className="h-full transition-transform duration-500 ease-out group-hover:scale-[1.015]">
                    <ProjectVisual
                      slug={project.slug}
                      className={
                        isLead ? "h-full min-h-[260px] w-full" : "aspect-[16/10] w-full"
                      }
                    />
                  </div>
                </Link>

                {/* Copy & controls */}
                <div
                  className={`flex flex-col justify-between p-6 sm:p-8 ${
                    isLead ? "lg:col-span-6" : ""
                  }`}
                >
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-earth">
                      {project.subtitle}
                    </p>
                    <h2 className="mt-2 font-serif text-3xl leading-tight font-medium text-amber sm:text-4xl">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="transition-opacity hover:opacity-85"
                      >
                        {project.title}
                      </Link>
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-amber/80 sm:text-base">
                      {project.shortDescription}
                    </p>

                    {/* Stack */}
                    <ul
                      aria-label="Technology stack"
                      className="mt-6 flex flex-wrap gap-2"
                    >
                      {project.technologies.map((tech) => (
                        <li
                          key={tech}
                          className="border border-earth/55 bg-earth/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-amber/85"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-earth/35 pt-5">
                    <div className="flex flex-wrap items-center gap-4">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-2 border border-amber bg-amber px-4 py-2 font-mono text-xs font-medium uppercase tracking-[0.16em] text-charcoal transition-colors duration-200 hover:bg-charcoal hover:text-amber"
                      >
                        <span>Case Study</span>
                        <ArrowRightIcon className="h-3.5 w-3.5" />
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          setExpandedSlug(isExpanded ? null : project.slug)
                        }
                        aria-expanded={isExpanded}
                        className="border border-earth px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-amber/85 transition-colors duration-200 hover:border-amber hover:text-amber cursor-pointer"
                      >
                        {isExpanded ? "Hide Brief" : "Quick Brief"}
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-amber/80 transition-colors hover:text-amber"
                      >
                        <GitHubIcon className="h-3.5 w-3.5" />
                        <span>Repository</span>
                      </a>
                      {project.liveDemoUrl && (
                        <a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.14em] text-amber transition-opacity hover:opacity-80"
                        >
                          <span>Live Demo</span>
                          <ArrowUpRightIcon className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Expandable quick case-study brief */}
              {isExpanded && (
                <div className="border-t border-earth/45 bg-earth/10 px-6 py-7 sm:px-8">
                  <div className="grid gap-6 md:grid-cols-3">
                    <div>
                      <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber">
                        Problem Statement
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-amber/80">
                        {project.problemStatement}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber">
                        Solution
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-amber/80">
                        {project.solution}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber">
                        Key Features
                      </h3>
                      <ul className="mt-2.5 space-y-2 text-sm text-amber/80">
                        {project.keyFeatures.slice(0, 3).map((feature) => (
                          <li key={feature} className="flex gap-2.5">
                            <span className="mt-2 h-1 w-1 shrink-0 bg-amber" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
