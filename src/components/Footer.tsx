import { LINKS } from "@/lib/constants";
import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="mt-auto border-t border-forge-dark/10 bg-forge-light/50"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-4xl px-8 py-6 flex flex-col gap-8 sm:flex-row sm:gap-12">
        <section aria-labelledby="docs-heading">
          <h2
            id="docs-heading"
            className="mb-2 text-sm font-medium text-forge-dark"
          >
            Documentation
          </h2>
          <Link
            href={LINKS.docs}
            className="mt-2 inline-block text-sm font-medium text-forge-dark underline decoration-forge-dark/30 underline-offset-2 transition hover:decoration-forge-dark"
          >
            View docs
          </Link>
        </section>
        <section aria-labelledby="report-bug-heading">
          <h2
            id="report-bug-heading"
            className="mb-2 text-sm font-medium text-forge-dark"
          >
            Report a bug
          </h2>
          <p className="text-sm text-forge-dark/80">
            Found an issue? Open a ticket on GitHub so we can track it.
          </p>
          <Link
            href={LINKS.issues}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm font-medium text-forge-dark underline decoration-forge-dark/30 underline-offset-2 transition hover:decoration-forge-dark"
          >
            View issues on GitHub
          </Link>
        </section>
      </div>
    </footer>
  );
}
