export type RoadmapItemStatus = "complete" | "in-progress" | "planned";

export type RoadmapItem = {
  title: string;
  status: RoadmapItemStatus;
};

export type RoadmapSection = {
  title: string;
  description: string;
  items: RoadmapItem[];
};

export const ROADMAP_SECTIONS: RoadmapSection[] = [
  {
    title: "Now",
    description:
      "Shipped and stable milestones validated across CLI, core, extension, cloud, action, and site.",
    items: [
      {
        title:
          "CLI (init, plan, preview, diff, generate, validate, import, introspect, doctor)",
        status: "complete",
      },
      {
        title: "Schema diff engine & SQL generator (tables, indexes, views)",
        status: "complete",
      },
      {
        title: "Migration planner APIs and action-based plan output (+, ~, -)",
        status: "complete",
      },
      { title: "Safety (destructive detection, --safe, --force, CI exit codes, JSON output)", status: "complete" },
      {
        title:
          "VSCode extension (syntax, diagnostics, completion, hover, code actions, plan/preview, visual diff, status bar)",
        status: "complete",
      },
      { title: "DSL: policies (RLS)", status: "complete" },
      {
        title: "DSL: indexes + views (unique, partial, expression indexes)",
        status: "complete",
      },
      { title: "Migration safety checks (DROP TABLE/COLUMN, ALTER TYPE warnings)", status: "complete" },
      { title: "SQL import baseline + AST to DSL writer", status: "complete" },
      { title: "Live DB introspection (schemaforge introspect)", status: "complete" },
      { title: "Schema Forge Cloud (auth + CLI device login)", status: "complete" },
      { title: "GitHub Action (validate, doctor, diff, PR comment preview)", status: "complete" },
      { title: "Website docs + playground", status: "complete" },
    ],
  },
  {
    title: "Next",
    description:
      "In-progress and near-term roadmap items currently prioritized.",
    items: [
      { title: "Website login/signup + CLI login page", status: "planned" },
      { title: "DSL: functions + triggers", status: "planned" },
      { title: "Status + verify commands (schemaforge status, schemaforge verify)", status: "planned" },
      { title: "Down migrations (up.sql / down.sql)", status: "planned" },
      { title: "Column rename detection", status: "planned" },
      { title: "Migration squash (schemaforge squash)", status: "planned" },
      { title: "Extended SQL import (indexes, FKs, views, functions)", status: "planned" },
      { title: "Provider abstraction (@schema-forge/provider-postgres)", status: "in-progress" },
    ],
  },
  {
    title: "Future",
    description:
      "Longer-term CLI surface expansion and multi-database architecture.",
    items: [
      { title: "Extract PostgreSQL provider package", status: "planned" },
      { title: "MySQL provider", status: "planned" },
      { title: "SQLite provider", status: "planned" },
      { title: "CLI commands: schemaforge pull, format, lint", status: "planned" },
    ],
  },
];
