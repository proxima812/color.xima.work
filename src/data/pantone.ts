/**
 * Pantone Color of the Year, 2000 to present.
 *
 * Pantone picks for physical inks and textiles, so every hex here is the widely
 * published sRGB approximation of the TCX chip, not an exact conversion — two
 * sources can disagree by a point or two. Codes are Pantone's own TCX numbers.
 *
 * Two years shipped a pair rather than a single colour (2016 and 2021); those
 * carry a `second` entry and render as a split swatch.
 */

export interface PantoneYear {
	year: number;
	name: string;
	code: string;
	hex: string;
	/** Set only for the two years Pantone named a pair. */
	second?: { name: string; code: string; hex: string };
	note: string;
}

export const pantoneYears: PantoneYear[] = [
	{ year: 2026, name: "Cloud Dancer", code: "11-4201", hex: "#F0EEE9", note: "A quiet, near-white chosen as a reset — space to breathe after a decade of loud picks." },
	{ year: 2025, name: "Mocha Mousse", code: "17-1230", hex: "#A47764", note: "Warm brown built on comfort and quiet indulgence rather than spectacle." },
	{ year: 2024, name: "Peach Fuzz", code: "13-1023", hex: "#FFBE98", note: "Soft peach positioned as a gesture of tenderness and togetherness." },
	{ year: 2023, name: "Viva Magenta", code: "18-1750", hex: "#BB2649", note: "A crimson red rooted in cochineal, pitched as brave and boundless." },
	{ year: 2022, name: "Very Peri", code: "17-3938", hex: "#6667AB", note: "The first colour Pantone invented outright — periwinkle blue with violet-red." },
	{ year: 2021, name: "Ultimate Gray", code: "17-5104", hex: "#939597", second: { name: "Illuminating", code: "13-0647", hex: "#F5DF4D" }, note: "A pairing: solid, dependable grey lifted by an optimistic yellow." },
	{ year: 2020, name: "Classic Blue", code: "19-4052", hex: "#0F4C81", note: "A dependable, boundless blue offered as a stable anchor for a new decade." },
	{ year: 2019, name: "Living Coral", code: "16-1546", hex: "#FF6F61", note: "Golden-undertoned coral, a nod to the reefs and to warmth in digital life." },
	{ year: 2018, name: "Ultra Violet", code: "18-3838", hex: "#5F4B8B", note: "A dramatic blue-purple tied to originality, ingenuity and the cosmos." },
	{ year: 2017, name: "Greenery", code: "15-0343", hex: "#88B04B", note: "Fresh yellow-green signalling new beginnings and a reconnection with nature." },
	{ year: 2016, name: "Rose Quartz", code: "13-1520", hex: "#F7CAC9", second: { name: "Serenity", code: "15-3919", hex: "#92A8D1" }, note: "The first pairing: a warm rose and a cool blue, deliberately blurring gender lines." },
	{ year: 2015, name: "Marsala", code: "18-1438", hex: "#955251", note: "A robust, earthy wine red named after the fortified Sicilian wine." },
	{ year: 2014, name: "Radiant Orchid", code: "18-3224", hex: "#B163A3", note: "An enchanting purple-pink with fuchsia and mauve undertones." },
	{ year: 2013, name: "Emerald", code: "17-5641", hex: "#009473", note: "A lively, radiant green long associated with beauty and renewal." },
	{ year: 2012, name: "Tangerine Tango", code: "17-1463", hex: "#DD4124", note: "A spirited red-orange chosen to provide energy after a difficult year." },
	{ year: 2011, name: "Honeysuckle", code: "18-2120", hex: "#D94F70", note: "A courageous, confident pink meant to lift spirits and raise the pulse." },
	{ year: 2010, name: "Turquoise", code: "15-5519", hex: "#45B5AA", note: "A serene blue-green evoking tropical water and a mental escape." },
	{ year: 2009, name: "Mimosa", code: "14-0848", hex: "#F0C05A", note: "A warm, optimistic yellow selected in the depths of the financial crisis." },
	{ year: 2008, name: "Blue Iris", code: "18-3943", hex: "#5A5B9F", note: "Blue-based purple, blending the stability of blue with the mystique of purple." },
	{ year: 2007, name: "Chili Pepper", code: "19-1557", hex: "#9B1B30", note: "A deep spicy red conveying an outgoing, adventurous confidence." },
	{ year: 2006, name: "Sand Dollar", code: "13-1106", hex: "#DECDBE", note: "A quiet neutral beige reflecting economic caution and a pull toward home." },
	{ year: 2005, name: "Blue Turquoise", code: "15-5217", hex: "#53B0AE", note: "A calm, protective blue-green with an inviting, tranquil quality." },
	{ year: 2004, name: "Tigerlily", code: "17-1456", hex: "#E2583E", note: "An assertive, exuberant orange-red with plenty of dramatic heat." },
	{ year: 2003, name: "Aqua Sky", code: "14-4811", hex: "#7BC4C4", note: "A cool, refreshing aqua suggesting calm waters and a clean slate." },
	{ year: 2002, name: "True Red", code: "19-1664", hex: "#BF1932", note: "A patriotic, unambiguous red picked in the wake of a sombre year." },
	{ year: 2001, name: "Fuchsia Rose", code: "17-2031", hex: "#C74375", note: "A rich, feminine pink-red that reads as both dramatic and warm." },
	{ year: 2000, name: "Cerulean", code: "15-4020", hex: "#9BB7D4", note: "The very first pick: the calm blue of a clear sky, chosen for the millennium." },
];

/* ------------------------------------------------------------------ */
/* Derived values. Computed at build time so the page ships flat CSS.  */
/* ------------------------------------------------------------------ */

function toRgb(hex: string): [number, number, number] {
	const value = hex.replace("#", "");
	return [
		Number.parseInt(value.slice(0, 2), 16),
		Number.parseInt(value.slice(2, 4), 16),
		Number.parseInt(value.slice(4, 6), 16),
	];
}

function toHex(rgb: [number, number, number]): string {
	return `#${rgb.map((channel) => Math.round(Math.min(255, Math.max(0, channel))).toString(16).padStart(2, "0")).join("")}`;
}

/** Mix toward white. `amount` 0 keeps the colour, 1 returns white. */
export function tint(hex: string, amount: number): string {
	const [r, g, b] = toRgb(hex);
	return toHex([r + (255 - r) * amount, g + (255 - g) * amount, b + (255 - b) * amount]);
}

/** Mix toward black. `amount` 0 keeps the colour, 1 returns black. */
export function shade(hex: string, amount: number): string {
	const [r, g, b] = toRgb(hex);
	return toHex([r * (1 - amount), g * (1 - amount), b * (1 - amount)]);
}

/** WCAG relative luminance, used to decide whether a swatch needs light or dark text. */
export function luminance(hex: string): number {
	const channels = toRgb(hex).map((channel) => {
		const c = channel / 255;
		return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
	});
	return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

export function isLight(hex: string): boolean {
	return luminance(hex) > 0.45;
}

export const INK_DARK = "#18181b";
export const INK_LIGHT = "#fafafa";

function contrast(a: string, b: string): number {
	const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
	return (hi + 0.05) / (lo + 0.05);
}

/**
 * Whichever of the two ink tones actually contrasts better against `hex`.
 * A fixed lightness threshold gets mid-tones like Ultimate Gray (#939597)
 * wrong — it reads as "dark" but takes black text far better than white.
 */
export function bestInk(hex: string): string {
	return contrast(hex, INK_DARK) >= contrast(hex, INK_LIGHT) ? INK_DARK : INK_LIGHT;
}

/** Muted variant of {@link bestInk}, for secondary text on a swatch. */
export function bestInkMuted(hex: string): string {
	return bestInk(hex) === INK_DARK ? "rgba(24,24,27,0.66)" : "rgba(250,250,250,0.72)";
}

export function rgbLabel(hex: string): string {
	return toRgb(hex).join(", ");
}

/**
 * A three-stop sweep derived from the chip: a tint to catch the light, the
 * chip itself, then a shade. Same construction for every year so the timeline
 * reads as one system and the only variable is Pantone's colour.
 */
export function yearGradient(entry: PantoneYear): string {
	const end = entry.second ? entry.second.hex : shade(entry.hex, 0.3);
	return `linear-gradient(148deg, ${tint(entry.hex, 0.62)} 0%, ${entry.hex} 52%, ${end} 100%)`;
}

/** Tailwind v4 arbitrary-value form of {@link yearGradient}. */
export function yearGradientTailwind(entry: PantoneYear): string {
	return `bg-[${yearGradient(entry).replace(/,\s/g, ",").replace(/\s/g, "_")}]`;
}

export const currentPantone = pantoneYears[0];
