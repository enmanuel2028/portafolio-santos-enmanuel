import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/personal";
import { locales } from "@/i18n/config";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    entries.push({
      url: `${siteUrl}/${locale}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}`])),
      },
    });

    entries.push({
      url: `${siteUrl}/${locale}/projects`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });

    for (const project of projects) {
      entries.push({
        url: `${siteUrl}/${locale}/projects/${project.slug}`,
        lastModified: now,
        changeFrequency: "yearly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
