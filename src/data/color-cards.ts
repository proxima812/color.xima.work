import type { CollectionEntry } from "astro:content";
import { getDescription } from "./descriptions";
import { getCardTags, type TagId } from "./tags";

export interface ColorCardItem {
	id: number;
	slug: string;
	name: string;
	lowerName: string;
	className: string;
	tags: TagId[];
	description: string;
}

export function buildColorCards(entries: CollectionEntry<"colors">[]): ColorCardItem[] {
	return [...entries]
		.sort((a, b) => a.data.index - b.data.index)
		.map((entry) => ({
			id: entry.data.index,
			slug: entry.data.name,
			name: entry.data.name,
			lowerName: entry.data.name.toLowerCase(),
			className: entry.data.className,
			tags: getCardTags(entry.data.name),
			description: getDescription(entry.data.name, entry.data.index),
		}));
}
