export const FAVORITES_KEY = "xima:favorites";
export const FAVORITES_EVENT = "xima:favorites-changed";

export interface FavoritesChangedDetail {
	slug: string;
	favorited: boolean;
}

/** Reads the favorite slug list from localStorage. Returns `[]` on any error (private mode, corrupt JSON, etc). */
export function getFavoriteSlugs(): string[] {
	try {
		const raw = localStorage.getItem(FAVORITES_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed.filter((value): value is string => typeof value === "string");
	} catch {
		return [];
	}
}

function setFavoriteSlugs(slugs: string[]): void {
	try {
		localStorage.setItem(FAVORITES_KEY, JSON.stringify(slugs));
	} catch {}
}

export function isFavorite(slug: string): boolean {
	return getFavoriteSlugs().includes(slug);
}

/** Flips membership of `slug`, persists it, dispatches `FAVORITES_EVENT` on `window`, and returns the new state. */
export function toggleFavorite(slug: string): boolean {
	const current = getFavoriteSlugs();
	const index = current.indexOf(slug);
	const favorited = index === -1;

	if (favorited) {
		current.push(slug);
	} else {
		current.splice(index, 1);
	}
	setFavoriteSlugs(current);

	window.dispatchEvent(
		new CustomEvent<FavoritesChangedDetail>(FAVORITES_EVENT, { detail: { slug, favorited } }),
	);

	return favorited;
}
