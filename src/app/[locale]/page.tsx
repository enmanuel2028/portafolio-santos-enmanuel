import { notFound } from "next/navigation";
import type { Locale } from "@/types/content";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { buildProjectsJsonLd } from "@/content/seo";
import { projects } from "@/content/projects";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Showreel } from "@/components/sections/Showreel";
import { Projects } from "@/components/sections/Projects";
import { Timeline } from "@/components/sections/Timeline";
import { Skills } from "@/components/sections/Skills";
import { Lab } from "@/components/sections/Lab";
import { Contact } from "@/components/sections/Contact";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  const locale: Locale = raw;
  const dict = getDictionary(locale);

  return (
    <main id="main">
      <Hero locale={locale} dict={dict} />
      <About locale={locale} dict={dict} />
      <Showreel dict={dict} />
      <Projects locale={locale} dict={dict} />
      <Timeline locale={locale} dict={dict} />
      <Skills locale={locale} dict={dict} />
      <Lab locale={locale} dict={dict} />
      <Contact locale={locale} dict={dict} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildProjectsJsonLd(locale, projects)),
        }}
      />
    </main>
  );
}
