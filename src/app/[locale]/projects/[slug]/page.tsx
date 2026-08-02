import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, Lock } from "lucide-react";
import type { Locale, ProjectSection } from "@/types/content";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { getNextProject, getProjectBySlug, projects, projectCategories } from "@/content/projects";
import { personal, siteUrl } from "@/content/personal";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { Tag } from "@/components/ui/Tag";

/** Every project page for every locale is prerendered. */
export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((project) => ({ locale, slug: project.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "es";
  const project = getProjectBySlug(slug);

  if (!project) return { title: "404" };

  return {
    title: project.name[locale],
    description: project.summary[locale],
    alternates: { canonical: `${siteUrl}/${locale}/projects/${slug}` },
    openGraph: {
      type: "article",
      title: `${project.name[locale]} — ${personal.fullName}`,
      description: project.summary[locale],
      url: `${siteUrl}/${locale}/projects/${slug}`,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();

  const locale: Locale = raw;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const dict = getDictionary(locale);
  const next = getNextProject(slug);
  const categoryLabels = project.category
    .map((id) => projectCategories.find((c) => c.id === id)?.label[locale])
    .filter((label): label is string => Boolean(label));

  return (
    <main id="main" data-accent={project.accent}>
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <header className="relative overflow-hidden pt-[var(--nav-height)]">
        <div className="absolute inset-0" aria-hidden="true">
          <ProjectVisual kind={project.visual} />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-void)] via-[var(--color-void)]/85 to-[var(--color-void)]/60" />
        </div>

        <div className="container-page relative py-16 sm:py-24">
          <Link
            href={`/${locale}/projects`}
            className="mono-label inline-flex items-center gap-2 transition-colors hover:text-[var(--color-ink)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            {dict.caseStudy.backToProjects}
          </Link>

          <div className="mt-8 flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-[family-name:var(--font-mono)] text-sm tracking-[0.2em] text-[var(--accent)]">
                {project.index}
              </span>
              {categoryLabels.map((label) => (
                <Tag key={label} accent>
                  {label}
                </Tag>
              ))}
              {project.confidential ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-line-strong)] px-3 py-1 font-[family-name:var(--font-mono)] text-[0.65rem] tracking-wide text-[var(--color-muted)] uppercase">
                  <Lock className="h-3 w-3" aria-hidden="true" />
                  {dict.projects.confidential}
                </span>
              ) : null}
              {project.ownership ? (
                <Tag accent>
                  {project.ownership === "own"
                    ? dict.projects.ownProject
                    : dict.projects.collaboration}
                </Tag>
              ) : null}
              {project.status ? (
                <Tag>
                  {project.status === "ongoing"
                    ? dict.projects.inProgress
                    : dict.projects.completed}
                </Tag>
              ) : null}
            </div>

            <h1 className="text-gradient max-w-4xl font-[family-name:var(--font-display)] text-4xl leading-[1.03] sm:text-6xl lg:text-7xl">
              {project.name[locale]}
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-[var(--color-ink)]/90">
              {project.summary[locale]}
            </p>

            <dl className="mt-2 flex flex-wrap gap-x-12 gap-y-4">
              <div>
                <dt className="mono-label mb-1">{dict.projects.role}</dt>
                <dd className="text-sm text-[var(--color-ink)]">{project.role[locale]}</dd>
              </div>
              {project.year ? (
                <div>
                  <dt className="mono-label mb-1">Año</dt>
                  <dd className="text-sm text-[var(--color-ink)]">{project.year}</dd>
                </div>
              ) : null}
            </dl>

            {/* External links only render when configured. */}
            {project.demoUrl || project.repositoryUrl ? (
              <div className="flex flex-wrap gap-3">
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--color-ink)] px-5 text-sm font-medium text-[var(--color-void)] transition-colors hover:bg-white"
                  >
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    {dict.projects.demo}
                  </a>
                ) : null}
                {project.repositoryUrl ? (
                  <a
                    href={project.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--color-line-strong)] px-5 text-sm font-medium transition-colors hover:border-[var(--accent)]"
                  >
                    <GithubIcon className="h-4 w-4" />
                    {dict.projects.repository}
                  </a>
                ) : null}
              </div>
            ) : (
              <p className="font-[family-name:var(--font-mono)] text-[0.7rem] text-[var(--color-faint)]">
                {project.confidential
                  ? dict.projects.confidentialNote
                  : dict.projects.linksPending}
              </p>
            )}
          </div>
        </div>
      </header>

      <div className="container-page pb-24">
        <div className="grid gap-14 lg:grid-cols-[1fr_18rem] lg:gap-20">
          {/* ── Body ──────────────────────────────────────────────────────── */}
          <div className="flex flex-col gap-14">
            <Block title={dict.caseStudy.context}>
              <p>{project.caseStudy.context[locale]}</p>
              <p>{project.description[locale]}</p>
            </Block>

            <Block title={dict.projects.problem}>
              <p>{project.problem[locale]}</p>
            </Block>

            <Block title={dict.caseStudy.objectives}>
              <Bullets items={project.caseStudy.objectives[locale]} />
            </Block>

            <Block title={dict.projects.solution}>
              <p>{project.solution[locale]}</p>
            </Block>

            <Block title={dict.caseStudy.contribution}>
              <Bullets items={project.contribution[locale]} />
            </Block>

            <SectionBlock section={project.caseStudy.architecture} locale={locale} />
            <SectionBlock section={project.caseStudy.process} locale={locale} />
            <SectionBlock section={project.caseStudy.decisions} locale={locale} />
            <SectionBlock section={project.caseStudy.challenges} locale={locale} />

            {project.caseStudy.metrics ? (
              <Block title={dict.caseStudy.metrics}>
                <ul className="not-prose grid gap-4 sm:grid-cols-3">
                  {project.caseStudy.metrics.map((metric) => (
                    <li
                      key={metric.value}
                      className="surface-card flex flex-col gap-1.5 rounded-xl p-4"
                    >
                      <span className="mono-label">{metric.label[locale]}</span>
                      <span className="font-[family-name:var(--font-display)] text-lg text-[var(--accent)]">
                        {metric.value}
                      </span>
                      {metric.note ? (
                        <span className="text-xs leading-relaxed text-[var(--color-muted)]">
                          {metric.note[locale]}
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </Block>
            ) : null}

            <Block title={dict.caseStudy.results}>
              <Bullets items={project.caseStudy.results[locale]} />
            </Block>

            <Block title={dict.caseStudy.learnings}>
              <Bullets items={project.caseStudy.learnings[locale]} />
            </Block>

            {/* ── Gallery: generated representation ────────────────────────── */}
            <section className="flex flex-col gap-4">
              <h2 className="font-[family-name:var(--font-display)] text-2xl">
                {dict.caseStudy.gallery}
              </h2>
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-[var(--color-line)]">
                <ProjectVisual kind={project.visual} />
              </div>
              <p className="font-[family-name:var(--font-mono)] text-[0.7rem] leading-relaxed text-[var(--color-faint)]">
                {dict.caseStudy.galleryNote}
              </p>
            </section>
          </div>

          {/* ── Sidebar ───────────────────────────────────────────────────── */}
          <aside className="flex flex-col gap-8 lg:sticky lg:top-[calc(var(--nav-height)+2rem)] lg:self-start">
            <div className="surface-card flex flex-col gap-3 rounded-xl p-5">
              <h2 className="mono-label">{dict.projects.technologies}</h2>
              <ul className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <li key={tech}>
                    <Tag>{tech}</Tag>
                  </li>
                ))}
              </ul>
            </div>

            {project.confidential ? (
              <p className="rounded-xl border border-dashed border-[var(--color-line-strong)] p-4 text-xs leading-relaxed text-[var(--color-muted)]">
                {dict.projects.confidentialNote}
              </p>
            ) : null}
          </aside>
        </div>

        {/* ── Next project ────────────────────────────────────────────────── */}
        {next ? (
          <nav
            aria-label={dict.caseStudy.nextProject}
            className="mt-20 border-t border-[var(--color-line)] pt-10"
            data-accent={next.accent}
          >
            <Link href={`/${locale}/projects/${next.slug}`} className="group flex flex-col gap-2">
              <span className="mono-label">{dict.caseStudy.nextProject}</span>
              <span className="flex items-center gap-3 font-[family-name:var(--font-display)] text-3xl transition-colors group-hover:text-[var(--accent)] sm:text-4xl">
                {next.name[locale]}
                <ArrowRight
                  className="h-6 w-6 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
              <span className="max-w-xl text-sm text-[var(--color-muted)]">
                {next.summary[locale]}
              </span>
            </Link>
          </nav>
        ) : null}
      </div>
    </main>
  );
}

/* ── Presentational helpers ──────────────────────────────────────────────── */

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-[family-name:var(--font-display)] text-2xl">{title}</h2>
      <div className="flex flex-col gap-4 text-base leading-relaxed text-[var(--color-muted)]">
        {children}
      </div>
    </section>
  );
}

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SectionBlock({ section, locale }: { section: ProjectSection; locale: Locale }) {
  return (
    <Block title={section.title[locale]}>
      <Bullets items={section.body[locale]} />
    </Block>
  );
}
