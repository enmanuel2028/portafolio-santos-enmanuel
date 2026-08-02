"use client";

import { motion } from "motion/react";
import type { Locale } from "@/types/content";
import type { Dictionary } from "@/i18n/dictionary";
import { labEntries } from "@/content/lab";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { duration, ease, stagger, viewportOnce } from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

interface LabProps {
  locale: Locale;
  dict: Dictionary;
}

const statusStyles: Record<string, string> = {
  exploring: "border-[var(--color-violet)]/35 bg-[var(--color-violet)]/10 text-[var(--color-violet)]",
  active: "border-[var(--color-electric)]/35 bg-[var(--color-electric)]/10 text-[var(--color-electric)]",
  shipped: "border-[var(--color-success)]/35 bg-[var(--color-success)]/10 text-[var(--color-success)]",
};

/**
 * Technology Lab — terminal-flavoured but held to normal readability rules:
 * real text sizes, real contrast, no simulated typing that delays content.
 */
export function Lab({ locale, dict }: LabProps) {
  const { motionEnabled } = useExperience();

  const list = {
    hidden: {},
    visible: { transition: { staggerChildren: motionEnabled ? stagger.tight : 0 } },
  };

  const row = motionEnabled
    ? {
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: duration.enter, ease: ease.out } },
      }
    : {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
      };

  return (
    <section id="lab" aria-labelledby="lab-title" className="section-padding">
      <div className="container-page">
        <SectionHeader
          eyebrow={dict.lab.eyebrow}
          title={dict.lab.title}
          description={dict.lab.description}
          titleId="lab-title"
        />

        <div className="mt-14 overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[#080c14]">
          {/* Window chrome */}
          <div className="flex items-center gap-2 border-b border-[var(--color-line)] px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]/60" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#eab308]/60" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]/60" aria-hidden="true" />
            <span className="ml-2 font-[family-name:var(--font-mono)] text-[0.68rem] text-[var(--color-faint)]">
              technology-lab
            </span>
          </div>

          <motion.ul
            variants={list}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="divide-y divide-[var(--color-line)]"
          >
            {labEntries.map((entry) => (
              <motion.li
                key={entry.id}
                variants={row}
                className="group flex flex-col gap-2.5 px-5 py-5 transition-colors hover:bg-white/[0.02] sm:px-6"
              >
                <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-[family-name:var(--font-mono)] text-[0.78rem]">
                  <span className="text-[var(--color-success)]" aria-hidden="true">
                    $
                  </span>
                  <span className="text-[var(--color-muted)]">{entry.command}</span>
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-[family-name:var(--font-display)] text-lg text-[var(--color-ink)]">
                    {entry.title[locale]}
                  </h3>
                  <span
                    className={cn(
                      "rounded-full border px-2.5 py-0.5 font-[family-name:var(--font-mono)] text-[0.6rem] tracking-wide uppercase",
                      statusStyles[entry.status],
                    )}
                  >
                    {dict.lab.status[entry.status]}
                  </span>
                </div>

                <p className="max-w-2xl text-sm leading-relaxed text-[var(--color-muted)]">
                  {entry.description[locale]}
                </p>

                <ul className="flex flex-wrap gap-1.5">
                  {entry.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded border border-[var(--color-line)] px-2 py-0.5 font-[family-name:var(--font-mono)] text-[0.65rem] text-[var(--color-faint)]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
