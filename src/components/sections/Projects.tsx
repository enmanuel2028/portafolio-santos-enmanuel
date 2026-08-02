"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { Locale, ProjectCategoryId } from "@/types/content";
import type { Dictionary } from "@/i18n/dictionary";
import { projects, projectCategories } from "@/content/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ButtonLink } from "@/components/ui/Button";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { duration, ease } from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

interface ProjectsProps {
  locale: Locale;
  dict: Dictionary;
}

type Filter = ProjectCategoryId | "all";

export function Projects({ locale, dict }: ProjectsProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const { motionEnabled } = useExperience();

  const visible = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category.includes(filter))),
    [filter],
  );

  // Only offer filters that actually match something.
  const availableCategories = useMemo(
    () => projectCategories.filter((c) => projects.some((p) => p.category.includes(c.id))),
    [],
  );

  return (
    <section id="projects" aria-labelledby="projects-title" className="section-padding relative">
      <div className="container-page">
        <SectionHeader
          eyebrow={dict.projects.eyebrow}
          title={dict.projects.title}
          description={dict.projects.description}
          titleId="projects-title"
        />

        {/* ── Filters ───────────────────────────────────────────────────── */}
        <div
          role="group"
          aria-label={dict.projects.filterLabel}
          className="mt-10 flex flex-wrap gap-2"
        >
          <FilterChip
            active={filter === "all"}
            onClick={() => setFilter("all")}
            animate={motionEnabled}
          >
            {dict.projects.filterAll}
          </FilterChip>

          {availableCategories.map((category) => (
            <FilterChip
              key={category.id}
              active={filter === category.id}
              onClick={() => setFilter(category.id)}
              animate={motionEnabled}
            >
              {category.label[locale]}
            </FilterChip>
          ))}
        </div>

        {/* ── Project list ──────────────────────────────────────────────── */}
        <div className="mt-16 flex flex-col gap-24 lg:gap-32">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project, index) => (
              <motion.div
                key={project.slug}
                layout={motionEnabled}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: duration.micro, ease: ease.out }}
              >
                <ProjectCard
                  project={project}
                  locale={locale}
                  dict={dict}
                  reversed={index % 2 === 1}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {visible.length === 0 ? (
          <p className="mt-16 text-[var(--color-muted)]">{dict.projects.empty}</p>
        ) : null}

        <div className="mt-20 flex justify-center">
          <ButtonLink href={`/${locale}/projects`} variant="secondary" size="lg">
            {dict.projects.viewAll}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

interface FilterChipProps {
  active: boolean;
  onClick: () => void;
  animate: boolean;
  children: React.ReactNode;
}

function FilterChip({ active, onClick, animate, children }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "relative rounded-full px-4 py-2 text-sm transition-colors",
        active ? "text-[var(--color-void)]" : "text-[var(--color-muted)] hover:text-[var(--color-ink)]",
      )}
    >
      {active ? (
        animate ? (
          <motion.span
            layoutId="project-filter"
            className="absolute inset-0 rounded-full bg-[var(--color-ink)]"
            transition={{ duration: duration.micro, ease: ease.inOut }}
          />
        ) : (
          <span className="absolute inset-0 rounded-full bg-[var(--color-ink)]" />
        )
      ) : (
        <span className="absolute inset-0 rounded-full border border-[var(--color-line)]" />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
