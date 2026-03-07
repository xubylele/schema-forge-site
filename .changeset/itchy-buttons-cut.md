---
"schema-forge-site": minor
---

✨ feat(site): add schema editor playground interface

- Add `PlaygroundPage` for editing `.sf` schemas in the browser.
- Introduce `PlaygroundClient` to dynamically load the editor experience.
- Create `SchemaEditor` with Monaco Editor integration and syntax highlighting.
- Define a custom Schema Forge language and theme for the editor.
- Include an example schema as initial playground content.
- Add `@monaco-editor/react` as a dependency.