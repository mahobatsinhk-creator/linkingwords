import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { SiteShell } from "@/components/layout/SiteShell";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Page not found",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <SiteShell>
      <section className="lw-section">
        <Container className="lw-stack lw-stack--lg">
          <div className="lw-stack">
            <p className="lw-eyebrow">404</p>
            <h1>Page not found</h1>
            <p className="lw-lede">
              The page you are looking for does not exist or may have moved.
            </p>
          </div>
          <p>
            <Link href="/">Return home</Link>
          </p>
        </Container>
      </section>
    </SiteShell>
  );
}
