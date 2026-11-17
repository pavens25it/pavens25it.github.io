import Link from "next/link";
import { ArrowLeftIcon } from "@/components/Icons";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-7xl flex-col items-start justify-center px-6 py-32 sm:px-10 lg:px-12">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-earth">
        Error 404
      </p>
      <h1 className="mt-4 font-serif text-5xl font-medium text-amber sm:text-6xl">
        Page not found.
      </h1>
      <p className="mt-5 max-w-md text-base leading-relaxed text-amber/80">
        The requested route does not exist in this portfolio archive.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 border border-amber bg-amber px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.18em] text-charcoal transition-colors hover:bg-charcoal hover:text-amber"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        <span>Return Home</span>
      </Link>
    </section>
  );
}
