"use client";

import { useEffect, useRef, useState } from "react";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/**
 * Desktop-only cursor: a precise dot plus a trailing ring that grows over
 * interactive elements and shows a label on project cards.
 *
 * Only mounts for fine pointers with motion enabled — touch devices and
 * reduced-motion users keep the native cursor untouched. Positions are written
 * straight to transforms in a rAF loop, so it never triggers layout.
 */
export function Cursor() {
  const { motionEnabled, tier } = useExperience();
  const finePointer = useMediaQuery("(pointer: fine)");
  const enabled = motionEnabled && finePointer && tier !== "low";

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    document.body.dataset["cursor"] = "custom";

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { ...target };
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;

      const element = event.target as HTMLElement | null;
      const interactive = element?.closest<HTMLElement>(
        'a, button, [role="button"], input, select, textarea, [data-cursor-label]',
      );
      setActive(Boolean(interactive));
      setLabel(interactive?.dataset["cursorLabel"] ?? null);
    };

    const render = () => {
      // Ring lags behind the dot for a soft trailing feel.
      ring.x += (target.x - ring.x) * 0.16;
      ring.y += (target.y - ring.y) * 0.16;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
      delete document.body.dataset["cursor"];
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[70]">
      <div
        ref={dotRef}
        className="absolute top-0 left-0 h-1.5 w-1.5 rounded-full bg-[var(--color-ink)]"
      />
      <div
        ref={ringRef}
        className="absolute top-0 left-0 flex items-center justify-center rounded-full border border-[var(--color-line-strong)] transition-[width,height,background-color] duration-200"
        style={{
          width: label ? 68 : active ? 44 : 30,
          height: label ? 68 : active ? 44 : 30,
          backgroundColor: active ? "rgba(248,250,252,0.06)" : "transparent",
        }}
      >
        {label ? (
          <span className="font-[family-name:var(--font-mono)] text-[0.6rem] tracking-[0.14em] text-[var(--color-ink)] uppercase">
            {label}
          </span>
        ) : null}
      </div>
    </div>
  );
}
