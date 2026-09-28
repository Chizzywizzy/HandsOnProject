# Church Management & Accountability Platform (CMAP)

Version 1.0 | MVP Specification | September 2026

## Overview
CMAP is a web-based system that helps churches manage people, attendance, departments, groups, events, follow-up activities, tasks, responsibilities, and reports in one place.

It combines church management with operational accountability so leaders can assign responsibilities, monitor progress, track deadlines, document activities, and use organized records for decision-making.

## Vision
Provide churches with a simple, secure, and practical digital platform for managing people and activities while improving visibility, follow-up, responsibility tracking, and reporting.

## Problem It Solves
- Member information spread across notebooks, spreadsheets, forms, and messaging platforms.
- Attendance and visitor follow-up difficult to track consistently.
- Department leaders lack a central place for tasks, deadlines, and reports.
- Limited visibility into pending responsibilities and overdue activities.
- Manual work required for regular reports.
- Operational records lack clear history of who changed or completed an activity.

## Goals
- Centralize member and visitor information.
- Simplify attendance recording and reporting.
- Improve visitor and member follow-up.
- Help departments and groups manage activities and responsibilities.
- Ensure clear task ownership, deadlines, and status tracking.
- Provide dashboards and reports for authorized leaders.
- Enforce role-based access and audit trail for important actions.
- Responsive experience on computers, tablets, and phones.

## Target Users
- **Super Admin:** system setup, users, permissions, all modules.
- **Pastor / Church Leader:** oversight, dashboards, reports, follow-up.
- **Department Leader:** members, tasks, activities, reports.
- **Group / Cell Leader:** members, attendance, meetings, follow-up.
- **Staff:** assigned operational activities.
- **Volunteer:** assigned tasks and responsibilities.
- **Member:** profile, events, requests, permitted activities.

## MVP Scope (8 Core Modules)
1. **Dashboard** – totals, new members, visitors, attendance, upcoming events, pending/overdue tasks, follow-ups; quick actions; cards and charts.
2. **Members** – create, view, edit, search, filter, archive; contact details, status, department/group, skills, roles; attendance/task history; photo upload.
3. **Visitors & Follow-up** – register first-time/returning visitors; assign follow-up with due dates; track status/outcome; convert visitor to member.
4. **Attendance** – record for services, Bible study, prayer meetings, youth, departments, groups, special events; manual entry in MVP (QR later); history, trends, summaries.
5. **Departments / Groups** – create ministries and cells; assign leaders/members; record meetings; track participation; submit activity reports.
6. **Events** – title, date, time, venue, coordinator, status; assign tasks; register attendees; notes and documents; activity reports.
7. **Tasks & Accountability** – title, owner, department/group, priority, due date, status (Not Started, In Progress, Completed, Overdue, Cancelled); comments, attachments, history.
8. **Reports** – membership, visitor, follow-up, attendance, department/group, event, task/accountability; filters by date, department, group, event, status (PDF/Excel/CSV export later).

## Tech Stack (Local MVP)
- Framework: Next.js (local, `http://localhost:3000`)
- Database: SQLite file via Prisma (local, `./prisma/dev.db`)
- Auth: NextAuth Credentials + bcrypt roles (local, no cloud provider)
- Files: local `./uploads/` folder
- Details: see `Docs/TECH_STACK.md`.

## Project Structure
```
HandsOnProject/
  README.md
  Docs/
    CMAP PRD.md
```

Full requirements: see `Docs/CMAP PRD.md`.

## Status
Initial version – PRD and README only. No application code yet.

## Next Steps
- Decide tech stack (frontend, backend, database, auth).
- Design data model and role-based access.
- Implement MVP modules iteratively starting with Members + Dashboard.
