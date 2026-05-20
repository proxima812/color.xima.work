# AGENTS.md

## Project

`color.xima.work` is a static Astro gradient gallery for designers and frontend developers. The site focuses on fast browsing, English UI, SEO-ready static pages, and copy-ready CSS gradient snippets.

## Stack

- Astro 5 with static output and Vercel adapter.
- Tailwind CSS v4 through `@tailwindcss/vite`.
- Astro components, TypeScript data/config files, and small client scripts.
- Package manager: Bun.
- Main source folders: `src/pages`, `src/components`, `src/components/colors`, `src/config`, `src/data`, `src/layouts`, `src/styles`.
- Language: English only.

## Working Rules

- Keep changes narrowly scoped to the requested task.
- Do not touch `.claude`.
- Do not modify generated artifacts, `.astro`, `.vercel`, `node_modules`, or local browser files unless explicitly asked.
- Do not redesign layout, spacing, hierarchy, color system, or interactions unless the task asks for UI changes.
- Prefer existing Astro component patterns, data structures, and Tailwind utilities.
- Do not add dependencies when the current stack is enough.
- Use `rg` for search.
- Use `apply_patch` for manual file edits.

## UI And Styling

- Use Tailwind v4-compatible utilities by default.
- Preserve the gallery-first visual language: gradient cards, compact controls, readable labels, and fast scanning.
- Keep responsive behavior explicit for changed components.
- Avoid new CSS files unless the affected surface already uses a local stylesheet or Tailwind cannot express the required behavior cleanly.
- Preserve accessibility basics: semantic HTML, focus states, keyboard behavior, readable contrast, and non-overlapping text.

## Content, Data, And SEO

- Gradient source data lives primarily in `src/data`.
- Shared site and SEO settings live in `src/config`.
- Preserve gradient IDs/slugs, labels, tag semantics, copied CSS output, and route behavior unless the task explicitly changes them.
- Preserve canonical URLs, robots behavior, sitemap assumptions, headings, and metadata.
- Keep visible UI copy in English.

## Validation

- Do not run full builds by default.
- Prefer targeted checks such as `bunx astro check`, focused file parsing, or a local dev-server/browser check for UI changes.
- Run `bun run build` only when the change affects routing, Astro config, integrations, sitemap/robots behavior, or site-wide data behavior.
