import en from "./locales/en";
import ru from "./locales/ru";
import tt from "./locales/tt";
import type { TranslationDictionary } from "./locales/en";

export type Locale = "en" | "ru" | "tt";
export type TranslationKey = keyof TranslationDictionary;

const dictionaries: Record<Locale, TranslationDictionary> = {
  en,
  ru,
  tt,
};

export function isLocale(value: string): value is Locale {
  return value in dictionaries;
}

export function t(locale: Locale, key: TranslationKey): string {
  return dictionaries[locale][key] ?? dictionaries.en[key];
}
