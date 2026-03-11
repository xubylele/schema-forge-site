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
      "Shipped and stable: CLI, core engine, safety features, and VSCode support.",
    items: [
      { title: "CLI (init, diff, generate, validate, import, introspect, doctor)", status: "complete" },
      { title: "Schema diff engine & SQL generator", status: "complete" },
      { title: "Safety (destructive detection, --safe, CI exit codes, JSON output)", status: "complete" },
      { title: "VSCode extension (syntax, diagnostics, completion, SQL/diff preview, status bar)", status: "complete" },
    ],
  },
  {
    title: "Next",
    description:
      "In progress: website, playground, Cloud auth, and CI integration.",
    items: [
      { title: "Interactive playground (browser core, baseline, migration SQL)", status: "in-progress" },
      { title: "Website (docs, login, signup, CLI login page)", status: "in-progress" },
      { title: "Schema Forge Cloud (auth, device login for CLI)", status: "in-progress" },
      { title: "GitHub Action (validate, doctor, diff, PR comment preview)", status: "in-progress" },
      { title: "Visual diff", status: "planned" },
    ],
  },
  {
    title: "Future",
    description:
      "Long-term: freemium, schema graph, cloud state sync, multi-provider, visual platform.",
    items: [
      { title: "Freemium (Stripe, licenses, Pro tier)", status: "planned" },
      { title: "Schema graph (visualization, impact analysis)", status: "planned" },
      { title: "Migration risk analysis (dedicated product feature)", status: "planned" },
      { title: "Cloud schema state (push/pull)", status: "planned" },
      { title: "Multi-provider (MySQL, SQLite)", status: "planned" },
      { title: "Visual schema platform (explorer, timeline, collaboration)", status: "planned" },
    ],
  },
];
