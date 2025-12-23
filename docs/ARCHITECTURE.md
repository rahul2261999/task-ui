# Architecture

## High-level

- **UI only**: this repo contains the frontend; backend runs separately.
- **Routing**: Wouter (`client/src/app/App.tsx`)
- **Server state**: TanStack React Query (`client/src/shared/api/queryClient.ts`)
- **HTTP**: `fetchJson` wrapper (`client/src/shared/api/http.ts`)

## Folder boundaries (feature-first)

Frontend source lives in `client/src/`:

```
client/src/
  app/          # app bootstrap only (routing/providers/layout glue)
  features/     # business domains (auth, tasks, user)
  shared/       # reusable, feature-agnostic code
  styles/       # global styles
  config/       # app configuration (if needed)
  main.tsx
```

### Feature modules

Each feature should be self-contained:

```
features/<feature>/
  api/
  components/
  hooks/
  utils.ts
  types.ts
  index.ts     # public API
```

Rules:

- Features **must not** deep-import other features
- Cross-feature imports should go through `features/<feature>/index.ts`
- Feature code may import from `shared/`

## Import aliases

Configured in `vite.config.ts` and `tsconfig.json`:

- `@` → `client/src`
- `@shared` → `shared` (repo-level shared types)
- `@assets` → `attached_assets`


