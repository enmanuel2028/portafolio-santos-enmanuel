"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Lock } from "lucide-react";
import type { Locale, Project } from "@/types/content";
import type { Dictionary } from "@/i18n/dictionary";
import { Tag } from "@/components/ui/Tag";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { duration, ease, viewportOnce } from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  locale: Locale;
  dict: Dictionary;
  /** Alternates the editorial layout; ignored below `lg`. */
  reversed?: boolean;
}

export function ProjectCard({ project, locale, dict, reversed = false }: ProjectCardProps) {
  const { motionEnabled } = useExperience();

  const enter = motionEnabled
    ? {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: duration.section, ease: ease.out } },
      }
    : {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.24 } },
      };

  return (
    <motion.article
      data-accent={project.accent}
      variants={enter}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="group grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
    >
      {/* ── Visual ──────────────────────────────────────────────────────── */}
      <Link
        href={`/${locale}/projects/${project.slug}`}
        data-cursor-label={dict.projects.viewCase}
        aria-label={`${dict.projects.viewCase}: ${project.name[locale]}`}
        className={cn(
          "relative block aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--color-line)] transition-colors duration-300 hover:border-[var(--accent)]/45 sm:aspect-[16/10]",
          reversed && "lg:order-2",
        )}
      >
        <ProjectVisual kind={project.visual} />

        {/* Accent wash on hover */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[var(--accent)]/0 transition-colors duration-300 group-hover:bg-[var(--accent)]/[0.07]"
        />

        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--color-void)]/85 to-transparent"
        />

        <span className="absolute top-4 left-4 font-[family-name:var(--font-mono)] text-[0.7rem] tracking-[0.2em] text-[var(--accent)]">
          {project.index}
        </span>

        <span className="absolute top-4 right-4 flex flex-col items-end gap-1.5">
          {project.ownership ? (
            <span className="rounded-full border border-[var(--accent)]/35 bg-[var(--color-void)]/85 px-2.5 py-1 font-[family-name:var(--font-mono)] text-[0.6rem] tracking-wide text-[var(--accent)] uppercase">
              {project.ownership === "own"
                ? dict.projects.ownProject
                : dict.projects.collaboration}
            </span>
          ) : null}
          {project.status ? (
            <span className="rounded-full border border-[var(--color-line-strong)] bg-[var(--color-void)]/85 px-2.5 py-1 font-[family-name:var(--font-mono)] text-[0.6rem] tracking-wide text-[var(--color-muted)] uppercase">
              {project.status === "ongoing"
                ? dict.projects.inProgress
                : dict.projects.completed}
            </span>
          ) : null}
          {project.confidential ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-line-strong)] bg-[var(--color-void)]/85 px-2.5 py-1 font-[family-name:var(--font-mono)] text-[0.6rem] tracking-wide text-[var(--color-muted)] uppercase">
              <Lock className="h-3 w-3" aria-hidden="true" />
              {dict.projects.confidential}
            </span>
          ) : null}
        </span>
      </Link>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className={cn("flex flex-col gap-5", reversed && "lg:order-1")}>
        <div className="flex flex-col gap-3">
          <p className="mono-label">{project.role[locale]}</p>

          <h3 className="font-[family-name:var(--font-display)] text-3xl leading-tight sm:text-4xl">
            <Link
              href={`/${locale}/projects/${project.slug}`}
              className="transition-colors hover:text-[var(--accent)]"
            >
              {project.name[locale]}
            </Link>
          </h3>

          <p className="text-base leading-relaxed text-[var(--color-muted)]">
            {project.summary[locale]}
          </p>
        </div>

        {/* Problem → solution, the two lines that matter most */}
        <dl className="flex flex-col gap-3 border-l border-[var(--color-line)] pl-5">
          <div>
            <dt className="mono-label mb-1">{dict.projects.problem}</dt>
            <dd className="text-sm leading-relaxed text-[var(--color-muted)]">
              {project.problem[locale]}
            </dd>
          </div>
          <div>
            <dt className="mono-label mb-1">{dict.projects.solution}</dt>
            <dd className="text-sm leading-relaxed text-[var(--color-muted)]">
              {project.solution[locale]}
            </dd>
          </div>
        </dl>

        <ul className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 6).map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
          {project.technologies.length > 6 ? (
            <li>
              <Tag>+{project.technologies.length - 6}</Tag>
            </li>
          ) : null}
        </ul>

        <div>
          <Link
            href={`/${locale}/projects/${project.slug}`}
            className="group/link inline-flex items-center gap-2 text-sm font-medium text-[var(--color-ink)] transition-colors hover:text-[var(--accent)]"
          >
            {dict.projects.viewCase}
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
