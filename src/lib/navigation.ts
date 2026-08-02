import type { Dictionary } from "@/i18n/dictionary";

/** Section ids used both as anchor targets and scroll-spy keys. */
export const sectionIds = [
  "home",
  "about",
  "projects",
  "experience",
  "skills",
  "lab",
  "contact",
] as const;

export type SectionId = (typeof sectionIds)[number];

export interface NavItem {
  id: SectionId;
  href: string;
  label: string;
}

/**
 * Nav items are built per-locale so the anchors always point at the
 * locale-prefixed home route, which keeps deep links working from any page.
 */
export function buildNavItems(locale: string, dict: Dictionary): NavItem[] {
  const home = `/${locale}`;
  return [
    { id: "home", href: home, label: dict.nav.home },
    { id: "about", href: `${home}#about`, label: dict.nav.about },
    { id: "projects", href: `${home}#projects`, label: dict.nav.projects },
    { id: "experience", href: `${home}#experience`, label: dict.nav.experience },
    { id: "skills", href: `${home}#skills`, label: dict.nav.skills },
    { id: "lab", href: `${home}#lab`, label: dict.nav.lab },
    { id: "contact", href: `${home}#contact`, label: dict.nav.contact },
  ];
}
