import { describe, expect, it } from "vitest";
import { projects, getProjectBySlug, getNextProject } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import { timeline } from "@/content/experience";
import { labEntries } from "@/content/lab";
import { locales } from "@/i18n/config";
import { dictionary } from "@/i18n/dictionary";

/**
 * These guard the content layer rather than the UI: the site is only as
 * trustworthy as the data behind it, and a missing translation or a duplicate
 * slug would ship silently otherwise.
 */

describe("projects", () => {
  it("has unique slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has unique display indexes", () => {
    const indexes = projects.map((p) => p.index);
    expect(new Set(indexes).size).toBe(indexes.length);
  });

  it("provides both locales for every translated field", () => {
    for (const project of projects) {
      for (const locale of locales) {
        expect(project.summary[locale], `${project.slug}.summary.${locale}`).toBeTruthy();
        expect(project.problem[locale], `${project.slug}.problem.${locale}`).toBeTruthy();
        expect(project.solution[locale], `${project.slug}.solution.${locale}`).toBeTruthy();
        expect(project.role[locale], `${project.slug}.role.${locale}`).toBeTruthy();
        expect(project.contribution[locale].length).toBeGreaterThan(0);
        expect(project.caseStudy.results[locale].length).toBeGreaterThan(0);
        expect(project.caseStudy.learnings[locale].length).toBeGreaterThan(0);
        expect(project.caseStudy.objectives[locale].length).toBeGreaterThan(0);
      }
    }
  });

  it("keeps contribution lists the same length across locales", () => {
    for (const project of projects) {
      expect(project.contribution.es.length, project.slug).toBe(project.contribution.en.length);
    }
  });

  it("declares at least one technology and category each", () => {
    for (const project of projects) {
      expect(project.technologies.length, project.slug).toBeGreaterThan(0);
      expect(project.category.length, project.slug).toBeGreaterThan(0);
    }
  });

  it("resolves a project by slug", () => {
    expect(getProjectBySlug("vialai")?.name).toBe("VialAI");
    expect(getProjectBySlug("does-not-exist")).toBeUndefined();
  });

  it("wraps around when finding the next project", () => {
    const last = projects[projects.length - 1];
    expect(last).toBeDefined();
    expect(getNextProject(last!.slug)?.slug).toBe(projects[0]?.slug);
  });

  it("never exposes links for confidential work", () => {
    for (const project of projects.filter((p) => p.confidential)) {
      expect(project.demoUrl, project.slug).toBeUndefined();
      expect(project.repositoryUrl, project.slug).toBeUndefined();
    }
  });
});

describe("supporting content", () => {
  it("translates every skill group", () => {
    for (const group of skillGroups) {
      for (const locale of locales) {
        expect(group.title[locale]).toBeTruthy();
        expect(group.description[locale]).toBeTruthy();
      }
      expect(group.items.length).toBeGreaterThan(0);
    }
  });

  it("translates every timeline entry", () => {
    for (const entry of timeline) {
      for (const locale of locales) {
        expect(entry.period[locale]).toBeTruthy();
        expect(entry.title[locale]).toBeTruthy();
        expect(entry.description[locale]).toBeTruthy();
      }
    }
  });

  it("translates every lab entry and uses a known status", () => {
    for (const entry of labEntries) {
      for (const locale of locales) {
        expect(entry.title[locale]).toBeTruthy();
        expect(entry.description[locale]).toBeTruthy();
      }
      expect(["exploring", "active", "shipped"]).toContain(entry.status);
    }
  });
});

describe("dictionary", () => {
  it("exposes the same key structure in both locales", () => {
    const shape = (value: unknown): unknown => {
      if (typeof value !== "object" || value === null) return typeof value;
      return Object.fromEntries(
        Object.entries(value)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([key, nested]) => [key, shape(nested)]),
      );
    };

    expect(shape(dictionary.en)).toEqual(shape(dictionary.es));
  });
});
