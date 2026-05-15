---
name: color-astro-content
description: Use for color.xima.work Astro content, gradient data, i18n, SEO metadata, canonical routes, robots, sitemap, and structured static-site changes. Do not use for broad UI redesigns.
---

# color.xima.work Astro Content

Follow this workflow for content, data, i18n, and SEO tasks in this repository.

1. Identify the smallest source of truth before editing:
   - Routes live in `src/pages`.
   - Gradient cards, tags, descriptions, and CSS snippets live in `src/data`.
   - Locale strings live in `src/i18n/locales`.
   - Shared site and SEO settings live in `src/config`.
   - The shared page shell lives in `src/layouts/BaseLayout.astro`.
2. Preserve gradient IDs, labels, tags, CSS output, route structure, and locale behavior unless the task explicitly asks to change them.
3. For SEO edits, check canonical URLs, robots behavior, headings, translated alternates, sitemap implications, and visible title consistency.
4. When adding UI text, add matching keys to all locale dictionaries and use the existing translation helpers.
5. Do not run a full build by default. Use targeted validation, or explain why validation was skipped.

Output should include the files changed and any SEO or i18n risk that remains.
