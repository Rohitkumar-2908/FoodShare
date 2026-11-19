# Changelog (semantic versioning: MAJOR.MINOR.PATCH)

## 3.1.1
- Added `npm run admin` to create the admin or reset its password (works when an old admin already exists).
- The server now prints clearly whether the admin was created, ignored or rejected (and why), warns when no `.env` file is found, and the admin sign-in page explains what to do.
- `.env` parsing accepts `export`, lowercase names, quotes and Windows line endings.
- docs/ACCOUNTS.md: step-by-step admin, inspector and one-time-code guide.
- Tests: 62.

## 3.1.0
- Home page: rotating 3D photo ring (drag, arrows, click to zoom) using the supplied photos, smaller statistic tiles, and a terms and conditions section.
- New public pages: About, How it works, Gallery (zoomable), Terms.
- Dashboards: every role now has Overview (greeting, key numbers, recent activity, map, extra card) and Help; plus Map (donor, NGO, organiser), Route map with a one-click Google Maps route (distributor), and Safety guide (inspector).
- Admin: compact header chip, no forced profile step.
- Fixed: avatar skin colour could be missing for some names.
- Fixed: a retried background job could be left waiting forever when its timer fired a millisecond early.
- Tests: 54.

## 3.0.0
- BREAKING: whole-state access (`/api/v1/state`) removed (returns 410). The frontend now uses `/api/v1/auth/*`, `/api/v1/view` and `/api/v1/actions/*`.
- Added: server-side accounts (scrypt), cookie sessions, CSRF protection, lockout, TOTP two-factor authentication with recovery codes, admin-issued reset codes, role and ownership checks on every action, per-role data views, verified-account gate, pickup-code lockout, soft deletes, account export and erase, encrypted 2FA secrets, admin created from environment settings.
- Tests: 52 (unit, HTTP, security, frontend against server).

## 2.0.0
- BREAKING: API moved to `/api/v1`; old `/api/state` now returns 410. `PUT` requires `If-Match` (revision) and a JSON content type.
- Added: circuit breaker + file fallback + reconcile, optimistic concurrency, idempotency keys, rate limiting, request IDs and trace headers, structured logs, Prometheus metrics, health/readiness, graceful shutdown, queue with retries, signed webhooks, scheduled backups, data migrations, feature flags.
- Added: Docker, docker-compose, nginx, CI workflow, alert rules.
- Frontend: spatial, neumorphic and glass styling; resilient sync with timeouts and backoff; data export and account deletion.

## 1.0.0
- Single-file frontend, simple state sync.
