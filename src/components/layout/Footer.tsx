import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, MessageCircle } from "lucide-react";
import type { Locale } from "@/types/content";
import type { Dictionary } from "@/i18n/dictionary";
import { personal, personalLinks } from "@/content/personal";
import { buildNavItems } from "@/lib/navigation";
import { Monogram } from "@/components/ui/Monogram";
import { GithubIcon } from "@/components/ui/BrandIcons";

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

export function Footer({ locale, dict }: FooterProps) {
  const items = buildNavItems(locale, dict);
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-[var(--color-line)] bg-[var(--color-deep)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-electric)]/50 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 -top-32 size-72 rounded-full bg-[var(--color-electric)]/[0.05] blur-[90px]" aria-hidden="true" />

      <div className="container-page relative py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-16">
          <div className="flex max-w-md flex-col gap-4">
            <div className="flex items-center gap-2.5 text-[var(--color-ink)]">
              <Monogram className="h-7 w-7" />
              <span className="font-[family-name:var(--font-display)] text-base">{personal.fullName}</span>
            </div>
            <p className="text-sm leading-relaxed text-[var(--color-muted)]">{dict.footer.built}</p>
            <p className="inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[0.65rem] tracking-[0.12em] text-[var(--color-faint)] uppercase">
              <MapPin className="size-3.5 text-[var(--color-electric)]" aria-hidden="true" />
              {personal.location[locale]}
            </p>
          </div>

          <div className="flex flex-col gap-7 lg:items-end">
            <div>
              <p className="mono-label mb-3 lg:text-right">{dict.footer.contactEyebrow}</p>
              <div className="flex flex-wrap gap-2.5 lg:justify-end">
                <a href={`mailto:${personalLinks.email}`} className="group inline-flex max-w-full items-center gap-2.5 rounded-full border border-[var(--color-line-strong)] bg-white/[0.025] px-4 py-2.5 text-sm transition-colors hover:border-[var(--color-electric)]/55 hover:text-[var(--color-electric)]">
                  <Mail className="size-4 shrink-0" aria-hidden="true" />
                  <span className="truncate">{personalLinks.email}</span>
                  <ArrowUpRight className="size-3.5 shrink-0 text-[var(--color-faint)]" aria-hidden="true" />
                </a>
                <a href={personalLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line-strong)] bg-white/[0.025] px-4 py-2.5 text-sm transition-colors hover:border-[var(--color-success)]/55 hover:text-[var(--color-success)]">
                  <MessageCircle className="size-4" aria-hidden="true" />
                  {dict.contact.whatsapp}
                </a>
                <a href={personalLinks.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line-strong)] bg-white/[0.025] px-4 py-2.5 text-sm transition-colors hover:border-white/35">
                  <GithubIcon className="size-4" />
                  GitHub
                </a>
              </div>
            </div>

            <nav aria-label={dict.footer.navigation}>
              <ul className="grid grid-cols-2 gap-x-10 gap-y-2.5 sm:grid-cols-3">
                {items.map((item) => (
                  <li key={item.id}>
                    <Link href={item.href} className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-[var(--color-line)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-[family-name:var(--font-mono)] text-[0.7rem] tracking-wide text-[var(--color-faint)]">
            {dict.footer.credit}
          </p>
          <p className="font-[family-name:var(--font-mono)] text-[0.7rem] tracking-wide text-[var(--color-faint)]">
            © {year} · {dict.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
