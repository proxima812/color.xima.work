# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Frontend developers and designers who need a ready-made CSS gradient for a real surface (hero, card, banner, section background, gradient text) and want the code in seconds. The footer states the audience directly: "for designers & developers".

Usage situation: the visitor arrives mid-task with an editor open, scans a grid of previews, recognises the gradient visually rather than by name, copies a snippet, and leaves. Sessions are short and scan-driven, not exploratory.

No other audience, persona, market size, or usage metric is recorded anywhere in the repository. Do not invent one.

## Product Purpose

`color.xima.work` is a static, curated gallery of CSS gradients. It exists so that a gradient can be found visually and pasted into a project without rewriting it: every preview is rendered by the same CSS rule that the copy button emits.

Success means: the visitor finds a gradient by scanning or searching, and copies a working snippet in CSS3 or Tailwind CSS v4 form on the first try.

## Positioning

The copy output is derived from the shipped stylesheet, not authored separately. `src/data/css-snippets.ts` reads `src/styles/gradients.css` at build time, extracts the rule body for a class name, and converts the same declarations into Tailwind v4 arbitrary utilities. Preview and snippet cannot drift apart.

Everything else follows from that: the catalogue is a real stylesheet (`src/styles/gradients.css`, ~3400 lines), the index is a flat data file (`src/data/colors.json`, 388 entries), and the whole site is prerendered static output with no gradient API or editor state to sync.

## Operating Context

- Entry points are deep and shallow alike: the landing page, a category collection, a single gradient detail page from search or a shared link, `/daily/`, `/random/`, or the generator.
- Global search is an overlay mounted in the shared layout on every page (`src/components/SearchOverlay.astro`), opened from the header button or `Cmd/Ctrl+K`; `Esc` and a backdrop click close it. It shows at most 8 fuzzy matches and links straight to detail pages. On a page that renders the in-page search bar the overlay yields the shortcut and stays click-only, so the two search UIs never fire together.
- The primary browsing surface is `/cards/`: an in-page search field, a row of tag filter chips, a result count, and a two-column grid of gradient cards, each with a preview, a name link, a CSS3/Tailwind format switch, and a copy button.
- Copying is the terminal action. The button swaps its label to "Copied" for ~1.5s (1.4s on detail pages) and restores itself; there is no toast, modal, or account state.
- Detail pages show the gradient large, plus Shiki-highlighted CSS3 and Tailwind snippets with per-snippet copy buttons, and a "Back" link that prefers the in-site referrer.
- The generator (`/generator/`) previews any catalogue gradient as a color block (card / hero / button preset) or as gradient text (size, weight, animation), and copies Tailwind, CSS3, background-only, or React output.

## Capabilities and Constraints

Routes (all prerendered, `output: "static"`):

- `/` — landing: centred hero (count eyebrow, title, one-line description, primary link to `/cards/` and secondary link to `/generator/`), a full-bleed three-row gradient marquee with one family per row — linear, border, mesh — picked deterministically at build time (`GradientMarquee`), captioned with links to those three collections, six section cards (gallery, presets generator, mesh generator, Instagram post, picks, favorites), and a collections panel linking `/daily/`, `/random/`, and every tag collection.
- `/cards/` — full gallery of all gradient cards, with in-page search and tag filters.
- `/gradient/[slug]/` — detail page per gradient.
- `/collection/[tag]/` — one page per tag from `tagOrder`.
- `/generator/` — block and text gradient generator.
- `/daily/` — deterministic gradient of the day (redirect page).
- `/random/` — random gradient (redirect page, `noindex`).
- `/robots.txt` — robots policy with sitemap link.

Data and taxonomy:

- 388 gradient entries in `src/data/colors.json`, loaded through an Astro content collection (`src/content.config.ts`) with a `{ name, index, className }` schema; card order follows `index`.
- 14 tags in fixed order (`src/data/tags.ts`): glow, mesh, linear, radial, conic, repeating, multi-stop, transparent, border, noise, femme, masc, flag, other. Tags are derived from the gradient name prefix, one tag per gradient; anything unmatched becomes `other`.
- Descriptions are generated from the gradient name (`src/data/descriptions.ts`), not hand-written per gradient.

Search:

- Fuse.js, client-side, over the full prerendered item list. `threshold: 0.36`, `ignoreLocation: true`, weighted keys: name, description, tags, className (plus visible id / id in the in-page variant).
- Two search implementations exist, with different jobs. The overlay is mounted globally and navigates: a match links straight to a detail page. The in-page search + tag filter bar (`ColorsControls`) is rendered on `/cards/` (`showControls={true}`) and filters in place: it hides non-matching `[data-color-item]` cards, updates a "Showing N of 388 gradients" count, and reveals a "No gradients found" empty state with a "Clear filters" button when nothing matches. Search term and tag chip combine (AND).

Constraints:

- Static Astro 5 build, Vercel deployment, Bun as package manager. No server runtime, database, auth, or analytics in the repository.
- Client JavaScript is deliberately small: inline scripts for theme, header behaviour, copy, and redirects; bundled scripts only for Fuse.js search and the generator.
- SEO is first-class: canonical URLs, sitemap, robots, per-page titles/descriptions, OG and Twitter metadata with a shared default image (`/og-default.jpg`, overridable per page via the layout's `ogImage` prop). Route behaviour, slugs, class names, and canonicals are load-bearing.
- All visible UI copy is English.
- Theme is user-controlled: a `dark` class on `<html>`, persisted in `localStorage`, with `prefers-color-scheme` as the first-visit default. Both themes are shipped surfaces.
- Site URL is `https://color.xima.work`, overridable via `PUBLIC_SITE_URL`.
- `public/og-default.jpg` is generated, not hand-made: `bun run og` (`scripts/generate-og.mjs`) renders it from the real `src/styles/gradients.css` with Playwright. Regenerate it rather than editing the image.

## Brand Commitments

- Name and wordmark: `color.xima` / `color.xima.work`; default title "color.xima — gradients that vibe" (`src/config/seo.ts`).
- Custom SVG logotype (`src/components/logotype.astro`), filled `#222222` in light and white in dark; favicon set in `public/favicons/`, mask-icon colour `#222222`.
- Author credit in the footer: proxima812, linked to GitHub; the header carries a GitHub stars badge for `proxima812/color.xima.work`.
- Voice in existing copy is short, lowercase-leaning, and factual ("gradients that vibe", "Type to search...", "No gradients found").

## Evidence on Hand

- Real content: `src/styles/gradients.css` (the gradients themselves), `src/data/colors.json` (388 catalogue entries), `src/data/tags.ts`, generated descriptions.
- Public artefacts: live site `https://color.xima.work`, GitHub repository `proxima812/color.xima.work`, MIT `LICENSE` (the footer's link to it is currently commented out).
- Absent, and not to be fabricated: testimonials, user counts, traffic or performance metrics, pricing, roadmap, and any claim about who uses the site.

## Product Principles

1. **The gradients are the product.** Everything else on screen is packaging. When a change makes the interface more expressive at the cost of gradient legibility, it is a regression.
2. **Preview equals snippet.** Any feature that shows a gradient must show the same CSS the copy button emits; snippets stay derived from `gradients.css`.
3. **Scan, then copy.** Optimise for recognising a gradient by eye and copying it in one action. Extra steps between seeing and copying are the expensive kind of complexity here.
4. **Static and cheap.** Prefer build-time work and small inline scripts over client runtime. New dependencies need a reason the current stack cannot cover.
5. **Both themes, one language.** Light and dark are equally supported surfaces; UI copy is English only.

## Accessibility & Inclusion

Implemented today: semantic landmarks and headings, `role="list"`/`role="listitem"` on the gallery, `aria-pressed` on format and filter toggles, `aria-current` on category navigation, `aria-label` on icon-only controls, `role="dialog"` + `aria-modal` + `Esc` on the search overlay, `aria-keyshortcuts` on the search trigger, decorative gradients marked `aria-hidden`, and `prefers-reduced-motion: reduce` handling for generator text animations (including in the emitted snippet).

No formal conformance target (WCAG level, audit, or statement) is declared anywhere in the repository: undetermined. Do not claim one.
