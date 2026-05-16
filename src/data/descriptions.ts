const skipTokens = new Set<string>([
	"linear",
	"radial",
	"conic",
	"repeating",
	"multi",
	"stop",
	"transparent",
	"mesh",
	"neo",
	"noise",
	"overlay",
	"femme",
	"masc",
	"border",
	"glow",
	"flag",
]);

const usages = ["for hero sections with contrast typography", "for product cards and pricing blocks", "for landing page background sections", "for accent CTA zones", "for marketing banners", "for dark dashboard layouts"] as const;

const colorWords: Readonly<Record<string, string>> = { rose: "rose", mint: "mint", blue: "blue", violet: "violet", green: "green", gold: "gold", cobalt: "cobalt", amber: "amber", ocean: "ocean", night: "night", peach: "peach", coral: "coral", lime: "lime", teal: "teal", indigo: "indigo", berry: "berry", sunset: "sunset", arctic: "arctic", sky: "sky", ruby: "ruby", neon: "neon", smoke: "smoky", frost: "frost", plum: "plum" };

function clamp(text: string, fallbackTail: string): string {
	if (text.length < 20) return `${text} ${fallbackTail}`;
	if (text.length <= 110) return text;
	const cut = text.slice(0, 110);
	const lastSpace = cut.lastIndexOf(" ");
	return `${(lastSpace === -1 ? cut : cut.slice(0, Math.max(lastSpace, 20))).trimEnd()}.`;
}

function getColorTokens(name: string): string[] {
	return name
		.split("-")
		.filter((part) => !skipTokens.has(part))
		.slice(0, 2);
}

function getTypeLabel(name: string): string {
	if (name.startsWith("mesh-")) return "Mesh gradient";
	if (name.startsWith("glow-")) return "Glow gradient";
	if (name.startsWith("linear-")) return "Linear gradient";
	if (name.startsWith("radial-")) return "Radial gradient";
	if (name.startsWith("conic-")) return "Conic gradient";
	if (name.startsWith("repeating-")) return "Repeating gradient";
	if (name.startsWith("multi-stop-")) return "Multi-stop gradient";
	if (name.startsWith("transparent-")) return "Semi-transparent gradient";
	if (name.startsWith("border-")) return "Border gradient";
	if (name.startsWith("noise-")) return "Grainy gradient";
	if (name.startsWith("flag-")) return "Flag-inspired gradient";
	if (name.startsWith("femme-")) return "Soft fashion gradient";
	if (name.startsWith("masc-")) return "High-contrast industrial gradient";
	return "Gradient";
}

function getPalette(name: string): string {
	const tokens = getColorTokens(name);
	const translated = tokens.map((token) => colorWords[token]).filter(Boolean);
	if (!translated.length) return "neutral palette";
	if (translated.length === 1) return translated[0];
	return `${translated[0]} + ${translated[1]}`;
}

export function getDescription(name: string, id: number): string {
	const usage = usages[(id * 3 + 1) % usages.length];
	const type = getTypeLabel(name);
	const palette = getPalette(name);

	return clamp(`${type} with ${palette} palette, optimized ${usage}.`, "for modern UI");
}

export function getLastUpdatedLabel(lastUpdatedInput: string): string {
	const lastUpdated = new Date(lastUpdatedInput);
	const enParts = new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	}).formatToParts(lastUpdated);
	const enGet = (type: string) => enParts.find((part) => part.type === type)?.value ?? "";
	return `${enGet("month")} ${enGet("day")}, ${enGet("year")} - ${enGet("hour")}:${enGet("minute")} ${enGet("dayPeriod")}`;
}
