# schema-forge-site

## 0.10.0

### Minor Changes

- 4d67046: feat(docs): update CLI and DSL descriptions, add sections for indexes, views, and migration planning

  - Updated docs descriptions to reflect latest CLI and DSL capabilities.
  - Added DSL documentation sections for indexes and views.
  - Expanded CLI and migration docs with migration planning workflow coverage.

- 4d67046: ✨ feat(schema-editor): add BaselineControls and ChangesSection components

  - Implemented BaselineControls for managing baseline state with options to set or clear the baseline.
  - Created ChangesSection to display a list of operations and indicate when there are no changes from the baseline.
  - Defined shared props types for both components to ensure type safety.
  - Updated the schema-editor index exports to expose the new components and types.

### Patch Changes

- 4d67046: refactor(changelog): simplify latest release payload and modal rendering

  - Simplified `LatestRelease` by removing unused fields and full changelog extraction logic.
  - Updated the modal markdown source to use `release.content` instead of `release.fullContent`.

## 0.9.0

### Minor Changes

- b7d9f5a: ✨ feat(policies): add policy management support in schema state

  - Add new types `PolicyCommand`, `PolicyNode`, and `StatePolicy` for policy definitions.
  - Extend `Table` and `StateTable` interfaces with optional `policies` property.
  - Update `schemaToState` and `createSnapshot` to handle table policies.

## 0.8.2

### Patch Changes

- 0663c1a: 📝 docs(roadmap): refine VSCode extension description and update planned items

  - Improve VSCode extension description to mention visual diff and status bar click menu.
  - Remove the "Visual diff" item from the planned section to reflect updated priorities.

## 0.8.1

### Patch Changes

- cbf0e02: 📝 docs(roadmap): update roadmap sections with clearer descriptions and statuses

  - Revise descriptions for **Now**, **Next**, and **Future** sections to reflect current progress.
  - Improve item titles in **Now** and **Next** for clarity.
  - Add new roadmap items and update development statuses for better tracking.

## 0.8.0

### Minor Changes

- ✨ feat(analytics): integrate Vercel Analytics for usage tracking

  - Add `@vercel/analytics` dependency.
  - Integrate `Analytics` component in `RootLayout` to enable site analytics.

## 0.7.0

### Minor Changes

- 46c894f: ✨ feat(site): add SiteHeader navigation and roadmap page

  - Add `SiteHeader` component for site-wide navigation.
  - Update `RootLayout` to include the new header.
  - Enhance `Footer` with a link to the Roadmap page.
  - Create a `Roadmap` page to display project progress and future plans.
  - Add roadmap-related types and constants for improved structure.

## 0.6.0

### Minor Changes

- 0611fa8: ✨ feat(site): add IntegrationShowcase component for supported integrations

  - Add `IntegrationShowcase` component to highlight supported integrations.
  - Update Home page to include the new integrations section.
  - Refactor constants to include the GitHub Action link for external integration.

## 0.5.0

### Minor Changes

- 9e761eb: ✨ feat(site): add FeatureComparison component to showcase migration workflow differences

  - Add `FeatureComparison` component to compare Schema Forge with other migration tools.
  - Update Home page to include the new comparison section.
  - Implement a responsive table layout to display migration workflow differences.

- 13f9f5e: ✨ feat(site): enhance Footer with documentation links and layout improvements

  - Add documentation section in the `Footer` with a link to the docs.
  - Improve Footer layout for better responsiveness and structure.
  - Use Next.js `Link` component for internal navigation.

- 8d7abf2: ✨ feat(site): add HowItWorks section and IonIcon component

  - Add `HowItWorks` component to explain the schema workflow with visual steps.
  - Introduce `IonIcon` component to render icons from the `ionicons` library.
  - Update page layout to include the new `HowItWorks` section.
  - Add `ionicons` dependency to `package.json`.

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
