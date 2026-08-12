export const SITE_URL = (import.meta.env.PUBLIC_SITE_URL || "https://color.xima.work").replace(
	/\/$/,
	"",
);

export const LAST_UPDATED_ISO = "2026-02-16T02:02:00";

export function normalizePath(path: string): string {
	const normalizedPath = path.startsWith("/") ? path : `/${path}`;
	return normalizedPath;
}

export function getGradientPath(slug: string): string {
	return normalizePath(`/gradient/${slug}/`);
}

export function getCollectionPath(tag: string): string {
	return normalizePath(`/collection/${tag}/`);
}

export function getCardsPath(): string {
	return normalizePath("/cards/");
}

export function getGeneratorPath(): string {
	return normalizePath("/generator/");
}

export function getGeneratorPresetsPath(): string {
	return normalizePath("/generator/presets/");
}

export function getGeneratorMeshPath(): string {
	return normalizePath("/generator/mesh/");
}

export function getGeneratorInstagramPath(): string {
	return normalizePath("/generator/instagram/");
}

export function getDailyPath(): string {
	return normalizePath("/daily/");
}

export function getRandomPath(): string {
	return normalizePath("/random/");
}

export function getFavoritesPath(): string {
	return normalizePath("/favorites/");
}

export function getPicksPath(): string {
	return normalizePath("/picks/");
}

export function getPickPath(slug: string): string {
	return normalizePath(`/picks/${slug}/`);
}
