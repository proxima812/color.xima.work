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

export function getDailyPath(): string {
	return normalizePath("/daily/");
}

export function getRandomPath(): string {
	return normalizePath("/random/");
}
