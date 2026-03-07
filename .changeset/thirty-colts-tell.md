---
"schema-forge-site": patch
---

♻️ refactor(site): optimize SQL generation and error handling in schema editor

- Replace unused generated SQL state with a memoized calculation.
- Simplify SQL display logic to show error messages when schema validation fails.
- Improve rendering of generated SQL output in the `SchemaEditor` component.