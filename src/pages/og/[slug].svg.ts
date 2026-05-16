import { getCollection } from "astro:content";
import { buildColorCards, buildCssSnippetMap } from "@/data";

export async function getStaticPaths() {
	const cards = buildColorCards(await getCollection("colors"));
	return cards.map((card) => ({ params: { slug: card.slug }, props: { slug: card.slug } }));
}

function escapeHtml(value: string): string {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

export async function GET({ props }: { props: { slug: string } }) {
	const cards = buildColorCards(await getCollection("colors"));
	const card = cards.find((item) => item.slug === props.slug) ?? cards[0];
	const snippet = buildCssSnippetMap([card.className])[card.className].css;

	const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <style>
    .bg { fill: #09090b; }
    .panel { ${snippet.replace(`.${card.className} {`, "").replace(/\n}$/, "")} }
    .title { fill: #fafafa; font: 700 64px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    .meta { fill: #a1a1aa; font: 500 28px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
  </style>
  <rect class="bg" width="1200" height="630" rx="0"/>
  <foreignObject x="70" y="70" width="1060" height="350">
    <div xmlns="http://www.w3.org/1999/xhtml" class="panel" style="width:1060px;height:350px;border-radius:44px;"></div>
  </foreignObject>
  <text class="title" x="80" y="515">${escapeHtml(card.name)}</text>
  <text class="meta" x="82" y="565">color.xima.work · CSS3 · Tailwind CSS v4</text>
</svg>`;

	return new Response(svg, {
		headers: {
			"Content-Type": "image/svg+xml; charset=utf-8",
			"Cache-Control": "public, max-age=31536000, immutable",
		},
	});
}
