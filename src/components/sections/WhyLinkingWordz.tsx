import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { WhyBlock } from "@/lib/content/home";

type WhyLinkingWordzProps = {
  eyebrow: string;
  title: string;
  blocks: WhyBlock[];
};

export function WhyLinkingWordz({
  eyebrow,
  title,
  blocks,
}: WhyLinkingWordzProps) {
  return (
    <section className="lw-why lw-section" aria-labelledby="why-title">
      <Container className="lw-stack lw-stack--lg">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          align="center"
          titleId="why-title"
        />

        <div className="lw-why__grid">
          {blocks.map((block, index) => (
            <article key={block.id} className="lw-why__item">
              <span className="lw-why__num" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{block.title}</h3>
              <p>{block.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
