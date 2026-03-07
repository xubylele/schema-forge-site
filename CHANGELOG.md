# schema-forge-site

## 0.4.0

### Minor Changes

- ad629b8: ✨ feat(site): add Footer component and integrate into layout

  - Add `Footer` component for site-wide navigation and bug reporting.
  - Update `RootLayout` to render the Footer at the bottom of the page.
  - Add GitHub issues link to constants for easier access.

- 8c41ec1: ✨ feat(site): add schema editor playground interface

  - Add `PlaygroundPage` for editing `.sf` schemas in the browser.
  - Introduce `PlaygroundClient` to dynamically load the editor experience.
  - Create `SchemaEditor` with Monaco Editor integration and syntax highlighting.
  - Define a custom Schema Forge language and theme for the editor.
  - Include an example schema as initial playground content.
  - Add `@monaco-editor/react` as a dependency.

- 863dd7f: ✨ feat(site): integrate schema-forge-core into schema editor

  - Add `@xubylele/schema-forge-core` as a dependency.
  - Update `SchemaEditor` to use schema parsing, validation, and SQL generation.
  - Implement error handling for schema parsing and validation.
  - Display generated SQL output in the playground editor interface.

- 40ef8be: ✨ feat(site): enhance playground with error boundary and baseline support

  - Add description in `PlaygroundPage` explaining baseline usage and migration SQL.
  - Refactor `Hero` to remove the playground modal and link directly to the Playground.
  - Introduce `PlaygroundErrorBoundary` to handle runtime errors in `PlaygroundClient`.
  - Update `SchemaEditor` to support baseline state management for SQL generation.

### Patch Changes

- 65e600b: ♻️ refactor(site): optimize SQL generation and error handling in schema editor

  - Replace unused generated SQL state with a memoized calculation.
  - Simplify SQL display logic to show error messages when schema validation fails.
  - Improve rendering of generated SQL output in the `SchemaEditor` component.

## 0.3.0

### Minor Changes

- ✨ feat(site): update WhatsNewModal to render full changelog

  - Update `WhatsNewModal` to display the full changelog instead of a summary.
  - Enhance changelog parsing to extract complete release content.
  - Extend `LatestRelease` type to include a `fullContent` property.

### Patch Changes

- 27615fa: ♻️ chore(site): refactor ESLint configuration and remove Prettier

  - Replace Prettier with `@stylistic/eslint-plugin` for formatting.
  - Update ESLint configuration to include stylistic rules.
  - Remove `.prettierignore` and `prettier.config.mjs`.
  - Update `package.json` and `package-lock.json` to remove Prettier dependencies.
  - Add React type definitions in `tsconfig.json`.
  - Apply minor formatting adjustments across components.

## 0.2.0

### Minor Changes

- 3e1720f: ✨ feat(site): integrate react-markdown and add WhatsNewModal
  - Add `react-markdown` to render markdown content.
  - Update `RootLayout` to include `WhatsNewModal`.
  - Fetch latest release data to display recent updates to users.

## 0.1.0

### Minor Changes

- 8504c11: ✨ feat(site): enhance homepage with Hero component and layout styling

  - Add `Hero` component to display the main tagline and installation command.
  - Improve page layout with background and typography styling for better readability.
  - Introduce constants module for external links and installation command configuration.

- dd581ef: ✨ feat(site): add InstallQuickstart component to homepage

  - Introduce `InstallQuickstart` component to display installation instructions and commands.
  - Update homepage layout to include the new InstallQuickstart section.
  - Define quickstart steps in the constants module for easier management and reuse.

- aab99e6: ✨ feat(site): add InstallQuickstart component to homepage

  - Introduce `InstallQuickstart` component to display installation instructions and commands.
  - Update homepage layout to include the new InstallQuickstart section.
  - Define quickstart steps in the constants module for easier management and reuse.

- b09f2de: ✨ feat(site): add ProductOverview component to homepage

  - Introduce `ProductOverview` component to highlight key features and navigation links.
  - Update homepage layout to include the new ProductOverview section.
  - Add core repository link to the constants module for external navigation.

- 1ee403c: ✨ feat(site): initialize Schema Forge website with Next.js and Tailwind
  - Set up the Next.js project structure for the Schema Forge website.
  - Configure Tailwind CSS for styling.
  - Add ESLint and Prettier for linting and formatting.
  - Include base configuration files and initial dependencies.
  - Create the initial application layout and project scaffolding.
