"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Single GSAP registration point.
 *
 * Registering a plugin twice is harmless but registering it in several modules
 * makes it easy to forget one; every animated component imports from here.
 */
let registered = false;

if (typeof window !== "undefined" && !registered) {
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export { gsap, ScrollTrigger };
