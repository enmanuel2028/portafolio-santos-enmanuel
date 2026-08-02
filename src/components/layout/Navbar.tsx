"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import type { Locale } from "@/types/content";
import type { Dictionary } from "@/i18n/dictionary";
import { buildNavItems, sectionIds } from "@/lib/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import { duration, ease } from "@/lib/motion-tokens";
import { Monogram } from "@/components/ui/Monogram";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { EffectsToggle } from "@/components/layout/EffectsToggle";

interface NavbarProps {
  locale: Locale;
  dict: Dictionary;
  /** Scroll spy only makes sense on the single-page home route. */
  spy?: boolean;
}

export function Navbar({ locale, dict, spy = true }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(sectionIds, spy);
  const items = buildNavItems(locale, dict);

  // Solidify the bar once the hero starts leaving.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock background scroll while the mobile sheet is open.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  // Escape closes the sheet.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-[var(--color-line)] bg-[var(--color-void)]/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
      style={{ height: "var(--nav-height)" }}
    >
      <nav
        aria-label={dict.nav.home}
        className="container-page flex h-full items-center justify-between gap-4"
      >
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2.5 text-[var(--color-ink)] transition-colors hover:text-[var(--color-electric)]"
        >
          <Monogram className="h-7 w-7" decorative={false} title="Santos Enmanuel" />
          <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.22em] text-[var(--color-muted)]">
            SE
          </span>
        </Link>

        {/* ── Desktop navigation ─────────────────────────────────────────── */}
        <ul className="hidden items-center gap-1 lg:flex">
          {items.map((item) => {
            const isActive = spy && active === item.id;
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm transition-colors",
                    isActive
                      ? "text-[var(--color-ink)]"
                      : "text-[var(--color-muted)] hover:text-[var(--color-ink)]",
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full border border-[var(--color-line-strong)] bg-white/[0.04]"
                      transition={{ duration: duration.micro, ease: ease.inOut }}
                    />
                  ) : null}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <EffectsToggle dict={dict} />
          <LocaleSwitcher locale={locale} dict={dict} />

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label={dict.common.openMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-ink)] transition-colors hover:border-[var(--color-line-strong)] lg:hidden"
          >
            <Menu className="h-4.5 w-4.5" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* ── Mobile sheet ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen ? (
          <MobileMenu
            items={items}
            dict={dict}
            active={spy ? active : null}
            onClose={() => setMenuOpen(false)}
          />
        ) : null}
      </AnimatePresence>
    </header>
  );
}

interface MobileMenuProps {
  items: ReturnType<typeof buildNavItems>;
  dict: Dictionary;
  active: string | null;
  onClose: () => void;
}

function MobileMenu({ items, dict, active, onClose }: MobileMenuProps) {
  // Move focus into the sheet and keep Tab cycling inside it.
  useEffect(() => {
    const panel = document.getElementById("mobile-menu");
    if (!panel) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusables = panel.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    focusables[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    panel.addEventListener("keydown", onKeyDown);
    return () => {
      panel.removeEventListener("keydown", onKeyDown);
      // Restore focus to whatever opened the menu.
      previouslyFocused?.focus();
    };
  }, []);

  return (
    <motion.div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label={dict.common.menu}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: duration.micro, ease: ease.out }}
      className="fixed inset-0 z-50 bg-[var(--color-void)]/97 backdrop-blur-xl lg:hidden"
    >
      <div className="container-page flex items-center justify-between" style={{ height: "var(--nav-height)" }}>
        <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.22em] text-[var(--color-muted)]">
          SE
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label={dict.common.closeMenu}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-ink)]"
        >
          <X className="h-4.5 w-4.5" aria-hidden="true" />
        </button>
      </div>

      <nav aria-label={dict.common.menu} className="container-page pt-8">
        <ul className="flex flex-col">
          {items.map((item, index) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * index, duration: duration.micro, ease: ease.out }}
              className="border-b border-[var(--color-line)]"
            >
              <Link
                href={item.href}
                onClick={onClose}
                aria-current={active === item.id ? "true" : undefined}
                className={cn(
                  "flex items-baseline gap-4 py-5 text-2xl transition-colors",
                  active === item.id
                    ? "text-[var(--color-electric)]"
                    : "text-[var(--color-ink)] hover:text-[var(--color-electric)]",
                )}
              >
                <span className="font-[family-name:var(--font-mono)] text-[0.7rem] text-[var(--color-faint)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.label}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
}
