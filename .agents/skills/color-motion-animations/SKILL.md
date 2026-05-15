---
name: color-motion-animations
description: Use for color.xima.work Astro UI animation work, especially gallery reveals, controls, theme transitions, hover effects, scroll/in-view animation, and reduced-motion-safe motion QA.
---

# color.xima.work Motion Animations

Use this workflow for animation tasks in this repository.

1. Inspect the affected Astro component and nearby usage before editing.
2. Prefer CSS/Tailwind transitions for simple hover, focus, theme, and control-state changes.
3. Do not add an animation dependency unless the task clearly requires it.
4. Scope selectors to the affected component or a `data-*` root instead of querying the whole document.
5. Always support `prefers-reduced-motion: reduce`; final content must remain visible without motion.
6. Animate transform and opacity first. Avoid effects that make gradient colors or copied CSS harder to inspect.
7. Avoid layout shifts in the gallery grid, filter controls, header, and cards.
8. Keep timing quick and functional; do not add looping decorative motion unless explicitly requested.

Validation should include a local render check when a dev server is available or easy to start.
