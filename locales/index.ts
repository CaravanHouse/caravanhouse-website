import ru from "./ru";
import uz from "./uz";
import en from "./en";

export type Dictionary = typeof ru;

export const locales = ["ru", "uz", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ru";

// BCP 47-теги для <html lang>, hreflang и Open Graph.
export const localeMeta: Record<Locale, { htmlLang: string; ogLocale: string; label: string }> = {
  ru: { htmlLang: "ru", ogLocale: "ru_RU", label: "RU" },
  uz: { htmlLang: "uz-Latn", ogLocale: "uz_UZ", label: "UZ" },
  en: { htmlLang: "en", ogLocale: "en_US", label: "EN" },
};

const dictionaries: Record<Locale, Dictionary> = { ru, uz, en };

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];
