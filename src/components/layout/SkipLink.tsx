/**
 * First tab stop on every page. Visually hidden until focused.
 */
export function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-[var(--color-ink)] focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-[var(--color-void)]"
    >
      {label}
    </a>
  );
}
