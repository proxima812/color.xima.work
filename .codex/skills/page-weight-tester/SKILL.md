---
name: page-weight-tester
description: Используй для проверки нагрузки Astro-сайта color.xima.work: размер HTML-страниц, JS/CSS bundle assets в dist, gzip-вес, тяжелые страницы и скрипты после bun run build.
---

# Page Weight Tester

Используй этот скилл, когда нужно проверить вес страниц, bundle-скриптов или риск раздутого `dist`.

## Workflow

1. Если `dist` устарел или менялись маршруты/компоненты/скрипты, запусти:
   `bun run build`
2. Запусти аудит:
   `node .codex/skills/page-weight-tester/scripts/audit-page-weight.mjs`
3. Смотри сначала `warnings`, затем `largestScripts`, `largestStyles`, `largestPages`.
4. Если есть регресс:
   - найди конкретный route/component/import, который добавил вес;
   - не оптимизируй весь проект без запроса;
   - предлагай точечные меры: убрать тяжелый import, разделить клиентский скрипт, сократить inline HTML, проверить данные галереи.

## Defaults

Скрипт проверяет `dist` и выводит:

- общий размер HTML, JS и CSS;
- gzip-размеры;
- самые тяжелые `.html`, `.js`, `.css`;
- warning-и по порогам.

Пороги по умолчанию:

- HTML page gzip > `80 KB`
- JS asset gzip > `170 KB`
- CSS asset gzip > `80 KB`
- total JS raw > `600 KB`

Пороги можно менять через env:

```bash
PAGE_GZIP_LIMIT_KB=100 JS_GZIP_LIMIT_KB=200 CSS_GZIP_LIMIT_KB=100 TOTAL_JS_LIMIT_KB=800 node .codex/skills/page-weight-tester/scripts/audit-page-weight.mjs
```

## Rules

- Не запускай полный build без причины, но для проверки bundle-веса он обычно нужен.
- Не удаляй функциональность ради веса без согласования.
- Не считай `unusedLocaleKeys` или сгенерированные sitemap-файлы проблемой этого аудита.
- В финальном отчете укажи конкретные файлы/маршруты и самые тяжелые активы.
