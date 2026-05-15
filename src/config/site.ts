import type { Locale } from "../i18n";

export const SITE_URL = (import.meta.env.PUBLIC_SITE_URL || "https://color.xima.work").replace(
	/\/$/,
	"",
);

export const DEFAULT_LOCALE: Locale = "en";

export const SUPPORTED_LOCALES = ["en", "ru", "tt"] as const satisfies readonly Locale[];

export const LAST_UPDATED_ISO = "2026-02-16T02:02:00";

export function getLocalePath(locale: Locale): string {
	return locale === DEFAULT_LOCALE ? "/" : `/${locale}/`;
}
