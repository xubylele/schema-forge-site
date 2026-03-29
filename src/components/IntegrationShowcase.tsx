import { LINKS } from "@/lib/constants";
import Link from "next/link";

const linkClass
  = "mt-3 inline-block text-sm font-medium text-forge-accent underline decoration-forge-accent/50 underline-offset-2 transition hover:decoration-forge-accent";

const INTEGRATIONS = [
  {
    id: "postgresql",
    title: "PostgreSQL",
    description:
      "Schema Forge generates PostgreSQL-compatible SQL. Use with any Postgres database or migration runner.",
    href: LINKS.docsMigration,
    linkLabel: "Migration workflow",
    external: false,
  },
  {
    id: "supabase",
    title: "Supabase",
    description:
      "Output migrations to Supabase's supabase/migrations/ and run them with the Supabase CLI or dashboard.",
    href: LINKS.docsMigration,
    linkLabel: "Migration workflow",
    external: false,
  },
  {
    id: "github-actions",
    title: "GitHub Actions",
    description:
      "Run schema diff and generate in CI with the schema-forge-action. Comment migration SQL on pull requests.",
    href: LINKS.githubAction,
    linkLabel: "schema-forge-action",
    external: true,
  },
  {
    id: "vscode",
    title: "VSCode",
    description:
      "Official extension (0.4.x): Visual Diff, status bar menu, diagnostics, hover docs, completion, and Command Palette actions (Init, Generate, Diff, Preview SQL). Requires VS Code 1.70+ (RLS).",
    href: LINKS.vscode,
    linkLabel: "VSCode Extension",
    external: true,
  },
] as const;

export function IntegrationShowcase() {
  return (
    <section
      id="integrations"
      className="mx-auto max-w-3xl px-4 pb-24 pt-16"
      aria-label="Supported integrations"
    >
      <h2 className="text-2xl font-semibold tracking-tight text-forge-dark">
        Integrations
      </h2>
      <div className="mt-8 grid gap-8 grid-cols-1 sm:grid-cols-2">
        {INTEGRATIONS.map(
          ({ id, title, description, href, linkLabel, external }) => (
            <div
              key={id}
              className="rounded-lg border border-forge-light bg-white p-5 shadow-sm"
            >
              <h3 className="font-mono text-sm font-semibold text-forge-dark">
                {title}
              </h3>
              <p className="mt-2 text-sm text-forge-dark/80">{description}</p>
              {external
                ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      {linkLabel}
                    </a>
                  )
                : (
                    <Link href={href} className={linkClass}>
                      {linkLabel}
                    </Link>
                  )}
            </div>
          ),
        )}
      </div>
    </section>
  );
}
