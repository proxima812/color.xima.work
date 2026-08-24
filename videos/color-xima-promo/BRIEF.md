---
workflow: product-launch-video
flow: automation
storyboard: yes
message: "You can make anything"
destination: shorts
aspect: 1080x1920
language: en
audience: young frontend developers and designers who build for the web
length: 40s
angle: the tool does not choose for you
narration: no
---

## Intent

A premium promo for color.xima.work — a curated CSS gradient gallery (388 gradients,
Astro 5 + Tailwind v4, copy-ready CSS3 / Tailwind snippets, plus a generator).

The user asked for it in their own words: **молодёжно**, and the whole point is
**творчество, свобода и упрямство** — creativity, freedom and stubbornness — landing
on the message **"ты всё можешь"** / "you can make anything". Premium bar: this should
feel expensive, not like a template reel.

The angle carries that: a gallery of 388 gradients is not a shelf of templates you pick
from, it is raw material you bend. The freedom is that nobody tells you which one is
correct; the stubbornness is that you keep pushing it past where it was "fine". The site
itself supports the reading — it ships a generator and copy-ready snippets, so it is
built for making, not for browsing.

## Customizations

- **Fully silent.** The user chose no sound at all and no voice-over: no narration, no BGM,
  no SFX. Marked canonically as `music: none` in `STORYBOARD.md` with no `SCRIPT.md`, so
  Step 3.1 is a clean skip. Consequence accepted after being told it costs retention on
  Shorts/TikTok and that a premium feel usually leans on sound — so the typography, motion
  and cut have to carry the whole piece alone. Every beat must read with the sound off,
  because there is no sound to turn on.
- **The 388 count is typographic, not a grid.** At 1080x1920 a wall of 388 swatches is
  roughly 30px per swatch — unreadable mush. The full grid appears once as a fast scroll,
  read as texture and velocity rather than counted; the colour itself is carried by five
  or six hero gradients at full bleed. Raised at the intent layer's integration check and
  adopted.

## Notes

- Source of truth for visuals is the real site at https://color.xima.work — captured, not
  reinvented.
- The catalogue was just rebuilt: 388 gradients after an 85-add / 162-remove / 66-rename
  pass. New premium families worth featuring: brushed-metal conics
  (`conic-brushed-titanium`, `conic-chrome-mirror`, `conic-champagne-sheen`), device
  colourways (`glow-titanium-desert`, `glow-siri-halo`, `glow-gemini-spark`), material
  textures (`repeating-linear-carbon-weave`, `repeating-conic-guilloche-gold`), and the
  long multi-stop ramps (`multi-stop-dawn-atlantic`, `multi-stop-ember-noir`).
- There is also a `/pantone/` page (Pantone Colour of the Year 2000–2026) added in the
  same session — available if a beat wants it, not required.
- Avoid stock-startup-promo language and stock-photo aesthetics. Typographic and material.
- `npx` is blocked in this environment by a hook; run every CLI command through `bunx`.
  The scaffolded `package.json` scripts call `npx`, so `npm run dev/check/render` will not
  work here — call `bunx hyperframes@0.7.107 <cmd>` directly instead.
