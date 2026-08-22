import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

type InsightsTeaserProps = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
};

/**
 * Insights shell — posts load from WordPress in a later phase.
 */
export function InsightsTeaser({
  eyebrow,
  title,
  description,
  href,
  ctaLabel,
}: InsightsTeaserProps) {
  return (
    <section className="lw-insights lw-section" aria-labelledby="insights-title">
      <Container className="lw-insights__inner">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          titleId="insights-title"
        />
        <Button href={href} variant="ghost">
          {ctaLabel}
        </Button>
      </Container>
    </section>
  );
}
