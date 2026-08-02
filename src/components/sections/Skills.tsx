"use client";

import { motion } from "motion/react";
import type { Locale } from "@/types/content";
import type { Dictionary } from "@/i18n/dictionary";
import { skillGroups } from "@/content/skills";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { duration, ease, stagger, viewportOnce } from "@/lib/motion-tokens";

interface SkillsProps {
  locale: Locale;
  dict: Dictionary;
}

export function Skills({ locale, dict }: SkillsProps) {
  const { motionEnabled } = useExperience();

  const list = {
    hidden: {},
    visible: { transition: { staggerChildren: motionEnabled ? stagger.tight : 0 } },
  };

  const card = motionEnabled
    ? {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: duration.enter, ease: ease.out } },
      }
    : {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
      };

  return (
    <section id="skills" aria-labelledby="skills-title" className="section-padding">
      <div className="container-page">
        <SectionHeader
          eyebrow={dict.skills.eyebrow}
          title={dict.skills.title}
          description={dict.skills.description}
          titleId="skills-title"
        />

        <motion.div
          variants={list}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {skillGroups.map((group, index) => (
            <motion.article
              key={group.id}
              variants={card}
              className="surface-card group relative flex flex-col gap-4 overflow-hidden rounded-2xl p-6 transition-colors duration-300 hover:border-[var(--color-line-strong)]"
            >
              {/* Corner index */}
              <span
                aria-hidden="true"
                className="absolute top-5 right-6 font-[family-name:var(--font-mono)] text-[0.65rem] text-[var(--color-faint)]"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="flex flex-col gap-1.5">
                <h3 className="font-[family-name:var(--font-display)] text-lg">
                  {group.title[locale]}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-muted)]">
                  {group.description[locale]}
                </p>
              </div>

              <ul className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-[var(--color-line)] bg-white/[0.02] px-2.5 py-1 font-[family-name:var(--font-mono)] text-[0.7rem] text-[var(--color-muted)] transition-colors group-hover:border-[var(--color-line-strong)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
