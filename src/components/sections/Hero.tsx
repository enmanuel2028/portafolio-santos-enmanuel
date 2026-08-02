"use client";

import { useRef } from "react";
import { ArrowDown, ArrowRight, Download, MapPin } from "lucide-react";
import type { Locale } from "@/types/content";
import type { Dictionary } from "@/i18n/dictionary";
import { personal, personalLinks } from "@/content/personal";
import { ButtonLink } from "@/components/ui/Button";
import { HeroCanvas } from "@/components/three/HeroCanvas";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap } from "@/lib/gsap";
import { gsapEase } from "@/lib/motion-tokens";

interface HeroProps {
  locale: Locale;
  dict: Dictionary;
}

export function Hero({ locale, dict }: HeroProps) {
  const root = useRef<HTMLElement>(null);
  const { motionEnabled, ready } = useExperience();

  useIsomorphicLayoutEffect(() => {
    if (!ready) return;

    // gsap.context scopes every selector to this subtree and gives a single
    // revert() that kills tweens, ScrollTriggers and inline styles on unmount.
    const ctx = gsap.context(() => {
      if (!motionEnabled) {
        // Reduced motion: land on the final state, no travel.
        gsap.set("[data-hero-reveal]", { clipPath: "inset(0% 0 0 0)", opacity: 1, y: 0 });
        gsap.set("[data-hero-fade]", { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: gsapEase.out } });

      tl.fromTo(
        "[data-hero-reveal]",
        { clipPath: "inset(0 0 100% 0)", y: 34 },
        { clipPath: "inset(0% 0 0 0)", y: 0, duration: 1.15, stagger: 0.09 },
        0.1,
      ).fromTo(
        "[data-hero-fade]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.75, stagger: 0.08 },
        0.55,
      );
    }, root);

    return () => ctx.revert();
  }, [motionEnabled, ready]);

  return (
    <section
      ref={root}
      id="home"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-[var(--nav-height)]"
    >
      {/* Depth layers, back to front: grid, 3D scene, gradient falloff. */}
      <div
        className="bg-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_45%,black,transparent)]"
        aria-hidden="true"
      />

      <HeroCanvas label={dict.hero.sceneLabel} />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[var(--color-void)]"
        aria-hidden="true"
      />

      <div className="container-page relative z-10 py-20">
        <div className="flex max-w-3xl flex-col gap-7">
          <p
            data-hero-fade
            className="mono-label flex flex-wrap items-center gap-x-3 gap-y-2 opacity-0"
          >
            <span className="inline-flex items-center gap-2">
              <span
                className="animate-pulse-ring inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-success)]"
                aria-hidden="true"
              />
              {personal.availability[locale]}
            </span>
            <span aria-hidden="true" className="text-[var(--color-faint)]">
              ·
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3 w-3" aria-hidden="true" />
              {personal.location[locale]}
            </span>
          </p>

          <div className="flex flex-col gap-3">
            <p data-hero-fade className="mono-label opacity-0">
              {personal.disciplines[locale]}
            </p>

            <h1 id="hero-title" className="flex flex-col">
              <span
                data-hero-reveal
                className="mask-reveal text-gradient font-[family-name:var(--font-display)] text-[clamp(2.75rem,11vw,7.5rem)] leading-[0.92] font-semibold tracking-[-0.03em]"
              >
                {personal.firstName}
              </span>
              <span
                data-hero-reveal
                className="mask-reveal text-accent-gradient font-[family-name:var(--font-display)] text-[clamp(2.75rem,11vw,7.5rem)] leading-[0.92] font-semibold tracking-[-0.03em]"
              >
                {personal.lastName}
              </span>
            </h1>
          </div>

          <p
            data-hero-reveal
            className="mask-reveal max-w-2xl text-lg leading-relaxed text-balance text-[var(--color-ink)]/90 sm:text-xl"
          >
            {personal.headline[locale]}
          </p>

          <p
            data-hero-fade
            className="max-w-xl text-base leading-relaxed text-[var(--color-muted)] opacity-0"
          >
            {personal.intro[locale]}
          </p>

          <div data-hero-fade className="flex flex-wrap items-center gap-3 opacity-0">
            <ButtonLink href={`/${locale}#projects`} size="lg">
              {dict.hero.exploreProjects}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </ButtonLink>

            <ButtonLink href={`/${locale}#about`} variant="secondary" size="lg">
              {dict.hero.viewProfile}
            </ButtonLink>

            {/* Only rendered once a CV file is configured. */}
            {personalLinks.cv ? (
              <ButtonLink href={personalLinks.cv} variant="ghost" size="lg" download>
                <Download className="h-4 w-4" aria-hidden="true" />
                {dict.hero.downloadCv}
              </ButtonLink>
            ) : null}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href={`#about`}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[var(--color-faint)] transition-colors hover:text-[var(--color-ink)] md:flex"
      >
        <span className="font-[family-name:var(--font-mono)] text-[0.65rem] tracking-[0.2em] uppercase">
          {dict.hero.scrollHint}
        </span>
        <ArrowDown className="animate-drift h-4 w-4" aria-hidden="true" />
      </a>
    </section>
  );
}
