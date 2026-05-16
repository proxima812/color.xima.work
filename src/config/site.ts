export const SITE_URL = (import.meta.env.PUBLIC_SITE_URL || "https://color.xima.work").replace(
	/\/$/,
	"",
);

export const LAST_UPDATED_ISO = "2026-02-16T02:02:00";

export function getLocalizedPath(path: string): string {
	const normalizedPath = path.startsWith("/") ? path : `/${path}`;
	return normalizedPath;
}

export function getGradientPath(slug: string): string {
	return getLocalizedPath(`/gradient/${slug}/`);
}

export function getCollectionPath(tag: string): string {
	return getLocalizedPath(`/collection/${tag}/`);
}

export function getCardsPath(): string {
	return getLocalizedPath("/cards/");
}

export function getGeneratorPath(): string {
	return getLocalizedPath("/generator/");
}

export function getDailyPath(): string {
	return getLocalizedPath("/daily/");
}

export function getRandomPath(): string {
	return getLocalizedPath("/random/");
}
