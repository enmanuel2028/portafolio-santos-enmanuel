"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { usePageVisible } from "@/hooks/usePageVisible";
import { HeroFallback } from "@/components/three/HeroFallback";

/**
 * Loads the WebGL scene only on the client, only after the critical content is
 * on screen, and only when the device can actually run it.
 *
 * `ssr: false` keeps three.js out of the server bundle and off the critical
 * path; the fallback renders immediately so the hero is never empty.
 */
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => <HeroFallback />,
});

export function HeroCanvas({ label }: { label: string }) {
  const { tier, webglAvailable, ready, motionEnabled } = useExperience();
  const visible = usePageVisible();

  // Before detection finishes, and on every path that cannot support WebGL,
  // the CSS composition stands in — no canvas is ever created.
  if (!ready || !webglAvailable || !motionEnabled || tier === "low") {
    return <HeroFallback />;
  }

  return (
    <div
      className="absolute inset-0"
      role="img"
      aria-label={label}
      // The canvas is decorative depth; pointer events belong to the content.
      style={{ pointerEvents: "none" }}
    >
      <Suspense fallback={<HeroFallback />}>
        <HeroScene tier={tier} paused={!visible} />
      </Suspense>
    </div>
  );
}
