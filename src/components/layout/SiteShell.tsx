import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

type SiteShellProps = {
  children: ReactNode;
};

/**
 * Shared chrome for public pages — header + main + footer.
 */
export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="lw-site">
      <a className="lw-skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="lw-site__main">
        {children}
      </main>
      <Footer />
    </div>
  );
}
