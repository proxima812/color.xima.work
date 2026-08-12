# color.xima.work

A fast gradient gallery for modern UI work.

[Live Site](https://color.xima.work) · [Repository](https://github.com/proxima812/color.xima.work) · [Issues](https://github.com/proxima812/color.xima.work/issues)

![Astro](https://img.shields.io/badge/Astro-5-111827?style=flat-square&logo=astro)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-111827?style=flat-square&logo=tailwindcss)
![Static](https://img.shields.io/badge/Output-static-111827?style=flat-square)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-111827?style=flat-square&logo=vercel)

`color.xima.work` is a curated collection of CSS gradients for designers and frontend developers. Browse visually, search with fuzzy matching, filter by style, open detail pages, and copy production-ready snippets in CSS3 or Tailwind CSS v4 format.

## Highlights

- Curated gradient cards for hero sections, surfaces, cards, banners, and UI accents.
- Smart search powered by Fuse.js.
- Copy formats for both CSS3 and Tailwind CSS v4.
- Detail pages, category collections, daily/random redirects, and a gradient generator.
- Static Astro output with sitemap, robots.txt, canonical URLs, and a generated static OG image.
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
Astro content collections
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
  components/header/   search and theme controls
  config/              site and SEO settings
  data/                gradient source, tags, descriptions, copy snippets
  layouts/             shared page shell
  pages/               gallery, detail, collection, generator, redirects, robots
  styles/              global styles and gradient utilities
```

## Routes

```text
/                         main gallery
/cards/                   all copy-ready gradient cards
/gradient/[slug]/         gradient detail page
/collection/[tag]/        filtered collection page
/generator/               gradient generator
/daily/                   daily gradient redirect
/random/                  random gradient redirect
/robots.txt               robots policy with sitemap link
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
- Site URL: `https://color.xima.work`
- Output mode: static
- Deployment target: Vercel
- Gradient collection loader: `src/content.config.ts` reads `src/data/colors.json`
- Social preview: one static image at `public/og-default.jpg`, regenerate it with `bun run og`

## Contributing

Issues and pull requests are welcome. Keep changes focused, preserve the existing Astro/Tailwind structure, and avoid broad UI rewrites unless they are part of the proposed change.

## License

The code in this repository is released under the [MIT License](LICENSE).

The gradient CSS snippets themselves are public domain (CC0). Use them freely in any project, including commercial work, with no attribution required.
