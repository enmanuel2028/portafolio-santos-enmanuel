import Link from "next/link";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

/**
 * Locale-scoped 404. Uses the default locale copy because a missing route
 * gives us no reliable locale to read.
 */
export default function NotFound() {
  const dict = getDictionary(defaultLocale);

  return (
    <main id="main" className="flex min-h-[80svh] items-center">
      <div className="container-page flex flex-col items-start gap-6">
        <p className="mono-label">404</p>
        <h1 className="text-gradient font-[family-name:var(--font-display)] text-4xl sm:text-5xl">
          {dict.notFound.title}
        </h1>
        <p className="max-w-md text-[var(--color-muted)]">{dict.notFound.description}</p>
        <Link
          href={`/${defaultLocale}`}
          className="inline-flex h-11 items-center rounded-full bg-[var(--color-ink)] px-5 text-sm font-medium text-[var(--color-void)] transition-colors hover:bg-white"
        >
          {dict.notFound.action}
        </Link>
      </div>
    </main>
  );
}
