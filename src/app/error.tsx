"use client";

import { useEffect } from "react";

import { Container } from "@/components/layout/Container";
import { SiteShell } from "@/components/layout/SiteShell";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <SiteShell>
      <section className="lw-section">
        <Container className="lw-stack lw-stack--lg">
          <div className="lw-stack">
            <p className="lw-eyebrow">Error</p>
            <h1>Something went wrong</h1>
            <p className="lw-lede">
              We could not load this page. Please try again.
            </p>
          </div>
          <button type="button" className="lw-button" onClick={reset}>
            Try again
          </button>
        </Container>
      </section>
    </SiteShell>
  );
}
