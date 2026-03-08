const INTRO
  = "See how Schema Forge compares to other migration workflows.";

const TOOLS = [
  "Schema Forge",
  "Prisma",
  "Knex",
  "Manual SQL",
] as const;

type ComparisonRow = {
  dimension: string;
  cells: readonly [string, string, string, string];
};
const COMPARISON_ROWS: ComparisonRow[] = [
  {
    dimension: "Schema source",
    cells: [
      "Single declarative .sf file",
      "schema.prisma",
      "Migrations (up/down) define schema",
      "SQL or ad-hoc DDL",
    ],
  },
  {
    dimension: "Migrations",
    cells: [
      "Generates SQL from diff; you apply",
      "Generates + optional apply (Migrate)",
      "You write up/down; Knex runs them",
      "You write and run SQL",
    ],
  },
  {
    dimension: "State / history",
    cells: [
      "state.json + optional live introspection",
      "Migration history table + schema",
      "Migration lock + migration files",
      "You track it",
    ],
  },
  {
    dimension: "Query layer",
    cells: [
      "None (schema + SQL only)",
      "Full ORM (Prisma Client)",
      "Query builder",
      "Raw SQL or your layer",
    ],
  },
  {
    dimension: "Database support",
    cells: [
      "Postgres / Supabase",
      "Many (Postgres, MySQL, SQLite, …)",
      "Many",
      "Any",
    ],
  },
  {
    dimension: "Drift / CI",
    cells: [
      "doctor, validate --url, diff vs live DB",
      "migrate diff",
      "None built-in",
      "Manual",
    ],
  },
];

const tableHeader
  = "border-b border-forge-light bg-white px-3 py-3 text-left text-sm font-semibold text-forge-dark";
const tableCell
  = "border-b border-forge-light px-3 py-3 text-sm text-forge-dark/80";
const tableDim
  = "sticky left-0 z-0 border-b border-forge-light bg-white px-3 py-3 text-sm font-medium text-forge-dark";

export function FeatureComparison() {
  return (
    <section
      id="compare"
      className="mx-auto max-w-4xl px-4 pb-24 pt-16"
      aria-label="Feature comparison"
    >
      <h2 className="text-2xl font-semibold tracking-tight text-forge-dark">
        Feature comparison
      </h2>
      <p className="mt-2 text-sm text-forge-dark/80">{INTRO}</p>

      <div className="mt-8 overflow-x-auto rounded-lg border border-forge-light bg-white shadow-sm">
        <table className="w-full min-w-[32rem] border-collapse">
          <thead>
            <tr>
              <th scope="col" className={tableDim}>
                Dimension
              </th>
              {TOOLS.map(tool => (
                <th key={tool} scope="col" className={tableHeader}>
                  {tool}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARISON_ROWS.map(({ dimension, cells }) => (
              <tr key={dimension}>
                <th scope="row" className={tableDim}>
                  {dimension}
                </th>
                {cells.map((cell, i) => (
                  <td key={i} className={tableCell}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-forge-dark/80">
        Ideal when you want a single schema source and plain SQL migrations
        without an ORM.
      </p>
    </section>
  );
}
