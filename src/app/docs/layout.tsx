import type { Metadata } from "next";
import Link from "next/link";
import { DocsNav } from "./DocsNav";

export const metadata: Metadata = {
  title: { template: "%s | Schema Forge Docs", default: "Documentation" },
  description: "Schema Forge documentation: DSL, CLI, and migration workflow",
};

export default function DocsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto flex max-w-5xl gap-12">
        <aside className="hidden md:block pt-1">
          <Link
            href="/"
            className="mb-4 block text-sm font-medium text-forge-dark/80 underline decoration-forge-dark/30 underline-offset-2 hover:decoration-forge-dark"
          >
            ← Schema Forge
          </Link>
          <DocsNav />
        </aside>
        <article className="min-w-0 flex-1">{children}</article>
      </div>
    </main>
  );
}
