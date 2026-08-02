"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import type { Locale } from "@/types/content";
import type { Dictionary } from "@/i18n/dictionary";
import { locales, localeShortNames } from "@/i18n/config";
import { cn } from "@/lib/utils";

interface LocaleSwitcherProps {
  locale: Locale;
  dict: Dictionary;
}

/**
 * Swaps the locale segment of the current path, preserving the rest of the
 * route and the hash — so switching language keeps you on the same section.
 */
export function LocaleSwitcher({ locale, dict }: LocaleSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = useCallback(
    (next: Locale) => {
      if (next === locale) return;

      const segments = (pathname ?? `/${locale}`).split("/");
      // segments[0] is the empty string before the leading slash.
      segments[1] = next;
      const hash = typeof window !== "undefined" ? window.location.hash : "";
      router.push(`${segments.join("/")}${hash}`);
    },
    [locale, pathname, router],
  );

  return (
    <div
      role="group"
      aria-label={dict.common.changeLanguage}
      className="flex items-center rounded-full border border-[var(--color-line)] p-0.5"
    >
      {locales.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => switchTo(code)}
            aria-current={active ? "true" : undefined}
            lang={code}
            className={cn(
              "rounded-full px-2.5 py-1.5 font-[family-name:var(--font-mono)] text-[0.65rem] tracking-[0.12em] transition-colors",
              active
                ? "bg-white/[0.08] text-[var(--color-ink)]"
                : "text-[var(--color-faint)] hover:text-[var(--color-ink)]",
            )}
          >
            {localeShortNames[code]}
          </button>
        );
      })}
    </div>
  );
}
