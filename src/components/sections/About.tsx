"use client";

import { motion } from "motion/react";
import { GraduationCap } from "lucide-react";
import type { Locale } from "@/types/content";
import type { Dictionary } from "@/i18n/dictionary";
import { personal } from "@/content/personal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { duration, ease, stagger, viewportOnce } from "@/lib/motion-tokens";

interface AboutProps {
  locale: Locale;
  dict: Dictionary;
}

export function About({ locale, dict }: AboutProps) {
  const { motionEnabled } = useExperience();

  const list = {
    hidden: {},
    visible: { transition: { staggerChildren: motionEnabled ? stagger.normal : 0 } },
  };

  const item = motionEnabled
    ? {
        hidden: { opacity: 0, y: 22 },
        visible: { opacity: 1, y: 0, transition: { duration: duration.enter, ease: ease.out } },
      }
    : {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
      };

  return (
    <section id="about" aria-labelledby="about-title" className="section-padding relative">
      <div className="container-page">
        <SectionHeader
          eyebrow={dict.about.eyebrow}
          title={dict.about.title}
          titleId="about-title"
        />

        <div className="mt-14 grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
          {/* ── Narrative ─────────────────────────────────────────────────── */}
          <motion.div
            variants={list}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col gap-7"
          >
            <motion.p
              variants={item}
              className="text-xl leading-relaxed text-[var(--color-ink)]/90 sm:text-2xl"
            >
              {personal.about.lead[locale]}
            </motion.p>

            <motion.p variants={item} className="text-base leading-relaxed text-[var(--color-muted)]">
              {personal.about.approach[locale]}
            </motion.p>

            {/* Pull quote */}
            <motion.blockquote
              variants={item}
              className="relative border-l-2 border-[var(--accent)] pl-6"
            >
              <p className="font-[family-name:var(--font-display)] text-lg leading-snug text-[var(--color-ink)] sm:text-xl">
                {personal.cinematicStatement[locale]}
              </p>
            </motion.blockquote>

            <motion.div
              variants={item}
              className="surface-card flex items-start gap-4 rounded-xl p-5"
            >
              <GraduationCap
                className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-electric)]"
                aria-hidden="true"
              />
              <div className="flex flex-col gap-1">
                <p className="mono-label">{dict.about.educationLabel}</p>
                <p className="text-sm leading-relaxed text-[var(--color-muted)]">
                  {personal.about.education[locale]}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Qualitative highlights ────────────────────────────────────── */}
          <motion.ul
            variants={list}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col gap-px overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-line)]"
          >
            {personal.about.highlights.map((highlight, index) => (
              <motion.li
                key={highlight.title.en}
                variants={item}
                className="group flex flex-col gap-1.5 bg-[var(--color-deep)] p-5 transition-colors hover:bg-[var(--color-surface)]"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-[family-name:var(--font-mono)] text-[0.65rem] text-[var(--color-faint)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] text-base text-[var(--color-ink)]">
                    {highlight.title[locale]}
                  </h3>
                </div>
                <p className="pl-8 text-sm leading-relaxed text-[var(--color-muted)]">
                  {highlight.description[locale]}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
