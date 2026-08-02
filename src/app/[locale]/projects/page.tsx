import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Locale } from "@/types/content";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { projects } from "@/content/projects";
import { seo } from "@/content/seo";
import { siteUrl } from "@/content/personal";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { Tag } from "@/components/ui/Tag";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "es";
  const dict = getDictionary(locale);

  return {
    title: dict.projects.title,
    description: seo.description[locale],
    alternates: { canonical: `${siteUrl}/${locale}/projects` },
  };
}

export default async function ProjectsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  const locale: Locale = raw;
  const dict = getDictionary(locale);

  return (
    <main id="main" className="pt-[var(--nav-height)]">
      <div className="container-page py-16 sm:py-24">
        <Link
          href={`/${locale}`}
          className="mono-label inline-flex items-center gap-2 transition-colors hover:text-[var(--color-ink)]"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          {dict.nav.home}
        </Link>

        <h1 className="text-gradient mt-8 max-w-3xl font-[family-name:var(--font-display)] text-4xl leading-[1.05] sm:text-6xl">
          {dict.projects.title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
          {dict.projects.description}
        </p>

        <ul className="mt-16 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <li key={project.slug} data-accent={project.accent}>
              <Link
                href={`/${locale}/projects/${project.slug}`}
                data-cursor-label={dict.projects.viewCase}
                className="group surface-card flex h-full flex-col overflow-hidden rounded-2xl transition-colors duration-300 hover:border-[var(--accent)]/45"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <ProjectVisual kind={project.visual} />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[var(--accent)]/0 transition-colors duration-300 group-hover:bg-[var(--accent)]/[0.07]"
                  />
                  <span className="absolute top-4 left-4 font-[family-name:var(--font-mono)] text-[0.7rem] tracking-[0.2em] text-[var(--accent)]">
                    {project.index}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-3 p-6">
                  <p className="mono-label">{project.role[locale]}</p>

                  <h2 className="font-[family-name:var(--font-display)] text-2xl transition-colors group-hover:text-[var(--accent)]">
                    {project.name}
                  </h2>

                  <p className="flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
                    {project.summary[locale]}
                  </p>

                  <ul className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <li key={tech}>
                        <Tag>{tech}</Tag>
                      </li>
                    ))}
                  </ul>

                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-ink)]">
                    {dict.projects.viewCase}
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
