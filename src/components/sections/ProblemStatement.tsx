import { Container } from "@/components/layout/Container";
import type { ProblemContent } from "@/lib/content/home";

type ProblemStatementProps = {
  content: ProblemContent;
};

export function ProblemStatement({ content }: ProblemStatementProps) {
  return (
    <section className="lw-problem lw-section" aria-labelledby="problem-title">
      <Container>
        <div className="lw-problem__layout">
          <div className="lw-problem__intro">
            <p className="lw-eyebrow">{content.eyebrow}</p>
            <h2 id="problem-title" className="lw-problem__headline">
              {content.headline}
            </h2>
            <p className="lw-problem__subhead">{content.subhead}</p>
          </div>

          <ul className="lw-problem__grid">
            {content.problems.map((problem, index) => (
              <li key={problem} className="lw-problem__item">
                <span className="lw-problem__index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p>{problem}</p>
              </li>
            ))}
          </ul>
        </div>

        <p className="lw-problem__closing">{content.closing}</p>
      </Container>
    </section>
  );
}
