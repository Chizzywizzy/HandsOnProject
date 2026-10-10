# CMAP Deployment (Netlify + GitHub)

Preferred workflow: **Development → Local checks → Review changes → Commit and push → Netlify automatic deployment → Production verification**

## One-time setup (done)
- `netlify.toml` at repo root: base `cmap`, build `npx prisma generate && npm run build`, publish `.next`, Node 24.
- Pushes to `main` auto-deploy. PRs get deploy previews (Netlify default).
- `.env.example` lists every variable; real secrets live only in local `.env` (git-ignored) and Netlify dashboard → Site settings → Environment.

## Deploy my changes (repeatable)
1. Test locally: `cd cmap`, `npm run dev`, exercise the touched pages. For DB changes: `npx prisma@6 migrate dev --name <what>`.
2. Checks: `npx tsc --noEmit` (must be clean), `npm run build` (must pass), `node --test src/lib/ai.test.ts` (5/5).
3. Review: `git status --short` + `git diff --stat`. Stage only intended files. Never stage `.env`, `*.db`, `public/uploads/*` (except `.gitkeep`), or stray files.
4. `git commit -m "<Phase>: <what>"` → `git push origin main` → Netlify builds automatically.
5. Verify: Netlify dashboard → Deploys (wait for Published) → open `https://<site>.netlify.app` → login → smoke-test touched modules.
6. Failed deploy: read the deploy log, fix locally, push again. Roll back: Netlify Deploys → previous successful deploy → Publish deploy.

## Production readiness
- **Database: Netlify Database (Neon-backed, provisioned in dashboard).** Local SQLite `dev.db` is retired (kept on disk, untouched) and does NOT go to production. Schema uses `NETLIFY_DB_URL` (platform-injected); schema changes ship via `cmap/netlify/database/migrations/*.sql`, applied automatically at deploy. Local dev: `netlify dev` injects a branch DB, or set `NETLIFY_DB_URL` locally.
- **Uploads (still open):** `public/uploads/` is ephemeral on Netlify. Before real use: move to Netlify Blobs or S3.
- **Env vars required:** `DATABASE_URL`, `NEXTAUTH_URL` (= site URL), `NEXTAUTH_SECRET` (`openssl rand -base64 32`); optional: `GEMINI_API_KEY`, `GOOGLE_CLIENT_ID/SECRET/REFRESH_TOKEN` (add site callback URL in Google console), `TG_TOKEN`/`TG_CHAT_ID`.
- Safe to deploy as a demo now (build passes); do not enter real member data until DB/uploads blockers are resolved.

## Requesting a deployment
Message: "deploy CMAP" — I inspect status, validate, run checks, and push only intended changes. Unrelated edits are never auto-pushed.
