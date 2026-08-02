import type { ClassValue } from "@/types/util";

/**
 * Minimal class name joiner.
 *
 * Deliberately not `clsx` + `tailwind-merge`: this project has no conflicting
 * utility composition, so a dependency would add weight without solving a
 * problem we actually have.
 */
export function cn(...values: ClassValue[]): string {
  const out: string[] = [];

  for (const value of values) {
    if (!value) continue;
    if (typeof value === "string") {
      out.push(value);
    } else if (Array.isArray(value)) {
      const nested = cn(...value);
      if (nested) out.push(nested);
    } else {
      for (const [key, active] of Object.entries(value)) {
        if (active) out.push(key);
      }
    }
  }

  return out.join(" ");
}
