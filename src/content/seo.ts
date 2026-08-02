import type { L, Locale } from "@/types/content";
import { personal, personalLinks, siteUrl } from "./personal";

export const seo = {
  title: {
    es: "Santos Enmanuel | Software, IA y Datos",
    en: "Santos Enmanuel | Software, AI and Data",
  } satisfies L<string>,
  description: {
    es: "Portafolio de Santos Enmanuel Manosalva Aceros, desarrollador e ingeniero de sistemas enfocado en software, inteligencia artificial, visión por computador, datos y productos digitales.",
    en: "Portfolio of Santos Enmanuel Manosalva Aceros, developer and systems engineer focused on software, artificial intelligence, computer vision, data and digital products.",
  } satisfies L<string>,
  keywords: [
    "Santos Enmanuel Manosalva Aceros",
    "ingeniero de sistemas",
    "desarrollador de software",
    "inteligencia artificial",
    "visión por computador",
    "analítica de datos",
    "React",
    "Next.js",
    "Python",
    "Bucaramanga",
    "Colombia",
  ],
} as const;

/** Person structured data (schema.org). Only emits links that are configured. */
export function buildPersonJsonLd(locale: Locale) {
  const sameAs = [personalLinks.linkedin, personalLinks.github].filter(
    (link): link is string => link.length > 0,
  );

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personal.fullName,
    alternateName: `${personal.firstName} ${personal.lastName}`,
    url: `${siteUrl}/${locale}`,
    jobTitle: personal.role[locale],
    description: seo.description[locale],
    knowsAbout: [
      "Software engineering",
      "Artificial intelligence",
      "Computer vision",
      "Data analytics",
      "Web development",
      "Software architecture",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Universidad Pontificia Bolivariana",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bucaramanga",
      addressCountry: "CO",
    },
    ...(personalLinks.email ? { email: `mailto:${personalLinks.email}` } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

/** CreativeWork entries for the project catalogue. */
export function buildProjectsJsonLd(
  locale: Locale,
  entries: { slug: string; name: L<string>; summary: L<string> }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: entries.map((project, position) => ({
      "@type": "ListItem",
      position: position + 1,
      item: {
        "@type": "CreativeWork",
        name: project.name[locale],
        description: project.summary[locale],
        url: `${siteUrl}/${locale}/projects/${project.slug}`,
        author: { "@type": "Person", name: personal.fullName },
      },
    })),
  };
}
