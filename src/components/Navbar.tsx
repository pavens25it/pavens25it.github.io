"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PROFILE } from "@/data/portfolio";
import { CloseIcon, GitHubIcon, LinkedInIcon, MenuIcon } from "./Icons";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isProjectsRoute = pathname.startsWith("/projects");

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-earth/60 bg-charcoal/95"
          : "border-b border-earth/30 bg-charcoal"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10 lg:px-12">
        {/* Monogram */}
        <Link
          href="/"
          className="group inline-flex items-baseline gap-3 text-amber transition-opacity duration-200 hover:opacity-85"
          aria-label="Paven S. — Home"
        >
          <span className="border border-earth px-2.5 py-1 font-serif text-xl font-semibold tracking-wider text-amber transition-colors duration-300 group-hover:border-amber group-hover:bg-earth/20">
            {PROFILE.monogram}
          </span>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-amber/70 sm:inline">
            Paven S.
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => {
            const active =
              (item.href === "/" && pathname === "/") ||
              (item.href === "/projects" && isProjectsRoute);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative py-1 font-mono text-xs uppercase tracking-[0.18em] transition-colors duration-200 ${
                  active
                    ? "text-amber"
                    : "text-amber/70 hover:text-amber"
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute bottom-0 left-0 h-px bg-amber transition-all duration-300 ${
                    active ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* External icons & mobile trigger */}
        <div className="flex items-center gap-3">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="inline-flex h-9 w-9 items-center justify-center border border-earth/60 text-amber/85 transition-colors duration-200 hover:border-amber hover:bg-earth/20 hover:text-amber"
          >
            <GitHubIcon className="h-4 w-4" />
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="inline-flex h-9 w-9 items-center justify-center border border-earth/60 text-amber/85 transition-colors duration-200 hover:border-amber hover:bg-earth/20 hover:text-amber"
          >
            <LinkedInIcon className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex h-9 w-9 items-center justify-center border border-earth/60 text-amber transition-colors duration-200 hover:border-amber md:hidden cursor-pointer"
          >
            {menuOpen ? (
              <CloseIcon className="h-4 w-4" />
            ) : (
              <MenuIcon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-earth/45 bg-charcoal px-6 py-6 md:hidden"
        >
          <ul className="flex flex-col divide-y divide-earth/30">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-amber/85 transition-colors hover:text-amber"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
