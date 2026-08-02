import type { Locale } from "@/types/content";

export const locales = ["es", "en"] as const;
export const defaultLocale: Locale = "es";

export const localeNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
};

/** Short label used inside the compact locale switcher. */
export const localeShortNames: Record<Locale, string> = {
  es: "ES",
  en: "EN",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export type { Locale };
