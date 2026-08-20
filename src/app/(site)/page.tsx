import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { homeHeroContent, homeTrustStats } from "@/lib/content/home";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Home",
  path: "/",
  description:
    "The right words find the right clients. Content and editorial services for authors and service businesses.",
});

/**
 * Homepage — hero + credentials strip only (pending approval before more sections).
 * Content is centralized in lib/content/home.ts for future WordPress ACF mapping.
 */
export default function HomePage() {
  return (
    <>
      <Hero content={homeHeroContent} />
      <TrustStrip stats={homeTrustStats} />
    </>
  );
}
