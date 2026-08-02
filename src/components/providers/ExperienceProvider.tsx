"use client";

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import {
  detectTier,
  getEffectsServerSnapshot,
  getEffectsSnapshot,
  getReducedMotionSnapshot,
  hasWebgl,
  subscribeEffects,
  subscribeReducedMotion,
  toggleEffects,
  type QualityTier,
} from "@/lib/capabilities";

export type { QualityTier };

interface ExperienceValue {
  /** Effective tier after preferences and capability detection. */
  tier: QualityTier;
  /** False when reduced motion is requested or effects are switched off. */
  motionEnabled: boolean;
  /** OS-level `prefers-reduced-motion`. Cannot be overridden upward. */
  prefersReducedMotion: boolean;
  /** The visitor's explicit on-page choice, persisted across visits. */
  effectsEnabled: boolean;
  toggleEffects: () => void;
  /** A WebGL context could actually be created. */
  webglAvailable: boolean;
  /** True once mounted, so nothing heavy renders during hydration. */
  ready: boolean;
}

const ExperienceContext = createContext<ExperienceValue | null>(null);

/** Capability probes are one-shot reads; there is nothing to subscribe to. */
const noopSubscribe = () => () => {};

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const effectsEnabled = useSyncExternalStore(
    subscribeEffects,
    getEffectsSnapshot,
    getEffectsServerSnapshot,
  );

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );

  const webglAvailable = useSyncExternalStore(noopSubscribe, hasWebgl, () => false);
  const detectedTier = useSyncExternalStore(noopSubscribe, detectTier, (): QualityTier => "low");

  // Hydration gate: `false` in the server snapshot, `true` on the client, so
  // the expensive scene only mounts after hydration and React never has to
  // reconcile a canvas the server did not produce.
  const ready = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  // This portfolio defaults to its full visual experience. Visitors can still
  // disable it explicitly with the on-page effects toggle.
  const motionEnabled = effectsEnabled;
  const tier: QualityTier = motionEnabled ? detectedTier : "low";

  // Expose state to CSS so decorative layers can opt out without JavaScript.
  useEffect(() => {
    const root = document.documentElement;
    root.dataset["motion"] = motionEnabled ? "full" : "reduced";
    root.dataset["quality"] = tier;
  }, [motionEnabled, tier]);

  const value = useMemo<ExperienceValue>(
    () => ({
      tier,
      motionEnabled,
      prefersReducedMotion,
      effectsEnabled,
      toggleEffects,
      webglAvailable,
      ready,
    }),
    [tier, motionEnabled, prefersReducedMotion, effectsEnabled, webglAvailable, ready],
  );

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>;
}

export function useExperience(): ExperienceValue {
  const context = useContext(ExperienceContext);
  if (!context) {
    throw new Error("useExperience must be used inside <ExperienceProvider>.");
  }
  return context;
}
