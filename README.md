# Sentinel Counsel

**AI-powered litigation platform for law firms.**

Sentinel Counsel gives trial attorneys a voice-first AI interface for e-discovery, real-time deposition support, and privilege-by-design architecture — so firms can harness AI without waiving attorney-client privilege.

**Live site:** [sntlabs.io](https://sntlabs.io)

## Features

- **Voice-First Interface** — Speak naturally to retrieve case files, draft discovery responses, and generate privilege logs. No training required.
- **Real-Time Deposition Support** — Ambient intelligence cross-references testimony against prior statements, filings, and public records during live depositions.
- **Full E-Discovery** — AI-powered document review, predictive coding, privilege logging, and production management.
- **Privilege-by-Design** — Data never leaves the privilege boundary. Zero third-party exposure. Defensible audit trail for every AI interaction.
- **256-bit AES Encryption** — Military-grade encryption at rest and in transit with zero data retention.

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS 4, shadcn/ui
- **Routing:** Wouter (client-side SPA with prerendered static HTML for SEO)
- **Backend:** Express.js, Drizzle ORM, PostgreSQL
- **API:** Orval-generated React Query hooks with Zod validation
- **Deployment:** Replit (autoscale)

## Project Structure

```
sentinel-website/
├── artifacts/
│   ├── sentinel-counsel/    # Main website (Vite + React)
│   ├── api-server/          # Express.js backend API
│   └── mockup-sandbox/      # UI component sandbox
├── lib/
│   ├── api-spec/            # API specification (Orval)
│   ├── api-zod/             # Generated Zod schemas
│   ├── api-client-react/    # React Query hooks
│   └── db/                  # Drizzle ORM database layer
└── scripts/                 # Workspace scripts
```

## Development

```bash
pnpm install
pnpm run dev
```

## License

Proprietary. All rights reserved.
