"use client";

import { Sparkles } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionary";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { cn } from "@/lib/utils";

/**
 * Lets any visitor switch the decorative layer off — 3D scene, overlays and
 * long scroll journeys — independently of their OS motion preference.
 */
export function EffectsToggle({ dict }: { dict: Dictionary }) {
  const { effectsEnabled, toggleEffects, prefersReducedMotion } = useExperience();

  // With reduced motion at OS level the toggle cannot re-enable effects,
  // so it is presented as disabled rather than silently doing nothing.
  const locked = prefersReducedMotion;

  return (
    <button
      type="button"
      onClick={toggleEffects}
      disabled={locked}
      aria-pressed={effectsEnabled && !locked}
      title={locked ? dict.motion.reducedNotice : undefined}
      aria-label={effectsEnabled ? dict.motion.disable : dict.motion.enable}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
        locked
          ? "cursor-not-allowed border-[var(--color-line)] text-[var(--color-faint)] opacity-60"
          : effectsEnabled
            ? "border-[var(--color-line-strong)] text-[var(--color-electric)] hover:bg-white/[0.05]"
            : "border-[var(--color-line)] text-[var(--color-faint)] hover:text-[var(--color-ink)]",
      )}
    >
      <Sparkles
        className={cn("h-4 w-4", effectsEnabled && !locked ? "" : "opacity-50")}
        aria-hidden="true"
      />
    </button>
  );
}
