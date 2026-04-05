import { LINKS } from "@/lib/constants";
import Link from "next/link";

const INTRO
  = "Schema Forge uses a simple DSL, a CLI for migrations, and a clear workflow from schema edits to applied SQL. Start with the topics below.";

const DOC_CARDS = [
  {
    href: LINKS.docsDsl,
    title: "DSL syntax",
    description:
      "Learn the .sf schema format: tables, columns, indexes, views, and modifiers.",
  },
  {
    href: LINKS.docsCli,
    title: "CLI commands",
    description:
      "Reference for init, plan, preview, generate, diff, doctor, introspect, import, and validate.",
  },
  {
    href: LINKS.docsMigration,
    title: "Migration workflow",
    description:
      "Step-by-step: initialize, edit schema, plan and preview changes, generate migrations, apply SQL, and repeat.",
  },
] as const;

export default function DocsPage() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-forge-dark">
        Documentation
      </h1>
      <p className="mt-4 text-forge-dark/80">{INTRO}</p>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {DOC_CARDS.map(({ href, title, description }) => (
          <li key={href}>
            <Link
              href={href}
              className="block rounded-lg border border-forge-light bg-white p-5 shadow-sm transition hover:border-forge-accent/40 hover:shadow-md"
            >
              <h2 className="text-lg font-semibold text-forge-dark">{title}</h2>
              <p className="mt-2 text-sm text-forge-dark/80">{description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
