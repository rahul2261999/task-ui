# Troubleshooting

## API calls go to the wrong server / ngrok URL

- Set `VITE_TASK_APP_BASE_URL` in the repo-root `.env` (see `ENVIRONMENT.md`)
- Restart `npm run dev` after changing `.env`

## 401 redirects me back to `/login`

By design: `client/src/shared/api/http.ts` clears auth and redirects to `/login` on HTTP 401.

Things to check:

- Your backend is running and reachable at `VITE_TASK_APP_BASE_URL`
- Your token is valid (try logging out/in)

## Path aliases (`@/...`) don’t resolve

Ensure you are using the repo’s `tsconfig.json` and the Vite config:

- `@` resolves to `client/src`
- `@shared` resolves to `shared`

If your editor still fails:

- Restart TypeScript server
- Ensure dependencies are installed (`npm ci`)

## Build succeeds locally but fails elsewhere

Run:

```bash
npm run check
npm run build
```

If the environment differs (Node version, missing env vars), align Node 18+ and set `.env` as needed.


