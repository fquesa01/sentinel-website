# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### `artifacts/sentinel-counsel` (`@workspace/sentinel-counsel`)

Sentinel Counsel homepage — AI security platform for law firms. React + Vite web app using the "Ice Protocol" design aesthetic (steel-gray/cyan cybersecurity theme).

- **Design**: Ice Protocol — dark (#0b0d10) background, cyan (#00d4ff) accents, green status indicators, Roboto Mono monospace nav
- **Fonts**: Outfit (headings), Inter (body), Roboto Mono (mono/labels) — loaded via Google Fonts in index.html
- **CSS**: Custom CSS in `src/styles/homepage.css` (no Tailwind for page content)
- **Pages**: HomePage (`/`), ResourcesHub (`/resources`), ContentPage (`/resources/:slug`) — lazy-loaded content pages
- **Routing**: wouter for SPA routing; anchor links (`#section`) for in-page navigation; React.lazy code splitting for content pages
- **Content System**: 19 SEO-targeted pages in `src/data/content.ts` across 5 categories: pillar (4), educational (5), comparison (3), listicle (3), landing (4). ContentPage layout with breadcrumbs, sticky ToC, related articles, and CTA. ResourcesHub groups pages by category. All pages 800+ words.
- **Content Slugs**: ediscovery-software-law-firms, legal-hold-software, compliance-monitoring-software, ai-deposition-document-review, what-is-a-legal-hold, what-is-ediscovery, early-case-assessment-ai, ediscovery-processing, communication-surveillance-compliance, sentinel-vs-relativity, sentinel-vs-everlaw, sentinel-vs-exterro, best-ediscovery-software-2026, top-legal-hold-software, best-compliance-monitoring-software, ediscovery-solo-small-firms, compliance-financial-services, ai-deposition-solutions, document-review-corporate-legal
- **Pre-rendering**: Build-time TypeScript script (`scripts/prerender.ts`) renders full content HTML and SEO metadata into static `index.html` for each content route; imports `content.ts` directly as single source of truth; also generates `sitemap.xml` at build time
- **Internal Linking**: Every content page has 3 related article links; no orphan pages; full cross-referencing graph
- **Sections (HomePage)**: Nav, Hero, Trust Bar, Courtroom Demo Terminal, Capabilities (5 cards), Privilege Vault (animated), Heppner Case Callout, Team/Leadership, Security Stats, CTA, Footer
- **CSS**: `homepage.css` (all page styles), `content.css` (content page/hub styles)
- **Animations**: Pulsing status dots, blinking cursor, rotating vault ticks, vault center glow pulse; lazy-visible IntersectionObserver reveals on scroll for 6 homepage sections
- **Mobile**: Hamburger menu (slide-in drawer) on all pages at ≤768px, 44px+ touch targets, Escape-to-close, aria-controls/aria-expanded
- **Performance**: Lazy section reveals via IntersectionObserver (`useLazyVisible` hook), prefers-reduced-motion disables all animations
- **Analytics**: Google Analytics 4 (via `VITE_GA_MEASUREMENT_ID` env var), Google Search Console verification (via `VITE_GSC_VERIFICATION` env var), integrated in `Analytics.tsx` component

### `artifacts/mockup-sandbox` (`@workspace/mockup-sandbox`)

Design mockup sandbox for prototyping component variations on the canvas. Contains multiple homepage design variants (WarmAuthority, StarkPrecision, StarkTight, StarkPolished, MidnightInk, ParchmentNoir, IceProtocol).

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   └── api-server/         # Express API server
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts, run via `pnpm --filter @workspace/scripts run <script>`
├── pnpm-workspace.yaml     # pnpm workspace (artifacts/*, lib/*, lib/integrations/*, scripts)
├── tsconfig.base.json      # Shared TS options (composite, bundler resolution, es2022)
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references. This means:

- **Always typecheck from the root** — run `pnpm run typecheck` (which runs `tsc --build --emitDeclarationOnly`). This builds the full dependency graph so that cross-package imports resolve correctly. Running `tsc` inside a single package will fail if its dependencies haven't been built yet.
- **`emitDeclarationOnly`** — we only emit `.d.ts` files during typecheck; actual JS bundling is handled by esbuild/tsx/vite...etc, not `tsc`.
- **Project references** — when package A depends on package B, A's `tsconfig.json` must list B in its `references` array. `tsc --build` uses this to determine build order and skip up-to-date packages.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages that define it
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Packages

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Routes live in `src/routes/` and use `@workspace/api-zod` for request and response validation and `@workspace/db` for persistence.

- Entry: `src/index.ts` — reads `PORT`, starts Express
- App setup: `src/app.ts` — mounts CORS, JSON/urlencoded parsing, routes at `/api`
- Routes: `src/routes/index.ts` mounts sub-routers; `src/routes/health.ts` exposes `GET /health` (full path: `/api/health`)
- Depends on: `@workspace/db`, `@workspace/api-zod`
- `pnpm --filter @workspace/api-server run dev` — run the dev server
- `pnpm --filter @workspace/api-server run build` — production esbuild bundle (`dist/index.cjs`)
- Build bundles an allowlist of deps (express, cors, pg, drizzle-orm, zod, etc.) and externalizes the rest

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL. Exports a Drizzle client instance and schema models.

- `src/index.ts` — creates a `Pool` + Drizzle instance, exports schema
- `src/schema/index.ts` — barrel re-export of all models
- `src/schema/<modelname>.ts` — table definitions with `drizzle-zod` insert schemas (no models definitions exist right now)
- `drizzle.config.ts` — Drizzle Kit config (requires `DATABASE_URL`, automatically provided by Replit)
- Exports: `.` (pool, db, schema), `./schema` (schema only)

Production migrations are handled by Replit when publishing. In development, we just use `pnpm --filter @workspace/db run push`, and we fallback to `pnpm --filter @workspace/db run push-force`.

### `lib/api-spec` (`@workspace/api-spec`)

Owns the OpenAPI 3.1 spec (`openapi.yaml`) and the Orval config (`orval.config.ts`). Running codegen produces output into two sibling packages:

1. `lib/api-client-react/src/generated/` — React Query hooks + fetch client
2. `lib/api-zod/src/generated/` — Zod schemas

Run codegen: `pnpm --filter @workspace/api-spec run codegen`

### `lib/api-zod` (`@workspace/api-zod`)

Generated Zod schemas from the OpenAPI spec (e.g. `HealthCheckResponse`). Used by `api-server` for response validation.

### `lib/api-client-react` (`@workspace/api-client-react`)

Generated React Query hooks and fetch client from the OpenAPI spec (e.g. `useHealthCheck`, `healthCheck`).

### `scripts` (`@workspace/scripts`)

Utility scripts package. Each script is a `.ts` file in `src/` with a corresponding npm script in `package.json`. Run scripts via `pnpm --filter @workspace/scripts run <script>`. Scripts can import any workspace package (e.g., `@workspace/db`) by adding it as a dependency in `scripts/package.json`.
