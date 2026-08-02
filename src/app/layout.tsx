/**
 * Pass-through root layout.
 *
 * The real document shell lives in `app/[locale]/layout.tsx`, because `<html
 * lang>` has to reflect the active locale and only that segment knows it.
 * This file exists so `/` (which redirects) has a layout to resolve against.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
