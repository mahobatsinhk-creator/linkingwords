/**
 * Approved homepage content (live LinkingWordz + architecture).
 * Structured for WordPress ACF swap — components accept these shapes as props.
 * Do not invent marketing copy here; only confirmed site content.
 */

export type HeroContent = {
  eyebrow: string;
  headline: {
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

export type AudienceCard = {
  id: string;
  title: string;
  description: string;
  highlights: Array<{ text: string; icon: "readers" | "authority" | "amplify" | "audience" | "trust" | "clarity" }>;
  href: string;
  ctaLabel: string;
  tone: "teal" | "mauve";
  imageSrc: string;
  imageAlt: string;
  icon: "book" | "briefcase";
};

export type AudienceSectionContent = {
  label: string;
  title: {
    parts: Array<{ text: string; accent?: boolean }>;
  };
  description: string;
  cards: AudienceCard[];
  banner: {
    text: string;
    highlight: string;
    suffix: string;
    ctaLabel: string;
    href: string;
  };
};

export type ProblemContent = {
  eyebrow: string;
  headline: string;
  subhead: string;
  problems: string[];
  closing: string;
};

export type ServiceTeaser = {
  id: string;
  audience: string;
  title: string;
  href: string;
};

export type WhyBlock = {
  id: string;
  title: string;
  description: string;
};

export type FounderContent = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  credentials: string;
  cta: { label: string; href: string };
  imageSrc: string;
  imageAlt: string;
};

export type CaseStudyTeaser = {
  title: string;
  client: string;
  role: string;
  href: string;
  ctaLabel: string;
};

export type TestimonialItem = {
  id: string;
  quote: string;
  name: string;
  role: string;
};

export type FinalCtaContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  email: string;
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

export const homeAudienceContent: AudienceSectionContent = {
  label: "Who we write for",
  title: {
    parts: [
      { text: "Two audiences. One ", accent: false },
      { text: "editorial", accent: true },
      { text: " partner.", accent: false },
    ],
  },
  description:
    "Linkingwordz is built for two kinds of people — with one goal: meaningful content that connects and converts.",
  cards: [
    {
      id: "authors",
      title: "Authors & Publishers",
      description:
        "For authors and publishers who want their work discovered.",
      highlights: [
        { text: "Reach the right readers", icon: "readers" },
        { text: "Build authority with compelling content", icon: "authority" },
        { text: "Amplify your book or publishing brand", icon: "amplify" },
      ],
      href: "/services/authors",
      ctaLabel: "Explore services for authors",
      tone: "teal",
      imageSrc: "/images/audience-authors-desk.png",
      imageAlt: "Stack of books, notebook and pen on a writer's desk",
      icon: "book",
    },
    {
      id: "brands",
      title: "Businesses & Brands",
      description:
        "For service businesses and brands whose expertise deserves a stronger voice online.",
      highlights: [
        { text: "Attract the right audience", icon: "audience" },
        { text: "Earn trust & improve search visibility", icon: "trust" },
        { text: "Communicate with clarity and impact", icon: "clarity" },
      ],
      href: "/services/brands",
      ctaLabel: "Explore services for businesses",
      tone: "mauve",
      imageSrc: "/images/audience-brands-desk.png",
      imageAlt: "Laptop, notebook and coffee on a professional desk",
      icon: "briefcase",
    },
  ],
  banner: {
    text: "Not sure which fits?",
    highlight: "Book a free discovery call",
    suffix: "— we'll figure it out together.",
    ctaLabel: "Book a free discovery call",
    href: "/contact",
  },
};

export const homeProblemContent: ProblemContent = {
  eyebrow: "Why clients come to us",
  headline:
    "You're not struggling because your work isn't good enough. You're struggling because it isn't visible enough.",
  subhead: "We've heard this before. Many times.",
  problems: [
    "My website doesn't represent what I actually do.",
    "I have a book in my head but no idea how to get it out.",
    "I'm not showing up on Google — or anywhere.",
    "My content is written it just needs someone to sharpen it.",
    "My LinkedIn is either inconsistent or completely silent.",
  ],
  closing:
    "These are the 5 problems LinkingWordz was built to solve. Not with a production line — but with research, care, and a team that works with 5 to 10 clients at a time. Deliberately.",
};

export const homeServicesTeaser = {
  eyebrow: "What we make",
  title: "5 problems. 1 solution. Built around your brand.",
  description:
    "Most content agencies give you a template. Most developers wait for your copy. Most editors don't understand your subject matter. At LinkingWordz, we bring all of it together — with the research depth, subject expertise, and personal attention that only comes from working with a small, intentional client list.",
  services: [
    {
      id: "ghostwriting",
      audience: "Authors",
      title: "Ghostwriting",
      href: "/services/authors#ghostwriting",
    },
    {
      id: "promo-blogs",
      audience: "Authors",
      title: "Book Promotional Blogs",
      href: "/services/authors",
    },
    {
      id: "copyediting-authors",
      audience: "Authors",
      title: "Copyediting & Proofreading",
      href: "/services/authors#copyediting",
    },
    {
      id: "website-dev",
      audience: "Brands",
      title: "Website Content + Development",
      href: "/services/brands",
    },
    {
      id: "seo-blogs",
      audience: "Brands",
      title: "SEO + AEO Blogs",
      href: "/services/brands",
    },
    {
      id: "linkedin",
      audience: "Brands",
      title: "LinkedIn Ghostwriting",
      href: "/services/brands",
    },
    {
      id: "thought-leadership",
      audience: "Brands",
      title: "Thought Leadership & Ghostwriting",
      href: "/services/brands",
    },
    {
      id: "copyediting-brands",
      audience: "Brands",
      title: "Copyediting & Editorial Support",
      href: "/services/brands",
    },
  ] satisfies ServiceTeaser[],
};

export const homeWhyContent = {
  eyebrow: "What makes this different",
  title: "Human-written. Research-backed. Built around your brand.",
  blocks: [
    {
      id: "human",
      title: "Human-written. Always.",
      description:
        "Every word is written by hand — researched, considered, and crafted for your specific audience. No AI-generated filler. No recycled frameworks. Content that sounds like you, and works for the people you're trying to reach.",
    },
    {
      id: "together",
      title: "Content + development together",
      description:
        "Website copy and website build under one engagement. No brief lost between a writer and a developer. No misaligned design and messaging. Everything built in the same time, for the same audience.",
    },
    {
      id: "research",
      title: "Research is the foundation",
      description:
        "An M.Phil in Management and 9+ years of professional experience across finance, technology, and education means we understand the fields we work in. We don't just write about your expertise. We understand it.",
    },
    {
      id: "attention",
      title: "5–10 clients. Full attention.",
      description:
        "We deliberately limit how many clients we take on. Not because we can't handle more — but because your brand deserves focus, not a queue. When you work with LinkingWordz, you are not a ticket number.",
    },
  ] satisfies WhyBlock[],
};

export const homeFounderContent: FounderContent = {
  eyebrow: "The person behind the work",
  title: "Hi, I'm Shruti.",
  paragraphs: [
    "I'm a content writer, copyeditor, and ghostwriter with 9+ years of professional experience across linguistics, content, and writing — working with clients across finance, technology, and education.",
    "Before LinkingWordz, I was a college lecturer in Accounting, Finance, and Management — a role that gave me something most writers don't have: genuine depth in the subjects I write and edit in. I hold an M.Phil in Management, and I bring that research foundation into every brief I take on.",
    "LinkingWordz is built on a simple belief — that human-written, research-backed content is still the most powerful way to build trust with the people you want to reach. I work with a maximum of 5 to 10 clients at a time, because your brand deserves full attention. Not a queue.",
  ],
  credentials:
    "M.Phil in Management · 9+ Years Industry Experience · Finance · Technology · Education",
  cta: { label: "Learn more about me", href: "/about" },
  imageSrc: "/images/shruti-founder.jpg",
  imageAlt: "Shruti Bhatt writing at her desk",
};

/** Confirmed case study — architecture Section L (Kiran Lasiyal) */
export const homeSelectedWork = {
  eyebrow: "Selected work",
  title: "Real clients. Real results.",
  caseStudy: {
    title: "Kiran Lasiyal",
    client: "Kiran Lasiyal",
    role: "Social Media Manager & video editor",
    href: "/work/kiran-lasiyal",
    ctaLabel: "Read case study",
  } satisfies CaseStudyTeaser,
};

/** Confirmed testimonials from live site */
export const homeTestimonials: TestimonialItem[] = [
  {
    id: "eve-miller",
    quote:
      "I just finished going over chapter one! Thank you so much for your input, I used quite a few of your suggestions. I want to say probably about 85% of them. Thank you for reviewing this for me.",
    name: "Eve Miller",
    role: "Author",
  },
  {
    id: "paintphotographs",
    quote:
      "Shruti worked with us on proofreading our product notes and a few blogs. She is a thorough professional, punctual with deadlines, and most importantly an expert in her field. We wish you all the best for all your future endeavors.",
    name: "Paintphotographs",
    role: "Client",
  },
  {
    id: "rushabh-shah",
    quote:
      "Shruti has been working as a reviewer in my team for more than 2.5 years. she is a team player and has a very good command over the language, on time delivery, accuracy, high standard work ethics are some of her bright qualities. She is an asset to any team she works for.",
    name: "Rushabh Shah",
    role: "Client",
  },
];

export const homeFinalCta: FinalCtaContent = {
  eyebrow: "Not sure where to start?",
  title: "That's what the first call is for.",
  description:
    "I'm Shruti — and I've spent 9+ years in the content, linguistic, and writing industry helping authors get discovered and service businesses build content that converts. If you're open to a conversation — no agenda, no pressure, no packages pushed — just book a call. We'll figure out together which direction makes sense for your brand.",
  primaryCta: {
    label: "Book a Free Discovery Call",
    href: "/contact",
  },
  email: "connect@linkingwordz.com",
};

export const homeInsightsTeaser = {
  eyebrow: "Insights",
  title: "Ideas, strategies and inspiration.",
  description:
    "Articles from Shruti on writing, publishing, and building authority — loaded from WordPress once the CMS is connected.",
  href: "/insights",
  ctaLabel: "Visit insights",
};
