"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { duration, ease, stagger, viewportOnce } from "@/lib/motion-tokens";
import { useExperience } from "@/components/providers/ExperienceProvider";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
  /** Id applied to the h2 so the section can reference it via aria-labelledby. */
  titleId?: string;
}

/**
 * Shared section intro: mono eyebrow, display title, optional lead paragraph.
 * Keeps heading rhythm identical across every section.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  align = "left",
  titleId,
}: SectionHeaderProps) {
  const { motionEnabled } = useExperience();

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: motionEnabled ? stagger.normal : 0 } },
  };

  const item = motionEnabled
    ? {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: duration.enter, ease: ease.out } },
      }
    : {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
      };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <motion.p variants={item} className="mono-label flex items-center gap-3">
        <span aria-hidden="true" className="h-px w-8 bg-[var(--accent)]" />
        {eyebrow}
      </motion.p>

      <motion.h2
        variants={item}
        id={titleId}
        className="text-gradient max-w-3xl text-4xl leading-[1.05] sm:text-5xl lg:text-6xl"
      >
        {title}
      </motion.h2>

      {description ? (
        <motion.p
          variants={item}
          className="max-w-2xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg"
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
