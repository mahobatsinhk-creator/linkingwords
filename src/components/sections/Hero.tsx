import Image from "next/image";

import { Button } from "@/components/ui/Button";
import type { HeroContent } from "@/lib/content/home";

type HeroProps = {
  content: HeroContent;
};

export function Hero({ content }: HeroProps) {
  const { eyebrow, headline, description, primaryCta, secondaryCta, founder } =
    content;

  return (
    <section className="lw-hero" aria-labelledby="hero-heading">
      <div className="lw-hero__inner">
        <div className="lw-hero__copy">
          <p className="lw-hero__eyebrow">
            <span>{eyebrow}</span>
            <span className="lw-hero__eyebrow-rule" aria-hidden="true" />
          </p>

          <h1 id="hero-heading" className="lw-hero__title">
            {headline.parts.map((part, index) =>
              part.accent ? (
                <em key={index}>{part.text}</em>
              ) : (
                <span key={index}>{part.text}</span>
              ),
            )}
          </h1>

          <p className="lw-hero__description">{description}</p>

          <div className="lw-hero__actions">
            <Button href={primaryCta.href}>{primaryCta.label}</Button>
            <Button href={secondaryCta.href} variant="ghost">
              {secondaryCta.label}
            </Button>
          </div>
        </div>

        <div className="lw-hero__visual">
          <div className="lw-hero__deco-word" aria-hidden="true">
            Words
          </div>
          <div className="lw-hero__arc" aria-hidden="true" />

          <figure className="lw-hero__portrait">
            <Image
              src={founder.imageSrc}
              alt={founder.imageAlt}
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 55vw, 520px"
              className="lw-hero__photo"
            />
          </figure>

          <aside className="lw-hero__founder-card">
            <p className="lw-hero__founder-name">{founder.name}</p>
            <p className="lw-hero__founder-role">{founder.role}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
