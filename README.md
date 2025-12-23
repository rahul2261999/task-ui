# Task UI (React + Vite)

Frontend-only **Task Management UI** (auth + tasks + account screens) built with **React + TypeScript** and designed to talk to a separate backend (e.g. the Go API service).

## Key tech

- **React 18 + TypeScript**
- **Vite** (project root is the repo; Vite `root` is `client/`)
- **Routing**: Wouter
- **Server state**: TanStack React Query
- **UI**: shadcn/ui (Radix UI primitives) + Tailwind CSS

## Project layout

```
client/                 # Vite root + React app
  src/
    app/                # routing/providers/layout glue
    features/           # business domains (auth, tasks, user)
    shared/             # reusable/shared code (ui, api, store)
shared/                 # shared API types (repo-level)
docs/                   # additional documentation
attached_assets/        # design assets + API contract notes
```

## Prerequisites

- Node.js **18+** (20+ recommended)
- npm (this repo includes `package-lock.json`)

## Setup

1) Install dependencies (run from the repo root):

```bash
npm ci
```

2) Configure environment:

- Create `.env` at the repo root (same folder as `package.json`)
- See `docs/ENVIRONMENT.md` for the exact variables and an example

3) Start the dev server:

```bash
npm run dev
```

Vite will print the local URL (typically `http://localhost:5173`).

## Environment variables

- **`VITE_TASK_APP_BASE_URL`**: Base URL of the backend API (example: `http://localhost:8080`)
  - If unset, the app currently falls back to a hardcoded URL in `client/src/shared/api/http.ts`.

## Scripts

- **`npm run dev`**: start Vite dev server
- **`npm run build`**: build production assets into `dist/`
- **`npm run check`**: TypeScript typecheck (`tsc`)

## Docs

See `docs/README.md` for deeper docs:

- Setup + environment config
- Architecture and folder boundaries
- Common troubleshooting


