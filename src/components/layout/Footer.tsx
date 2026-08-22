import Link from "next/link";

import { Container } from "@/components/layout/Container";

const exploreLinks = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
] as const;

const serviceLinks = [
  { href: "/services/authors", label: "For authors" },
  { href: "/services/brands", label: "For brands" },
  { href: "/services", label: "All services" },
] as const;

/** Shared footer for public pages. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="lw-footer">
      <Container className="lw-footer__inner">
        <div className="lw-footer__main">
          <div className="lw-footer__intro">
            <Link href="/" className="lw-footer__brand" aria-label="LinkingWordz home">
              Linking<span>Wordz</span>
            </Link>
            <p className="lw-footer__statement">
              The right words find the right clients. Content and editorial services
              for authors and service businesses.
            </p>
            <Link href="/contact" className="lw-footer__contact-link">
              Start a conversation <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <nav className="lw-footer__nav" aria-label="Explore">
            <p className="lw-footer__label">Explore</p>
            <ul>
              {exploreLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lw-footer__nav" aria-label="Services">
            <p className="lw-footer__label">Services</p>
            <ul>
              {serviceLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="lw-footer__bottom">
          <p>© {year} LinkingWordz. All rights reserved.</p>
          <p>Content, editorial &amp; words that connect.</p>
        </div>
      </Container>
    </footer>
  );
}
