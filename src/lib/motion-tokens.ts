/**
 * Motion tokens — the single vocabulary shared by GSAP and Motion.
 *
 * Durations are expressed in seconds because both libraries take seconds.
 * See ANIMATION_SYSTEM.md for which library owns which kind of movement.
 */

export const duration = {
  /** Hover / press feedback. */
  hover: 0.2,
  /** Small state changes: toggles, chips, indicators. */
  micro: 0.32,
  /** Element entrances inside a section. */
  enter: 0.7,
  /** Section-level transitions and large reveals. */
  section: 1.1,
} as const;

export const ease = {
  /** Default entrance: fast start, long settle. */
  out: [0.16, 1, 0.3, 1] as const,
  /** Symmetric transitions (layout, presence). */
  inOut: [0.76, 0, 0.24, 1] as const,
  /** Gentler variant for large surfaces. */
  soft: [0.22, 0.61, 0.36, 1] as const,
} as const;

/** GSAP consumes easing as strings. */
export const gsapEase = {
  out: "expo.out",
  inOut: "power4.inOut",
  soft: "power2.out",
} as const;

export const stagger = {
  tight: 0.04,
  normal: 0.08,
  loose: 0.14,
} as const;

/**
 * Shared `whileInView` viewport config.
 *
 * Entrance variants are built per-component rather than shared, because each
 * one must collapse to a plain fade when `motionEnabled` is false.
 */
export const viewportOnce = { once: true, amount: 0.25 } as const;
