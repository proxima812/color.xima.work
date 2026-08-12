---
name: color.xima.work
description: A neutral zinc shell built to disappear behind 465 CSS gradients.
colors:
  page-light: "oklch(98.5% 0 0)"
  page-dark: "oklch(14.1% 0.005 285.823)"
  card-light: "#ffffff"
  card-dark: "oklch(21% 0.006 285.885)"
  ink-max-light: "oklch(14.1% 0.005 285.823)"
  ink-max-dark: "oklch(98.5% 0 0)"
  ink-light: "oklch(21% 0.006 285.885)"
  ink-dark: "oklch(96.7% 0.001 286.375)"
  ink-muted-light: "oklch(55.2% 0.016 285.938)"
  ink-muted-dark: "oklch(70.5% 0.015 286.067)"
  hairline-light: "oklch(92% 0.004 286.32)"
  hairline-dark: "oklch(27.4% 0.006 286.033)"
  hairline-hover-light: "oklch(87.1% 0.006 286.286)"
  hairline-hover-dark: "oklch(37% 0.013 285.805)"
  focus-blue: "oklch(62.3% 0.214 259.815)"
  link-underline-blue: "oklch(70.7% 0.165 254.624)"
typography:
  display:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "3.5rem"
    fontWeight: 600
    lineHeight: "3.75rem"
    letterSpacing: "-1.2px"
  headline:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 600
    lineHeight: "1"
    letterSpacing: "-0.025em"
  title:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    letterSpacing: "-0.025em"
  lead:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: "1.625"
  body:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
  label:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
  micro:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
rounded:
  sm: "0.25rem"
  xl: "0.75rem"
  full: "9999px"
spacing:
  gutter: "1.25rem"
  card-padding: "1rem"
  control-x: "0.75rem"
  control-y: "0.5rem"
  section: "2rem"
  grid-gap: "4rem"
components:
  gradient-card:
    backgroundColor: "{colors.card-light}"
    rounded: "{rounded.xl}"
    padding: "1rem"
  gradient-card-preview:
    rounded: "{rounded.xl}"
  button-ghost:
    backgroundColor: "{colors.card-light}"
    textColor: "{colors.ink-muted-light}"
    rounded: "{rounded.xl}"
    padding: "0 0.75rem"
    height: "2.25rem"
    typography: "{typography.body}"
  button-ghost-hover:
    textColor: "{colors.ink-max-light}"
  button-solid:
    backgroundColor: "{colors.ink-max-light}"
    textColor: "#ffffff"
    rounded: "{rounded.xl}"
    padding: "0.5rem 0.75rem"
    typography: "{typography.label}"
  chip-filter:
    backgroundColor: "{colors.card-light}"
    textColor: "{colors.ink-light}"
    rounded: "{rounded.xl}"
    padding: "0.375rem 0.75rem"
    typography: "{typography.label}"
  chip-filter-pressed:
    backgroundColor: "{colors.ink-light}"
    textColor: "{colors.page-light}"
  input-search:
    backgroundColor: "{colors.card-light}"
    textColor: "{colors.ink-light}"
    rounded: "{rounded.xl}"
    padding: "0.625rem 6rem 0.625rem 2.75rem"
  search-overlay-panel:
    backgroundColor: "{colors.card-light}"
    rounded: "{rounded.xl}"
    width: "min(100% - 2.5rem, 36rem)"
---

# Design System: color.xima.work

## Overview

**Creative North Star: "The Neutral Vitrine"**

The site is a display case. 465 gradients supply every saturated pixel on screen; the interface supplies glass, hairlines, and labels. The entire chrome is built from one neutral ramp (Tailwind's `zinc`), one radius (`rounded-xl`, 0.75rem), one border weight (1px), and one type family (the system sans stack — no webfont is loaded anywhere in the project). Nothing in the shell competes for attention, because whatever the shell colours, the visitor will read as part of a gradient.

Density is moderate and scan-first. The gallery is a two-column grid with a large 4rem gutter (`gap-16`), so each gradient reads as an isolated specimen rather than a tile in a mosaic. Controls are compact: 2.25rem-high pill buttons, 0.75rem chips, 0.875rem body text. Surfaces are flat and translucent — `bg-white/70` over `bg-zinc-50` in light, `bg-zinc-900/70` over `bg-zinc-950` in dark — with `backdrop-blur` on the floating header, footer, and search overlay. Depth comes from hairline borders and translucency, almost never from shadow.

Light and dark are not variants of one another; both are authored on every component through the `dark:` variant, driven by a `dark` class on `<html>` (`@custom-variant dark (&:where(.dark, .dark *))` in `src/styles/global.css`), persisted in `localStorage`, defaulting to `prefers-color-scheme`.

**Key Characteristics:**
- Achromatic UI: zinc only, with two blue exceptions (search focus ring, card-title underline).
- One radius everywhere: `rounded-xl` (0.75rem), 65 uses against 4 `rounded-sm` and 1 `rounded-full`.
- Hairline-first depth: 1px `zinc-200` / `zinc-800` borders, shadows reserved for floating layers.
- Translucent floating chrome: sticky header, fixed footer, and search overlay all use `backdrop-blur`.
- System font stack, no display font, no webfont request.
- Both themes authored inline on every component; neither is an afterthought.

## Colors

The palette is a single neutral ramp plus the gradients themselves. There is no brand accent colour in the interface.

### Primary

The interface has no primary accent. The *content* is the accent: the gradient classes in `src/styles/gradients.css` (~3960 lines, mostly `radial-gradient`, `linear-gradient`, `conic-gradient`, and `repeating-linear-gradient` compositions in hex, `rgba()`, and `hsl()`). Individual gradient values are never promoted into UI chrome.

### Neutral

- **Page Light** (`bg-zinc-50`): body background in light theme.
- **Page Dark** (`bg-zinc-950`): body background in dark theme; also the inset background of code and preview wells in dark.
- **Card Light** (`#ffffff`, often at 70–90% alpha as `bg-white/70`): cards, panels, pills, overlay panel.
- **Card Dark** (`bg-zinc-900`, often `/70`): the same surfaces in dark theme.
- **Ink Max** (`text-zinc-950` / `dark:text-zinc-50`): page headings, hover state of links and ghost buttons.
- **Ink** (`text-zinc-900` / `dark:text-zinc-100`): body text set on `<body>`.
- **Ink Muted** (`text-zinc-500` / `dark:text-zinc-400`): eyebrows ("Collection", "Generator"), counts, tag lists, placeholders, empty states, icon-only control glyphs.
- **Hairline** (`border-zinc-200` / `dark:border-zinc-800`): every default border in the UI.
- **Hairline Hover** (`border-zinc-300` / `dark:border-zinc-700`, sometimes `zinc-400` / `zinc-600`): the border darkening that signals hover on cards, chips, and buttons.
- **Gradient frame** (`ring-black/5` / `dark:ring-white/10`, and `border-black/5` on large previews): the near-invisible edge that separates a light gradient from a light page without adding a colour of its own.

### Chromatic exceptions (the only two in the UI)

- **Focus Blue** (`focus:border-blue-500` + `focus:ring-4 focus:ring-blue-500/10`): light-theme focus treatment of the in-page search input, `src/components/colors/ColorSearch.astro`. In dark theme the same input falls back to `zinc-500`.
- **Link Underline Blue** (`decoration-blue-400 decoration-dashed underline-offset-4`): the dashed underline under a gradient name in `ColorCard`. It is a decoration colour only; the text stays `zinc-700`.

### Named Rules

**The Vitrine Rule.** Colour on this site belongs to the content. Any UI element that is not a gradient preview is drawn from the zinc ramp, black/white at low alpha, or the two documented blue exceptions. Introducing a third accent, a tinted neutral (slate, stone, warm gray), or a brand hue means the gradients now share the stage with the frame.

**The No-Gradient-Chrome Rule.** No `background-image: *-gradient()` on any header, button, badge, card surface, page background, or text that is not itself a catalogue gradient being demonstrated. The one sanctioned gradient-on-text surface is the generator's text preview, which exists to preview a catalogue gradient.

## Typography

**Display Font:** ui-sans-serif, system-ui, sans-serif (with Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji)
**Body Font:** ui-sans-serif, system-ui, sans-serif
**Mono Font:** not defined

This is the Tailwind v4 default stack, inherited by preflight. No `font-family` is declared in `src/styles/global.css` or in any component, and no font is self-hosted or linked. `font-sans` appears explicitly only on the `Cmd`/`K` keycaps. Code snippets on detail pages are rendered by Shiki (`github-light` / `github-dark`) inside a `text-xs leading-6` well and inherit the same sans stack.

**Character:** neutral and unstyled by intent. Hierarchy is carried by size and weight (only `font-medium`, `font-semibold`, and three `font-bold` counters exist), never by a second family, and never by italics or uppercase display type. Two headings use uppercase micro-labels (`Esc`, `Open` in the search overlay) at 10–11px.

### Hierarchy

- **Display** (600, `text-[56px]`, `leading-15` = 3.75rem, `tracking-[-1.2px]`): the gallery title in `ColorsHeader`. Only one instance.
- **Headline** (600, `text-5xl` = 3rem, `sm:text-7xl` on the landing page, `md:text-6xl` in the generator, `tracking-tight`, `leading-none`): page `<h1>` on landing, detail, collection, and generator.
- **Title** (600, `text-xl` = 1.25rem, `tracking-tight`): section headings such as "Copy styles".
- **Lead** (400, `text-lg` = 1.125rem, `leading-relaxed`, `text-zinc-500`): the one-sentence description under a page heading; constrained to `max-w-xl` / `max-w-2xl`.
- **Body** (500, `text-sm` = 0.875rem): the dominant size on the site (35 uses) — buttons, links, search results, card titles (`text-base` in one place).
- **Label** (600, `text-xs` = 0.75rem): filter chips, category links, tag pills, format switches.
- **Micro** (500, `text-[11px]` / `text-[10px]` / `text-[0.68rem]`): keycap hints, the "Open" affordance in search results, filter counts.

### Named Rules

**The System-Stack Rule.** Do not add a webfont, `next/font`-style loader, `@font-face`, or a display serif. The type is deliberately anonymous so that the gradient is the only thing with personality on screen, and so the site ships zero font requests.

## Layout

The shell is one centred column: `mx-auto w-full max-w-5xl px-5 py-12` on `<main>` in `src/layouts/BaseLayout.astro`. The header uses the identical `max-w-5xl px-5` measure so chrome and content share one left edge.

- **Header:** `sticky top-5 z-50 mb-10`, an inner surface at `px-5 py-2.5 rounded-xl` with `bg-white/50 dark:bg-black/50 backdrop-blur-lg`. It is a floating bar, not a full-bleed band.
- **Footer:** `fixed inset-x-0 bottom-5 z-50`, a centred `px-5 py-2` blurred pill. It floats over content permanently.
- **Gallery grid:** `grid grid-cols-1 md:grid-cols-2 gap-16` (`ColorsGrid`). The 4rem gutter is the deliberate breathing room between specimens; it is larger than any padding value in the system.
- **Card internals:** stacked on mobile, `sm:grid-cols-[8.5rem_minmax(0,1fr)]` from the `sm` breakpoint — a fixed 8.5rem preview column beside a fluid meta column.
- **Generator:** `lg:grid-cols-[minmax(0,1fr)_18rem]` — fluid preview beside a fixed 18rem control rail.
- **Search overlay:** `mt-24`, `w-[calc(100%-2.5rem)] max-w-xl`, results capped at `max-h-80 overflow-auto`.
- **Landing showcase band:** the one full-bleed element in the system. `src/pages/index.astro` breaks the shell with `relative left-1/2 w-screen -translate-x-1/2`; `<body>` carries `overflow-x-clip` so the 100vw band never produces a horizontal scrollbar (`clip`, not `hidden`, so the sticky header keeps sticking to the viewport).
- **Breakpoints:** Tailwind defaults, used sparingly (`sm`, `md`, `lg`, `xl`). Only `md` changes the gallery column count.
- **Spacing rhythm:** the Tailwind 0.25rem scale. Repeating steps are `1.25rem` (page gutter, header padding), `1rem` (card and panel padding), `0.75rem`/`0.5rem` (control padding), `0.5rem` (chip gaps), `2rem` (section stacks), `3rem` (page top/bottom padding), `4rem` (grid gutter), `6rem` (`mb-24` under the gallery header).

## Elevation & Depth

The system is flat by default. Depth is produced by a 1px border plus a translucent surface over a tonal background; shadows appear only where an element genuinely floats above the page or is toggled on.

### Shadow Vocabulary

- **Card rest** (`box-shadow: 0 1px 3px 0 rgb(9 9 11 / 0.03), 0 1px 2px -1px rgb(9 9 11 / 0.03)`): written as `shadow-sm shadow-zinc-950/[0.03]`, dark `shadow-black/10`. The barest lift under a gradient card; effectively invisible, it exists only to keep a white card from fusing with the zinc-50 page.
- **Header scrolled** (`box-shadow: 0 18px 44px -28px rgba(15, 23, 42, 0.34)`): declared in `HeaderBehavior.astro`, dark variant `rgba(0, 0, 0, 0.6)`. Applied only after `scrollY > 96`, together with a more opaque surface.
- **Chip pressed** (`box-shadow: 0 6px 14px -8px rgb(0 0 0 / 0.35)`): the selected filter chip in `ColorTagFilters`, paired with an inverted fill.
- **Overlay panel** (`box-shadow: 0 25px 50px -12px rgb(9 9 11 / 0.2)`): written as `shadow-2xl shadow-zinc-950/20`. The search dialog, the one true modal layer.

### Named Rules

**The Blur-Not-Shadow Rule.** Floating chrome separates itself with `backdrop-blur` plus a translucent fill (`bg-white/50`, `bg-white/45`, `bg-zinc-950/45`), not with a heavier drop shadow. Reach for opacity and blur before adding elevation.

## Shapes

One corner radius carries the whole system: `rounded-xl` (0.75rem) on cards, previews, buttons, chips, inputs, pills, wells, the overlay panel, and the code frame — 65 occurrences. `rounded-sm` (0.25rem) appears only on the `Cmd`/`K` keycaps; `rounded-full` once. There is no square-cornered surface and no radius scale to choose from.

Borders are always 1px and always a zinc hairline, except on gradient previews, where the frame becomes `ring-1 ring-black/5 dark:ring-white/10` (or `border-black/5`) so it can sit on top of an arbitrary gradient without tinting it. Gradient previews use a 4:3 aspect ratio in cards (`aspect-[4/3] min-h-32`) and fixed minimum heights elsewhere (`min-h-80` on detail, `min-h-72` in the generator).

Motion is short and mechanical: the default Tailwind `transition` (~150–200ms) on hover and pressed states, `duration-200` on chips and copy buttons, and one expressive exception — the header hides on scroll-down with `transition-[transform,opacity,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]`, translating up, fading, and blurring 6px. Chips lift `-translate-y-px` on hover and focus-visible. The generator's text animations (`pan`, `pulse`, `rise`) are opt-in and disabled under `prefers-reduced-motion: reduce`, both in the preview and in the copied snippet. The landing marquee is the one continuous animation in the system: three rows translating linearly at 64s / 88s / 74s per loop (rows one and two rightward, row three leftward), paused on `:hover` and `:focus-within`, and replaced by a horizontally scrollable static row under `prefers-reduced-motion: reduce`.

## Components

### Gradient card (signature component)

The unit the whole product is built around (`src/components/colors/ColorCard.astro`).

- **Container:** `rounded-xl border border-zinc-200 bg-white/70 p-3 sm:p-4 shadow-sm shadow-zinc-950/[0.03]`, dark `border-zinc-800 bg-zinc-900/70 shadow-black/10`; `hover:border-zinc-300` / `dark:hover:border-zinc-700`. `role="listitem"`, `aria-label` = gradient name.
- **Preview:** the gradient's own class plus `aspect-[4/3] min-h-32 rounded-xl ring-1 ring-black/5 dark:ring-white/10`, marked `aria-hidden="true"`. It carries no label, no overlay, no hover effect.
- **Meta panel:** a nested `rounded-xl border bg-white dark:bg-zinc-950/60 p-4` block holding the title link, the format switch, and the copy button — an inset card inside the card.
- **Title:** `text-base font-medium text-zinc-700` with a dashed blue underline (`decoration-blue-400 decoration-dashed underline-offset-4`), truncated; links to the detail page.
- **Format switch:** a segmented `inline-flex` in a `rounded-xl border bg-zinc-50 p-1` track; the active segment inverts to `aria-pressed:bg-zinc-900 aria-pressed:text-zinc-50` (dark: `bg-zinc-100`/`text-zinc-950`). Default active format is Tailwind.
- **Copy button:** ghost style (`border-zinc-200 bg-white`, hover `bg-zinc-50`), swaps icon and label to "Copied" via `data-copy-state=copied` for 1500ms, dimming to `opacity-70`.

### Gradient marquee (landing only)

`src/components/colors/GradientMarquee.astro`, used once, on `/`.

- **Band:** full-bleed, `border-y border-zinc-200 dark:border-zinc-800`, `py-5 sm:py-6`, `role="region"` with `aria-label="Gradient catalog showcase"`. Rows are stacked with `gap-3 sm:gap-4`.
- **Rows:** `overflow: hidden` plus a `mask-image: linear-gradient(to right, transparent, #000 11%, #000 89%, transparent)` so tiles melt into the page instead of being cut. `#000` there is a mask alpha stop, not a palette colour.
- **Track:** each row holds its tile sequence twice inside two `.marquee-group` flex blocks and translates `-50%`; spacing lives on the tile (`mr-3 sm:mr-4`), never on the flex container, so the loop seam is exact.
- **Tile:** `h-24 w-36 sm:h-28 sm:w-44 rounded-xl ring-1 ring-black/5 dark:ring-white/10`, links to `/gradient/[slug]/`, lifts `-translate-y-1` on hover, and reveals the gradient name in a `bg-black/45 backdrop-blur-md text-[11px]` pill on hover or `focus-visible`. The duplicate group is `aria-hidden` and `tabindex="-1"`.
- **Selection:** one tag family per row — `linear`, then `border`, then `mesh` — up to 18 tiles each, strided across the family so the row samples it evenly. Families smaller than the viewport (linear has 14 entries, border 10) repeat their sequence until one group is wider than the screen; otherwise the `-50%` loop would expose a gap. The row order is also a tonal one: saturated sweeps, then quiet glass tints, then soft blends.

### Buttons

- **Shape:** `rounded-xl` (0.75rem) without exception.
- **Ghost (default):** `h-9` pill, `border-zinc-200 bg-white/70 px-3 text-sm font-medium text-zinc-600`; hover darkens border to `zinc-300` and text to `zinc-950`. Used for header actions (Generator, Random), search trigger, theme toggle, Back, and card copy. Icon-only variants are square `h-9 w-9` and always carry `aria-label`.
- **Solid:** `bg-zinc-950 text-white` (dark: `bg-zinc-100 text-zinc-950`), `px-3 py-2 text-xs font-medium`; used only for the per-snippet copy buttons on detail pages. Solid means "this is the primary action on this block", not "this is important in general".
- **Hover / focus:** hover is a border and text shift, not a fill change (the solid button is the exception, shifting to `zinc-800` / `white`). Transitions are the Tailwind default `transition`.

### Chips and tags

- **Filter chip** (`ColorTagFilters`): `rounded-xl border border-zinc-300 bg-white/70 px-3 py-1.5 text-xs`, with an inline count badge (`h-4 min-w-4`, `text-[0.68rem]`, `font-bold`). Selected state is a full inversion — `aria-pressed:border-zinc-900 aria-pressed:bg-zinc-900 aria-pressed:text-zinc-50` (dark inverts to `zinc-50` on `zinc-900`) — plus the pressed shadow and a `-translate-y-px` lift on hover/focus-visible.
- **Category link** (`CategoryNav`): same silhouette as a chip at `px-3 py-1.5 text-xs font-medium`; active state is `border-zinc-950 bg-zinc-950 text-white` with `aria-current="page"`.
- **Tag pill** (detail header): outline only, `rounded-xl border border-zinc-200 px-3 py-1 text-xs`, linking to the collection page.

### Inputs

- **In-page search** (`ColorSearch`, mounted on `/cards/` through `ColorsControls`): `w-full rounded-xl border border-zinc-200 bg-white/70 py-2.5 pl-11 pr-24`, leading magnifier icon at `left-4`, trailing `Cmd`+`K` keycap button. Focus: `outline-none` replaced by `focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10` (dark: `zinc-500` equivalents). This is the only element in the system with a designed focus ring.
- **Overlay search input:** borderless `bg-transparent text-sm outline-none` inside the dialog header; it relies on being autofocused when the overlay opens.
- **Generator fields:** `rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm` textareas and `h-10` selects, each with a `text-sm font-medium text-zinc-600` label above; focus darkens the border to `zinc-400` (dark `zinc-600`).
- **Error / disabled states:** not defined anywhere in the project.

### Navigation (header)

- Floating blurred bar; left cluster is logotype + a `h-5 w-px bg-zinc-200` divider + GitHub stars badge, right cluster is Generator, Random, search trigger, theme toggle — all as ghost pills with `gap-2`. Labels collapse to icons below `sm` (`hidden sm:inline`).
- **Scroll behaviour** (`HeaderBehavior.astro`): past 96px the surface becomes more opaque and gains a shadow; scrolling down more than 10px hides it (translate up, `opacity: 0`, `blur(6px)`, `pointer-events: none`), scrolling up more than 8px brings it back.

### Search overlay

`fixed inset-0 z-[100]`, backdrop `bg-white/45 backdrop-blur-md dark:bg-zinc-950/45`, panel `mt-24 max-w-xl rounded-xl border bg-white shadow-2xl` with `role="dialog" aria-modal="true"`. Header row: icon, input, `Esc` button. Results are up to 8 rows of `rounded-xl px-3 py-2` links (name + comma-joined tags + an "Open" micro-pill) with `hover:bg-zinc-100 dark:hover:bg-zinc-900`. Empty and idle states are centred `py-14 text-sm text-zinc-500` lines: "Type to search..." / "No gradients found". Opening the overlay adds `overflow-hidden` to `<html>`.

### Code block (detail page)

`rounded-xl border border-zinc-200 bg-zinc-50 text-xs leading-6` (dark `bg-zinc-950`) wrapping Shiki output, with `[&_pre]:max-h-72 [&_pre]:overflow-auto [&_pre]:p-4` and dual-theme CSS variables (`--shiki-light` / `--shiki-dark`) switched by the `dark` class.

## Do's and Don'ts

### Non-negotiable principles

These are invariants of this specific site, each verifiable in the code cited above. Follow them even when a general design heuristic suggests otherwise.

**The Vitrine Rule.** The gradients are the content; the interface is the frame. Every chrome colour in the codebase is zinc, black/white at low alpha, or one of the two documented blue exceptions. A tinted or branded UI palette would put the frame in competition with 465 saturated specimens and make the catalogue harder to judge.

**The No-Gradient-Chrome Rule.** No decorative gradient anywhere in the UI — not in buttons, headers, badges, page backgrounds, dividers, or headline text. Evidence: `src/styles/gradients.css` is imported purely as a catalogue of `@layer utilities` classes applied to preview elements; no component in `src/components/` applies a gradient class to a control or a container. A gradient in the chrome reads as a specimen and corrupts the comparison the visitor came to make.

**The Gallery-First Rule.** Scanning density and copy speed outrank expression. Keep the two-column `gap-16` grid, the compact control sizes (`h-9` pills, `text-xs` chips, `text-sm` body), and the one-click copy path with its 1.5s "Copied" confirmation. Do not insert steps, modals, or reveal-on-hover behaviour between seeing a gradient and copying it.

**The Two-Themes Rule.** Light and dark are equal, shipped surfaces: every component in this repository authors both through the `dark:` variant, and the theme is user-chosen and persisted (`ThemeToggle.astro`, inline boot script in `BaseLayout.astro`). Any new component must specify both; a light-only or dark-only surface is an unfinished component.

**The English-Only Rule.** All visible UI copy is English (`<html lang="en">`, `locale: "en_US"`, every label and empty state in the components). Do not introduce another language or a locale switcher.

### Do:

- **Do** reuse the zinc ramp exactly as documented: `zinc-50`/`zinc-950` for pages, `white`/`zinc-900` for surfaces, `zinc-200`/`zinc-800` for hairlines, `zinc-500`/`zinc-400` for muted text.
- **Do** use `rounded-xl` (0.75rem) for every new surface, control, and well; the system has no second radius to pick from.
- **Do** express hover as a border and text-colour shift (`border-zinc-300`, `text-zinc-950`), matching every existing ghost control.
- **Do** wrap gradient previews in `ring-1 ring-black/5 dark:ring-white/10` (or `border-black/5`) rather than a zinc border, so the frame stays colour-neutral over arbitrary gradients.
- **Do** keep new interactive elements accessible the way the existing ones are: `aria-label` on icon-only controls, `aria-pressed` on toggles, `aria-current` on active navigation, `aria-hidden` on decorative gradients, and `prefers-reduced-motion: reduce` handling for anything that animates.
- **Do** keep copy output derived from `src/styles/gradients.css` through `src/data/css-snippets.ts`; a snippet that is authored separately from the rendered rule will drift.
- **Do** keep client JavaScript minimal and inline where the existing code does (theme, header, copy, redirects); bundled scripts exist only for Fuse.js search and the generator.

### Don't:

- **Don't** introduce a brand accent, a purple/violet gradient, glassmorphic tinting, mesh backgrounds, or an "AI" aesthetic. The only chromatic UI values in the codebase are `blue-500` (search focus ring) and `blue-400` (card title underline).
- **Don't** swap the neutral family. It is `zinc` everywhere; slate, stone, gray, or a warm cream background would recolour every gradient preview by contrast.
- **Don't** add a webfont or a display serif. The project loads no fonts and declares no `font-family`; the system stack is the decision, not an oversight.
- **Don't** enlarge or centre the shell. `max-w-5xl px-5 py-12` and the left-aligned column are the measure the header, gallery, and detail pages all share; the centred hero layout and the one full-bleed showcase band are used only on `/`.
- **Don't** replace the floating blurred header/footer with a full-bleed opaque band, or remove the scroll hide/reveal behaviour — both are load-bearing for vertical scanning room.
- **Don't** add elevation as decoration. Shadows exist in exactly four places (card rest, scrolled header, pressed chip, overlay panel); everything else is flat.
- **Don't** turn text into a gradient outside the generator's text preview, which exists to demonstrate a catalogue gradient.
- **Don't** put the client-side filter chips (`ColorTagFilters`) and the `CategoryNav` links on the same page. They share a silhouette and the same 14 labels but behave differently — chips filter the grid in place, `CategoryNav` navigates to `/collection/[tag]/`. `/cards/` uses the chips; collection and detail pages use `CategoryNav`.

## Undetermined

Recorded as absent rather than invented:

- **Design tokens.** There is no `@theme` block, no CSS custom properties, and no Tailwind config; every value above is a raw Tailwind v4 utility resolved against the framework defaults. The frontmatter of this file is a description of usage, not a source of truth the code reads.
- **Focus-visible system.** Only `ColorSearch` defines a focus ring, and `ColorTagFilters` a focus-visible lift. Every other control (buttons, links, chips, the overlay input, generator fields — several of which set `outline-none`) relies on the browser default or has no visible focus state. There is no project-wide focus token.
- **Motion tokens.** Durations and easings are inline per component (`duration-200`, `duration-700`, `ease-[cubic-bezier(0.22,1,0.36,1)]`); there is no shared scale.
- **Error, disabled, and loading states.** Empty states exist in two places only: the search overlay's two centred `py-14 text-sm text-zinc-500` messages, and the gallery's filtered-to-nothing block (`rounded-xl border border-dashed`, "No gradients found" + hint + a ghost "Clear filters" button) in `ColorsGallery`.
- **Iconography rules.** Icons come from `astro-icon` with `@iconify-json/mdi` plus hand-written inline SVGs (theme toggle, search glyphs); no stroke-width or size convention is declared.
- **Accessibility target.** No WCAG level, audit, or statement is declared anywhere in the repository.
