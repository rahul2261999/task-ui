# Environment

This app reads **Vite** environment variables from the **repo root**.

## Required variables

### `VITE_TASK_APP_BASE_URL`

Base URL of your backend API (example: `http://localhost:8080`).

The frontend uses it in `client/src/shared/api/http.ts`.

## Example `.env`

Create a file named `.env` at the repo root:

```dotenv
VITE_TASK_APP_BASE_URL=http://localhost:8080
```

## Notes

- Variables must be prefixed with `VITE_` to be available via `import.meta.env`.
- If `VITE_TASK_APP_BASE_URL` is not set, the app currently falls back to a hardcoded URL (intended for development).


