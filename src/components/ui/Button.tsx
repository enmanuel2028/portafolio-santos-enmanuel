"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { duration, ease } from "@/lib/motion-tokens";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 " +
  "focus-visible:outline-[var(--color-electric)] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-ink)] text-[var(--color-void)] hover:bg-white " +
    "shadow-[0_0_0_1px_rgba(248,250,252,0.1)]",
  secondary:
    "border border-[var(--color-line-strong)] bg-white/[0.02] text-[var(--color-ink)] " +
    "hover:border-[var(--accent)] hover:bg-white/[0.05]",
  ghost: "text-[var(--color-muted)] hover:text-[var(--color-ink)]",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[0.95rem]",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

/** Hover/press feedback shared by both the link and button forms. */
const interaction = {
  whileHover: { y: -2 },
  whileTap: { y: 0, scale: 0.985 },
  transition: { duration: duration.hover, ease: ease.out },
};

/**
 * Motion redefines the drag/animation event handlers, so the native button
 * props are taken from `HTMLMotionProps` rather than React's DOM types.
 */
type ButtonProps = CommonProps & Omit<HTMLMotionProps<"button">, keyof CommonProps | "ref">;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      {...interaction}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}

interface ButtonLinkProps extends CommonProps {
  href: string;
  /** Set for outbound links: adds target/rel and keeps screen readers informed. */
  external?: boolean;
  download?: boolean;
  "aria-label"?: string;
}

export function ButtonLink({
  href,
  external = false,
  download = false,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (external) {
    return (
      <motion.a
        {...interaction}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  if (download) {
    return (
      <motion.a {...interaction} href={href} download className={classes} {...props}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.span {...interaction} className="inline-flex">
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    </motion.span>
  );
}
