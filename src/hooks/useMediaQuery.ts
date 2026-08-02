"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribes to a media query.
 *
 * Implemented with `useSyncExternalStore` rather than state-in-effect: the
 * match is external browser state, so React reads it directly instead of
 * mirroring it into a second source of truth (which caused a cascading render).
 * The server snapshot is `false`, so markup matches on first paint.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
