# FoodShare 3.0

Food donation platform. Plain JavaScript (no TypeScript). The server uses Node's built-in `http` module, so it has **no runtime dependencies** (the `mongodb` driver is optional).

```bash
npm install            # optional: installs the MongoDB driver
cp .env.example .env
npm start              # http://127.0.0.1:3000
npm test               # 62 tests: unit, HTTP, security and frontend-against-server
npm run backup         # snapshot to data/backups
npm run restore -- data/backups/db-XXXX.json
npm run loadtest -- http://127.0.0.1:3000/api/v1/health 2000 50
```

* **Database:** MongoDB first (set `MONGODB_URI`); if it is missing, unreachable or drops, the server switches to `data/db.json` automatically, reconnects with exponential backoff, and copies newer local data back into MongoDB. The badge at the bottom-left of the page shows which is active.
* **Frontend:** `public/index.html` (single file). Without the server it keeps everything in browser local storage.
* **Docs:** [ACCOUNTS](docs/ACCOUNTS.md) · [ARCHITECTURE](docs/ARCHITECTURE.md) · [SECURITY](docs/SECURITY.md) · [OPERATIONS](docs/OPERATIONS.md) · [CHECKLIST (what is and is not built)](docs/CHECKLIST.md) · [OpenAPI](docs/openapi.yaml) · [CHANGELOG](CHANGELOG.md)

**Can't sign in as admin, or need a one-time code?** See [docs/ACCOUNTS.md](docs/ACCOUNTS.md). Short version: run `npm run admin`.

**First run:** set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env` (and `DATA_KEY` from `openssl rand -hex 32`). The admin account is created at startup; the admin then creates inspectors and issues one-time setup codes from the Users tab. Donors, NGOs, organisers and distributors register themselves.

Login, sessions, two-factor authentication, roles, ownership checks and per-role data views are enforced **on the server** (docs/SECURITY.md). The hosted preview page cannot reach a server, so it runs in a browser-only demo mode. Read docs/CHECKLIST.md for exactly what is and is not built.
