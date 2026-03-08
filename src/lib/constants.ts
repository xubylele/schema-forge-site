export const LINKS = {
  playground: process.env.NEXT_PUBLIC_PLAYGROUND_URL ?? "/playground",
  npm: "https://www.npmjs.com/package/@xubylele/schema-forge",
  core: "https://www.npmjs.com/package/@xubylele/schema-forge-core",
  vscode:
    "https://marketplace.visualstudio.com/items?itemName=xubylele.schema-forge",
  openVsx: "https://open-vsx.org/extension/xubylele/schema-forge",
  issues: "https://github.com/xubylele/schema-forge-site/issues",
  githubAction: "https://github.com/xubylele/schema-forge-action",
  docs: "/docs",
  docsDsl: "/docs/dsl",
  docsCli: "/docs/cli",
  docsMigration: "/docs/migration-workflow",
} as const;

export const INSTALL_COMMAND = "npm install -g @xubylele/schema-forge";

export const QUICKSTART_STEPS = [
  {
    id: "init",
    label: "Init",
    command: "npx schema-forge init",
    description: "Scaffold project or add to existing.",
  },
  {
    id: "generate",
    label: "Generate",
    command: "schema-forge generate",
    description: "Generate migrations from your .sf schema.",
  },
  {
    id: "diff",
    label: "Diff",
    command: "schema-forge diff",
    description: "Compare schema versions and show SQL diff.",
  },
] as const;
