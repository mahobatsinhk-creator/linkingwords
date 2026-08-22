import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "light";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

/**
 * Shared CTA control — sharp editorial corners, token colors.
 */
export function Button({
  href,
  children,
  variant = "primary",
  className,
}: ButtonProps) {
  const classes = ["lw-btn", `lw-btn--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <Link href={href} className={classes}>
      <span>{children}</span>
      <span className="lw-btn__arrow" aria-hidden="true">
        →
      </span>
    </Link>
  );
}
