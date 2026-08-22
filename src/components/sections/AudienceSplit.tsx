import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import type { AudienceCard, AudienceSectionContent } from "@/lib/content/home";

type AudienceSplitProps = {
  content: AudienceSectionContent;
};

function CardIcon({ type }: { type: AudienceCard["icon"] }) {
  if (type === "book") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="lw-audience__card-icon-svg">
        <path
          d="M5 4.5h7a3 3 0 0 1 3 3V19.5H8a3 3 0 0 1-3-3V4.5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M9 4.5h7a3 3 0 0 1 3 3V19.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="lw-audience__card-icon-svg">
      <rect
        x="4"
        y="7"
        width="16"
        height="12"
        rx="1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M9 7V5.5A2.5 2.5 0 0 1 11.5 3h1A2.5 2.5 0 0 1 15 5.5V7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function HighlightIcon({
  type,
}: {
  type: AudienceCard["highlights"][number]["icon"];
}) {
  const stroke = 1.5;

  switch (type) {
    case "readers":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M7 4.5h10v15l-5-2.75L7 19.5V4.5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinejoin="round"
          />
        </svg>
      );
    case "authority":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M5 10.5 12 7.5l7 3v4l-7 3-7-3v-4Z"
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinejoin="round"
          />
          <path d="M19 10.5v4" fill="none" stroke="currentColor" strokeWidth={stroke} />
        </svg>
      );
    case "amplify":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M5 16.5V8.5h4v8M11 16.5V5.5h4v11M17 16.5v-6h4v6"
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinecap="round"
          />
          <path d="M4 18.5h16" fill="none" stroke="currentColor" strokeWidth={stroke} />
        </svg>
      );
    case "audience":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M5 16.5V8.5h4v8M11 16.5V5.5h4v11M17 16.5v-6h4v6"
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinecap="round"
          />
          <path d="M4 18.5h16" fill="none" stroke="currentColor" strokeWidth={stroke} />
        </svg>
      );
    case "trust":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M9.5 11.5h5M9.5 8.5h5"
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinecap="round"
          />
          <path
            d="M8.5 6.5h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Z"
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
          />
        </svg>
      );
    case "clarity":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M6.5 18.5h11"
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinecap="round"
          />
          <path
            d="M7.5 5.5 12 4.5l4.5 1v10.5H7.5V5.5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinejoin="round"
          />
          <path d="M10 9.5h4M10 12.5h4" fill="none" stroke="currentColor" strokeWidth={stroke} />
        </svg>
      );
    default:
      return null;
  }
}

export function AudienceSplit({ content }: AudienceSplitProps) {
  const { label, title, description, cards, banner } = content;

  return (
    <section className="lw-audience lw-section" aria-labelledby="audience-title">
      <span className="lw-audience__dots lw-audience__dots--left" aria-hidden="true" />
      <span className="lw-audience__dots lw-audience__dots--right" aria-hidden="true" />
      <span className="lw-audience__waves" aria-hidden="true" />

      <Container>
        <div className="lw-audience__header">
          <p className="lw-audience__label">
            <span className="lw-audience__label-line" aria-hidden="true" />
            <span>{label}</span>
            <span className="lw-audience__label-line" aria-hidden="true" />
          </p>
          <h2 id="audience-title" className="lw-audience__headline">
            {title.parts.map((part, index) =>
              part.accent ? (
                <em key={index}>{part.text}</em>
              ) : (
                <span key={index}>{part.text}</span>
              ),
            )}
          </h2>
          <p className="lw-audience__intro">{description}</p>
        </div>

        <div className="lw-audience__cards-wrap">
          <div className="lw-audience__cards">
            {cards.map((card) => (
              <article
                key={card.id}
                className={`lw-audience__card lw-audience__card--${card.tone}`}
              >
                <div className="lw-audience__card-panel">
                  <span className="lw-audience__card-icon" aria-hidden="true">
                    <CardIcon type={card.icon} />
                  </span>
                  <h3 className="lw-audience__card-title">{card.title}</h3>
                  <p className="lw-audience__card-description">{card.description}</p>
                  <ul className="lw-audience__highlights">
                    {card.highlights.map((item) => (
                      <li key={item.text}>
                        <span className="lw-audience__highlight-icon" aria-hidden="true">
                          <HighlightIcon type={item.icon} />
                        </span>
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={card.href} className="lw-audience__card-cta">
                    {card.ctaLabel}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>

                <figure className="lw-audience__card-photo">
                  <Image
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, 38vw"
                    className="lw-audience__photo"
                  />
                </figure>
              </article>
            ))}
          </div>

        </div>

        <aside className="lw-audience__banner">
          <div className="lw-audience__banner-copy">
            <span className="lw-audience__banner-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path
                  d="M5 10.5a7 7 0 0 1 14 0v2.2c0 1.2-.4 2.3-1.1 3.2l-1.4 1.8H7.5l-1.4-1.8c-.7-.9-1.1-2-1.1-3.2V10.5Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
                <path d="M10 18.5h4" fill="none" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </span>
            <p>
              {banner.text}{" "}
              <Link href={banner.href}>{banner.highlight}</Link> {banner.suffix}
            </p>
          </div>
          <Link href={banner.href} className="lw-audience__banner-cta">
            {banner.ctaLabel}
            <span aria-hidden="true">→</span>
          </Link>
        </aside>
      </Container>
    </section>
  );
}
