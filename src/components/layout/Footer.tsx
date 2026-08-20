import Link from "next/link";

import { Container } from "@/components/layout/Container";

/**
 * Footer shell only — visual design lands in a later phase.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="lw-footer">
      <Container className="lw-footer__inner">
        <p className="lw-footer__brand">
          <Link href="/">LinkingWordz</Link>
        </p>
        <p className="lw-footer__meta">
          © {year} LinkingWordz. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
