---
"schema-forge-site": patch
---

refactor(changelog): simplify latest release payload and modal rendering

- Simplified `LatestRelease` by removing unused fields and full changelog extraction logic.
- Updated the modal markdown source to use `release.content` instead of `release.fullContent`.
