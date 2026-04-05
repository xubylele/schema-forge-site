import { LINKS } from "@/lib/constants";
import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "../CodeBlock";

export const metadata: Metadata = {
  title: "DSL syntax",
  description:
    "Schema Forge .sf DSL: tables, columns, indexes, views, and modifiers",
};

export default function DslPage() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-forge-dark">
        DSL syntax
      </h1>
      <p className="mt-4 text-forge-dark/80">
        Schema Forge schemas are written in
        {" "}
        <code className="rounded bg-forge-light/50 px-1.5 py-0.5 font-mono text-sm">.sf</code>
        {" "}
        files. By default the main file is
        {" "}
        <code className="rounded bg-forge-light/50 px-1.5 py-0.5 font-mono text-sm">schemaforge/schema.sf</code>
        .
      </p>

      <section className="mt-10" aria-labelledby="comments-heading">
        <h2 id="comments-heading" className="text-xl font-semibold text-forge-dark">
          Comments
        </h2>
        <p className="mt-2 text-sm text-forge-dark/80">
          Use
          {" "}
          <code className="rounded bg-forge-light/50 px-1.5 py-0.5 font-mono text-sm">#</code>
          {" "}
          for line comments.
        </p>
        <CodeBlock className="mt-3">
          {"# SchemaForge schema definition\n# table users { ... }"}
        </CodeBlock>
      </section>

      <section className="mt-10" aria-labelledby="tables-heading">
        <h2 id="tables-heading" className="text-xl font-semibold text-forge-dark">
          Tables
        </h2>
        <p className="mt-2 text-sm text-forge-dark/80">
          Declare a table with
          {" "}
          <code className="rounded bg-forge-light/50 px-1.5 py-0.5 font-mono text-sm">
            table &lt;name&gt;
            {"{ ... }"}
          </code>
          . Column definitions go inside the braces, one per line.
        </p>
        <CodeBlock className="mt-3">
          {"table users {\n  id uuid\n  email varchar\n  name text\n}"}
        </CodeBlock>
      </section>

      <section className="mt-10" aria-labelledby="columns-heading">
        <h2 id="columns-heading" className="text-xl font-semibold text-forge-dark">
          Columns
        </h2>
        <p className="mt-2 text-sm text-forge-dark/80">
          Each column is
          {" "}
          <code className="rounded bg-forge-light/50 px-1.5 py-0.5 font-mono text-sm">name type [modifiers]</code>
          . Common types include:
        </p>
        <ul className="mt-2 list-inside list-disc text-sm text-forge-dark/80">
          <li>
            <code className="rounded bg-forge-light/50 px-1 font-mono">uuid</code>
            ,
            {" "}
            <code className="rounded bg-forge-light/50 px-1 font-mono">varchar</code>
            ,
            {" "}
            <code className="rounded bg-forge-light/50 px-1 font-mono">text</code>
          </li>
          <li>
            <code className="rounded bg-forge-light/50 px-1 font-mono">boolean</code>
            ,
            {" "}
            <code className="rounded bg-forge-light/50 px-1 font-mono">integer</code>
            ,
            {" "}
            <code className="rounded bg-forge-light/50 px-1 font-mono">bigint</code>
          </li>
          <li><code className="rounded bg-forge-light/50 px-1 font-mono">timestamptz</code></li>
        </ul>
      </section>

      <section className="mt-10" aria-labelledby="modifiers-heading">
        <h2 id="modifiers-heading" className="text-xl font-semibold text-forge-dark">
          Modifiers
        </h2>
        <ul className="mt-2 space-y-2 text-sm text-forge-dark/80">
          <li>
            <code className="rounded bg-forge-light/50 px-1 font-mono">pk</code>
            {" "}
            — primary key
          </li>
          <li>
            <code className="rounded bg-forge-light/50 px-1 font-mono">unique</code>
            {" "}
            — unique constraint
          </li>
          <li>
            <code className="rounded bg-forge-light/50 px-1 font-mono">not null</code>
            {" "}
            /
            {" "}
            <code className="rounded bg-forge-light/50 px-1 font-mono">nullable</code>
            {" "}
            — nullability
          </li>
          <li>
            <code className="rounded bg-forge-light/50 px-1 font-mono">default &lt;expr&gt;</code>
            {" "}
            — default value (e.g.
            {" "}
            <code className="rounded bg-forge-light/50 px-1 font-mono">now()</code>
            )
          </li>
          <li>
            <code className="rounded bg-forge-light/50 px-1 font-mono">fk &lt;table&gt;.&lt;column&gt;</code>
            {" "}
            — foreign key
          </li>
        </ul>
      </section>

      <section className="mt-10" aria-labelledby="indexes-heading">
        <h2 id="indexes-heading" className="text-xl font-semibold text-forge-dark">
          Indexes
        </h2>
        <p className="mt-2 text-sm text-forge-dark/80">
          Use
          {" "}
          <code className="rounded bg-forge-light/50 px-1.5 py-0.5 font-mono text-sm">index</code>
          {" "}
          declarations to define standard, unique, partial, or expression
          indexes.
        </p>
        <CodeBlock className="mt-3">
          {`index users_email_idx on users columns(email)
index users_email_unique_idx on users columns(email) unique
index users_active_email_idx on users columns(email) where deleted_at IS NULL
index users_lower_email_idx on users expression(lower(email))`}
        </CodeBlock>
      </section>

      <section className="mt-10" aria-labelledby="views-heading">
        <h2 id="views-heading" className="text-xl font-semibold text-forge-dark">
          Views
        </h2>
        <p className="mt-2 text-sm text-forge-dark/80">
          Use
          {" "}
          <code className="rounded bg-forge-light/50 px-1.5 py-0.5 font-mono text-sm">view &lt;name&gt; as &lt;sql&gt;</code>
          {" "}
          to define query-backed views in your schema.
        </p>
        <CodeBlock className="mt-3">
          {`view active_users as
select id, email
from users
where deleted_at IS NULL`}
        </CodeBlock>
      </section>

      <section className="mt-10" aria-labelledby="example-heading">
        <h2 id="example-heading" className="text-xl font-semibold text-forge-dark">
          Example
        </h2>
        <CodeBlock className="mt-3">
          {`# SchemaForge schema definition

table users {
  id uuid pk
  email varchar unique not null
  name text not null
  created_at timestamptz default now()
}

table posts {
  id uuid pk
  user_id uuid fk users.id not null
  title varchar not null
  content text
  published boolean default false
  created_at timestamptz default now()
}`}
        </CodeBlock>
      </section>

      <section className="mt-10" aria-labelledby="invalid-heading">
        <h2 id="invalid-heading" className="text-xl font-semibold text-forge-dark">
          Invalid syntax
        </h2>
        <p className="mt-2 text-sm text-forge-dark/80">
          The parser will report errors for invalid DSL: unclosed braces,
          unknown column types, or malformed foreign keys (e.g.
          {" "}
          <code className="rounded bg-forge-light/50 px-1 font-mono">fk table</code>
          {" "}
          without
          {" "}
          <code className="rounded bg-forge-light/50 px-1 font-mono">.column</code>
          ). Run
          {" "}
          <code className="rounded bg-forge-light/50 px-1 font-mono">schema-forge generate</code>
          {" "}
          or
          {" "}
          <code className="rounded bg-forge-light/50 px-1 font-mono">schema-forge diff</code>
          {" "}
          to validate; see the
          {" "}
          <Link
            href={LINKS.docsCli}
            className="font-medium text-forge-dark underline decoration-forge-dark/30 underline-offset-2 hover:decoration-forge-dark"
          >
            CLI commands
          </Link>
          {" "}
          doc.
        </p>
      </section>
    </>
  );
}
