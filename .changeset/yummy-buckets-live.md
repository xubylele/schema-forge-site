---
"schema-forge-site": minor
---

✨ feat(site): enhance playground with error boundary and baseline support

- Add description in `PlaygroundPage` explaining baseline usage and migration SQL.
- Refactor `Hero` to remove the playground modal and link directly to the Playground.
- Introduce `PlaygroundErrorBoundary` to handle runtime errors in `PlaygroundClient`.
- Update `SchemaEditor` to support baseline state management for SQL generation.