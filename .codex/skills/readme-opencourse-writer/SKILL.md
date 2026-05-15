---
name: readme-opencourse-writer
description: Use when writing or rewriting README.md for an open-source course, library, UI kit, starter, or small product repository. Produces a concise, polished README inspired by Astro, shadcn/ui, and Bearnie style: clear headline, direct value proposition, quick start, docs links, contribution, and license.
---

# README Opencourse Writer

Use this skill when the user asks to create, rewrite, polish, or fill `README.md` for this repo or another open-source/course-style project.

## Workflow

1. Inspect the project before writing:
   - `package.json`, framework config, app routes, public URL, docs links, license, existing README.
   - For this repo, preserve `color.xima.work`, Astro 5, Tailwind v4, Vercel/static, and locales `en`, `ru`, `tt`.
2. Identify the README type:
   - **Product/library**: lead with what it is and why it exists.
   - **Course/opencourse**: lead with the learning promise, audience, and curriculum outcome.
   - **UI kit/starter**: lead with customization, ownership, and quick use.
3. Keep the README compact and scannable. Prefer 6-9 sections max.
4. Write in a confident open-source voice:
   - Short headline and value proposition.
   - No hype-heavy marketing paragraphs.
   - Direct commands and concrete links.
   - Make it obvious how to run, use, contribute, and license.
5. Preserve working commands and package manager from the repo. Do not invent features, docs URLs, badges, sponsors, or screenshots.
6. If data is missing, use a minimal placeholder only when unavoidable and mention it in the final answer.

## Recommended Structure

````markdown
# Project Name

Short, concrete one-liner.

Optional badges or hero image if already present or explicitly requested.

Brief paragraph explaining what it helps users do.

## Highlights

- Practical feature
- Practical feature
- Practical feature

## Quick Start

```bash
package-manager install
package-manager run dev
```

## Usage

Short usage notes, links, or examples.

## Project Structure

```text
src/
  ...
```

## Documentation

Link to docs, live site, or relevant pages.

## Contributing

Short contribution note and link to `CONTRIBUTING.md` if it exists.

## License

Licensed under the license in `LICENSE`.
````

## Style Guidance

- Prefer the Astro pattern for mature framework/repos: badges, install, docs, support, contributing, package/directory table when useful.
- Prefer the shadcn/ui and Bearnie pattern for small UI kits/products: terse positioning, hero image, docs, contributing, license.
- For course repos, add:
  - `## What You'll Build`
  - `## Curriculum`
  - `## Prerequisites`
  - `## Lessons` or `## Modules`
- Avoid long feature essays. Put details in docs when possible.
- Keep link text human-readable: `Live Site`, `Documentation`, `Contributing Guide`.
- Use ASCII unless the repository already uses non-ASCII branding or language.

## Quality Checklist

Before finishing:

1. Commands match `package.json`.
2. Project name, live URL, license, and docs links are accurate.
3. README does not promise unavailable features.
4. Sections are ordered from value to setup to contribution/license.
5. Existing SEO/product positioning is preserved when relevant.
6. Markdown renders cleanly: no broken fences, tables, or image paths.
