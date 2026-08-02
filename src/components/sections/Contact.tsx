"use client";

import { motion } from "motion/react";
import type { ComponentType, SVGProps } from "react";
import { Download, Mail, MessageCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import type { Locale } from "@/types/content";
import type { Dictionary } from "@/i18n/dictionary";
import { personal, personalLinks } from "@/content/personal";
import { ButtonLink } from "@/components/ui/Button";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { duration, ease, stagger, viewportOnce } from "@/lib/motion-tokens";

interface ContactProps {
  locale: Locale;
  dict: Dictionary;
}

export function Contact({ locale, dict }: ContactProps) {
  const { motionEnabled } = useExperience();

  /**
   * Only configured channels are rendered. An unset link never becomes a
   * dead button — see `src/content/personal.ts`.
   */
  const channels = [
    personalLinks.email && {
      key: "email",
      href: `mailto:${personalLinks.email}`,
      label: dict.contact.email,
      Icon: Mail,
      external: false,
      primary: true,
    },
    personalLinks.linkedin && {
      key: "linkedin",
      href: personalLinks.linkedin,
      label: dict.contact.linkedin,
      Icon: LinkedinIcon,
      external: true,
      primary: false,
    },
    personalLinks.github && {
      key: "github",
      href: personalLinks.github,
      label: dict.contact.github,
      Icon: GithubIcon,
      external: true,
      primary: false,
    },
    personalLinks.whatsapp && {
      key: "whatsapp",
      href: personalLinks.whatsapp,
      label: dict.contact.whatsapp,
      Icon: MessageCircle,
      external: true,
      primary: false,
    },
  ].filter(Boolean) as {
    key: string;
    href: string;
    label: string;
    /** Lucide icons and the inline brand marks share this signature. */
    Icon: ComponentType<SVGProps<SVGSVGElement>>;
    external: boolean;
    primary: boolean;
  }[];

  const list = {
    hidden: {},
    visible: { transition: { staggerChildren: motionEnabled ? stagger.normal : 0 } },
  };

  const item = motionEnabled
    ? {
        hidden: { opacity: 0, y: 22 },
        visible: { opacity: 1, y: 0, transition: { duration: duration.enter, ease: ease.out } },
      }
    : {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
      };

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-padding relative">
      {/* Ambient glow anchors the end of the page. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-line-strong)] to-transparent"
      />
      <div className="bg-radial-glow pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="container-page relative">
        <motion.div
          variants={list}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex max-w-3xl flex-col gap-7"
        >
          <motion.p variants={item} className="mono-label flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-[var(--accent)]" />
            {dict.contact.eyebrow}
          </motion.p>

          <motion.h2
            variants={item}
            id="contact-title"
            className="text-gradient text-4xl leading-[1.05] sm:text-5xl lg:text-6xl"
          >
            {dict.contact.title}
          </motion.h2>

          <motion.p
            variants={item}
            className="max-w-2xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg"
          >
            {dict.contact.description}
          </motion.p>

          <motion.p variants={item} className="mono-label">
            {personal.location[locale]} · {personal.availability[locale]}
          </motion.p>

          {channels.length > 0 || personalLinks.cv ? (
            <motion.div variants={item} className="mt-2 flex flex-wrap items-center gap-3">
              {channels.map(({ key, href, label, Icon, external, primary }) => (
                <ButtonLink
                  key={key}
                  href={href}
                  external={external}
                  variant={primary ? "primary" : "secondary"}
                  size="lg"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {label}
                </ButtonLink>
              ))}

              {personalLinks.cv ? (
                <ButtonLink href={personalLinks.cv} variant="secondary" size="lg" download>
                  <Download className="h-4 w-4" aria-hidden="true" />
                  {dict.contact.cv}
                </ButtonLink>
              ) : null}
            </motion.div>
          ) : (
            // Honest empty state instead of buttons that go nowhere.
            <motion.p
              variants={item}
              className="mt-2 max-w-xl rounded-xl border border-dashed border-[var(--color-line-strong)] p-5 text-sm leading-relaxed text-[var(--color-muted)]"
            >
              {dict.contact.pending}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
