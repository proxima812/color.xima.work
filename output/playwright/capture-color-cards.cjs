const { chromium } = require('playwright');
const fs = require('node:fs/promises');
const path = require('node:path');

(async () => {
  const url = 'http://127.0.0.1:4321/en/';
  const selector = '[data-my-action="screen"]';
  const limit = 125;
  const outDir = path.resolve('output/playwright/color-cards-125');

  await fs.mkdir(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1600, height: 1200 },
    deviceScaleFactor: 3,
  });
  const page = await context.newPage();

  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForSelector(selector, { timeout: 15000 });

  const cards = page.locator(selector);
  const count = await cards.count();
  const total = Math.min(limit, count);

  console.log(`Found ${count} cards, capturing ${total}`);

  for (let i = 0; i < total; i++) {
    const card = cards.nth(i);
    await card.scrollIntoViewIfNeeded();
    await page.waitForTimeout(50);
    const file = path.join(outDir, `${String(i + 1).padStart(3, '0')}.png`);
    await card.screenshot({ path: file, type: 'png' });
    if ((i + 1) % 25 === 0 || i + 1 === total) {
      console.log(`Captured ${i + 1}/${total}`);
    }
  }

  await browser.close();
  console.log(`Done: ${outDir}`);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
