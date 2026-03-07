export const LINKS = {
  playground: process.env.NEXT_PUBLIC_PLAYGROUND_URL ?? "/playground",
  npm: "https://www.npmjs.com/package/@xubylele/schema-forge",
  vscode:
    "https://marketplace.visualstudio.com/items?itemName=xubylele.schema-forge",
  openVsx: "https://open-vsx.org/extension/xubylele/schema-forge",
} as const;

export const INSTALL_COMMAND = "npm install -g @xubylele/schema-forge";
