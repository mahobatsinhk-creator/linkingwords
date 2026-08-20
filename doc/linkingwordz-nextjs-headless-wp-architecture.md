# LinkingWordz — Next.js + Headless WordPress Architecture
### Complete technical + design architecture. No code yet — this is the approval document.

Grounded in the same verified content as the earlier strategy docs (live linkingwordz.com content, four reference sites, confirmed testimonials/case study). Anything not confirmed on the live site is marked **[TO CONFIRM]**.

---

## A. Final Technical Architecture

```
WordPress (headless CMS, admin-only, no public theme)
   ↓ WP REST API (built-in, wp-json/wp/v2/*)
   ↓ authenticated where needed (Application Passwords, read-only public otherwise)
Next.js (App Router) — data layer
   ↓ fetch() with Next.js caching + ISR (revalidate)
   ↓ typed data-fetching functions per content type
React Server Components (default) + Client Components (only where interactive)
   ↓
Pages (App Router file-based routing)
   ↓
SEO layer (Metadata API, JSON-LD, sitemap, robots)
   ↓
Deployment: Next.js on Vercel, WordPress on managed WP hosting, DNS pointed at Vercel
```

**REST API vs GraphQL — recommendation: REST API.**
WordPress's REST API is built-in, requires zero additional plugins, and is more than sufficient for a site this size (a handful of content types, no deeply nested relational queries that would justify GraphQL's field-selection benefits). WPGraphQL is excellent but adds a plugin dependency, a learning curve, and a query layer this project doesn't need. Per your own instruction to prioritize simplicity — REST wins here. Revisit GraphQL only if the content model grows materially more relational (e.g., dozens of cross-referenced post types) later.

---

## B. Recommended CMS Architecture

WordPress's only job: structured content storage + an editing UI for Shruti. No public-facing theme is needed — a barebones/blank theme is fine since nothing renders from it.

| Content | WordPress structure |
|---|---|
| Home, About, Contact, Authors, Businesses | Standard WordPress **Pages** (using ACF fields for structured sections, not raw block content, so Next.js can consume clean JSON rather than parsing HTML) |
| Services | Custom Post Type: `service` |
| Case Studies | Custom Post Type: `case_study` |
| Testimonials | Custom Post Type: `testimonial` |
| Blog | Standard WordPress **Posts** (native, no CPT needed) |
| Categories | Standard WordPress **Categories** (for blog), plus a custom taxonomy `audience` (Authors / Brands) applied to Services, Case Studies, and optionally Posts, so Next.js can filter by audience across content types with one query pattern |
| Global settings | **ACF Options Page** (single free-tier feature) — logo, contact email, Calendly URL, social links, footer text, default CTA copy |

---

## C. WordPress Content Model

- **Pages** hold structured page-builder-lite content via ACF Flexible Content fields (so "Home" page in WP admin has repeatable content blocks — Hero, Trust Strip, Audience Split, etc. — each with its own field group), rather than one giant WYSIWYG field. This keeps Next.js components mapped 1:1 to WordPress field groups.
- **Posts** stay fully native (title, content, featured image, categories, author) — no reason to complicate the blog.
- **service, case_study, testimonial** are custom post types, each with the field groups defined in Section E.
- **Taxonomy `audience`** (terms: `authors`, `brands`) attached to `service` and `case_study` — this is what powers the Authors/Brands filtering across the site without needing separate post types per audience.

---

## D. Custom Post Types

| CPT | Slug | Public REST base | Purpose |
|---|---|---|---|
| Service | `service` | `/wp-json/wp/v2/service` | Individual service entries (Ghostwriting, Copyediting, Website Content + Dev, etc.) |
| Case Study | `case_study` | `/wp-json/wp/v2/case_study` | Individual project write-ups (currently: Kiran Lasiyal) |
| Testimonial | `testimonial` | `/wp-json/wp/v2/testimonial` | Individual client quotes (Eve Miller, Paintphotographs, Rushabh Shah, Kiran) |

Register via **Custom Post Type UI** (free plugin — simpler and more maintainable than hand-rolling `register_post_type()` in a custom plugin, and avoids version-locking the CPT definitions to a theme that doesn't otherwise exist since WP is headless).

---

## E. WordPress Fields

Registered via **Secure Custom Fields** (the free, actively maintained fork/continuation of ACF after its Pro-ification — functionally identical to what "ACF free" used to be) — REST-exposed by enabling "Show in REST API" per field group.

**Service**
- Title (native)
- Slug (native)
- Short description (text, for card/teaser display)
- Long description (WYSIWYG, for detail sections)
- Audience (taxonomy: authors / brands)
- What's Included (repeater: list of bullet strings)
- Who This Is For (repeater: list of bullet strings) — only for services where the live site actually specifies this (Ghostwriting)
- Featured image
- CTA label (text, defaults to "Book a Free Discovery Call" via Options Page fallback)
- SEO title / SEO description (text)

**Case Study**
- Title (native)
- Client name (text)
- Client role/industry (text) — e.g. "Social Media Manager & video editor" for Kiran
- Overview (WYSIWYG)
- Objective (WYSIWYG)
- Strategy/approach (repeater: heading + description per tactic)
- Results (repeater: stat value + stat label — e.g. `26%` / `post impressions in one week`)
- Featured image
- Gallery (image gallery field) — for the existing LinkedIn analytics screenshots
- Linked testimonial (relationship field → `testimonial` CPT)
- CTA label

**Testimonial**
- Quote (textarea)
- Name (text)
- Role/company (text)
- Photo (image, optional — several existing testimonials have inconsistent-quality photos, field should be optional not required)
- Linked case study (relationship field → `case_study` CPT, optional, only Kiran's currently has one)

**Global Options (ACF Options Page)**
- Site logo (light + dark/reversed versions — footer needs the reversed one)
- Contact email
- Calendly URL
- Instagram URL
- LinkedIn URL
- Default CTA text
- Footer brand statement

No fields beyond what the live site actually contains are invented here — the repeater structures map directly to content already written on `/services-authors`, `/services-brands`, and `/testimonial`.

---

## F. Next.js Route Structure

```
/                          Home
/about                     About / Founder
/services                  Services hub
/services/authors          For Authors & Publishers
/services/brands           For Businesses & Brands
/work                      Selected Work / Case Studies index
/work/[slug]               Individual case study (dynamic — currently only /work/kiran-lasiyal)
/insights                  Blog index
/insights/[slug]           Individual blog post
/contact                   Contact
/sitemap.xml               Generated (Next.js native sitemap route)
/robots.txt                Generated (Next.js native robots route)
```

This mirrors the sitemap already approved in the earlier strategy doc — no new sitemap decisions being made here, just translated into Next.js's file-based routing (`app/services/authors/page.tsx`, `app/work/[slug]/page.tsx`, etc.).

**Wix → Next.js redirect map** (configured in `next.config.js` `redirects()`, permanent 301s):
```
/services-authors   → /services/authors
/services-brands    → /services/brands
/testimonial         → /work
/copy-of-authors-1   → /services/authors
```
`/about`, `/blog` → `/insights`, `/contact` keep their conceptual position but note `/blog` (old) → `/insights` (new) also needs a redirect since the page purpose is renamed.

---

## G. React Component Architecture

```
components/
  layout/
    Header.tsx
    Footer.tsx
    MobileNav.tsx
  sections/
    Hero.tsx
    TrustStrip.tsx
    AudienceSplit.tsx
    ProblemStatement.tsx
    ServicesTeaser.tsx
    WhyLinkingWordz.tsx
    Founder.tsx
    Process.tsx            (renders nothing if content is [TO CONFIRM] and unapproved)
    SelectedWork.tsx
    Testimonials.tsx
    Insights.tsx
    FinalCTA.tsx
  content/
    ServiceCard.tsx
    ServiceDetail.tsx
    CaseStudyCard.tsx
    CaseStudyDetail.tsx
    TestimonialQuote.tsx
    ArticleCard.tsx
    ArticleBody.tsx
  ui/
    Button.tsx
    SectionHeading.tsx
    EditorialImage.tsx
    QuoteMark.tsx           (the reusable quote-mark motif from the design system)
    StatBlock.tsx
    RichText.tsx             (renders WordPress WYSIWYG HTML safely)
```

This deliberately avoids the "hundreds of tiny components" trap: section components are page-specific and used once each; the `content/` and `ui/` folders hold the genuinely reusable pieces (a `ServiceCard` is used on both the Services hub and inside `ServicesTeaser`; `Button` and `SectionHeading` are used everywhere).

---

## H. Folder Structure

```
/app
  /(site)
    layout.tsx              (Header + Footer wrapper)
    page.tsx                 (Home)
    /about/page.tsx
    /services/page.tsx
    /services/authors/page.tsx
    /services/brands/page.tsx
    /work/page.tsx
    /work/[slug]/page.tsx
    /insights/page.tsx
    /insights/[slug]/page.tsx
    /contact/page.tsx
  /sitemap.ts
  /robots.ts
/components                 (as above)
/lib
  /wp
    client.ts                (fetch wrapper, base URL from env var)
    services.ts               (getServices, getServiceBySlug)
    caseStudies.ts
    testimonials.ts
    posts.ts
    pages.ts
    options.ts
  /seo
    metadata.ts              (shared metadata builder)
    schema.ts                 (JSON-LD builders)
/styles
  globals.css                (CSS variables / design tokens)
/public
  (static assets only — favicon, etc.; all content images come from WP media library via next/image remote patterns)
```

---

## I. Design System

CSS variables in `styles/globals.css`:

```css
:root {
  /* Colors */
  --lw-teal: #104547;
  --lw-teal-dark: #0C3739;
  --lw-mauve: #AF929D;
  --lw-cream: #F5F3F0;
  --lw-black: #000000;
  --lw-gray: #BBB7B7;
  --lw-white: #FFFFFF;

  /* Typography */
  --font-display: 'Garet', 'Fraunces', serif; /* Fraunces fallback until license confirmed */
  --font-body: 'Barlow', sans-serif;

  /* Type scale — desktop */
  --text-h1: 56px;
  --text-h2: 36px;
  --text-h3: 24px;
  --text-body: 17px;
  --text-small: 13px;

  /* Spacing */
  --space-xs: 8px;
  --space-sm: 16px;
  --space-md: 24px;
  --space-lg: 40px;
  --space-xl: 64px;
  --space-2xl: 96px;

  /* Layout */
  --container-max: 1200px;
  --container-narrow: 780px;
  --pad-desktop: 80px;
  --pad-tablet: 40px;
  --pad-mobile: 20px;

  /* Border/radius */
  --radius-sm: 4px;
  --border-hairline: 1px solid var(--lw-gray);

  /* Transitions */
  --ease-default: 200ms ease;
}

@media (max-width: 1024px) {
  :root {
    --text-h1: 42px;
    --text-h2: 30px;
    --text-h3: 22px;
  }
}
@media (max-width: 640px) {
  :root {
    --text-h1: 32px;
    --text-h2: 26px;
    --text-h3: 20px;
    --text-body: 16px;
  }
}
```

**Breakpoints:** mobile `<640px` · tablet `640–1024px` · desktop `>1024px` (matches the values already used in the Elementor-era spec, so nothing in the visual system changes — only the implementation layer does).

No shadows in the system except a single hairline `box-shadow` reserved for the sticky header on scroll (matches the earlier spec's restraint principle — flat surfaces, thin borders, no card-shadow language).

---

## J. Homepage Architecture

Same section order and content as the approved production specification — restated here only as the React-component mapping, not re-designed:

| Section | Component | Data source |
|---|---|---|
| Header | `<Header />` | Options (logo, nav is static UI text — 6 fixed links) |
| Hero | `<Hero />` | Home page ACF field group `hero` |
| Trust | `<TrustStrip />` | Home page ACF field group `trust` (static-feeling but editable) |
| Audience Split | `<AudienceSplit />` | Home page ACF field group `audience_split` |
| Problem | `<ProblemStatement />` | Home page ACF field group `problem` (repeater of 5 lines) |
| Services teaser | `<ServicesTeaser />` | `getServices()` filtered/grouped by `audience` taxonomy |
| Why LinkingWordz | `<WhyLinkingWordz />` | Home page ACF field group `why` (repeater of 4 blocks) |
| Founder | `<Founder />` | About page ACF fields (shared with `/about`, not duplicated content — Home pulls a subset) |
| Process | `<Process />` | Conditionally rendered — only if Home page ACF field `process_approved` = true; otherwise omitted entirely (per the **[TO CONFIRM]** flag from the earlier spec) |
| Selected Work | `<SelectedWork />` | `getCaseStudies({ limit: 1, featured: true })` — currently returns only Kiran |
| Testimonials | `<Testimonials />` | `getTestimonials({ limit: 3 })` |
| Insights | `<Insights />` | `getPosts({ limit: 3 })` |
| Final CTA | `<FinalCTA />` | Options (default CTA text) + Home page override field |
| Footer | `<Footer />` | Options |

All typography, color, spacing, and copy content per-section is unchanged from the approved production spec — only the rendering technology changed.

---

## K. Service Architecture

`getServices({ audience: 'authors' | 'brands' })` returns the CPT entries filtered by taxonomy. Rendered as:
- `/services` — hub page, two audience columns (mirrors the earlier "Services teaser hierarchy" decision — routes rather than dumps)
- `/services/authors`, `/services/brands` — full pages, each looping `<ServiceDetail />` per service in that audience group, using the real content already confirmed (Ghostwriting, Book Promotional Blogs, Copyediting & Proofreading for Authors; Website Content + Development, SEO + AEO Blogs, LinkedIn Ghostwriting, Thought Leadership & Ghostwriting, Copyediting & Editorial Support for Brands)

No individual `/services/[slug]` detail pages are needed at this scale — the two audience pages already hold full depth per service, matching the earlier IA decision that splitting into 8 separate thin pages would fragment content that reads better as one long, anchor-linked page per audience. Anchor navigation (`#ghostwriting`, `#copyediting`) implemented as plain in-page `id` attributes + smooth-scroll CSS (`scroll-behavior: smooth`), no JS library needed.

---

## L. Case Study Architecture

`/work` — index, currently rendering one `<CaseStudyCard />` (Kiran), built to scale to a grid once more case studies exist.
`/work/[slug]` — `<CaseStudyDetail />`: Client overview → Objective → Strategy (repeater blocks) → Results (`<StatBlock />` × however many are defined, currently 3: 26% / 9.3% / 20 hrs) → linked `<TestimonialQuote />` → CTA.

Editorial layout, not a card grid, per the earlier design direction — the index page uses large asymmetric image+text blocks (matching the Elementor-era "Selected Work" section spec) rather than a uniform 3-column agency grid, since there's currently only one real case study to display and forcing a grid would look sparse/broken.

---

## M. Blog Architecture

Standard WordPress Posts, fetched via `getPosts()`. `/insights` — featured post (most recent) + grid of the rest. `/insights/[slug]` — `<ArticleBody />` rendering WP content HTML through `<RichText />` (sanitized), with author byline (Shruti, static — no author CPT needed for a single-author blog), category tag, and related-posts query (`getPosts({ category, excludeId, limit: 3 })`).

**[TO CONFIRM]** — actual post titles/categories weren't retrievable from the listing view during research; category taxonomy terms should be set up to match whatever categories Shruti is actually using once confirmed, rather than inventing generic ones like "Writing Tips" / "Publishing" without checking against her real usage.

---

## N. SEO Architecture

- **Metadata:** Next.js 13+ Metadata API, per-route `generateMetadata()` pulling `seo_title`/`seo_description` fields where defined on CPTs/Pages, falling back to a sensible default built from title + a site-wide template.
- **Canonical URLs:** set via `alternates.canonical` in each route's metadata, always the new `linkingwordz.com/...` path.
- **Open Graph / Twitter cards:** generated per-page from featured image + title + description, shared builder in `lib/seo/metadata.ts`.
- **Sitemap:** `app/sitemap.ts` — Next.js native, dynamically includes all Pages, Services, Case Studies, and Posts fetched from WP at build/request time.
- **Robots.txt:** `app/robots.ts` — allow all, point to the sitemap.
- **Structured data (JSON-LD):**
  - `Organization` schema on every page (footer-level, site-wide)
  - `Person` schema on `/about` (Shruti — using only confirmed credential fields)
  - `Article` schema on each `/insights/[slug]`
  - `BreadcrumbList` schema on all non-home pages
- **Redirects:** the map in Section F, implemented in `next.config.js`.
- **Internal linking:** every Service links to its parent audience page; every Case Study links back to `/work` and to any related Service; blog posts link to relevant service pages where topically appropriate (manual editorial linking, not automated).
- **Semantic HTML:** one `<h1>` per page, logical heading nesting, `<nav>`/`<main>`/`<footer>` landmarks, all images with real alt text pulled from WP media library alt fields (currently missing on the live site — populate during migration, don't leave blank).

---

## O. Performance Architecture

- **Rendering:** Static Generation (`generateStaticParams` for `/work/[slug]`, `/insights/[slug]`) with **ISR** (`revalidate: 3600` or on-demand revalidation via a WordPress webhook on publish/update) — avoids full SSR cost while keeping content fresh without a manual redeploy per blog post.
- **JS:** Server Components by default; Client Components only for the mobile nav toggle, any hover-state micro-interactions that need JS beyond CSS `:hover`, and the sticky-header scroll listener.
- **Images:** `next/image` throughout, `remotePatterns` configured for the WP media library domain, `priority` on the hero image only, lazy-loaded everywhere else, WebP/AVIF auto-negotiated by `next/image`.
- **Fonts:** `next/font/local` for self-hosted Garet (once licensed) or Fraunces via `next/font/google`, plus Barlow via `next/font/google` — both give automatic font-display swap and zero layout-shift loading.
- **Dependencies:** no animation library unless a specific interaction genuinely can't be done in CSS (see Section P) — no Framer Motion by default, add it only if a specific approved interaction needs spring physics CSS can't replicate.
- **Caching:** Next.js fetch cache + ISR handles content caching; Vercel's edge network handles static asset caching automatically.
- **Targets:** LCP < 2.5s (hero image `priority` + static generation should comfortably clear this), CLS near 0 (explicit image dimensions via `next/image`, font-display swap), INP low (minimal client JS).

---

## P. Security Architecture

- **API exposure:** WordPress REST API is read-only and public for the content types that need to be publicly fetchable (Services, Case Studies, Testimonials, Posts, Pages) — these are already public information, no auth needed for GET requests.
- **Write access:** none from the frontend at all — Shruti edits content only through wp-admin directly. Next.js never writes to WordPress (no comment forms posting back to WP, for example).
- **Contact form:** does **not** go through the WordPress REST API — use a dedicated form-handling service (e.g., a simple serverless function on Vercel posting to an email service, or a form provider like Formspree) so the public frontend never needs any WordPress write credentials at all.
- **Admin security:** `wp-admin` should not be publicly discoverable/linked from the frontend, protected with strong hosting-level security (most managed WP hosts include this), 2FA on the admin account.
- **CORS:** WordPress REST API CORS restricted to the Next.js production + preview domains only, not wildcard `*`.
- **Rate limiting:** handled at the hosting/CDN layer (most managed WP hosts and Vercel both offer this) rather than custom WordPress code.
- **Secrets:** the only "secret" this architecture actually needs is the WP REST API base URL, which isn't sensitive — store it as `NEXT_PUBLIC_WP_API_URL` since it's already publicly fetchable anyway. If a future feature needs an authenticated write path, use WordPress **Application Passwords** (built-in since WP 5.6) stored as a non-public environment variable, never a full admin username/password pair.

---

## Q. Deployment Architecture

- **Next.js:** Vercel (native Next.js support, automatic preview deployments per branch/PR, edge caching, zero-config ISR).
- **WordPress:** managed WordPress hosting (e.g., WP Engine, Kinsta, or SiteGround) — chosen for admin reliability and security patching, not for public traffic serving, since Next.js/Vercel serves all public traffic.
- **Domain:** `linkingwordz.com` DNS points to Vercel (A/CNAME per Vercel's instructions); WordPress lives on a subdomain not exposed publicly, e.g. `cms.linkingwordz.com` or a hosting-provided temp domain, referenced only by the `NEXT_PUBLIC_WP_API_URL` env var.
- **Environment variables:** `NEXT_PUBLIC_WP_API_URL` (production), a separate value for preview/staging pointing at a WP staging instance if one exists, form-handler API key (private, not `NEXT_PUBLIC_`).
- **Preview environments:** Vercel's automatic branch previews, pointed at the same production WP API (read-only, so this is safe) unless a WP staging environment is set up later.
- **SSL:** automatic via Vercel for the frontend domain; WP host's own SSL for the CMS subdomain (not public-facing anyway, but should still be encrypted for admin login safety).
- **Caching:** Vercel edge cache (automatic) + ISR revalidation window as the content freshness mechanism, no separate CDN needed on top of Vercel's own.

---

## R. Development Workflow

1. **Claude** — writes the architecture/spec for the current phase (this document, then per-phase specs as we proceed, matching the level of exactness the Elementor spec had).
2. **Cursor** — implements the phase in code, following Section 33's rules (TypeScript, server components by default, no hard-coded WP content, etc.).
3. **Browser** — you test the built phase locally (`next dev`) or on a Vercel preview deployment.
4. **Claude** — reviews via screenshot (same screenshot-review loop as the Elementor workflow) and flags the highest-impact issues only.
5. **Cursor** — implements fixes.
6. Repeat per phase, not per whole-site — same "smaller loops catch problems earlier" principle as before.

---

## S. Development Phases

1. Project setup (Next.js app scaffold, TypeScript, base folder structure)
2. WordPress Headless CMS setup (install, CPTs, fields, taxonomy, Options page, REST verification)
3. Next.js foundation (data layer / `lib/wp/*` fetch functions, env vars, base layout)
4. Design system (CSS variables, fonts, `Button`/`SectionHeading`/`EditorialImage` base components)
5. Header/Footer
6. Homepage
7. Services (hub + authors + brands)
8. Case Studies (index + detail template)
9. About/Founder
10. Blog/Insights (index + detail template)
11. Contact
12. SEO (metadata, sitemap, robots, JSON-LD, redirects)
13. Performance pass (image audit, font loading, Lighthouse)
14. Testing (cross-browser, cross-device, accessibility pass, broken-link check)
15. Migration/Launch (DNS cutover, redirect verification, Search Console resubmission)

Unchanged from your requested order — it was already correctly sequenced (CMS before frontend data-fetching, design system before pages, content-heavy pages before SEO/performance polish).

---

## T. Exact First 20 Development Actions

1. **WHERE:** Local machine — **WHAT:** Run `npx create-next-app@latest linkingwordz --typescript --app --eslint` — **WHY:** Establishes the App Router + TypeScript foundation everything else builds on — **OUTPUT:** A running local Next.js app on `localhost:3000`.
2. **WHERE:** Local project — **WHAT:** Create the folder structure from Section H (`/components`, `/lib/wp`, `/lib/seo`, `/styles`) — **WHY:** Prevents ad-hoc file placement once real feature work starts — **OUTPUT:** Empty but correctly structured folders committed to git.
3. **WHERE:** GitHub — **WHAT:** Push the initial scaffold to a new repository — **WHY:** Needed before Vercel can connect for preview deployments — **OUTPUT:** Repo live, first commit pushed.
4. **WHERE:** Vercel — **WHAT:** Connect the GitHub repo, deploy the default scaffold — **WHY:** Confirms the deployment pipeline works before real content exists — **OUTPUT:** A live (empty) preview URL.
5. **WHERE:** WordPress host — **WHAT:** Provision a managed WordPress install (staging or production instance) — **WHY:** CMS needs to exist before content modeling can happen — **OUTPUT:** Working `wp-admin` login.
6. **WHERE:** WordPress plugins — **WHAT:** Install Custom Post Type UI + Secure Custom Fields — **WHY:** These two plugins are the entire CMS content-modeling toolkit for this project — **OUTPUT:** Both plugins active.
7. **WHERE:** WordPress → CPT UI — **WHAT:** Register `service`, `case_study`, `testimonial` CPTs with REST API enabled — **WHY:** Matches Section D exactly — **OUTPUT:** Three new post-type menus visible in wp-admin, confirmed visible at `/wp-json/wp/v2/service` etc.
8. **WHERE:** WordPress → SCF — **WHAT:** Build the field groups from Section E for each CPT + the Options page, enabling "Show in REST API" on every field group — **WHY:** Without this, Next.js can't fetch structured field data via REST — **OUTPUT:** Field groups created, confirmed appearing in a REST response for a test entry.
9. **WHERE:** WordPress — **WHAT:** Register the `audience` taxonomy (authors/brands) attached to `service` and `case_study` — **WHY:** Powers the audience-filtering pattern used across the site — **OUTPUT:** Taxonomy visible and assignable in wp-admin.
10. **WHERE:** WordPress content entry — **WHAT:** Enter the real, verified content into WordPress: 8 Service entries (3 authors, 5 brands), 1 Case Study (Kiran), 3–4 Testimonials (Eve Miller, Paintphotographs, Rushabh Shah, Kiran linked to her case study) — **WHY:** Nothing downstream can be built/tested against real data until it exists in the CMS — **OUTPUT:** All confirmed content live in wp-admin, verifiable via REST endpoints.
11. **WHERE:** WordPress — **WHAT:** Build the Home page's ACF Flexible Content field group (Hero, Trust, Audience Split, Problem, Why, Process-toggle) and populate it with the approved copy from the production spec — **WHY:** Homepage React components need a real data source to fetch against — **OUTPUT:** Home page entry complete in wp-admin.
12. **WHERE:** `lib/wp/client.ts` — **WHAT:** Write the base fetch wrapper (base URL from `NEXT_PUBLIC_WP_API_URL`, typed JSON response, basic error handling) — **WHY:** Every other data function depends on this — **OUTPUT:** One tested fetch utility.
13. **WHERE:** `lib/wp/*.ts` — **WHAT:** Write `getServices()`, `getCaseStudies()`, `getTestimonials()`, `getPosts()`, `getPage()`, `getOptions()` — **WHY:** The typed data layer the rest of the app depends on — **OUTPUT:** Six working, typed data-fetching functions, each verified against real WP data from Action 10–11.
14. **WHERE:** `styles/globals.css` — **WHAT:** Paste the CSS variable design tokens from Section I — **WHY:** Every component styles against these variables instead of hard-coded values — **OUTPUT:** Global stylesheet complete.
15. **WHERE:** `components/ui/` — **WHAT:** Build `Button.tsx`, `SectionHeading.tsx`, `EditorialImage.tsx` — **WHY:** These are used by nearly every section component that follows — **OUTPUT:** Three base components, each rendering correctly in a throwaway test page.
16. **WHERE:** Font setup — **WHAT:** Resolve the Garet licensing question (confirm or fall back to Fraunces) and configure `next/font` accordingly — **WHY:** Blocks final typography from being locked in — **OUTPUT:** A decided, working font configuration.
17. **WHERE:** `components/layout/Header.tsx` — **WHAT:** Build the header per the earlier approved header spec (logo, 6-link nav, CTA, sticky-on-scroll), fetching nav/CTA text from Options — **WHY:** First real, reusable, cross-page component — **OUTPUT:** Working header, responsive, matching the Elementor-era design exactly.
18. **WHERE:** `components/layout/Footer.tsx` — **WHAT:** Build the footer per the earlier spec — **WHY:** Same reuse logic — **OUTPUT:** Working footer.
19. **WHERE:** `app/(site)/layout.tsx` — **WHAT:** Wire Header + Footer into the shared layout — **WHY:** So every subsequent page automatically inherits them — **OUTPUT:** A visible header/footer wrapping an empty page body on the local dev server.
20. **WHERE:** Claude (screenshot review) — **WHAT:** Screenshot the header/footer on desktop + mobile, send to Claude for a design-fidelity check against the approved spec — **WHY:** Catch drift from the approved visual system before building 12 more sections on top of it — **OUTPUT:** A short punch-list, if any, before moving to Phase 6 (Homepage).

From here, continue with Phase 6 onward per Section S — homepage section components, built one at a time against the real WordPress data now in place, following the same "build → screenshot → review → fix" loop as before.
