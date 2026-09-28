**PRODUCT REQUIREMENTS DOCUMENT (PRD)**

**Church Management & Accountability Platform**

*Version 1.0 | MVP Specification | September 2026*

**1\. Executive Summary**  
The Church Management & Accountability Platform (CMAP) is a web-based system that helps churches manage people, attendance, departments, groups, events, follow-up activities, tasks, responsibilities, and reports in one place. It combines church management with operational accountability so leaders can assign responsibilities, monitor progress, track deadlines, document activities, and use organized records for decision-making.

**2\. Product Vision**  
To provide churches with a simple, secure, and practical digital platform for managing people and activities while improving visibility, follow-up, responsibility tracking, and reporting.

**3\. Problem Statement**  
Member information may be spread across notebooks, spreadsheets, forms, and messaging platforms.

Attendance and visitor follow-up can be difficult to track consistently.

Department leaders may lack a central place to manage tasks, deadlines, and reports.

Church leadership may have limited visibility into pending responsibilities and overdue activities.

Regular reports can require significant manual work.

Important operational records may not show a clear history of who changed or completed an activity.

**4\. Product Goals**  
Centralize member and visitor information.

Make attendance recording and reporting easier.

Improve visitor and member follow-up.

Help departments and groups manage activities and responsibilities.

Create clear task ownership, deadlines, and status tracking.

Provide useful dashboards and reports for authorized leaders.

Maintain role-based access and an audit trail for important actions.

Provide a responsive experience on computers, tablets, and phones.

**5\. Target Users**

| Role | Primary Needs | Typical Access |
| :---- | :---- | :---- |
| Super Admin | System setup, users, permissions, all modules | Full access |
| Pastor / Church Leader | Oversight, dashboards, reports, follow-up | Church-wide access |
| Department Leader | Members, tasks, activities, reports | Department access |
| Group / Cell Leader | Members, attendance, meetings, follow-up | Group access |
| Staff | Assigned operational activities | Assigned modules |
| Volunteer | Tasks and responsibilities | Assigned tasks |
| Member | Profile, events, requests, permitted activities | Own permitted data |

**6\. MVP Scope**  
The first release should focus on eight core modules:

Dashboard

Members

Visitors & Follow-up

Attendance

Departments / Groups

Events

Tasks & Accountability

Reports

**7\. Functional Requirements**

**7.1 Dashboard**  
Show total members, new members, visitors, attendance, upcoming events, pending tasks, overdue tasks, follow-ups, and report status.

Provide quick actions such as adding a member, recording attendance, creating a task, and creating an event.

Display summary cards and simple charts.

Show information according to user permissions.

**7.2 Member Management**  
Create, view, edit, search, filter, and archive member records.

Store contact details, date joined, membership status, department, group, skills/interests, and service roles.

Display attendance, participation, tasks, and follow-up history.

Support profile photo upload.

Restrict sensitive information to authorized users.

**7.3 Visitors & Follow-up**  
Register first-time and returning visitors.

Record visit date, contact information, source, and notes.

Assign follow-up responsibility and due dates.

Track follow-up status and outcome.

Convert a visitor record into a member record.

Show follow-up lists and overdue follow-ups.

**7.4 Attendance**  
Record attendance for services, Bible study, midweek services, prayer meetings, youth meetings, departments, groups, and special events.

Support manual attendance in MVP; design for QR check-in later.

Track member and visitor attendance.

Generate attendance history, percentages, trends, and summaries.

Filter by date, service, department, group, or event.

**7.5 Departments & Groups**  
Create departments, ministries, and groups/cells.

Assign leaders and members.

Record meetings and activities.

Track attendance and participation.

Allow authorized leaders to submit activity reports.

Support department/group tasks and goals.

**7.6 Events**  
Create events with title, date, time, venue, description, coordinator, and status.

Assign event tasks and responsible persons.

Register attendees and record attendance.

Store event notes and supporting documents.

Produce event activity and attendance reports.

**7.7 Tasks & Accountability**  
Create tasks with title, description, responsible person, department/group, priority, due date, and status.

Support Not Started, In Progress, Completed, Overdue, and Cancelled.

Allow comments, attachments, and completion notes.

Allow authorized users to assign, reassign, approve, and close tasks.

Display pending and overdue tasks.

Support recurring tasks in a later release.

Keep a history of important task actions.

**7.8 Reports**  
Generate membership, visitor, follow-up, attendance, department/group, event, task/accountability, and volunteer reports.

Allow filters by date range, department, group, event, and status.

Allow authorized users to export PDF, Excel, or CSV in later releases.

Display summary metrics and trends.

**NOTE – Tool Choice Review (2026-09-28): Framework**
Choice reviewed: Next.js (React + App Router, TypeScript) vs simpler Express + templated pages.
Decision: Keep Next.js for MVP.
Why: single codebase for responsive UI + API routes covers all 8 MVP modules and role-based pages without maintaining separate frontend/backend; App Router + API routes integrate directly with Prisma (SQLite local) and NextAuth Credentials for the 7 PRD roles; responsive requirement (computers, tablets, phones) is easier with React components; local run (`npm run dev` on localhost:3000) still holds with no cloud dependency.
Trade-off accepted: heavier than Express/EJS and requires Node.js LTS install plus TypeScript learning curve, but avoids rework when dashboard/charts/reports grow. Revisit only if local machine cannot run Node or team prefers Python-only maintenance.

