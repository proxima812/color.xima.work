import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { file } from "astro/loaders";

const colorsCollection = defineCollection({
	loader: file("src/data/colors.json"),
	schema: z.object({
		name: z.string(),
		index: z.number().int().nonnegative(),
		className: z.string(),
	}),
});

export const collections = {
	colors: colorsCollection,
};
