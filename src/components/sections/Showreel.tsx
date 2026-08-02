"use client";

import { useRef } from "react";
import type { Dictionary } from "@/i18n/dictionary";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { RoadStage } from "@/components/showreel/RoadStage";
import { PipelineStage } from "@/components/showreel/PipelineStage";
import { DashboardStage } from "@/components/showreel/DashboardStage";
import { TerminalStage } from "@/components/showreel/TerminalStage";

interface ShowreelProps {
  dict: Dictionary;
}

/**
 * Pinned scroll sequence: four stages cross-fade as the user scrolls, taking
 * the narrative from a road surface to a document pipeline to a dashboard to a
 * local terminal — the four domains the projects live in.
 *
 * Under reduced motion the pin is never created and the four stages render as
 * a plain vertical list, so no content becomes unreachable.
 */
export function Showreel({ dict }: ShowreelProps) {
  const root = useRef<HTMLDivElement>(null);
  const { motionEnabled, ready, tier } = useExperience();

  // Pinning is skipped on low-tier devices: a long pinned section on a weak
  // phone is where scroll performance goes to die.
  const usePin = motionEnabled && tier !== "low";

  useIsomorphicLayoutEffect(() => {
    if (!ready || !usePin) return;

    const ctx = gsap.context((self) => {
      // matchMedia keeps the desktop journey longer than the mobile one and
      // tears the whole thing down automatically when the query stops matching.
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          const { isDesktop } = context.conditions as { isDesktop: boolean };
          const stages = self.selector?.("[data-stage]") as HTMLElement[] | undefined;
          if (!stages || stages.length === 0) return;

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              // Shorter journey on phones so the pin never overstays.
              end: isDesktop ? "+=320%" : "+=180%",
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // Stage 1 is visible at rest; each subsequent stage fades in over it.
          gsap.set(stages.slice(1), { autoAlpha: 0 });

          stages.forEach((stage, index) => {
            if (index === 0) return;
            const previous = stages[index - 1];
            timeline
              .to(previous ?? stage, { autoAlpha: 0, duration: 0.35 }, index - 0.5)
              .to(stage, { autoAlpha: 1, duration: 0.35 }, index - 0.5);
          });

          const captions = self.selector?.("[data-caption]") as HTMLElement[] | undefined;
          if (captions) {
            gsap.set(captions.slice(1), { autoAlpha: 0, y: 12 });
            captions.forEach((caption, index) => {
              if (index === 0) return;
              const previous = captions[index - 1];
              timeline
                .to(previous ?? caption, { autoAlpha: 0, y: -12, duration: 0.3 }, index - 0.5)
                .to(caption, { autoAlpha: 1, y: 0, duration: 0.3 }, index - 0.4);
            });
          }
        },
      );

      return () => mm.revert();
    }, root);

    // Fonts and lazily-loaded media change layout height; recalculating once
    // they settle prevents the pin from starting at the wrong scroll offset.
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts?.status === "loaded") {
      refresh();
    } else {
      void document.fonts?.ready.then(refresh);
    }
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [ready, usePin]);

  const steps = [
    { key: "road", copy: dict.showreel.steps.road, Stage: RoadStage },
    { key: "pipeline", copy: dict.showreel.steps.pipeline, Stage: PipelineStage },
    { key: "dashboard", copy: dict.showreel.steps.dashboard, Stage: DashboardStage },
    { key: "terminal", copy: dict.showreel.steps.terminal, Stage: TerminalStage },
  ] as const;

  // ── Reduced motion / low tier: a readable stacked list ───────────────────
  if (!usePin) {
    return (
      <section aria-labelledby="showreel-title" className="section-padding">
        <div className="container-page">
          <p className="mono-label mb-4">{dict.showreel.eyebrow}</p>
          <h2
            id="showreel-title"
            className="text-gradient max-w-3xl text-4xl leading-[1.05] sm:text-5xl"
          >
            {dict.showreel.title}
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--color-muted)]">{dict.showreel.description}</p>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2">
            {steps.map(({ key, copy, Stage }) => (
              <li
                key={key}
                className="surface-card overflow-hidden rounded-2xl"
              >
                <div className="relative h-52">
                  <Stage />
                </div>
                <div className="flex flex-col gap-1.5 p-5">
                  <h3 className="font-[family-name:var(--font-display)] text-lg">{copy.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--color-muted)]">
                    {copy.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  // ── Full pinned journey ──────────────────────────────────────────────────
  return (
    <section aria-labelledby="showreel-title" className="relative">
      <div ref={root} className="relative flex h-[100svh] flex-col overflow-hidden">
        {/* Stages stack in the same box; only opacity changes. */}
        <div className="absolute inset-0">
          {steps.map(({ key, Stage }) => (
            <div key={key} data-stage className="absolute inset-0">
              <Stage />
            </div>
          ))}
        </div>

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-void)] via-transparent to-[var(--color-void)]"
          aria-hidden="true"
        />

        <div className="container-page relative z-10 flex h-full flex-col justify-between py-16">
          <div>
            <p className="mono-label mb-3">{dict.showreel.eyebrow}</p>
            <h2
              id="showreel-title"
              className="text-gradient max-w-2xl text-3xl leading-[1.08] sm:text-4xl lg:text-5xl"
            >
              {dict.showreel.title}
            </h2>
          </div>

          {/* Captions occupy one grid cell so swapping never shifts layout. */}
          <div className="grid max-w-xl">
            {steps.map(({ key, copy }, index) => (
              <div
                key={key}
                data-caption
                className="col-start-1 row-start-1 flex flex-col gap-2"
              >
                <span className="font-[family-name:var(--font-mono)] text-[0.7rem] tracking-[0.2em] text-[var(--accent)]">
                  {String(index + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl">
                  {copy.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
                  {copy.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
