import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { TestimonialItem } from "@/lib/content/home";

type TestimonialsProps = {
  items: TestimonialItem[];
};

export function Testimonials({ items }: TestimonialsProps) {
  return (
    <section className="lw-testimonials lw-section" aria-labelledby="testimonials-title">
      <Container className="lw-stack lw-stack--lg">
        <SectionHeading
          eyebrow="Client love"
          title="What clients say"
          align="center"
          titleId="testimonials-title"
        />

        <div className="lw-testimonials__grid">
          {items.map((item) => (
            <blockquote key={item.id} className="lw-testimonials__item">
              <span className="lw-testimonials__mark" aria-hidden="true">
                “
              </span>
              <p>{item.quote}</p>
              <footer>
                <cite className="lw-testimonials__name">{item.name}</cite>
                <span className="lw-testimonials__role">{item.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
