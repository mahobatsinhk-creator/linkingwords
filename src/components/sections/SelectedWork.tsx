import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { CaseStudyTeaser } from "@/lib/content/home";

type SelectedWorkProps = {
  eyebrow: string;
  title: string;
  caseStudy: CaseStudyTeaser;
};

export function SelectedWork({
  eyebrow,
  title,
  caseStudy,
}: SelectedWorkProps) {
  return (
    <section className="lw-work lw-section" aria-labelledby="work-title">
      <Container className="lw-stack lw-stack--lg">
        <SectionHeading eyebrow={eyebrow} title={title} titleId="work-title" />

        <article className="lw-work__feature">
          <div className="lw-work__visual" aria-hidden="true">
            <span className="lw-work__mark">Work</span>
          </div>
          <div className="lw-work__content">
            <p className="lw-work__client">{caseStudy.client}</p>
            <h3 className="lw-work__title">{caseStudy.title}</h3>
            <p className="lw-work__role">{caseStudy.role}</p>
            <Link href={caseStudy.href} className="lw-work__cta">
              {caseStudy.ctaLabel}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </article>
      </Container>
    </section>
  );
}
