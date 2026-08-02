import type { L, Locale } from "@/types/content";

/**
 * Unwraps a bilingual value for the active locale.
 *
 * Components normally index directly (`value[locale]`), which is clearer and
 * equally type-safe. This helper exists for the cases where the locale is
 * applied generically — e.g. mapping a list of `L<string>` through a single
 * accessor.
 */
export function t<T>(value: L<T>, locale: Locale): T {
  return value[locale];
}

/** Unwraps every entry of a list of localized values. */
export function tAll<T>(values: readonly L<T>[], locale: Locale): T[] {
  return values.map((value) => t(value, locale));
}
