import type { Locale } from "../i18n";
import { getLocalePath as buildLocalePath } from "../config/site";

export interface LocaleOption {
	code: Locale;
	label: string;
}

export const localeOptions: readonly LocaleOption[] = [
	{ code: "en", label: "English" },
	{ code: "ru", label: "Русский" },
	{ code: "tt", label: "Татарча" },
];

export function getLocalePath(nextLocale: Locale): string {
	return buildLocalePath(nextLocale);
}
