import { redirect } from "next/navigation";
import { defaultLocale } from "@/i18n/config";

/** The site always lives under a locale segment; `/` resolves to the default. */
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
