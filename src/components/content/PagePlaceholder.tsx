import { Container } from "@/components/layout/Container";

type PagePlaceholderProps = {
  title: string;
  description?: string;
};

/**
 * Temporary route shell for Phase 1 — no homepage/marketing sections yet.
 */
export function PagePlaceholder({
  title,
  description = "This route is scaffolded. Content and design arrive in a later phase.",
}: PagePlaceholderProps) {
  return (
    <section className="lw-section">
      <Container className="lw-stack lw-stack--lg">
        <div className="lw-stack">
          <p className="lw-eyebrow">Phase 1 foundation</p>
          <h1>{title}</h1>
          <p className="lw-lede">{description}</p>
        </div>
        <div className="lw-placeholder" aria-hidden="true">
          <p className="lw-placeholder__label">Content placeholder</p>
        </div>
      </Container>
    </section>
  );
}
