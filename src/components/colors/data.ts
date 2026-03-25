import type { Locale } from "../../i18n";
import { colors } from "./constants";
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

export function buildColorCards(locale: Locale): ColorCardItem[] {
	return colors.map((name, id) => ({
		id,
		name,
		lowerName: name.toLowerCase(),
		className: `radial-${name}`,
		tags: getCardTags(name),
		description: getDescription(locale, name, id),
	}));
}
