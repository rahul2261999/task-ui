# API contract

This UI is designed to integrate with an external backend (e.g. the Go service).

## Where the contract lives

There is a backend/API contract note in:

- `attached_assets/frontend-api-contract_1766466966559.md`

If you update the backend endpoints, update the contract note and verify the frontend API calls in:

- `client/src/features/auth/api/`
- `client/src/features/tasks/api/`
- `client/src/features/user/api/`
- `client/src/shared/api/http.ts` (shared fetch wrapper)


