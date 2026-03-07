---
"schema-forge-site": patch
---

♻️ chore(site): refactor ESLint configuration and remove Prettier

- Replace Prettier with `@stylistic/eslint-plugin` for formatting.
- Update ESLint configuration to include stylistic rules.
- Remove `.prettierignore` and `prettier.config.mjs`.
- Update `package.json` and `package-lock.json` to remove Prettier dependencies.
- Add React type definitions in `tsconfig.json`.
- Apply minor formatting adjustments across components.