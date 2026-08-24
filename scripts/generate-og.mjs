/**
 * Generates the single static social preview image used site-wide.
 *
 * Output: public/og-default.jpg (1200x630, JPEG q90)
 * Run with: bun run og
 *
 * The image is rendered by a cached Playwright Chromium build against the real
 * `src/styles/gradients.css`, so the tiles are the exact gradients shipped by the site.
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright-core";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const GRADIENTS_CSS = join(ROOT, "src", "styles", "gradients.css");
const OUTPUT = join(ROOT, "public", "og-default.jpg");

const WIDTH = 1200;
const HEIGHT = 630;

/** Gradient utility classes used for the preview tiles. Validated against gradients.css below. */
const TILE_CLASSES = [
	"radial-conic-prism-spin",
	"radial-glow-fuchsia-nova",
	"radial-mesh-solar-pop",
	"radial-conic-aurora-wheel",
	"radial-multi-stop-orange-pop",
	"radial-glow-aurora-cyan",
	"radial-mesh-amethyst-cloud",
	"radial-multi-stop-rainbow-soft",
	"radial-mesh-ruby-dusk",
	"radial-glow-violet-pulse",
];

const WORDMARK = "color.xima";
const TAGLINE = "388 curated CSS gradients · CSS3 · Tailwind v4";

function playwrightCacheDir() {
	if (process.env.PLAYWRIGHT_BROWSERS_PATH) return process.env.PLAYWRIGHT_BROWSERS_PATH;
	if (process.platform === "darwin") return join(homedir(), "Library", "Caches", "ms-playwright");
	if (process.platform === "win32") return join(process.env.LOCALAPPDATA ?? homedir(), "ms-playwright");
	return join(homedir(), ".cache", "ms-playwright");
}

/** Candidate binaries inside an unpacked chromium browser directory, across platforms. */
function browserBinaries(dir) {
	return [
		join(dir, "chrome-mac-arm64", "Google Chrome for Testing.app", "Contents", "MacOS", "Google Chrome for Testing"),
		join(dir, "chrome-mac", "Google Chrome for Testing.app", "Contents", "MacOS", "Google Chrome for Testing"),
		join(dir, "chrome-mac", "Chromium.app", "Contents", "MacOS", "Chromium"),
		join(dir, "chrome-headless-shell-mac-arm64", "chrome-headless-shell"),
		join(dir, "chrome-headless-shell-mac", "chrome-headless-shell"),
		join(dir, "chrome-linux", "chrome"),
		join(dir, "chrome-linux", "headless_shell"),
		join(dir, "chrome-headless-shell-linux64", "chrome-headless-shell"),
		join(dir, "chrome-win", "chrome.exe"),
		join(dir, "chrome-headless-shell-win64", "chrome-headless-shell.exe"),
	];
}

function resolveChromium() {
	// 1. Whatever playwright-core itself points at, when that build is actually present.
	try {
		const fromPlaywright = chromium.executablePath();
		if (fromPlaywright && existsSync(fromPlaywright)) return fromPlaywright;
	} catch {
		// playwright-core throws when no browser was ever installed; fall through to the cache scan.
	}

	// 2. Any cached chromium build, newest revision first. Full chromium is preferred
	//    over the headless shell because it renders the same as a real browser.
	const cache = playwrightCacheDir();
	if (!existsSync(cache)) return null;

	const builds = readdirSync(cache)
		.map((name) => /^(chromium|chromium_headless_shell)-(\d+)$/.exec(name))
		.filter((match) => match !== null)
		.map((match) => ({
			dir: join(cache, match[0]),
			revision: Number(match[2]),
			priority: match[1] === "chromium" ? 0 : 1,
		}))
		.sort((a, b) => a.priority - b.priority || b.revision - a.revision);

	for (const build of builds) {
		for (const binary of browserBinaries(build.dir)) {
			if (existsSync(binary)) return binary;
		}
	}

	return null;
}

function buildHtml(cssHref) {
	const tiles = TILE_CLASSES.map((className) => `<div class="tile ${className}"></div>`).join("");

	return `<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<link rel="stylesheet" href="${cssHref}" />
		<style>
			*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
			html, body { width: ${WIDTH}px; height: ${HEIGHT}px; overflow: hidden; }
			body {
				background: #09090b;
				font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
				-webkit-font-smoothing: antialiased;
			}
			.stage { position: relative; width: ${WIDTH}px; height: ${HEIGHT}px; background: #09090b; }
			.grid {
				position: absolute;
				inset: 0;
				display: grid;
				grid-template-columns: repeat(5, 1fr);
				grid-template-rows: 1.12fr 0.88fr;
				gap: 16px;
				padding: 26px;
			}
			.tile { border-radius: 24px; }
			/* Darkens the bottom-left corner for the wordmark while the tiles on the
			   right stay colorful, so the image still reads as a gradient gallery. */
			.scrim {
				position: absolute;
				inset: 0;
				background:
					radial-gradient(
						135% 110% at 4% 112%,
						rgba(9, 9, 11, 0.98) 0%,
						rgba(9, 9, 11, 0.94) 38%,
						rgba(9, 9, 11, 0.6) 60%,
						rgba(9, 9, 11, 0.1) 80%,
						rgba(9, 9, 11, 0) 94%
					),
					linear-gradient(
						180deg,
						rgba(9, 9, 11, 0) 58%,
						rgba(9, 9, 11, 0.1) 80%,
						rgba(9, 9, 11, 0.2) 100%
					);
			}
			.copy { position: absolute; left: 62px; bottom: 56px; }
			.wordmark {
				font-size: 106px;
				font-weight: 800;
				line-height: 1;
				letter-spacing: -0.045em;
				color: #fafafa;
			}
			.tagline {
				margin-top: 20px;
				font-size: 29px;
				font-weight: 500;
				line-height: 1.2;
				letter-spacing: -0.01em;
				color: #b6b6bf;
			}
		</style>
	</head>
	<body>
		<div class="stage">
			<div class="grid">${tiles}</div>
			<div class="scrim"></div>
			<div class="copy">
				<div class="wordmark">${WORDMARK}</div>
				<div class="tagline">${TAGLINE}</div>
			</div>
		</div>
	</body>
</html>`;
}

async function main() {
	if (!existsSync(GRADIENTS_CSS)) {
		throw new Error(`Gradient stylesheet not found at ${GRADIENTS_CSS}`);
	}

	const css = readFileSync(GRADIENTS_CSS, "utf8");
	const missing = TILE_CLASSES.filter((className) => !new RegExp(`\\.${className}\\s*\\{`).test(css));
	if (missing.length > 0) {
		throw new Error(`These gradient classes are missing from gradients.css: ${missing.join(", ")}`);
	}

	const executablePath = resolveChromium();
	if (!executablePath) {
		throw new Error(
			[
				"No cached Chromium build found for playwright-core.",
				`Looked in: ${playwrightCacheDir()}`,
				"Install one with: bunx playwright-core install chromium",
				"Or point PLAYWRIGHT_BROWSERS_PATH at an existing Playwright browser cache.",
			].join("\n"),
		);
	}

	const workDir = join(tmpdir(), `color-xima-og-${process.pid}`);
	mkdirSync(workDir, { recursive: true });
	const htmlPath = join(workDir, "og.html");
	writeFileSync(htmlPath, buildHtml(pathToFileURL(GRADIENTS_CSS).href), "utf8");

	const browser = await chromium.launch({ executablePath });
	try {
		const page = await browser.newPage({
			viewport: { width: WIDTH, height: HEIGHT },
			deviceScaleFactor: 1,
		});
		await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "load" });
		await page.evaluate(() => document.fonts.ready);

		const painted = await page.evaluate(() => {
			const tile = document.querySelector(".tile");
			return tile ? getComputedStyle(tile).backgroundImage : "none";
		});
		if (!painted || painted === "none") {
			throw new Error("gradients.css did not apply to the tiles - the rendered image would be blank.");
		}

		mkdirSync(dirname(OUTPUT), { recursive: true });
		await page.screenshot({
			path: OUTPUT,
			type: "jpeg",
			quality: 90,
			clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT },
		});
	} finally {
		await browser.close();
		rmSync(workDir, { recursive: true, force: true });
	}

	const bytes = statSync(OUTPUT).size;
	console.log(`OG image written: ${OUTPUT}`);
	console.log(`Size: ${WIDTH}x${HEIGHT}, ${(bytes / 1024).toFixed(1)} KB`);
	console.log(`Browser: ${executablePath}`);
}

main().catch((error) => {
	console.error(`\nOG generation failed:\n${error instanceof Error ? error.message : String(error)}`);
	process.exit(1);
});
