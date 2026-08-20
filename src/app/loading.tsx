import { Container } from "@/components/layout/Container";

export default function Loading() {
  return (
    <section className="lw-section" aria-busy="true" aria-live="polite">
      <Container>
        <p className="lw-eyebrow">Loading</p>
        <p className="lw-lede">Preparing content…</p>
      </Container>
    </section>
  );
}
