# CMAP Tech Stack (Locked for MVP)

> App and database run locally for now. No cloud hosting, no external DB, no external auth provider in MVP.

## Decisions
- **Framework:** Next.js (React + App Router, TypeScript) – one codebase for responsive UI and API routes. Runs locally via `npm run dev` on `http://localhost:3000`.
- **Database:** SQLite (local file `./prisma/dev.db`) accessed via Prisma ORM – zero-install server, file lives in the project. Migrations via Prisma. Postgres migration deferred to post-MVP.
- **Authentication:** Auth.js / NextAuth.js Credentials provider – email + password login with bcrypt hashing, JWT sessions, `role` field enforcing the 7 PRD roles (Super Admin, Pastor/Leader, Dept Leader, Group Leader, Staff, Volunteer, Member). All auth runs locally; no OAuth/cloud provider.
- **File storage:** Local filesystem (`./uploads/` – profile photos, task attachments, event documents) served by the Next.js app. DB stores only relative paths. Cloud storage (e.g. S3) deferred to post-MVP.

## Local Runtime
- App: `http://localhost:3000` (Next.js dev server on this machine).
- DB: `prisma/dev.db` SQLite file on this machine, managed with `npx prisma studio` / `npx prisma migrate dev`.
- Auth: local user table + sessions; seed a local Super Admin for development.
- Files: `./uploads/` folder in the project; backed up with the repo (excluding actual uploads via `.gitignore`, keeping `.gitkeep`).

## Prerequisite (not yet installed)
Node.js LTS + npm are required locally. Checked 2026-09-28: `node`, `npm`, `python` not found on this Windows machine. Next step is installing Node.js LTS before scaffolding.
