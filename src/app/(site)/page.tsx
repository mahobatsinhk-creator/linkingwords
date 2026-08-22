import { AudienceSplit } from "@/components/sections/AudienceSplit";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Founder } from "@/components/sections/Founder";
import { Hero } from "@/components/sections/Hero";
import { InsightsTeaser } from "@/components/sections/InsightsTeaser";
import { ProblemStatement } from "@/components/sections/ProblemStatement";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { ServicesTeaser } from "@/components/sections/ServicesTeaser";
import { Testimonials } from "@/components/sections/Testimonials";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { WhyLinkingWordz } from "@/components/sections/WhyLinkingWordz";
import {
  homeAudienceContent,
  homeFinalCta,
  homeFounderContent,
  homeHeroContent,
  homeInsightsTeaser,
  homeProblemContent,
  homeSelectedWork,
  homeServicesTeaser,
  homeTestimonials,
  homeTrustStats,
  homeWhyContent,
} from "@/lib/content/home";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Home",
  path: "/",
  description:
    "The right words find the right clients. Content and editorial services for authors and service businesses.",
});

/**
 * Homepage sections — content centralized in lib/content/home.ts for WordPress ACF mapping.
 * Process section omitted (architecture: [TO CONFIRM]).
 */
export default function HomePage() {
  return (
    <>
      <Hero content={homeHeroContent} />
      <TrustStrip stats={homeTrustStats} />
      <AudienceSplit content={homeAudienceContent} />
      <ProblemStatement content={homeProblemContent} />
      <ServicesTeaser
        eyebrow={homeServicesTeaser.eyebrow}
        title={homeServicesTeaser.title}
        description={homeServicesTeaser.description}
        services={homeServicesTeaser.services}
      />
      <WhyLinkingWordz
        eyebrow={homeWhyContent.eyebrow}
        title={homeWhyContent.title}
        blocks={homeWhyContent.blocks}
      />
      <Founder content={homeFounderContent} />
      <SelectedWork
        eyebrow={homeSelectedWork.eyebrow}
        title={homeSelectedWork.title}
        caseStudy={homeSelectedWork.caseStudy}
      />
      <Testimonials items={homeTestimonials} />
      <InsightsTeaser
        eyebrow={homeInsightsTeaser.eyebrow}
        title={homeInsightsTeaser.title}
        description={homeInsightsTeaser.description}
        href={homeInsightsTeaser.href}
        ctaLabel={homeInsightsTeaser.ctaLabel}
      />
      <FinalCTA content={homeFinalCta} />
    </>
  );
}
