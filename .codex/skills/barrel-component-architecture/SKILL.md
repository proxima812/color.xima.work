---
name: barrel-component-architecture
description: Use when adding, moving, or refactoring color.xima.work components so they are grouped by feature folders and imported through local index.ts barrel exports instead of deep component paths.
---

# Barrel Component Architecture

Use this skill for component organization in `color.xima.work`.

## Goal

Keep components discoverable and imports stable by grouping related components into folders and exporting public components through `index.ts` barrel files.

## Project Pattern

- Root shared components live in `src/components`.
- Feature components live in subfolders such as `src/components/colors` and `src/components/header`.
- Each component folder with public imports should have an `index.ts`.
- Import from barrels when crossing folder boundaries:
  - `import { Header, SearchOverlay } from "@/components";`
  - `import { CategoryNav, ColorsGrid } from "@/components/colors";`
  - `import { HeaderSearch, ThemeToggle } from "@/components/header";`
- Use relative imports only for same-folder private helpers:
  - `import CopyFormatIcon from "./CopyFormatIcon.astro";`

## Workflow

1. Before adding a component, inspect the nearest existing folder:
   - `src/components/index.ts`
   - `src/components/<feature>/index.ts`
2. Place the component in the smallest matching feature folder.
3. If no feature folder fits, place it in `src/components` only when it is truly shared across the app.
4. Add a named export to that folder's `index.ts` when the component is used outside the folder.
5. Update outside imports to use the barrel path.
6. Do not export private implementation helpers unless another folder imports them.
7. Keep unrelated exports untouched and preserve existing export order unless adding near similar components.
8. Run `bunx astro check` after changing component exports or imports.

## Examples

Adding a public colors component:

```ts
// src/components/colors/index.ts
export { default as CategoryNav } from "./CategoryNav.astro";
```

Using it from a page:

```astro
---
import { CategoryNav, ColorsGrid } from "@/components/colors";
---
```

Adding a root shared component:

```ts
// src/components/index.ts
export { default as SearchOverlay } from "./SearchOverlay.astro";
```

Using it from a layout:

```astro
---
import { Header, SearchOverlay } from "@/components";
---
```

## Guardrails

- Do not reorganize folders just for cleanliness.
- Do not touch `.claude`.
- Do not introduce path aliases or dependency changes for barrel exports.
- Do not convert all existing imports unless the touched files need it.
- Keep Astro components as default exports and re-export them as named exports from `index.ts`.
