# CMAP Product Assessment (evidence-based, Oct 2026)

> Hypotheses are labeled HYPOTHESIS. Verified facts are labeled VERIFIED. No interviews,
> testimonials, surveys, or market figures are cited — none were conducted.

## 1. Problem definition

**One sentence:** Church administrators and ministry leaders often manage members, attendance,
follow-ups, and responsibilities across disconnected records and communication channels, making it
difficult to keep reliable records, monitor outstanding work, coordinate follow-ups, and know
whether assigned responsibilities were completed.

**Existing admin pain (HYPOTHESIS, consistent with the PRD):** member data in notebooks,
spreadsheets, forms, and chat apps; visitor follow-up tracked by memory; department tasks
assigned verbally with no deadline record; leaders lack a view of pending vs overdue work;
reports assembled manually; no history of who did what.

**Target users and pains:**
- Pastor/church leader: no trustworthy overview; follow-ups slip.
- Department/group leaders: tasks, deadlines, activity records scattered.
- Staff/volunteers: unclear ownership ("who does what by when").
- Members: their data handled inconsistently.

**Consequences:** missed follow-ups, duplicated effort, unaccountable spending of volunteer time,
decisions on stale data, privacy risk from informal channels.

**Solved today (VERIFIED by testing):** centralized member/visitor records; manual attendance with
history; departments/groups with member assignment; events with attendees/notes; tasks with
owner/priority/due-date/status plus comments and auto-recurrence; follow-ups with assignee/due
dates/overdue flags and visitor→member conversion; filterable reports with CSV/PDF export;
AI-assisted report summaries (drafts, human-reviewed); role-tagged audit trail; QR check-in;
responsive mobile/desktop UI; installable PWA + Android APK against hosted backend.

**Unsolved:** no giving/finance module; no SMS/WhatsApp/email sending (Telegram alerts only);
uploads ephemeral in production; no offline data entry; no fine-grained role permissions
(roles recorded, not enforced per action); logged-out pages degrade instead of redirecting.

## 2. Solution assessment (all VERIFIED Oct 2026 unless noted)

| Workflow | Status | Evidence |
|---|---|---|
| Register/manage member | PASS | UI add + search + archive; persists; reports reflect |
| Register visitor + follow-up | PASS | assign/due/overdue highlight; converts to member |
| Record attendance | PASS | sessions + bulk mark + present counts; QR check-in live |
| Departments/groups | PASS | create/list/counts; member assignment incl. dropdown |
| Events | PASS | create/venue/Maps link/Calendar sync/walk-in/notes |
| Tasks + accountability | PASS | owner/priority/due/status/recurring/comments; filters incl. Overdue |
| Reports | PASS | members/tasks/attendance/visitors + filters + CSV + print-PDF |
| AI summary | PASS | real Gemini 200s; labeled draft + disclaimer; 401/400/503 paths |
| Dashboard | PASS | live aggregates, no fabricated numbers |
| Login/logout | PASS | credentials + JWT role; wrong password rejected |

Accountability questions answered by UI: what (task title), who (owner), when (due + overdue auto-flag),
status, evidence (comments/notes), outstanding (pending/overdue filters + dashboard).

## 3. Technical status
Next.js 16 App Router + Prisma 6 + Postgres (Netlify Database) in production; SQLite dev.db retired
locally. NextAuth Credentials + bcrypt. `tsc` clean; `next build` passes; 5/5 AI unit tests;
ESLint red repo-wide on `no-explicit-any` (pre-existing convention, unchanged by this pass).

## 4. UX findings
Fixed this pass: mobile contrast washout (dark-scheme root flip vs hardcoded light surfaces) +
360/390/430px overflow (clamped hero, wrapping nav/buttons). Remaining: logged-out routes show
errors instead of redirecting to login; destructive actions lack confirm dialogs; empty states are
plain; no pagination beyond 20-row report preview.

## 5. Security findings (this pass)
- FIXED: 13 API route files required no session; now all data routes require login (`requireSession`
  helper, 401 verified logged-out on members/dashboard/reports). Audit actor is now the real user
  email instead of `"local"`. Exception by design: `POST /api/attendance` stays open for QR
  self-check-in kiosks (documented).
- OK: bcrypt passwords; no secrets in code/logs/client bundle; `.env`/DB/uploads git-ignored.
- REMAINING RISKS: roles are recorded, not enforced (any logged-in user can call any endpoint);
  local dev currently shares the production database (no isolated dev DB — use a Netlify DB branch);
  uploads have no server-side type/size cap and are ephemeral in production; logged-out UI shows raw
  errors.

## 6. Business viability (HYPOTHESIS — needs pilot validation)
- Segments: small/medium churches (core), multi-department churches (accountability story), admins,
  pastors, coordinators.
- Differentiator: accountability layer (ownership + deadlines + overdue + audit) on top of records —
  most church tools stop at member lists.
- Barriers: no giving/finance, no SMS/WhatsApp, data-migration effort, trust in cloud hosting,
  smartphone literacy variance.
- Pricing (options, unvalidated): free pilot (1 church, 3 months) → paid tiers by active members
  (e.g. capped free tier, per-church monthly). Do not assume willingness to pay.
- Pilot: 2–3 willing churches, seeded admin per church, weekly check-ins, success = follow-up
  completion rate up, overdue visibility used in meetings, core workflows completed unaided.
- Metrics: record retrieval time; % tasks completed by deadline; outstanding follow-ups trend;
  weekly active admins; unaided workflow completion; ease-of-use rating.

## 7. Remaining gaps (prioritized)
1. Role enforcement per endpoint + login redirect for logged-out pages.
2. Isolated dev/staging database (stop sharing production).
3. Persistent file storage (Blobs/S3) + server upload validation.
4. Confirm dialogs, empty states, pagination.
5. Giving/finance + SMS/WhatsApp/Email modules (scope + finance controls first).
