import { INSTALL_COMMAND } from "@/lib/constants";
import type { Metadata } from "next";
import { CodeBlock } from "../CodeBlock";

export const metadata: Metadata = {
  title: "CLI commands",
  description:
    "Schema Forge CLI: init, plan, preview, generate, diff, doctor, introspect, import, validate",
};

export default function CliPage() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-forge-dark">
        CLI commands
      </h1>
      <p className="mt-4 text-forge-dark/80">
        Install the CLI globally or run with npx. All commands support global
        options where relevant.
      </p>

      <section className="mt-10" aria-labelledby="new-heading">
        <h2 id="new-heading" className="text-xl font-semibold text-forge-dark">
          Latest updates
        </h2>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-forge-dark/80">
          <li>New planning commands: plan and preview migration flows.</li>
          <li>Expanded diff coverage for indexes and views.</li>
          <li>Clearer migration planning output with +, ~, and - actions.</li>
        </ul>
      </section>

      <section className="mt-10" aria-labelledby="install-heading">
        <h2 id="install-heading" className="text-xl font-semibold text-forge-dark">
          Installation
        </h2>
        <CodeBlock className="mt-3">{INSTALL_COMMAND}</CodeBlock>
        <p className="mt-2 text-sm text-forge-dark/80">
          Or use without installing:
          {" "}
          <code className="rounded bg-forge-light/50 px-1 font-mono">npx @xubylele/schema-forge init</code>
        </p>
      </section>

      <section className="mt-10" aria-labelledby="global-heading">
        <h2 id="global-heading" className="text-xl font-semibold text-forge-dark">
          Global options
        </h2>
        <ul className="mt-2 space-y-1 text-sm text-forge-dark/80">
          <li>
            <code className="rounded bg-forge-light/50 px-1 font-mono">--safe</code>
            {" "}
            — block execution if destructive operations are detected
            (exit with error)
          </li>
          <li>
            <code className="rounded bg-forge-light/50 px-1 font-mono">--force</code>
            {" "}
            — bypass safety checks and proceed (shows warning)
          </li>
        </ul>
        <p className="mt-2 text-sm text-forge-dark/80">
          <code className="rounded bg-forge-light/50 px-1 font-mono">--safe</code>
          {" "}
          and
          <code className="rounded bg-forge-light/50 px-1 font-mono">--force</code>
          {" "}
          cannot be used together.
        </p>
      </section>

      <section className="mt-10" aria-labelledby="commands-heading">
        <h2 id="commands-heading" className="text-xl font-semibold text-forge-dark">
          Commands
        </h2>

        <div className="mt-6 space-y-10">
          <div>
            <h3 className="text-lg font-medium text-forge-dark">init</h3>
            <p className="mt-1 text-sm text-forge-dark/80">
              Initialize a new schema project (creates schemaforge/, config,
              state, migrations dir).
            </p>
            <CodeBlock className="mt-2">schema-forge init</CodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-medium text-forge-dark">generate</h3>
            <p className="mt-1 text-sm text-forge-dark/80">
              Generate SQL migration from schema changes. In CI, exits with
              code 3 if destructive unless
              {" "}
              <code className="rounded bg-forge-light/50 px-1 font-mono">--force</code>
              .
            </p>
            <CodeBlock className="mt-2">{`schema-forge generate [--name "migration description"] [--safe] [--force]`}</CodeBlock>
            <ul className="mt-2 list-inside list-disc text-sm text-forge-dark/80">
              <li>
                <code className="rounded bg-forge-light/50 px-1 font-mono">--name</code>
                {" "}
                — optional migration name (default: &quot;migration&quot;)
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium text-forge-dark">diff</h3>
            <p className="mt-1 text-sm text-forge-dark/80">
              Compare schema with tracked state (or live DB when
              <code className="rounded bg-forge-light/50 px-1 font-mono">--url</code>
              {" "}
              given) and show migration SQL. Does not write files.
            </p>
            <CodeBlock className="mt-2">{`schema-forge diff [--url "$DATABASE_URL"] [--schema public] [--safe] [--force]`}</CodeBlock>
            <ul className="mt-2 list-inside list-disc text-sm text-forge-dark/80">
              <li>
                <code className="rounded bg-forge-light/50 px-1 font-mono">--url</code>
                {" "}
                — PostgreSQL URL (default: DATABASE_URL)
              </li>
              <li>
                <code className="rounded bg-forge-light/50 px-1 font-mono">--schema</code>
                {" "}
                — comma-separated schema names (default: public)
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium text-forge-dark">plan</h3>
            <p className="mt-1 text-sm text-forge-dark/80">
              Print a human-readable migration plan from schema changes.
              Outputs action symbols:
              {" "}
              <code className="rounded bg-forge-light/50 px-1 font-mono">+</code>
              {" "}
              create,
              {" "}
              <code className="rounded bg-forge-light/50 px-1 font-mono">~</code>
              {" "}
              modify, and
              {" "}
              <code className="rounded bg-forge-light/50 px-1 font-mono">-</code>
              {" "}
              drop.
            </p>
            <CodeBlock className="mt-2">schema-forge plan</CodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-medium text-forge-dark">preview</h3>
            <p className="mt-1 text-sm text-forge-dark/80">
              Alias command for migration planning preview workflows.
            </p>
            <CodeBlock className="mt-2">schema-forge preview</CodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-medium text-forge-dark">doctor</h3>
            <p className="mt-1 text-sm text-forge-dark/80">Check live database drift against state. Exits with code 2 when drift is detected.</p>
            <CodeBlock className="mt-2">{`schema-forge doctor [--url "$DATABASE_URL"] [--schema public] [--json]`}</CodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-medium text-forge-dark">introspect</h3>
            <p className="mt-1 text-sm text-forge-dark/80">Extract normalized schema from PostgreSQL (information_schema).</p>
            <CodeBlock className="mt-2">{`schema-forge introspect [--url "$DATABASE_URL"] [--schema public] [--json] [--out path.json]`}</CodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-medium text-forge-dark">import</h3>
            <p className="mt-1 text-sm text-forge-dark/80">
              Reconstruct schema.sf from existing SQL migrations
              (file or directory).
            </p>
            <CodeBlock className="mt-2">{`schema-forge import <path-to-sql-or-dir> [--out schemaforge/schema.sf]`}</CodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-medium text-forge-dark">validate</h3>
            <p className="mt-1 text-sm text-forge-dark/80">
              Detect destructive or risky changes. With
              <code className="rounded bg-forge-light/50 px-1 font-mono">--url</code>
              , validates against live DB;
              <code className="rounded bg-forge-light/50 px-1 font-mono">--json</code>
              {" "}
              outputs a drift report.
            </p>
            <CodeBlock className="mt-2">{`schema-forge validate [--url "$DATABASE_URL"] [--schema public] [--json]`}</CodeBlock>
          </div>
        </div>
      </section>

      <section className="mt-10" aria-labelledby="exit-codes-heading">
        <h2 id="exit-codes-heading" className="text-xl font-semibold text-forge-dark">
          Exit codes
        </h2>
        <ul className="mt-2 space-y-1 text-sm text-forge-dark/80">
          <li>
            <code className="rounded bg-forge-light/50 px-1 font-mono">0</code>
            {" "}
            — success
          </li>
          <li>
            <code className="rounded bg-forge-light/50 px-1 font-mono">1</code>
            {" "}
            — validation error (invalid DSL, config, or operation blocked
            e.g. by --safe)
          </li>
          <li>
            <code className="rounded bg-forge-light/50 px-1 font-mono">2</code>
            {" "}
            — drift detected (doctor, validate)
          </li>
          <li>
            <code className="rounded bg-forge-light/50 px-1 font-mono">3</code>
            {" "}
            — destructive operations in CI unless --force
          </li>
        </ul>
        <p className="mt-2 text-sm text-forge-dark/80">
          For the full machine-readable contract, see
          {" "}
          <a
            href="https://github.com/xubylele/schema-forge/blob/main/docs/exit-codes.json"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-forge-dark underline decoration-forge-dark/30 underline-offset-2 hover:decoration-forge-dark"
          >
            docs/exit-codes.json
          </a>
          {" "}
          in the repo.
        </p>
      </section>
    </>
  );
}
