# LinkingWordz

Next.js (App Router) + TypeScript frontend for LinkingWordz, powered by a headless WordPress CMS.

## Stack

- Next.js 16 + React 19 + TypeScript
- WordPress REST API (server-side fetching)
- Centralized CSS design tokens (no Tailwind / no large UI kits)
- Deploy target: Vercel (frontend) + managed WordPress (CMS)

## Phase status

**Phase 1 — Project foundation** (current)

Scaffold only. Homepage sections, hero, services UI, case studies UI, blog UI, and animations are intentionally not built yet.

## Getting started

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment

| Variable | Scope | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public | Canonical / OG / sitemap base |
| `NEXT_PUBLIC_WP_API_URL` | Public read | WP REST v2 base, e.g. `https://cms.example.com/wp-json/wp/v2` |
| `WORDPRESS_IMAGE_HOSTNAME` | Build | Optional `next/image` host override |

Application Passwords (if ever needed) must stay server-only — never `NEXT_PUBLIC_`.

### Scripts

```bash
npm run dev        # local development
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm run build      # production build
npm run start      # serve production build
```

## Architecture notes

- Approved architecture: `doc/linkingwordz-nextjs-headless-wp-architecture.md`
- CMS calls live in `src/lib/wp/` — do not fetch WordPress from components directly
- Design tokens: `src/styles/tokens.css` (Section I)
- Fonts: `src/styles/fonts.ts` (Fraunces until Garet is licensed; Barlow body)
- Wix redirects are configured in `next.config.ts`
