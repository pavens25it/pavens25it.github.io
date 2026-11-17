import React from "react";
import Link from "next/link";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
} from "@/components/Icons";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { ScrollPortrait } from "@/components/ScrollPortrait";
import { PROFILE, PROJECTS, SKILL_CATEGORIES } from "@/data/portfolio";

export default function HomePage() {
  const featuredProjects = PROJECTS.filter((project) => project.featured);

  return (
    <div className="bg-charcoal">
      {/* HERO SECTION */}
      <section className="border-b border-earth/45">
        <div className="mx-auto max-w-7xl px-6 pt-14 pb-20 sm:px-10 sm:pt-20 sm:pb-28 lg:px-12 lg:pt-24 lg:pb-32">
          {/* Editorial top index strip */}
          <div className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-earth/35 pb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-amber/70">
            <span>{PROFILE.role}</span>
            <span>{PROFILE.institution}</span>
          </div>

          <div className="grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-12">
            {/* Left asymmetric typography column */}
            <div className="lg:col-span-7 lg:pt-4">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-earth">
                Portfolio / Edition 2026
              </p>

              <h1 className="mt-5 font-serif text-6xl leading-[0.94] font-medium tracking-[-0.02em] text-amber sm:text-7xl lg:text-[6.25rem]">
                {PROFILE.name}
              </h1>

              <p className="mt-8 max-w-2xl font-serif text-2xl leading-snug font-normal italic text-amber/90 sm:text-3xl lg:text-[2.15rem]">
                {PROFILE.headline}
              </p>

              <p className="mt-7 max-w-xl text-base leading-relaxed text-amber/80 sm:text-lg">
                {PROFILE.intro}
              </p>

              {/* CTAs */}
              <div className="mt-11 flex flex-wrap items-center gap-4">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-3 border border-amber bg-amber px-7 py-3.5 font-mono text-xs font-medium uppercase tracking-[0.18em] text-charcoal transition-colors duration-300 hover:bg-charcoal hover:text-amber"
                >
                  <span>Explore Projects</span>
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>

                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-3 border border-earth px-7 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-amber transition-colors duration-300 hover:border-amber hover:bg-earth/20"
                >
                  <span>Get in Touch</span>
                </Link>
              </div>

              {/* Architectural specification strip */}
              <div className="mt-16 grid grid-cols-2 gap-6 border-t border-earth/40 pt-7 sm:grid-cols-3">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-earth">
                    Discipline
                  </p>
                  <p className="mt-1.5 text-sm text-amber/90">
                    B.Tech Information Technology
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-earth">
                    Primary Focus
                  </p>
                  <p className="mt-1.5 text-sm text-amber/90">
                    Java Systems &amp; Web Engineering
                  </p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-earth">
                    Public Repositories
                  </p>
                  <a
                    href={PROFILE.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-flex items-center gap-1 text-sm text-amber transition-opacity hover:opacity-80"
                  >
                    <span>github.com/pavens25it</span>
                    <ArrowUpRightIcon className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right column: real scroll-reactive portrait strictly graded in 3 colors */}
            <div className="mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
              <ScrollPortrait />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 01 — ABOUT */}
      <section id="about" className="scroll-mt-24 border-b border-earth/45">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-32 lg:px-12">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-earth">
                  01 — About
                </p>
                <h2 className="mt-4 font-serif text-4xl leading-[1.05] font-medium text-amber sm:text-5xl">
                  Thoughtful systems, built from fundamentals.
                </h2>
              </div>

              <div className="lg:col-span-8 lg:pl-8">
                <div className="space-y-6 text-base leading-[1.85] text-amber/85 sm:text-lg">
                  <p>
                    I am an Information Technology undergraduate at{" "}
                    <span className="text-amber underline decoration-earth underline-offset-4">
                      Kongu Engineering College
                    </span>
                    , focused on developing clear, dependable software that
                    addresses concrete academic, operational, and user-facing
                    needs.
                  </p>
                  <p>
                    My work spans structured backend engineering and modern web
                    interfaces—from Java applications utilizing JDBC,
                    multithreading, and relational database schemas to
                    component-driven React and Next.js storefronts written in
                    TypeScript.
                  </p>
                  <p>
                    I approach software development through steady
                    experimentation and practical problem-solving: modeling
                    clean data constraints, verifying edge cases with automated
                    tests, and iterating until both the underlying architecture
                    and the user interface feel deliberate.
                  </p>
                </div>

                {/* Structured editorial ledger */}
                <dl className="mt-12 grid divide-y divide-earth/35 border-y border-earth/45 sm:grid-cols-2 sm:divide-y-0">
                  <div className="py-5 sm:border-r sm:border-earth/35 sm:pr-6">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-earth">
                      Institution
                    </dt>
                    <dd className="mt-2 text-sm text-amber">
                      Kongu Engineering College (Autonomous)
                    </dd>
                  </div>
                  <div className="py-5 sm:pl-6">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-earth">
                      Program
                    </dt>
                    <dd className="mt-2 text-sm text-amber">
                      {PROFILE.degree}
                    </dd>
                  </div>
                  <div className="border-t border-earth/35 py-5 sm:border-r sm:pr-6">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-earth">
                      Technical Interests
                    </dt>
                    <dd className="mt-2 text-sm text-amber">
                      Backend Systems, Relational Databases, TypeScript Web Apps
                    </dd>
                  </div>
                  <div className="border-t border-earth/35 py-5 sm:pl-6">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-earth">
                      Location
                    </dt>
                    <dd className="mt-2 text-sm text-amber">
                      {PROFILE.location}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 02 — SKILLS */}
      <section id="skills" className="scroll-mt-24 border-b border-earth/45">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-32 lg:px-12">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 border-b border-earth/45 pb-10 lg:flex-row lg:items-end">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-earth">
                  02 — Technical Stack
                </p>
                <h2 className="mt-4 font-serif text-4xl leading-[1.05] font-medium text-amber sm:text-5xl">
                  Skills &amp; Technologies
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-amber/75">
                Languages, frameworks, databases, and tools actively used across
                my public repositories on GitHub.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-px border border-earth/45 bg-earth/45 md:grid-cols-2 lg:grid-cols-3">
            {SKILL_CATEGORIES.map((category, idx) => (
              <Reveal
                key={category.title}
                delayMs={idx * 60}
                className={`bg-charcoal p-7 sm:p-8 ${
                  idx === SKILL_CATEGORIES.length - 1
                    ? "md:col-span-2 lg:col-span-2"
                    : ""
                }`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-serif text-2xl font-medium text-amber">
                    {category.title}
                  </h3>
                  <span className="font-mono text-xs text-earth">
                    {category.index}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-amber/75">
                  {category.description}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className="border border-earth/60 bg-earth/10 px-3 py-1.5 font-mono text-[11px] tracking-[0.08em] text-amber/90 transition-colors duration-200 hover:border-amber hover:bg-earth/20"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 03 — FEATURED PROJECTS */}
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
              <p className="max-w-md text-sm leading-relaxed text-amber/75">
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

          <Reveal className="mt-14 flex justify-start sm:justify-end">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-4 border border-amber bg-charcoal px-8 py-4 font-mono text-xs uppercase tracking-[0.18em] text-amber transition-colors duration-300 hover:bg-amber hover:text-charcoal"
            >
              <span>View All Projects ({String(PROJECTS.length).padStart(2, "0")})</span>
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* SECTION 04 — CONTACT */}
      <section id="contact" className="scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-32 lg:px-12">
          <Reveal>
            <div className="border border-earth/55 bg-earth/10 p-8 sm:p-12 lg:p-16">
              <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-7">
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-earth">
                    04 — Contact
                  </p>
                  <h2 className="mt-4 font-serif text-4xl leading-[1.05] font-medium text-amber sm:text-5xl lg:text-6xl">
                    Open to collaboration &amp; engineering conversations.
                  </h2>
                  <p className="mt-6 max-w-xl text-base leading-relaxed text-amber/80">
                    Whether you would like to discuss software engineering
                    projects, internships, technical collaborations, or open
                    source work, feel free to reach out directly.
                  </p>

                  <div className="mt-9 flex flex-wrap items-center gap-4">
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="inline-flex items-center gap-3 border border-amber bg-amber px-7 py-3.5 font-mono text-xs font-medium uppercase tracking-[0.18em] text-charcoal transition-colors duration-300 hover:bg-charcoal hover:text-amber"
                    >
                      <MailIcon className="h-4 w-4" />
                      <span>Send an Email</span>
                    </a>
                    <CopyEmailButton email={PROFILE.email} />
                  </div>
                </div>

                <div className="space-y-6 border-t border-earth/45 pt-8 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-earth">
                      Email
                    </p>
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="mt-1.5 inline-block font-serif text-2xl text-amber transition-opacity hover:opacity-80"
                    >
                      {PROFILE.email}
                    </a>
                  </div>

                  <div className="border-t border-earth/35 pt-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-earth">
                      GitHub
                    </p>
                    <a
                      href={PROFILE.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-amber/90 transition-colors hover:text-amber"
                    >
                      <GitHubIcon className="h-4 w-4" />
                      <span>github.com/pavens25it</span>
                      <ArrowUpRightIcon className="h-3.5 w-3.5" />
                    </a>
                  </div>

                  <div className="border-t border-earth/35 pt-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-earth">
                      LinkedIn
                    </p>
                    <a
                      href={PROFILE.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-amber/90 transition-colors hover:text-amber"
                    >
                      <LinkedInIcon className="h-4 w-4" />
                      <span>linkedin.com/in/paven-s-20a1b83b7</span>
                      <ArrowUpRightIcon className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
