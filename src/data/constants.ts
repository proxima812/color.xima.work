import type { Locale } from "../i18n";

export const localeOptions: { code: Locale; label: string }[] = [
	{ code: "en", label: "English" },
	{ code: "tt", label: "Татарча" },
	{ code: "zh", label: "中文" },
	{ code: "kk", label: "Қазақша" },
	{ code: "es", label: "Español" },
	{ code: "ru", label: "Русский" },
	{ code: "uk", label: "Українська" },
];

export function getLocalePath(nextLocale: Locale) {
	return `/${nextLocale}/`;
}
