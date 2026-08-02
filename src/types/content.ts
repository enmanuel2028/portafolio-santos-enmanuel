/**
 * Shared content contracts.
 *
 * Every user-facing string in this project is bilingual. `L<T>` is the single
 * wrapper used for that: content files declare both locales side by side, and
 * components read them by indexing with the active locale (`value[locale]`).
 */

export type Locale = "es" | "en";

/** A value localized into every supported locale. */
export type L<T> = Record<Locale, T>;

/** Accent identity of a project — drives the per-project color treatment. */
export type AccentName =
  | "detection"
  | "intelligence"
  | "analytics"
  | "hydraulic"
  | "craft"
  | "arcade"
  | "terminal";

export type ProjectCategoryId =
  | "ai"
  | "computer-vision"
  | "data"
  | "web"
  | "architecture"
  | "game";

export interface ProjectLink {
  /** Demo / live site. Leave empty in `personal.ts` style constants until provided. */
  demoUrl?: string;
  repositoryUrl?: string;
}

export interface ProjectMetric {
  label: L<string>;
  value: string;
  /** Optional clarifier shown under the value, e.g. the metric definition. */
  note?: L<string>;
}

export interface ProjectSection {
  title: L<string>;
  body: L<string[]>;
}

export interface Project extends ProjectLink {
  slug: string;
  /** Display index, e.g. "01". Derived positions stay stable if order changes. */
  index: string;
  name: L<string>;
  role: L<string>;
  year?: string;
  summary: L<string>;
  description: L<string>;
  problem: L<string>;
  solution: L<string>;
  contribution: L<string[]>;
  technologies: string[];
  category: ProjectCategoryId[];
  accent: AccentName;
  /** Which generated visual to render. Maps to components/projects/visuals. */
  visual: VisualKind;
  /** Case-study long form. Rendered on /projects/[slug]. */
  caseStudy: {
    context: L<string>;
    objectives: L<string[]>;
    architecture: ProjectSection;
    process: ProjectSection;
    decisions: ProjectSection;
    challenges: ProjectSection;
    results: L<string[]>;
    learnings: L<string[]>;
    metrics?: ProjectMetric[];
  };
  /** Hides links/details that cannot be published. */
  confidential?: boolean;
  /** Clarifies whether this is an own product or work contributed to for someone else. */
  ownership?: "own" | "collaboration";
  /** Explicit delivery state when it is important to the case study. */
  status?: "ongoing" | "completed";
  /** Project-specific explanation when no public demo or repository exists. */
  linksNote?: L<string>;
  featured: boolean;
}

export type VisualKind =
  | "road-scan"
  | "document-pipeline"
  | "signal-board"
  | "well-strata"
  | "qr-cards"
  | "pixel-arena"
  | "local-core";

export interface SkillGroup {
  id: string;
  title: L<string>;
  description: L<string>;
  items: string[];
}

export interface TimelineEntry {
  id: string;
  period: L<string>;
  title: L<string>;
  organization?: L<string>;
  description: L<string>;
  tags: string[];
  /** Marks in-progress milestones so the UI can label them honestly. */
  ongoing?: boolean;
}

export interface LabEntry {
  id: string;
  command: string;
  title: L<string>;
  description: L<string>;
  status: "exploring" | "active" | "shipped";
  tags: string[];
}
