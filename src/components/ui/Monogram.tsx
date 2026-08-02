import { cn } from "@/lib/utils";

interface MonogramProps {
  className?: string;
  /** Rendered as decoration when a sibling already carries the label. */
  decorative?: boolean;
  title?: string;
}

/**
 * "SE" monogram — an S curve and an E bracket joined by a central node,
 * reading as two members of one system.
 *
 * Drawn with `currentColor` so it inherits its context, and built from four
 * thick strokes with no fine detail so it survives a 16×16 favicon.
 */
export function Monogram({ className, decorative = true, title }: MonogramProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={cn("h-8 w-8", className)}
      aria-hidden={decorative ? "true" : undefined}
      role={decorative ? undefined : "img"}
    >
      {!decorative && title ? <title>{title}</title> : null}

      {/* S — open curve on the left */}
      <path
        d="M14.5 7.5C13.2 6.2 10.9 5.8 9 6.6 6.6 7.6 6.1 10.6 8.2 12.1c1.6 1.2 4.3 1 5.7 2.4 1.9 1.8.9 4.9-1.7 5.7-2 .6-4.2 0-5.4-1.5"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* E — three horizontal members on the right */}
      <path
        d="M19.5 8h6.5M19.5 16h5.2M19.5 24h6.5"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path d="M19.5 8v16" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />

      {/* Connecting node */}
      <circle cx="16" cy="16" r="1.6" fill="currentColor" />
    </svg>
  );
}
