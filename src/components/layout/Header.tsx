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

/**
 * Header shell only — full visual design in a later phase.
 */
export function Header() {
  return (
    <header className="lw-header">
      <Container className="lw-header__inner">
        <Link href="/" className="lw-header__brand" aria-label="LinkingWordz home">
          LinkingWordz
        </Link>
        <nav className="lw-header__nav" aria-label="Primary">
          <ul className="lw-header__list">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
