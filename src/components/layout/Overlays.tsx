"use client";

import { useExperience } from "@/components/providers/ExperienceProvider";

/**
 * Film grain and vignette. Purely decorative, non-interactive, and dropped
 * entirely below the "high" tier so weak hardware never pays for them.
 */
export function Overlays() {
  const { tier, motionEnabled } = useExperience();
  if (!motionEnabled || tier !== "high") return null;

  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />
      <div className="vignette-overlay" aria-hidden="true" />
    </>
  );
}
