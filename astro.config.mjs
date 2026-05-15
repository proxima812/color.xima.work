import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

export default defineConfig({
	site: "https://color.xima.work",
	prefetch: {
		defaultStrategy: "load",
	},
	i18n: {
		locales: ["en", "ru", "tt"],
		defaultLocale: "en",
		routing: {
			prefixDefaultLocale: false,
		},
	},
	integrations: [sitemap(), icon()],
	vite: {
		plugins: [tailwindcss()],
	},
	adapter: vercel(),
	output: "static",
});
