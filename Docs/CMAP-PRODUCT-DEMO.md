# CMAP Product Demo — 3–5 Minute Walkthrough (verified Oct 2026)

All steps use real screens. Timings are approximate. Use demo-labeled data only.

## Requirements
- App: `https://neducmap-1207.netlify.app` (or local `http://localhost:3000`)
- Demo admin: seeded Super Admin account (email `ned.uz07@gmail.com`; default password is in
  `cmap/netlify/database/migrations/20261010000100_seed_super_admin.sql` — change it after login).
- Expected start state: dashboard may show zeros on a fresh database (real counts, never fabricated).

## Script
| Time | Action | Say | Expected |
|---|---|---|---|
| 0:00 | Open `/login`, sign in as admin | "One login for every role-based view." | Lands on home |
| 0:30 | Open Dashboard | "Every number is live: members, visitors, attendance, events, pending and overdue tasks, follow-ups." | Cards match records |
| 1:00 | Members → add "Demo Walker", assign Choir | "Registration with department ownership in seconds." | Row appears with dept |
| 1:30 | Visitors → register "Demo Guest" → assign follow-up due tomorrow | "No visitor falls through: owner, due date, overdue flags." | Follow-up listed |
| 2:00 | Attendance → new session → tick 2 members → Save | "Bulk marking with present counts." | Count updates |
| 2:30 | Tasks → add "Call Demo Guest" due tomorrow, owner self → Start → Complete + note | "What, who, when, status, evidence — the accountability loop." | Status flows; overdue filter demo-able with past due date |
| 3:00 | Reports → Membership → Run → Generate AI Summary | "Filterable reports plus a labeled AI draft a human must review." | Summary + disclaimer |
| 3:30 | Close: dashboard again | "Pending vs overdue vs done — visible every meeting." | Updated counts |

Skip any step whose feature is down and say so plainly.

## Cleanup after rehearsing on shared/production data
Prefix demo rows `DEMO-`, then delete members/tasks directly or archive them; verify counts return.
Never use real members' personal information in demos or screenshots.
