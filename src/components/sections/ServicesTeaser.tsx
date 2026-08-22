import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ServiceTeaser } from "@/lib/content/home";

type ServicesTeaserProps = {
  eyebrow: string;
  title: string;
  description: string;
  services: ServiceTeaser[];
};

export function ServicesTeaser({
  eyebrow,
  title,
  description,
  services,
}: ServicesTeaserProps) {
  return (
    <section className="lw-services lw-section" aria-labelledby="services-title">
      <Container className="lw-stack lw-stack--lg">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          titleId="services-title"
        />

        <div className="lw-services__grid">
          {services.map((service) => (
            <Link key={service.id} href={service.href} className="lw-services__row">
              <span className="lw-services__audience">{service.audience}</span>
              <h3 className="lw-services__name">{service.title}</h3>
              <span className="lw-services__go" aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
