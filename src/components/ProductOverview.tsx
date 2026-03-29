import { LINKS } from "@/lib/constants";
import Link from "next/link";

const COMPONENTS = [
  {
    id: "core",
    title: "schema-forge-core",
    description:
      "Deterministic engine that parses the .sf DSL, diffs schema versions, and generates SQL. Framework-agnostic; powers the CLI and VSCode extension.",
    link: LINKS.core,
    linkLabel: "Core (npm)",
  },
  {
    id: "cli",
    title: "schema-forge CLI",
    description:
      "Terminal workflow: init, generate, diff, validate. Tracks state and outputs migrations; CI-friendly exit codes.",
    link: LINKS.npm,
    linkLabel: "Install CLI",
  },
  {
    id: "vscode",
    title: "VSCode Extension",
    description:
      "Editor support for .sf: Visual Diff, status bar, diagnostics, hover docs, quick fixes, and Command Palette actions (Init, Generate, Diff, Preview SQL). Requires VS Code 1.70+ (RLS).",
    link: LINKS.vscode,
    linkLabel: "VSCode Extension",
  },
] as const;

export function ProductOverview() {
  return (
    <section
      id="overview"
      className="mx-auto max-w-3xl px-4 pb-24 pt-16"
      aria-label="Product overview"
    >
      <h2 className="text-2xl font-semibold tracking-tight text-forge-dark">
        Products
      </h2>
      <div className="mt-8 grid gap-8 sm:grid-cols-1 md:grid-cols-3">
        {COMPONENTS.map(({ id, title, description, link, linkLabel }) => (
          <div
            key={id}
            className="rounded-lg border border-forge-light bg-white p-5 shadow-sm"
          >
            <h3 className="font-mono text-sm font-semibold text-forge-dark">
              {title}
            </h3>
            <p className="mt-2 text-sm text-forge-dark/80">{description}</p>
            <Link
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-medium text-forge-accent underline decoration-forge-accent/50 underline-offset-2 transition hover:decoration-forge-accent"
            >
              {linkLabel}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
