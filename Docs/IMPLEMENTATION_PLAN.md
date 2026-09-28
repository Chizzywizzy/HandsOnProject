# CMAP Implementation Plan (Derived from PRD v1.0)

Source: `Docs/CMAP PRD.md` – 8 MVP modules: Dashboard, Members, Visitors & Follow-up, Attendance, Departments/Groups, Events, Tasks & Accountability, Reports.

## Build Order Rationale
Data dependencies drive order: Users/Auth + Members/Departments first, then Visitors, Attendance, Events, Tasks, then Dashboard and Reports last (they aggregate everything).

---

## Phase 0 – Foundation, Auth, and Shared Shell
**Goal:** runnable app skeleton with login, roles, and audit trail.
**Concrete outputs:**
- Tech stack chosen and documented (e.g. frontend, backend, DB, hosting).
- Repo structure (`/frontend`, `/backend`, `/docs`), env config, seed script.
- Auth: login/logout, 7 roles from PRD §5 (Super Admin, Pastor/Leader, Dept Leader, Group Leader, Staff, Volunteer, Member).
- RBAC middleware + permission matrix enforced on API and UI.
- Audit log table (who, what, when) for important actions.
- Responsive app shell: sidebar/nav, protected routes, 404/403 pages.
- Acceptance: each role logs in and only sees permitted modules; every create/update/close writes an audit entry.

## Phase 1 – Members + Departments / Groups (Core Data)
**Goal:** centralize people and org structure (PRD §7.2, §7.5).
**Concrete outputs:**
- Data models: Member (contact, date joined, status, department, group, skills/interests, service roles, photo URL, archived flag), Department/Group (type, leaders, members), Meeting/Activity note.
- APIs: member CRUD + search/filter/archive, department/group CRUD + assign leaders/members, meeting notes.
- UI: member list with search/filter, member detail (attendance/participation/tasks/follow-up history placeholders), member form with photo upload, department/group list/detail.
- Acceptance: create/edit/archive member; assign member to department/group; photo upload works; sensitive fields hidden from unauthorized roles.

## Phase 2 – Visitors & Follow-up
**Goal:** track visitors to conversion (PRD §7.3). Depends on Phase 1.
**Concrete outputs:**
- Data models: Visitor (first-time/returning, visit date, contact, source, notes), Follow-up (assignee, due date, status, outcome).
- APIs: visitor register, follow-up assign/update, convert visitor → member (preserves history).
- UI: visitor list, follow-up queue with overdue highlight, convert-to-member action.
- Acceptance: register visitor, assign follow-up with due date, mark outcome, overdue list shows correctly, conversion creates a linked member record.

## Phase 3 – Attendance
**Goal:** manual attendance with history and trends (PRD §7.4). Depends on Phases 1–2.
**Concrete outputs:**
- Data models: Service/Gathering type, Attendance Session (date, service, department/group/event link), Attendance Record (member/visitor, present/absent).
- APIs: create session, bulk mark attendance, history/percentages/trends/summaries with filters (date, service, department, group, event).
- UI: record-attendance page (checklist), history page with filters, simple trend display.
- Acceptance: record attendance for a service; filter by date/service/department; percentages and trends compute correctly. QR check-in explicitly deferred.

## Phase 4 – Events
**Goal:** schedule events and track participation (PRD §7.6). Depends on Phases 1, 3.
**Concrete outputs:**
- Data models: Event (title, date, time, venue, description, coordinator, status), Event Attendee, Event Task link, Event Note/Document.
- APIs: event CRUD, attendee registration, attendance recording, notes/documents upload.
- UI: event calendar/list, event detail (tasks, attendees, notes), create/edit form.
- Acceptance: create event, assign coordinator, register attendees, record attendance, attach note/document, produce event activity summary.

## Phase 5 – Tasks & Accountability
**Goal:** ownership, deadlines, status, history (PRD §7.7). Depends on Phases 1–2.
**Concrete outputs:**
- Data models: Task (title, description, owner, department/group, priority, due date, status: Not Started/In Progress/Completed/Overdue/Cancelled), Comment, Attachment, Task History.
- APIs: task CRUD, assign/reassign/approve/close, comments/attachments/completion notes, pending/overdue queries, auto-mark Overdue by due date.
- UI: task board/list with status and priority, task detail with comments/history, pending/overdue views.
- Acceptance: full lifecycle works with permissions; overdue auto-detection; history records every important action. Recurring tasks deferred.

## Phase 6 – Dashboard
**Goal:** at-a-glance oversight with quick actions (PRD §7.1). Depends on Phases 1–5.
**Concrete outputs:**
- Aggregated queries: total members, new members, visitors, attendance, upcoming events, pending/overdue tasks, follow-ups, report status — all permission-scoped.
- UI: summary cards, simple charts, quick actions (add member, record attendance, create task, create event).
- Acceptance: numbers match underlying module data; different roles see different data; quick actions deep-link correctly.

## Phase 7 – Reports
**Goal:** filterable cross-module reports (PRD §7.8). Depends on all prior phases.
**Concrete outputs:**
- Report definitions: membership, visitor, follow-up, attendance, department/group, event, task/accountability, volunteer — with filters (date range, department, group, event, status).
- UI: report list, filter bar, summary metrics + trends per report.
- Acceptance: each report runs with filters and matches module data. PDF/Excel/CSV export explicitly deferred to post-MVP.

## Phase 8 – Hardening, Responsive QA, and Release
**Goal:** shippable MVP.
**Concrete outputs:**
- Responsive pass on phone/tablet/desktop for all pages.
- Role-by-role UAT checklist signed off against PRD §7.1–7.8.
- Seed demo data, user guide, deploy to hosting, backup plan.
- Acceptance: clean test run with no blocking bugs; authorized export/visibility rules hold; audit trail complete.

## Suggested Milestones
1. M1 (Phases 0–1): login + members usable.
2. M2 (Phases 2–3): visitors and attendance usable.
3. M3 (Phases 4–5): events and tasks usable.
4. M4 (Phases 6–8): dashboard, reports, release.
