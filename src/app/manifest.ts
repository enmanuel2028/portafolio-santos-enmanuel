import type { MetadataRoute } from "next";
import { seo } from "@/content/seo";
import { defaultLocale } from "@/i18n/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Santos Enmanuel — Software, IA y Datos",
    short_name: "Santos Enmanuel",
    description: seo.description[defaultLocale],
    start_url: `/${defaultLocale}`,
    display: "standalone",
    background_color: "#05070d",
    theme_color: "#05070d",
    lang: defaultLocale,
    // `/icon.svg` is served from `public/`; the App Router also emits its own
    // `icon`/`apple-icon` routes which Next links in <head> automatically.
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
