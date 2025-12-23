# Setup

## Prerequisites

- Node.js 18+ (20+ recommended)
- npm

## Install

Run from the repo root:

```bash
npm ci
```

## Configure environment

Create a `.env` file in the repo root (same folder as `package.json`).

See `ENVIRONMENT.md` for the variables and examples.

## Run (development)

```bash
npm run dev
```

Note: Vite is configured with `root=client/`, but you still run scripts from the repo root.

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Typecheck

```bash
npm run check
```


