# color.xima.work

A fast gradient gallery for modern UI work.

[Live Site](https://color.xima.work) · [Repository](https://github.com/proxima812/color.xima.work) · [Issues](https://github.com/proxima812/color.xima.work/issues)

![Astro](https://img.shields.io/badge/Astro-5-111827?style=flat-square&logo=astro)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-111827?style=flat-square&logo=tailwindcss)
![Static](https://img.shields.io/badge/Output-static-111827?style=flat-square)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-111827?style=flat-square&logo=vercel)

`color.xima.work` is a curated collection of CSS gradients for designers and frontend developers. Browse visually, search with fuzzy matching, filter by style, and copy production-ready snippets in CSS3 or Tailwind CSS v4 format.

## Highlights

- Curated gradient cards for hero sections, surfaces, cards, banners, and UI accents.
- Smart search powered by Fuse.js.
- Copy formats for both `CSS3` and `Tailwind CSS v4`.
- Localized routes for `en`, `ru`, and `tt`.
- Static Astro output with sitemap and SEO metadata.
- Minimal runtime, Bun-first local workflow, Vercel deployment.

## Quick Start

```bash
bun install
bun run dev
```

Open `http://localhost:4321`.

Production commands:

```bash
bun run build
bun run preview
```

## Stack

```text
Astro 5
Tailwind CSS v4
Fuse.js
astro-seo
astro-icon
@astrojs/sitemap
@astrojs/vercel
```

## Project Structure

```text
src/
  components/colors/   gallery, cards, search, filters, copy controls
  components/header/   theme and locale controls
  config/              site and SEO settings
  data/                gradient cards, tags, descriptions, copy snippets
  i18n/                locale dictionaries
  layouts/             shared page shell
  pages/               default and localized routes
  styles/              global styles and gradient utilities
```

## Copy Formats

Every gradient can be copied as a classic CSS class:

```css
.radial-glow-aurora-cyan {
  background-image: radial-gradient(...);
  border: 1px solid rgba(...);
  box-shadow: ...;
}
```

Or as Tailwind CSS v4 arbitrary utilities:

```text
bg-[radial-gradient(...)] border border-solid border-[rgba(...)] shadow-[...]
```

## Development Notes

- Package manager: `bun`
- Default locale: `en`
- Supported locales: `en`, `ru`, `tt`
- Site URL: `https://color.xima.work`
- Output mode: static
- Deployment target: Vercel

## Contributing

Issues and pull requests are welcome. Keep changes focused, preserve the existing Astro/Tailwind structure, and avoid broad UI rewrites unless they are part of the proposed change.

## License

No license file is currently included in this repository.
