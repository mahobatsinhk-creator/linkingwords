import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import type { FounderContent } from "@/lib/content/home";

type FounderProps = {
  content: FounderContent;
};

export function Founder({ content }: FounderProps) {
  return (
    <section className="lw-founder lw-section" aria-labelledby="founder-title">
      <Container>
        <div className="lw-founder__layout">
          <figure className="lw-founder__figure">
            <Image
              src={content.imageSrc}
              alt={content.imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px"
              className="lw-founder__photo"
            />
          </figure>

          <div className="lw-founder__copy">
            <p className="lw-eyebrow">{content.eyebrow}</p>
            <h2 id="founder-title" className="lw-founder__title">
              {content.title}
            </h2>
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="lw-founder__text">
                {paragraph}
              </p>
            ))}
            <p className="lw-founder__credentials">{content.credentials}</p>
            <Button href={content.cta.href}>{content.cta.label}</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
