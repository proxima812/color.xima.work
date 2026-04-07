import type { CollectionEntry } from "astro:content";
import type { Locale } from "../i18n";
import { getDescription } from "./descriptions";
import { getCardTags, type TagId } from "./tags";

export interface ColorCardItem {
	id: number;
	name: string;
	lowerName: string;
	className: string;
	tags: TagId[];
	description: string;
}

export function buildColorCards(locale: Locale, entries: CollectionEntry<"colors">[]): ColorCardItem[] {
	return [...entries]
		.sort((a, b) => a.data.index - b.data.index)
		.map((entry) => ({
			id: entry.data.index,
			name: entry.data.name,
			lowerName: entry.data.name.toLowerCase(),
			className: entry.data.className,
			tags: getCardTags(entry.data.name),
			description: getDescription(locale, entry.data.name, entry.data.index),
		}));
}
