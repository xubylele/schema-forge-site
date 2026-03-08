import { LINKS } from "@/lib/constants";
import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "../CodeBlock";

export const metadata: Metadata = {
  title: "Migration workflow",
  description:
    "Schema Forge workflow: initialize, edit schema, diff, generate migrations, apply SQL",
};

export default function MigrationWorkflowPage() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-forge-dark">
        Migration workflow
      </h1>
      <p className="mt-4 text-forge-dark/80">
        Follow these steps to go from a new project to applied migrations.
        For schema syntax see
        {" "}
        <Link href={LINKS.docsDsl} className="font-medium text-forge-dark underline decoration-forge-dark/30 underline-offset-2 hover:decoration-forge-dark">DSL syntax</Link>
        ; for command details see
        {" "}
        <Link href={LINKS.docsCli} className="font-medium text-forge-dark underline decoration-forge-dark/30 underline-offset-2 hover:decoration-forge-dark">CLI commands</Link>
        .
      </p>

      <ol className="mt-10 list-decimal space-y-10 pl-5">
        <li>
          <h2 className="text-xl font-semibold text-forge-dark">Initialize</h2>
          <p className="mt-2 text-sm text-forge-dark/80">
            Run once to create the project layout and config.
          </p>
          <CodeBlock className="mt-3">schema-forge init</CodeBlock>
          <p className="mt-2 text-sm text-forge-dark/80">
            This creates:
            {" "}
            <code className="rounded bg-forge-light/50 px-1 font-mono">schemaforge/schema.sf</code>
            ,
            {" "}
            <code className="rounded bg-forge-light/50 px-1 font-mono">schemaforge/config.json</code>
            ,
            {" "}
            <code className="rounded bg-forge-light/50 px-1 font-mono">schemaforge/state.json</code>
            , and
            {" "}
            <code className="rounded bg-forge-light/50 px-1 font-mono">supabase/migrations/</code>
            {" "}
            (or your configured output dir).
          </p>
        </li>

        <li>
          <h2 className="text-xl font-semibold text-forge-dark">Edit schema</h2>
          <p className="mt-2 text-sm text-forge-dark/80">
            Edit
            {" "}
            <code className="rounded bg-forge-light/50 px-1 font-mono">schemaforge/schema.sf</code>
            {" "}
            to define or change tables and columns. Use the
            {" "}
            <Link href={LINKS.docsDsl} className="font-medium text-forge-dark underline decoration-forge-dark/30 underline-offset-2 hover:decoration-forge-dark">DSL syntax</Link>
            {" "}
            reference.
          </p>
        </li>

        <li>
          <h2 className="text-xl font-semibold text-forge-dark">Preview (optional)</h2>
          <p className="mt-2 text-sm text-forge-dark/80">
            See what SQL would be generated without writing files.
          </p>
          <CodeBlock className="mt-3">schema-forge diff</CodeBlock>
          <p className="mt-2 text-sm text-forge-dark/80">
            If the schema matches the tracked state, you’ll see no changes.
            Otherwise the diff shows the migration SQL.
          </p>
        </li>

        <li>
          <h2 className="text-xl font-semibold text-forge-dark">Generate migration</h2>
          <p className="mt-2 text-sm text-forge-dark/80">
            Write a timestamped migration file and update the state file.
          </p>
          <CodeBlock className="mt-3">
            {`schema-forge generate --name "add user avatar"`}
          </CodeBlock>
          <p className="mt-2 text-sm text-forge-dark/80">
            A new SQL file appears in your migrations directory. For destructive
            changes, Schema Forge may prompt for confirmation (or use
            {" "}
            <code className="rounded bg-forge-light/50 px-1 font-mono">--safe</code>
            {" "}
            /
            {" "}
            <code className="rounded bg-forge-light/50 px-1 font-mono">--force</code>
            ; see
            {" "}
            <Link href={LINKS.docsCli} className="font-medium text-forge-dark underline decoration-forge-dark/30 underline-offset-2 hover:decoration-forge-dark">CLI commands</Link>
            ).
          </p>
        </li>

        <li>
          <h2 className="text-xl font-semibold text-forge-dark">Apply migration</h2>
          <p className="mt-2 text-sm text-forge-dark/80">
            Run the generated SQL against your database using your preferred
            tool (e.g.
            {" "}
            <code className="rounded bg-forge-light/50 px-1 font-mono">psql</code>
            , Supabase dashboard, or a migration runner). Schema Forge does not
            apply migrations itself.
          </p>
        </li>

        <li>
          <h2 className="text-xl font-semibold text-forge-dark">Repeat</h2>
          <p className="mt-2 text-sm text-forge-dark/80">
            Edit
            {" "}
            <code className="rounded bg-forge-light/50 px-1 font-mono">schema.sf</code>
            {" "}
            → run
            {" "}
            <code className="rounded bg-forge-light/50 px-1 font-mono">diff</code>
            {" "}
            (optional) →
            {" "}
            <code className="rounded bg-forge-light/50 px-1 font-mono">generate</code>
            {" "}
            → apply the new migration. Commit schema files and migrations to
            version control.
          </p>
        </li>
      </ol>

      <section className="mt-10" aria-labelledby="defaults-heading">
        <h2 id="defaults-heading" className="text-xl font-semibold text-forge-dark">
          Default value changes
        </h2>
        <p className="mt-2 text-sm text-forge-dark/80">
          Schema Forge tracks default changes on existing columns. Adding,
          removing, or changing
          {" "}
          <code className="rounded bg-forge-light/50 px-1 font-mono">default &lt;expr&gt;</code>
          {" "}
          in the DSL produces
          {" "}
          <code className="rounded bg-forge-light/50 px-1 font-mono">
            ALTER TABLE ... ALTER COLUMN ... SET DEFAULT
          </code>
          {" "}
          or
          {" "}
          <code className="rounded bg-forge-light/50 px-1 font-mono">DROP DEFAULT</code>
          {" "}
          in the generated migration.
        </p>
      </section>

      <section className="mt-10" aria-labelledby="ci-heading">
        <h2 id="ci-heading" className="text-xl font-semibold text-forge-dark">
          Migration preview in CI
        </h2>
        <p className="mt-2 text-sm text-forge-dark/80">
          You can run
          {" "}
          <code className="rounded bg-forge-light/50 px-1 font-mono">schema-forge diff</code>
          {" "}
          in CI and post the migration SQL as a PR comment. See the
          {" "}
          <a
            href={LINKS.githubAction}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-forge-dark underline decoration-forge-dark/30 underline-offset-2 hover:decoration-forge-dark"
          >
            schema-forge-action
          </a>
          {" "}
          repo for the GitHub Action and usage.
        </p>
      </section>
    </>
  );
}
