import React from "react";
import Link from "next/link";
import type { Project } from "@/data/portfolio";
import { ArrowRightIcon, ArrowUpRightIcon, GitHubIcon } from "./Icons";
import { ProjectVisual } from "./ProjectVisual";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col border border-earth/55 bg-charcoal/85 transition-colors duration-300 hover:border-amber">
      {/* Top index & category bar */}
      <div className="flex items-center justify-between border-b border-earth/40 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em]">
        <span className="text-amber/80">
          {project.index} / {project.repoName}
        </span>
        <span className="text-earth transition-colors duration-300 group-hover:text-amber/80">
          {project.category}
        </span>
      </div>

      {/* Visual preview */}
      <Link
        href={`/projects/${project.slug}`}
        className="block overflow-hidden border-b border-earth/40"
        aria-label={`Read case study for ${project.title}`}
      >
        <div className="transition-transform duration-500 ease-out group-hover:scale-[1.015]">
          <ProjectVisual slug={project.slug} />
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex-1">
          <h3 className="font-serif text-2xl leading-tight font-medium tracking-tight text-amber sm:text-3xl">
            <Link
              href={`/projects/${project.slug}`}
              className="transition-opacity duration-200 hover:opacity-85"
            >
              {project.title}
            </Link>
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-amber/80">
            {project.shortDescription}
          </p>

          {/* Technology tags */}
          <ul
            aria-label="Technologies used"
            className="mt-5 flex flex-wrap gap-2"
          >
            {project.technologies.slice(0, 5).map((tech) => (
              <li
                key={tech}
                className="border border-earth/55 bg-earth/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-amber/85"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-earth/35 pt-5">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-amber transition-all duration-200 group-hover:gap-3"
          >
            <span>View Project</span>
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>

          <div className="flex items-center gap-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-amber/75 transition-colors duration-200 hover:text-amber"
            >
              <GitHubIcon className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </a>

            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.14em] text-amber transition-opacity duration-200 hover:opacity-80"
              >
                <span>Live</span>
                <ArrowUpRightIcon className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
