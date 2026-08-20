import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  as?: "div" | "section" | "article" | "main" | "header" | "footer";
  width?: "default" | "wide" | "narrow";
  className?: string;
};

const widthClass = {
  default: "lw-container",
  wide: "lw-container lw-container--wide",
  narrow: "lw-container lw-container--narrow",
} as const;

/**
 * Shared page container — widths come from design tokens.
 */
export function Container({
  children,
  as: Tag = "div",
  width = "default",
  className,
}: ContainerProps) {
  const classes = [widthClass[width], className].filter(Boolean).join(" ");

  return <Tag className={classes}>{children}</Tag>;
}
