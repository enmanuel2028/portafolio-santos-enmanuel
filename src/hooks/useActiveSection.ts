"use client";

import { useEffect, useState } from "react";
import type { SectionId } from "@/lib/navigation";

/**
 * Scroll spy driven by IntersectionObserver.
 *
 * Uses a band across the upper-middle of the viewport rather than a single
 * line, so a section becomes "active" when it genuinely dominates the screen.
 * Cheaper and steadier than a scroll listener doing getBoundingClientRect.
 */
export function useActiveSection(ids: readonly SectionId[], enabled = true): SectionId | null {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    // Track ratios so the most visible section wins, not merely the last seen.
    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let best: SectionId | null = null;
        let bestRatio = 0;
        for (const id of ids) {
          const ratio = ratios.get(id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        }
        if (best) setActive(best);
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.15, 0.35, 0.6, 0.85],
      },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ids, enabled]);

  return active;
}
