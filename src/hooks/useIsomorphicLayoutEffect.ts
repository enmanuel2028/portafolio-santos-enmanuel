import { useEffect, useLayoutEffect } from "react";

/**
 * `useLayoutEffect` on the client, `useEffect` during SSR.
 * Prevents React's layout-effect warning while keeping GSAP setup synchronous
 * before paint, which is what avoids a flash of un-animated content.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
