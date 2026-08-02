import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import type { Locale } from "@/types/content";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { seo, buildPersonJsonLd } from "@/content/seo";
import { siteUrl } from "@/content/personal";
import { ExperienceProvider } from "@/components/providers/ExperienceProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { Preloader } from "@/components/layout/Preloader";
import { Cursor } from "@/components/layout/Cursor";
import { Overlays } from "@/components/layout/Overlays";
import "../globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500"],
});

/** Both locales are prerendered at build time. */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#05070d",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "es";

  const title = seo.title[locale];
  const description = seo.description[locale];
  const url = `${siteUrl}/${locale}`;

  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: `%s | Santos Enmanuel` },
    description,
    applicationName: "Santos Enmanuel — Portfolio",
    authors: [{ name: "Santos Enmanuel Manosalva Aceros" }],
    creator: "Santos Enmanuel Manosalva Aceros",
    keywords: [...seo.keywords],
    formatDetection: { telephone: false },
    alternates: {
      canonical: url,
      languages: {
        es: `${siteUrl}/es`,
        en: `${siteUrl}/en`,
        "x-default": `${siteUrl}/es`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_CO" : "en_US",
      alternateLocale: locale === "es" ? "en_US" : "es_CO",
      url,
      siteName: "Santos Enmanuel",
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  const locale: Locale = raw;
  const dict = getDictionary(locale);

  return (
    <html
      lang={locale}
      // `data-motion` / `data-quality` are written by ExperienceProvider after
      // hydration; without this React warns about the attribute mismatch.
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">
        <ExperienceProvider>
          <SkipLink label={dict.common.skipToContent} />
          <Preloader dict={dict} />
          <Cursor />
          <Overlays />

          <Navbar locale={locale} dict={dict} />
          {children}
          <Footer locale={locale} dict={dict} />
        </ExperienceProvider>

        <script
          type="application/ld+json"
          // Structured data is static, generated from our own content module.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildPersonJsonLd(locale)) }}
        />
      </body>
    </html>
  );
}
