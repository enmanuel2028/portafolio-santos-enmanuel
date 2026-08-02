import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TagProps {
  children: ReactNode;
  className?: string;
  /** Uses the ambient --accent instead of the neutral treatment. */
  accent?: boolean;
}

/** Small technical label used for technologies, categories and statuses. */
export function Tag({ children, className, accent = false }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-wide",
        accent
          ? "border-[var(--accent)]/35 bg-[var(--accent)]/10 text-[var(--accent)]"
          : "border-[var(--color-line)] bg-white/[0.02] text-[var(--color-muted)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
