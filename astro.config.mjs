import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

export default defineConfig({
	site: "https://color.xima.work",
	prefetch: {
		defaultStrategy: "load",
	},
	integrations: [sitemap(), icon()],
	vite: {
		plugins: [tailwindcss()],
	},
	output: "static",
});
