/**
 * Device capability probing and the visual-effects preference store.
 *
 * Both are browser state that lives outside React, so they are exposed through
 * subscribe/getSnapshot pairs and read with `useSyncExternalStore`. That keeps
 * the values out of component state entirely — no effects mirroring platform
 * APIs, no cascading renders on mount.
 */

export type QualityTier = "high" | "medium" | "low";

const STORAGE_KEY = "se-portfolio-effects-v2";

/* ── WebGL probe ─────────────────────────────────────────────────────────── */

let webglCache: boolean | null = null;

/**
 * Detects whether a WebGL context can actually be created.
 *
 * The canvas is detached and the context released immediately. This is
 * capability detection, not fingerprinting: the only thing read is whether the
 * call succeeded.
 */
export function hasWebgl(): boolean {
  if (webglCache !== null) return webglCache;
  if (typeof document === "undefined") return false;

  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ??
      canvas.getContext("webgl") ??
      canvas.getContext("experimental-webgl");

    if (!gl) {
      webglCache = false;
      return false;
    }

    // Release the context so the probe never occupies a GPU slot.
    const lose = (gl as WebGLRenderingContext).getExtension("WEBGL_lose_context");
    lose?.loseContext();
    webglCache = true;
    return true;
  } catch {
    webglCache = false;
    return false;
  }
}

/* ── Quality tier ────────────────────────────────────────────────────────── */

let tierCache: QualityTier | null = null;

/**
 * Conservative tier estimate from coarse, widely available signals.
 * When a signal is missing or ambiguous it steps down rather than up.
 */
export function detectTier(): QualityTier {
  if (tierCache !== null) return tierCache;
  if (typeof window === "undefined") return "low";

  if (!hasWebgl()) {
    tierCache = "low";
    return tierCache;
  }

  const cores = navigator.hardwareConcurrency ?? 4;
  // `deviceMemory` is Chromium-only; treat its absence as "unknown, assume ok".
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.matchMedia("(max-width: 640px)").matches;

  if (cores <= 4 || memory <= 4) tierCache = "low";
  else if (narrow || coarsePointer || cores <= 6) tierCache = "medium";
  else tierCache = "high";

  return tierCache;
}

/* ── Effects preference store ────────────────────────────────────────────── */

const listeners = new Set<() => void>();

/** Undefined until the first read, so the stored value is only loaded once. */
let effectsEnabled: boolean | undefined;

function readStoredPreference(): boolean {
  try {
    return true;
  } catch {
    // Private mode or blocked storage — default to the full experience.
    return true;
  }
}

export function subscribeEffects(onChange: () => void): () => void {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

export function getEffectsSnapshot(): boolean {
  if (effectsEnabled === undefined) effectsEnabled = readStoredPreference();
  return effectsEnabled;
}

/** Server render always assumes effects on; the client corrects on hydration. */
export function getEffectsServerSnapshot(): boolean {
  return true;
}

export function toggleEffects(): void {
  effectsEnabled = !getEffectsSnapshot();

  try {
    window.localStorage.setItem(STORAGE_KEY, effectsEnabled ? "on" : "off");
  } catch {
    // Ignore storage failures; the choice still applies for this session.
  }

  for (const listener of listeners) listener();
}

/* ── Reduced motion ──────────────────────────────────────────────────────── */

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function subscribeReducedMotion(onChange: () => void): () => void {
  const media = window.matchMedia(REDUCED_MOTION_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

export function getReducedMotionSnapshot(): boolean {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}
