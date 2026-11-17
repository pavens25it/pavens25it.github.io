import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  GitHubIcon,
} from "@/components/Icons";
import { ProjectVisual } from "@/components/ProjectVisual";
import { getProjectBySlug, PROJECTS } from "@/data/portfolio";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const currentIdx = PROJECTS.findIndex((item) => item.slug === project.slug);
  const prevProject =
    currentIdx > 0 ? PROJECTS[currentIdx - 1] : PROJECTS[PROJECTS.length - 1];
  const nextProject =
    currentIdx < PROJECTS.length - 1 ? PROJECTS[currentIdx + 1] : PROJECTS[0];

  return (
    <article className="bg-charcoal">
      {/* Header & case study metadata */}
      <section className="border-b border-earth/45">
        <div className="mx-auto max-w-7xl px-6 pt-12 pb-16 sm:px-10 sm:pt-16 sm:pb-20 lg:px-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-amber/75 transition-colors hover:text-amber"
          >
            <ArrowLeftIcon className="h-3.5 w-3.5" />
            <span>Back to Selected Works</span>
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-earth">
                Case Study {project.index} / {project.category}
              </p>
              <h1 className="mt-4 font-serif text-4xl leading-[1.02] font-medium tracking-[-0.02em] text-amber sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>
              <p className="mt-4 font-serif text-xl italic text-amber/85 sm:text-2xl">
                {project.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 border border-amber bg-amber px-5 py-3 font-mono text-xs font-medium uppercase tracking-[0.16em] text-charcoal transition-colors duration-200 hover:bg-charcoal hover:text-amber"
              >
                <GitHubIcon className="h-4 w-4" />
                <span>GitHub Repo</span>
              </a>

              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-earth px-5 py-3 font-mono text-xs uppercase tracking-[0.16em] text-amber transition-colors duration-200 hover:border-amber hover:bg-earth/20"
                >
                  <span>Live Demo</span>
                  <ArrowUpRightIcon className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Specification ledger */}
          <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-earth/40 pt-7 sm:grid-cols-4">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-earth">
                Repository
              </dt>
              <dd className="mt-1.5 font-mono text-xs text-amber">
                {project.repoName}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-earth">
                Primary Language
              </dt>
              <dd className="mt-1.5 text-sm text-amber">
                {project.primaryLanguage}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-earth">
                Category
              </dt>
              <dd className="mt-1.5 text-sm text-amber">{project.category}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-earth">
                Deployment
              </dt>
              <dd className="mt-1.5 text-sm text-amber/90">
                {project.liveDemoUrl ? "Live on Vercel" : "Local / VM Runtime"}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Architectural visual preview */}
      <section className="border-b border-earth/45">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-10 sm:py-16 lg:px-12">
          <figure className="border border-earth/55 bg-charcoal p-3 sm:p-4">
            <ProjectVisual
              slug={project.slug}
              className="aspect-[16/9] w-full"
            />
            <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-earth/35 pt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-amber/70">
              <span>Visual Preview — System Architecture</span>
              <span className="normal-case tracking-normal text-amber/75">
                {project.visualCaption}
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Case-study narrative body */}
      <section className="border-b border-earth/45">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-24 lg:px-12">
          <div className="grid gap-16 lg:grid-cols-12">
            {/* Main editorial prose */}
            <div className="space-y-14 lg:col-span-8">
              {/* 1. Overview */}
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-earth">
                  01 — Project Overview
                </p>
                <p className="mt-4 text-base leading-[1.85] text-amber/85 sm:text-lg">
                  {project.overview}
                </p>
              </div>

              {/* 2. Problem Statement & 3. Solution */}
              <div className="grid gap-8 border-y border-earth/40 py-10 md:grid-cols-2">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-earth">
                    02 — Problem Statement
                  </p>
                  <p className="mt-4 text-sm leading-[1.8] text-amber/80 sm:text-base">
                    {project.problemStatement}
                  </p>
                </div>
                <div className="md:border-l md:border-earth/35 md:pl-8">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-earth">
                    03 — Solution
                  </p>
                  <p className="mt-4 text-sm leading-[1.8] text-amber/80 sm:text-base">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* 4. Key Features */}
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-earth">
                  04 — Key Features
                </p>
                <ul className="mt-6 divide-y divide-earth/30 border-y border-earth/40">
                  {project.keyFeatures.map((feature, index) => (
                    <li
                      key={feature}
                      className="flex items-start gap-5 py-4 text-sm leading-relaxed text-amber/85 sm:text-base"
                    >
                      <span className="font-mono text-xs text-earth pt-1">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 6. Development Process */}
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-earth">
                  05 — Development Process
                </p>
                <ol className="mt-6 space-y-5">
                  {project.developmentProcess.map((step, index) => (
                    <li
                      key={step}
                      className="flex items-start gap-5 border border-earth/40 bg-earth/10 p-5"
                    >
                      <span className="border border-earth px-2.5 py-1 font-mono text-xs text-amber">
                        Step {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="text-sm leading-relaxed text-amber/85 sm:text-base">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Sticky sidebar: Technology Stack & External Links */}
            <aside className="lg:col-span-4">
              <div className="space-y-8 border border-earth/55 bg-earth/10 p-6 sm:p-8 lg:sticky lg:top-28">
                <div>
                  <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-earth">
                    Technology Stack
                  </h2>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <li
                        key={tech}
                        className="border border-earth/60 bg-charcoal px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-amber"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-earth/40 pt-6">
                  <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-earth">
                    Links &amp; Runtime
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-amber/75">
                    {project.deploymentNote}
                  </p>

                  <div className="mt-5 flex flex-col gap-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between border border-amber bg-amber px-4 py-3 font-mono text-xs font-medium uppercase tracking-[0.16em] text-charcoal transition-colors duration-200 hover:bg-charcoal hover:text-amber"
                    >
                      <span className="inline-flex items-center gap-2">
                        <GitHubIcon className="h-4 w-4" />
                        <span>GitHub Repository</span>
                      </span>
                      <ArrowUpRightIcon className="h-4 w-4" />
                    </a>

                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-between border border-earth bg-charcoal px-4 py-3 font-mono text-xs uppercase tracking-[0.16em] text-amber transition-colors duration-200 hover:border-amber hover:bg-earth/20"
                      >
                        <span>Open Live Demo</span>
                        <ArrowUpRightIcon className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Editorial pagination between projects */}
      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-12">
        <div className="grid gap-6 sm:grid-cols-2">
          <Link
            href={`/projects/${prevProject.slug}`}
            className="group border border-earth/45 p-6 transition-colors duration-200 hover:border-amber"
          >
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-earth group-hover:text-amber">
              <ArrowLeftIcon className="h-3.5 w-3.5" />
              <span>Previous Project</span>
            </span>
            <p className="mt-3 font-serif text-2xl text-amber">
              {prevProject.title}
            </p>
          </Link>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="group border border-earth/45 p-6 text-left transition-colors duration-200 hover:border-amber sm:text-right"
          >
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-earth group-hover:text-amber">
              <span>Next Project</span>
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </span>
            <p className="mt-3 font-serif text-2xl text-amber">
              {nextProject.title}
            </p>
          </Link>
        </div>
      </section>
    </article>
  );
}
