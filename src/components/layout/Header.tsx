import Link from "next/link";

import { Container } from "@/components/layout/Container";

/** Six fixed primary links — architecture Section J / T. */
const navItems = [
  { href: "/about", label: "About" },
  { href: "/services/authors", label: "Authors" },
  { href: "/services/brands", label: "Brands" },
  { href: "/work", label: "Work" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
] as const;

function Navigation({ mobile = false }: { mobile?: boolean }) {
  return (
    <nav
      className={mobile ? "lw-header__mobile-nav" : "lw-header__nav"}
      aria-label={mobile ? "Mobile primary" : "Primary"}
    >
      <ul className="lw-header__list">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * Shared site header with a CSS/native-details mobile menu.
 * Keeping the menu server-rendered avoids adding client JavaScript to every page.
 */
export function Header() {
  return (
    <header className="lw-header">
      <Container className="lw-header__inner">
        <Link href="/" className="lw-header__brand" aria-label="LinkingWordz home">
          <span className="lw-header__brand-mark" aria-hidden="true">
            l
          </span>
          <span>
            Linking<span className="lw-header__brand-accent">Wordz</span>
          </span>
        </Link>

        <div className="lw-header__desktop-actions">
          <Navigation />
          <Link href="/contact" className="lw-header__cta">
            <span>Book a call</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <details className="lw-header__mobile-menu">
          <summary aria-label="Open navigation menu">
            <span className="lw-header__menu-label">Menu</span>
            <span className="lw-header__menu-icon" aria-hidden="true">
              +
            </span>
          </summary>
          <div className="lw-header__mobile-panel">
            <Navigation mobile />
            <Link href="/contact" className="lw-header__mobile-cta">
              <span>Book a free discovery call</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </details>
      </Container>
    </header>
  );
}
