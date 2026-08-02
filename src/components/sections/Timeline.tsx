"use client";

import { motion } from "motion/react";
import type { Locale } from "@/types/content";
import type { Dictionary } from "@/i18n/dictionary";
import { timeline } from "@/content/experience";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { duration, ease, stagger, viewportOnce } from "@/lib/motion-tokens";

interface TimelineProps {
  locale: Locale;
  dict: Dictionary;
}

export function Timeline({ locale, dict }: TimelineProps) {
  const { motionEnabled } = useExperience();

  const list = {
    hidden: {},
    visible: { transition: { staggerChildren: motionEnabled ? stagger.normal : 0 } },
  };

  const item = motionEnabled
    ? {
        hidden: { opacity: 0, x: -18 },
        visible: { opacity: 1, x: 0, transition: { duration: duration.enter, ease: ease.out } },
      }
    : {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
      };

  return (
    <section id="experience" aria-labelledby="experience-title" className="section-padding">
      <div className="container-page">
        <SectionHeader
          eyebrow={dict.experience.eyebrow}
          title={dict.experience.title}
          description={dict.experience.description}
          titleId="experience-title"
        />

        <motion.ol
          variants={list}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative mt-14 flex flex-col"
        >
          {/* Spine */}
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b from-[var(--color-electric)]/50 via-[var(--color-line)] to-transparent"
          />

          {timeline.map((entry) => (
            <motion.li key={entry.id} variants={item} className="relative pb-10 pl-10 last:pb-0">
              {/* Node */}
              <span
                aria-hidden="true"
                className="absolute top-1.5 left-0 flex h-3.5 w-3.5 items-center justify-center"
              >
                <span
                  className={
                    entry.ongoing
                      ? "h-3.5 w-3.5 rounded-full border-2 border-[var(--color-electric)] bg-[var(--color-void)]"
                      : "h-2.5 w-2.5 rounded-full bg-[var(--color-faint)]"
                  }
                />
              </span>

              <div className="flex flex-col gap-2.5">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <span className="mono-label">{entry.period[locale]}</span>
                  {entry.ongoing ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-success)]/35 bg-[var(--color-success)]/10 px-2.5 py-0.5 font-[family-name:var(--font-mono)] text-[0.6rem] tracking-wide text-[var(--color-success)] uppercase">
                      {dict.experience.ongoing}
                    </span>
                  ) : null}
                </div>

                <h3 className="font-[family-name:var(--font-display)] text-xl leading-snug sm:text-2xl">
                  {entry.title[locale]}
                </h3>

                {entry.organization ? (
                  <p className="text-sm text-[var(--color-electric)]">
                    {entry.organization[locale]}
                  </p>
                ) : null}

                <p className="max-w-2xl text-sm leading-relaxed text-[var(--color-muted)]">
                  {entry.description[locale]}
                </p>

                <ul className="mt-1 flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                    <li key={tag}>
                      <Tag>{tag}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
