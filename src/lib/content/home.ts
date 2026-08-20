/**
 * Approved homepage content (live LinkingWordz + architecture).
 * Structured for WordPress ACF swap — components accept these shapes as props.
 * Do not invent marketing copy here; only confirmed site content.
 */

export type HeroContent = {
  eyebrow: string;
  headline: {
    /** Segments preserve mauve emphasis without inventing new wording */
    parts: Array<{ text: string; accent?: boolean }>;
  };
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  founder: {
    name: string;
    role: string;
    imageSrc: string;
    imageAlt: string;
  };
};

export type TrustStat = {
  id: string;
  label: string;
  detail?: string;
  icon: "badge" | "graduate" | "layers" | "people";
};

export const homeHeroContent: HeroContent = {
  eyebrow: "Content & Editorial Services for Authors and Service Businesses",
  headline: {
    parts: [
      { text: "The ", accent: false },
      { text: "right words", accent: true },
      { text: " find the ", accent: false },
      { text: "right clients", accent: true },
      { text: ". We make sure yours do.", accent: false },
    ],
  },
  description:
    "Linkingwordz is a content and editorial brand built for two kinds of people — authors who want their work discovered, and service businesses whose expertise deserves a stronger voice online. Human-written. Research-backed. Built around your brand.",
  primaryCta: {
    label: "Book a Free Discovery Call",
    href: "/contact",
  },
  secondaryCta: {
    label: "Explore our services",
    href: "/services",
  },
  founder: {
    name: "Shruti Bhatt",
    role: "Founder · Content Writer, Copyeditor & Ghostwriter",
    imageSrc: "/images/shruti-hero.png",
    imageAlt:
      "Shruti Bhatt, founder of LinkingWordz, at her desk with notebook and pen",
  },
};

/** Confirmed credentials / operating model from the live site & architecture */
export const homeTrustStats: TrustStat[] = [
  {
    id: "experience",
    label: "9+ Years Experience",
    detail: "Linguistics, content & writing",
    icon: "badge",
  },
  {
    id: "education",
    label: "M.Phil in Management",
    detail: "Research-led editorial work",
    icon: "graduate",
  },
  {
    id: "expertise",
    label: "Core Expertise",
    detail: "Finance · Technology · Education",
    icon: "layers",
  },
  {
    id: "attention",
    label: "5–10 Clients at a Time",
    detail: "Personal attention, not a queue",
    icon: "people",
  },
];
