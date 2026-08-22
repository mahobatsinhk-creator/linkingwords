import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import type { FinalCtaContent } from "@/lib/content/home";

type FinalCTAProps = {
  content: FinalCtaContent;
};

export function FinalCTA({ content }: FinalCTAProps) {
  return (
    <section className="lw-final-cta lw-section" aria-labelledby="final-cta-title">
      <Container className="lw-final-cta__inner">
        <p className="lw-eyebrow lw-final-cta__eyebrow">{content.eyebrow}</p>
        <h2 id="final-cta-title" className="lw-final-cta__title">
          {content.title}
        </h2>
        <p className="lw-final-cta__description">{content.description}</p>
        <div className="lw-final-cta__actions">
          <Button href={content.primaryCta.href} variant="light">
            {content.primaryCta.label}
          </Button>
          <Link href={`mailto:${content.email}`} className="lw-final-cta__email">
            Or email us at {content.email}
          </Link>
        </div>
      </Container>
    </section>
  );
}
