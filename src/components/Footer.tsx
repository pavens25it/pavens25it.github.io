import React from "react";
import Link from "next/link";
import { PROFILE } from "@/data/portfolio";
import { ArrowUpRightIcon, GitHubIcon, LinkedInIcon } from "./Icons";

export function Footer() {
  return (
    <footer className="border-t border-earth/50 bg-charcoal/85">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-12">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-5">
            <Link
              href="/"
              className="inline-block border border-earth px-2.5 py-1 font-serif text-lg font-semibold tracking-wider text-amber"
            >
              {PROFILE.monogram}
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-amber/75">
              {PROFILE.name} — {PROFILE.role}. {PROFILE.institution}.
            </p>
          </div>

          <div className="md:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-earth">
              Navigation
            </p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.14em]">
              <Link
                href="/"
                className="text-amber/75 transition-colors hover:text-amber"
              >
                Home
              </Link>
              <Link
                href="/#about"
                className="text-amber/75 transition-colors hover:text-amber"
              >
                About
              </Link>
              <Link
                href="/projects"
                className="text-amber/75 transition-colors hover:text-amber"
              >
                Projects
              </Link>
              <Link
                href="/#skills"
                className="text-amber/75 transition-colors hover:text-amber"
              >
                Skills
              </Link>
              <Link
                href="/#contact"
                className="text-amber/75 transition-colors hover:text-amber"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="md:col-span-3 md:text-right">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-earth">
              Profiles
            </p>
            <div className="mt-3 flex items-center gap-4 md:justify-end">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-amber/80 transition-colors hover:text-amber"
              >
                <GitHubIcon className="h-3.5 w-3.5" />
                <span>GitHub</span>
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-amber/80 transition-colors hover:text-amber"
              >
                <LinkedInIcon className="h-3.5 w-3.5" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-earth/30 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-amber/60">
            © {new Date().getFullYear()} {PROFILE.name} All rights reserved.
          </p>
          <a
            href={PROFILE.portfolioRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.16em] text-amber/65 transition-colors hover:text-amber"
          >
            <span>Source on GitHub</span>
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
