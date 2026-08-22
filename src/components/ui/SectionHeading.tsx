type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  titleId?: string;
};

/**
 * Shared section heading — editorial hierarchy from design tokens.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  titleId,
}: SectionHeadingProps) {
  const classes = [
    "lw-section-heading",
    align === "center" ? "lw-section-heading--center" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={classes}>
      {eyebrow ? <p className="lw-section-heading__eyebrow">{eyebrow}</p> : null}
      <h2 id={titleId} className="lw-section-heading__title">
        {title}
      </h2>
      {description ? (
        <p className="lw-section-heading__description">{description}</p>
      ) : null}
    </header>
  );
}
