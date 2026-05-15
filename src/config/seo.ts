interface SeoConfig {
	siteName: string;
	defaultTitle: string;
	defaultDescription: string;
	defaultOgImage: string;
	twitterCard: "summary_large_image";
}

export const SEO_CONFIG = {
	siteName: "color.xima",
	defaultTitle: "color.xima — gradients that vibe",
	defaultDescription:
		"Curated gradient collection for UI blocks, cards, hero sections, and modern interfaces.",
	defaultOgImage: "/og-default.jpg",
	twitterCard: "summary_large_image" as const,
} satisfies SeoConfig;
