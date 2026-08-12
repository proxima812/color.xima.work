export interface Pick {
	slug: string;
	title: string;
	description: string;
	classNames: string[];
}

/**
 * Hand-curated collections, grouped by real-world use case rather than by CSS
 * technique. Unlike `tags.ts` (mechanical, derived from name prefixes), this
 * list is an editorial judgment call — safe to hand-edit, reorder, or extend.
 * Every `className` must exist in `src/data/colors.json`.
 */
export const picks: Pick[] = [
	{
		slug: "hero-backgrounds",
		title: "Hero backgrounds",
		description: "Bold, saturated glows built to fill a full-bleed hero section and hold attention.",
		classNames: [
			"radial-glow-aurora-cyan",
			"radial-glow-violet-pulse",
			"radial-glow-ember-rose",
			"radial-glow-fuchsia-nova",
			"radial-glow-sunset-lava",
			"radial-glow-cobalt-beam",
			"radial-glow-mint-plasma",
			"radial-glow-orchid-flash",
			"radial-glow-nebula-orchid",
			"radial-glow-galactic-berry",
			"radial-glow-zenith-gold",
			"radial-glow-comet-cyan",
		],
	},
	{
		slug: "card-panel-accents",
		title: "Card & panel accents",
		description: "Quiet glass tints with an inset highlight — built to sit behind text, not compete with it.",
		classNames: [
			"radial-border-mist-silver",
			"radial-border-frost-blue",
			"radial-border-velvet-lilac",
			"radial-border-mint-glass",
			"radial-border-peach-cream",
			"radial-border-rose-quartz",
			"radial-border-amber-haze",
			"radial-border-sky-pearl",
			"radial-border-slate-smoke",
			"radial-border-plum-ice",
		],
	},
	{
		slug: "buttons-badges",
		title: "Buttons & badges",
		description: "Simple two- and three-stop linear sweeps that stay punchy and legible at small sizes.",
		classNames: [
			"radial-linear-aurora-path",
			"radial-linear-coral-breeze",
			"radial-linear-mint-slide",
			"radial-linear-indigo-rise",
			"radial-linear-sunset-tilt",
			"radial-linear-lime-drift",
			"radial-linear-cobalt-wash",
			"radial-linear-rose-beam",
			"radial-linear-arctic-glow",
			"radial-linear-amber-rush",
			"radial-linear-skyline-flare",
			"radial-linear-coral-tide",
			"radial-linear-prism-trail",
			"radial-linear-mint-horizon",
		],
	},
	{
		slug: "dark-ui",
		title: "Dark UI",
		description: "The catalog's genuinely dark, low-key gradients — the few that read clean against a near-black shell.",
		classNames: [
			"radial-glass-dark",
			"radial-mesh-midnight-plasma",
			"radial-glow-plasma-orbit",
			"radial-glow-cosmos-velvet",
			"radial-glow-eclipse-plum",
			"radial-glow-deep-space-teal",
			"radial-masc-iron-moss",
			"radial-masc-night-amber",
			"radial-masc-gunmetal-rain",
			"radial-masc-navy-signal",
			"radial-masc-radar-blue",
			"radial-masc-carbon-steel",
		],
	},
	{
		slug: "soft-pastel",
		title: "Soft & pastel",
		description: "Muted, blurred glass tones for editorial layouts that want gentleness over saturation.",
		classNames: [
			"radial-neutral-soft",
			"radial-cool-milk",
			"radial-blue-haze",
			"radial-violet-mist",
			"radial-green-fog",
			"radial-glass-soft",
			"radial-dawn-mint",
			"radial-aurora-lav",
			"radial-citrus-calm",
			"radial-nebula-blush",
			"radial-cosmic-teal",
			"radial-rose-gold",
			"radial-hero-elegant",
		],
	},
];
