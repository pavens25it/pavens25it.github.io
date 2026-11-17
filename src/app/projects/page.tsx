import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon, ArrowUpRightIcon, GitHubIcon } from "@/components/Icons";
import { ProjectsArchive } from "@/components/ProjectsArchive";
import { PROFILE } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Selected Works / Projects",
  description:
    "Archive of verified software engineering projects by Paven S., spanning distributed Java systems, relational MySQL applications, and Next.js / React TypeScript web apps.",
};

export default function ProjectsPage() {
  return (
    <div className="bg-transparent">
      <section className="mx-auto max-w-7xl px-6 pt-14 pb-24 sm:px-10 sm:pt-20 sm:pb-32 lg:px-12">
        {/* Breadcrumb */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-amber/75 transition-colors hover:text-amber"
          >
            <ArrowLeftIcon className="h-3.5 w-3.5" />
            <span>Back to Home</span>
          </Link>

          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-amber/80 transition-colors hover:text-amber"
          >
            <GitHubIcon className="h-3.5 w-3.5" />
            <span>View Full GitHub Profile</span>
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Oversized editorial heading */}
        <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-earth">
              Project Archive
            </p>
            <h1 className="mt-4 font-serif text-5xl leading-[0.98] font-medium tracking-[-0.02em] text-amber sm:text-6xl lg:text-7xl">
              Selected Works / Projects
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p className="text-sm leading-relaxed text-amber/80 sm:text-base">
              An indexed archive of public repositories from{" "}
              <span className="font-mono text-xs text-amber">
                {PROFILE.githubHandle}
              </span>
              —covering backend Java engines, relational academic systems, and
              TypeScript web interfaces. Select any work to read its full case
              study.
            </p>
          </div>
        </div>

        {/* Filterable editorial archive */}
        <ProjectsArchive />
      </section>
    </div>
  );
}
