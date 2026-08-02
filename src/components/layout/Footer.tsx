import Link from "next/link";
import type { Locale } from "@/types/content";
import type { Dictionary } from "@/i18n/dictionary";
import { personal } from "@/content/personal";
import { buildNavItems } from "@/lib/navigation";
import { Monogram } from "@/components/ui/Monogram";

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

export function Footer({ locale, dict }: FooterProps) {
  const items = buildNavItems(locale, dict);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-deep)]">
      <div className="container-page py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5 text-[var(--color-ink)]">
              <Monogram className="h-7 w-7" />
              <span className="font-[family-name:var(--font-display)] text-base">
                {personal.fullName}
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[var(--color-muted)]">
              {dict.footer.built}
            </p>
          </div>

          <nav aria-label={dict.nav.home}>
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2.5 sm:grid-cols-3 md:grid-cols-2">
              {items.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
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
