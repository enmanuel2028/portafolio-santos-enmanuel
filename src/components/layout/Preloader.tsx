"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Dictionary } from "@/i18n/dictionary";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { Monogram } from "@/components/ui/Monogram";
import { duration, ease } from "@/lib/motion-tokens";

const SESSION_KEY = "se-portfolio-intro-shown";

/** Boot lines. Deliberately short — the whole intro stays under ~2.4s. */
const bootLines = [
  "init system.core",
  "load models/vision",
  "connect data.pipeline",
  "mount interface",
];

/**
 * Reads (and latches) whether the intro has already played this session.
 * Called during render as a lazy initialiser, never as an effect.
 */
function introAlreadyShown(): boolean {
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function markIntroShown(): void {
  try {
    window.sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    // Storage unavailable — the intro simply plays again next navigation.
  }
}

/**
 * One-per-session cinematic intro.
 *
 * Never blocks content: the page renders underneath and this overlay sits on
 * top, so an early skip or a slow frame still leaves a fully usable page.
 * Skipped entirely under reduced motion and on repeat visits.
 */
export function Preloader({ dict }: { dict: Dictionary }) {
  const { motionEnabled, ready } = useExperience();

  // Decided once, on mount, from session storage — not mirrored in an effect.
  const [shouldPlay] = useState(() => {
    if (typeof window === "undefined") return false;
    return !introAlreadyShown();
  });

  const [dismissed, setDismissed] = useState(false);
  const [line, setLine] = useState(0);

  const visible = ready && motionEnabled && shouldPlay && !dismissed;

  const dismiss = useCallback(() => {
    setDismissed(true);
    markIntroShown();
  }, []);

  // Advance the boot lines and close the overlay on schedule.
  useEffect(() => {
    if (!visible) return;

    const timers = bootLines.map((_, index) =>
      setTimeout(() => setLine(index + 1), 320 + index * 380),
    );
    timers.push(setTimeout(dismiss, 2300));

    return () => timers.forEach(clearTimeout);
  }, [visible, dismiss]);

  // Any key press skips the intro.
  useEffect(() => {
    if (!visible) return;
    const onKey = () => dismiss();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, dismiss]);

  // Prevent scrolling behind the overlay while it is up.
  useEffect(() => {
    if (!visible) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [visible]);

  // Repeat visits and reduced motion still need the session flag set.
  useEffect(() => {
    if (ready && !visible) markIntroShown();
  }, [ready, visible]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="preloader"
          role="status"
          aria-live="polite"
          aria-label={dict.preloader.boot}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: ease.inOut } }}
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-[var(--color-void)]"
        >
          <div
            className="bg-grid pointer-events-none absolute inset-0 opacity-[0.25]"
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: duration.enter, ease: ease.out }}
            className="relative flex flex-col items-center gap-6"
          >
            <Monogram className="h-14 w-14 text-[var(--color-electric)]" />

            <p className="font-[family-name:var(--font-display)] text-sm tracking-[0.4em] text-[var(--color-muted)] uppercase">
              {dict.preloader.tagline}
            </p>

            <ul className="flex min-h-24 w-64 flex-col gap-1.5" aria-hidden="true">
              {bootLines.slice(0, line).map((entry) => (
                <motion.li
                  key={entry}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.24, ease: ease.out }}
                  className="flex items-center gap-2 font-[family-name:var(--font-mono)] text-[0.7rem] text-[var(--color-faint)]"
                >
                  <span className="text-[var(--color-success)]">›</span>
                  {entry}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <button
            type="button"
            onClick={dismiss}
            className="absolute bottom-10 font-[family-name:var(--font-mono)] text-[0.7rem] tracking-[0.18em] text-[var(--color-faint)] uppercase transition-colors hover:text-[var(--color-ink)]"
          >
            {dict.preloader.skip}
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
