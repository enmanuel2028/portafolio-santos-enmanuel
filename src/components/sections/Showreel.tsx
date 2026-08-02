"use client";

import { useRef } from "react";
import type { Dictionary } from "@/i18n/dictionary";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { RoadStage } from "@/components/showreel/RoadStage";
import { PipelineStage } from "@/components/showreel/PipelineStage";
import { DashboardStage } from "@/components/showreel/DashboardStage";

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

          const indicators = self.selector?.("[data-step-indicator]") as HTMLElement[] | undefined;
          const progress = self.selector?.("[data-progress-fill]") as HTMLElement[] | undefined;

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              // Shorter journey on phones so the pin never overstays.
              end: isDesktop ? "+=240%" : "+=140%",
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // Keep every scene inside the same framed viewport and move the
          // journey horizontally, rather than letting it float over the page.
          gsap.set(stages[0]!, { autoAlpha: 1, xPercent: 0, scale: 1 });
          gsap.set(stages.slice(1), { autoAlpha: 0, xPercent: 7, scale: 0.985 });
          if (indicators) {
            gsap.set(indicators, { opacity: 0.35, x: 0 });
            if (indicators[0]) gsap.set(indicators[0], { opacity: 1, x: 6 });
          }
          if (progress?.[0]) {
            gsap.set(progress[0], { scaleY: 0, transformOrigin: "top" });
            timeline.to(progress[0], { scaleY: 1, duration: stages.length - 1, ease: "none" }, 0);
          }

          stages.forEach((stage, index) => {
            if (index === 0) return;
            const previous = stages[index - 1];
            timeline
              .to(previous ?? stage, { autoAlpha: 0, xPercent: -5, scale: 0.985, duration: 0.4 }, index - 0.55)
              .to(stage, { autoAlpha: 1, xPercent: 0, scale: 1, duration: 0.45 }, index - 0.5);

            if (indicators) {
              const previousIndicator = indicators[index - 1];
              const nextIndicator = indicators[index];
              if (!previousIndicator || !nextIndicator) return;
              timeline
                .to(previousIndicator, { opacity: 0.35, x: 0, duration: 0.25 }, index - 0.5)
                .to(nextIndicator, { opacity: 1, x: 6, duration: 0.25 }, index - 0.4);
            }
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
      <div ref={root} className="relative h-[100svh] overflow-hidden bg-[var(--color-void)]">
        <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(102,184,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(102,184,255,.05)_1px,transparent_1px)] [background-size:64px_64px]" />

        <div className="container-page relative z-10 grid h-full items-center gap-8 py-10 lg:grid-cols-[minmax(18rem,0.72fr)_minmax(0,1.28fr)] lg:gap-14 lg:py-14">
          <div className="flex min-h-0 flex-col lg:h-[72svh]">
            <div>
            <p className="mono-label mb-3">{dict.showreel.eyebrow}</p>
            <h2
              id="showreel-title"
              className="text-gradient max-w-xl text-3xl leading-[1.08] sm:text-4xl lg:text-[clamp(2.4rem,3.4vw,4.2rem)]"
            >
              {dict.showreel.title}
            </h2>
              <p className="mt-5 hidden max-w-lg text-sm leading-relaxed text-[var(--color-muted)] sm:block lg:text-base">
                {dict.showreel.description}
              </p>
            </div>

            <div className="relative mt-8 hidden flex-1 lg:block">
              <div className="absolute bottom-2 left-[1.1rem] top-2 w-px bg-white/10">
                <span
                  data-progress-fill
                  className="block h-full w-px bg-[var(--color-electric)] shadow-[0_0_12px_rgba(70,174,255,.65)]"
                />
              </div>
              <ol className="flex h-full flex-col justify-around">
                {steps.map(({ key, copy }, index) => (
                  <li
                    key={key}
                    data-step-indicator
                    className="relative flex items-center gap-4 pl-0 will-change-transform"
                  >
                    <span className="relative z-10 grid size-9 place-items-center rounded-full border border-white/15 bg-[var(--color-void)] font-[family-name:var(--font-mono)] text-[0.65rem] text-[var(--color-electric)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-[family-name:var(--font-display)] text-sm tracking-wide text-white">
                      {copy.title}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="relative h-[48svh] min-h-[320px] overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#07111d]/90 shadow-[0_30px_100px_rgba(0,0,0,.55),0_0_70px_rgba(44,153,255,.08)] sm:h-[55svh] lg:h-[72svh]">
            <div className="absolute inset-x-0 top-0 z-20 flex h-12 items-center justify-between border-b border-white/10 bg-[#050b13]/85 px-5 backdrop-blur-md">
              <div className="flex items-center gap-2" aria-hidden="true">
                <span className="size-1.5 rounded-full bg-[var(--color-electric)] shadow-[0_0_9px_rgba(70,174,255,.8)]" />
                <span className="size-1.5 rounded-full bg-white/20" />
                <span className="size-1.5 rounded-full bg-white/10" />
              </div>
              <span className="font-[family-name:var(--font-mono)] text-[0.6rem] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                {dict.showreel.eyebrow} / {String(steps.length).padStart(2, "0")}
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 top-12 overflow-hidden">
              {steps.map(({ key, Stage }) => (
                <div key={key} data-stage className="absolute inset-0 will-change-transform">
                  <Stage />
                </div>
              ))}
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-44 bg-gradient-to-t from-[#050b13] via-[#050b13]/85 to-transparent" />

            <div className="absolute inset-x-5 bottom-5 z-20 grid sm:inset-x-7 sm:bottom-7">
              {steps.map(({ key, copy }, index) => (
                <div key={key} data-caption className="col-start-1 row-start-1 flex max-w-xl flex-col gap-1.5">
                  <span className="font-[family-name:var(--font-mono)] text-[0.65rem] tracking-[0.2em] text-[var(--color-electric)]">
                    {String(index + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl">
                    {copy.title}
                  </h3>
                  <p className="max-w-lg text-xs leading-relaxed text-[var(--color-muted)] sm:text-sm">
                    {copy.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
