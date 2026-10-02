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

**NOTE – Design Refinement (2026-09-28): Primary color change**
Change requested: primary color navy `#1B2A4A` → danger `#B91C1C1` in `design.html`.
Change made: replaced `--navy: #1B2A4A` with `#B91C1C` and `--navy-light: #2C426E` with `#991B1B` (hover); updated Colors swatch from "Navy / Primary #1B2A4A" to "Danger / Primary #B91C1C". Header, headings, primary/outline buttons, and form labels now render in danger red via existing `var(--navy)` references.
Correction noted: requested `#B91C1C1` has 7 hex digits and is invalid CSS, so applied valid danger `#B91C1C` (already used for `--danger`). No other colors, typography, buttons, or inputs changed.

**NOTE – Local Execution & Tool Review (2026-09-28)**
App runs locally: Next.js dev server on `http://localhost:3000` on this machine, no cloud hosting in MVP.
Database runs locally: SQLite file `./prisma/dev.db` via Prisma ORM, no external DB server in MVP.
Accounts handling: NextAuth.js Credentials with bcrypt password hashing, local users table with role field for the 7 PRD roles, JWT sessions, seeded local Super Admin; no OAuth or cloud auth provider in MVP.
Files handling: local `./uploads/` folder for profile photos, task attachments, and event documents; database stores relative paths only; cloud storage deferred post-MVP.
Tool review rationale: Framework Next.js for single local codebase covering UI + API for all 8 modules; Database SQLite for zero-setup local file; Authentication NextAuth Credentials for local role-based access without external service; File storage local folder for simple offline local run. Details in `Docs/TECH_STACK.md`.
Choice examined: Framework Next.js vs Express + EJS was reviewed. Next.js suits CMAP because it ships responsive role-based pages and APIs together while staying fully local.

HEAD
8. AI Ethical Principles & Responsible Technology Requirements
These principles guide the design, development, testing, deployment, and improvement of every AI-enabled feature in CMAP.

8.1 Fairness
CMAP shall use AI in a way that treats people fairly and avoids unjustified discrimination or disadvantage.
AI must not discriminate against members, visitors, staff, volunteers, or leaders based on protected or sensitive personal characteristics.
AI recommendations must use relevant and legitimate information for the specific task.
Avoid subjective labels about spiritual commitment, character, worth, or suitability based solely on behavioral data.
Where practical, test AI features for unfair patterns and correct, restrict, or remove problematic features.

8.2 Accountability
CMAP shall ensure responsibility for important actions and AI-supported decisions remains clearly assigned to authorized humans.
Every important AI-supported workflow must have a responsible role.
AI recommendations must not automatically trigger high-impact decisions.
Authorized users should be able to review, accept, reject, or correct recommendations.
Important actions should be recorded in the audit trail.
The product team must define who monitors and corrects problematic AI behavior.

8.3 Transparency
CMAP shall make AI use understandable and distinguish AI-generated information from verified church records.
Clearly indicate when content, summaries, recommendations, or analysis are AI-generated or AI-assisted.
Where feasible, provide a simple explanation of why a recommendation was generated.
Identify the main data or records supporting important recommendations.
Do not present AI assumptions as confirmed facts.
Provide appropriate ways to question or report incorrect AI output.

8.4 Privacy
CMAP shall protect personal, financial, pastoral, welfare, attendance, and other sensitive information and use only information necessary for legitimate functions.
Collect only data necessary for a defined purpose.
Use role-based access controls.
Apply appropriate security to stored and transmitted data.
Do not expose sensitive information to an AI service unless authorized, necessary, and appropriately protected.
Define data retention and deletion practices.
Maintain appropriate access logs.
Provide a process for correcting inaccurate personal information.
Do not use member data for unrelated purposes without authorization.

8.5 Safety
CMAP shall reduce foreseeable harm and prevent unreliable or inappropriate AI outputs from automatically causing serious consequences.
Test AI features before release and monitor them after deployment.
High-impact decisions involving pastoral care, welfare, discipline, finances, or important services require appropriate human review.
AI recommendations are decision-support, not automatic final decisions.
Provide safeguards against harmful, misleading, or inappropriate outputs.
Provide a process for reporting AI-related incidents or harmful recommendations.
Allow the product team to modify, restrict, disable, or remove AI features when significant risks are identified.

8.6 Human Oversight
Core rule: AI assists; humans decide.
Church leaders and authorized staff remain responsible for consequential decisions.
AI must not replace appropriate pastoral, administrative, safeguarding, or financial judgment.
Users should be able to override an AI recommendation when appropriate.
Avoid automating decisions requiring context, empathy, professional judgment, or confidential human assessment.

8.7 Accuracy, Reliability & Correction
AI output should be treated appropriately and remain open to correction.
Check important AI-generated information against reliable source records.
Distinguish generated summaries from original records.
Provide a method for reporting inaccurate AI outputs.
Review repeated or serious errors.
Monitor AI performance as the product evolves.

9. Ethical AI Decision Workflow
1. Collect only necessary and authorized data.
2. AI analyzes permitted data for the defined purpose.
3. Present output as a recommendation or analysis, not an unquestionable fact.
4. An authorized human reviews the output and underlying information.
5. The human accepts, rejects, or corrects the recommendation.
6. Important actions are recorded in the audit trail.
7. Errors, complaints, or harmful outcomes are reviewed and used to improve the system.

10. Ethical AI Examples
Avoid	Responsible Alternative	Principle
'John is an unfaithful member.'	Attendance: 2 of 6 recorded meetings attended during the selected period.	Fairness & Transparency
AI automatically marks a member for disciplinary action.	AI flags a pattern for authorized human review.	Safety & Accountability
Sending all member records to an AI service without controls.	Send only necessary, authorized information with appropriate safeguards.	Privacy
AI recommendation presented as fact.	Label it as an AI-generated recommendation and show its basis where practical.	Transparency
AI decides who should receive pastoral care.	AI may identify possible follow-up indicators; an authorized person reviews and decides.	Safety & Human Oversight

11. Roles & Permissions
Super Admin: system configuration, users, permissions, security settings, and oversight.
Pastor / Church Leader: authorized church-wide dashboards, reports, and follow-up information.
Department Leader: authorized department members, tasks, activities, and reports.
Group / Cell Leader: authorized group members, attendance, meetings, and follow-up.
Staff: assigned operational modules and responsibilities.
Volunteer: assigned tasks and permitted information.
Member: own permitted information and services.
AI features and sensitive data access must follow role-based permission principles.

13. Non-Functional Requirements
Security: secure authentication, authorization, encryption where appropriate, secure sessions, and protection against common web vulnerabilities.
Privacy: data minimization, role-based access, retention controls, and secure handling of sensitive information.
Performance: common pages and dashboards should load efficiently under expected MVP usage.
Availability: reliable operation with appropriate backup and recovery procedures.
Usability: simple interfaces for users with different levels of technical experience.
Accessibility: accessible design and readable content.
Responsiveness: desktop, tablet, and mobile support.
Auditability: important changes and accountability actions traceable to authorized users.
AI Governance: each AI feature must have a defined purpose, owner, access controls, testing process, monitoring approach, and incident/correction process.

14. Suggested Initial Technology
Frontend: React / Next.js with TypeScript
UI: Tailwind CSS or another consistent component system
Backend: Next.js server functions or Node.js API
Database: PostgreSQL
Authentication: secure role-based authentication
Version Control: Git and GitHub
AI: optional AI service integrated only where there is a defined use case, authorization, and ethical risk controls.

15. Core Data Entities
User
Role
Member
Visitor
Department
Group / Cell
Attendance Record
Event
Task
Follow-up
Report
Audit Log
AI Interaction / Recommendation Record (when AI features are implemented)

18. MVP Acceptance Criteria
Users can securely log in and access functions according to their roles.
Authorized users can create, edit, search, filter, and archive member records.
Visitor follow-up can be assigned, tracked, and reviewed.
Attendance can be recorded and reported.
Departments and groups can be created and managed.
Events and tasks can be created, assigned, tracked, and reported.
Dashboard metrics are displayed according to permissions.
Reports can be generated from authorized data.
Important actions are recorded in an audit trail.
Sensitive information is restricted to authorized users.
Any AI feature included in the MVP clearly identifies AI-generated output.
AI-supported decisions remain subject to appropriate human review.
AI features do not make unsupported or discriminatory personal judgments.
There is a process for reporting and correcting inaccurate AI outputs.
AI-related incidents can be reviewed and the affected feature can be restricted or disabled when necessary.

19. AI Ethical Review Checklist
☐ Clear and legitimate purpose defined
☐ Fairness risks considered and tested
☐ Responsible human owner identified
☐ AI use disclosed to relevant users
☐ Recommendation/explanation available where appropriate
☐ Only necessary data is used
☐ Sensitive data access is restricted
☐ Security and privacy controls reviewed
☐ Potential harms identified and mitigated
☐ Human review required for high-impact decisions
☐ Correction/reporting mechanism available
☐ Audit trail implemented where appropriate
☐ Monitoring plan established
☐ Feature can be modified, restricted, or disabled if serious risks occur
20. Example Accountability Workflow
A leader creates a task.
A responsible person is assigned.
The system records due date and status.
The responsible person updates progress.
The system provides reminders as appropriate.
If an AI assistant is used, it may summarize progress or highlight overdue items.
The leader reviews the information and takes action.
Completion or changes are recorded in the audit trail.

21. Success Measures
Reduction in manual administrative work.
Improved accuracy and completeness of member records.
Improved follow-up completion rates.
Improved visibility of pending and overdue responsibilities.
Improved reporting speed and consistency.
High user adoption among authorized leaders and administrators.
Low rate of unauthorized data access or privacy incidents.
AI features, where used, demonstrate acceptable accuracy, fairness, transparency, and safety through ongoing review.

22. MVP Release Plan
Phase 1: Project setup, authentication, database, roles and permissions.
Phase 2: Member and visitor management.
Phase 3: Attendance and departments/groups.
Phase 4: Events and task/accountability management.
Phase 5: Dashboard and reports.
Phase 6: Security, privacy, audit logging, testing, and ethical review.
Phase 7: Optional AI features after the core system is stable and relevant ethical safeguards are implemented.

23. Product Principles
Simple: users should understand the system without extensive training.
Useful: every major feature should solve a real church management problem.
Secure: sensitive information must be protected.
Accountable: responsibilities and actions should be traceable.
Transparent: users should understand important system and AI-supported actions.
Fair: avoid unjustified discrimination or harmful personal labeling.
Private: collect and expose only information that is necessary and authorized.
Safe: important decisions require appropriate human oversight.
Human-centered: technology should support people rather than replace responsible human judgment.

24. Out of Scope for MVP
Advanced AI decision-making.
Automatic disciplinary or pastoral decisions.
Fully automated financial decisions.
Predictive scoring of spiritual commitment or personal worth.
Unrestricted sharing of member information with external AI services.
Complex recurring task automation until the core workflow is stable.
Advanced integrations until security, privacy, and core data structures are proven.

25. Recommended Working Name
Church Management & Accountability Platform (CMAP)

26. Guiding Ethical Statement
"We build AI to assist people, not judge people. We use technology to improve church administration, accountability, communication, and service while protecting fairness, privacy, transparency, safety, and human dignity."

Core Rule: AI assists. Humans decide. People remain in control.

8. AI Ethical Principles & Responsible Technology Requirements These principles guide the design, development, testing, deployment, and improvement of every AI-enabled feature in CMAP.
8.1 Fairness CMAP shall use AI in a way that treats people fairly and avoids unjustified discrimination or disadvantage. AI must not discriminate against members, visitors, staff, volunteers, or leaders based on protected or sensitive personal characteristics. AI recommendations must use relevant and legitimate information for the specific task. Avoid subjective labels about spiritual commitment, character, worth, or suitability based solely on behavioral data. Where practical, test AI features for unfair patterns and correct, restrict, or remove problematic features.

8.2 Accountability CMAP shall ensure responsibility for important actions and AI-supported decisions remains clearly assigned to authorized humans. Every important AI-supported workflow must have a responsible role. AI recommendations must not automatically trigger high-impact decisions. Authorized users should be able to review, accept, reject, or correct recommendations. Important actions should be recorded in the audit trail. The product team must define who monitors and corrects problematic AI behavior.

8.3 Transparency CMAP shall make AI use understandable and distinguish AI-generated information from verified church records. Clearly indicate when content, summaries, recommendations, or analysis are AI-generated or AI-assisted. Where feasible, provide a simple explanation of why a recommendation was generated. Identify the main data or records supporting important recommendations. Do not present AI assumptions as confirmed facts. Provide appropriate ways to question or report incorrect AI output.

8.4 Privacy CMAP shall protect personal, financial, pastoral, welfare, attendance, and other sensitive information and use only information necessary for legitimate functions. Collect only data necessary for a defined purpose. Use role-based access controls. Apply appropriate security to stored and transmitted data. Do not expose sensitive information to an AI service unless authorized, necessary, and appropriately protected. Define data retention and deletion practices. Maintain appropriate access logs. Provide a process for correcting inaccurate personal information. Do not use member data for unrelated purposes without authorization.

8.5 Safety CMAP shall reduce foreseeable harm and prevent unreliable or inappropriate AI outputs from automatically causing serious consequences. Test AI features before release and monitor them after deployment. High-impact decisions involving pastoral care, welfare, discipline, finances, or important services require appropriate human review. AI recommendations are decision-support, not automatic final decisions. Provide safeguards against harmful, misleading, or inappropriate outputs. Provide a process for reporting AI-related incidents or harmful recommendations. Allow the product team to modify, restrict, disable, or remove AI features when significant risks are identified.

8.6 Human Oversight Core rule: AI assists; humans decide. Church leaders and authorized staff remain responsible for consequential decisions. AI must not replace appropriate pastoral, administrative, safeguarding, or financial judgment. Users should be able to override an AI recommendation when appropriate. Avoid automating decisions requiring context, empathy, professional judgment, or confidential human assessment.

8.7 Accuracy, Reliability & Correction AI output should be treated appropriately and remain open to correction. Check important AI-generated information against reliable source records. Distinguish generated summaries from original records. Provide a method for reporting inaccurate AI outputs. Review repeated or serious errors. Monitor AI performance as the product evolves.

Ethical AI Decision Workflow 1. Collect only necessary and authorized data. 2. AI analyzes permitted data for the defined purpose. 3. Present output as a recommendation or analysis, not an unquestionable fact. 4. An authorized human reviews the output and underlying information. 5. The human accepts, rejects, or corrects the recommendation. 6. Important actions are recorded in the audit trail. 7. Errors, complaints, or harmful outcomes are reviewed and used to improve the system.

Ethical AI Examples Avoid Responsible Alternative Principle 'John is an unfaithful member.' Attendance: 2 of 6 recorded meetings attended during the selected period. Fairness & Transparency AI automatically marks a member for disciplinary action. AI flags a pattern for authorized human review. Safety & Accountability Sending all member records to an AI service without controls. Send only necessary, authorized information with appropriate safeguards. Privacy AI recommendation presented as fact. Label it as an AI-generated recommendation and show its basis where practical. Transparency AI decides who should receive pastoral care. AI may identify possible follow-up indicators; an authorized person reviews and decides. Safety & Human Oversight

Roles & Permissions Super Admin: system configuration, users, permissions, security settings, and oversight. Pastor / Church Leader: authorized church-wide dashboards, reports, and follow-up information. Department Leader: authorized department members, tasks, activities, and reports. Group / Cell Leader: authorized group members, attendance, meetings, and follow-up. Staff: assigned operational modules and responsibilities. Volunteer: assigned tasks and permitted information. Member: own permitted information and services. AI features and sensitive data access must follow role-based permission principles.

Non-Functional Requirements Security: secure authentication, authorization, encryption where appropriate, secure sessions, and protection against common web vulnerabilities. Privacy: data minimization, role-based access, retention controls, and secure handling of sensitive information. Performance: common pages and dashboards should load efficiently under expected MVP usage. Availability: reliable operation with appropriate backup and recovery procedures. Usability: simple interfaces for users with different levels of technical experience. Accessibility: accessible design and readable content. Responsiveness: desktop, tablet, and mobile support. Auditability: important changes and accountability actions traceable to authorized users. AI Governance: each AI feature must have a defined purpose, owner, access controls, testing process, monitoring approach, and incident/correction process.

Suggested Initial Technology Frontend: React / Next.js with TypeScript UI: Tailwind CSS or another consistent component system Backend: Next.js server functions or Node.js API Database: PostgreSQL Authentication: secure role-based authentication Version Control: Git and GitHub AI: optional AI service integrated only where there is a defined use case, authorization, and ethical risk controls.

Core Data Entities User Role Member Visitor Department Group / Cell Attendance Record Event Task Follow-up Report Audit Log AI Interaction / Recommendation Record (when AI features are implemented)

MVP Acceptance Criteria Users can securely log in and access functions according to their roles. Authorized users can create, edit, search, filter, and archive member records. Visitor follow-up can be assigned, tracked, and reviewed. Attendance can be recorded and reported. Departments and groups can be created and managed. Events and tasks can be created, assigned, tracked, and reported. Dashboard metrics are displayed according to permissions. Reports can be generated from authorized data. Important actions are recorded in an audit trail. Sensitive information is restricted to authorized users. Any AI feature included in the MVP clearly identifies AI-generated output. AI-supported decisions remain subject to appropriate human review. AI features do not make unsupported or discriminatory personal judgments. There is a process for reporting and correcting inaccurate AI outputs. AI-related incidents can be reviewed and the affected feature can be restricted or disabled when necessary.

AI Ethical Review Checklist ☐ Clear and legitimate purpose defined ☐ Fairness risks considered and tested ☐ Responsible human owner identified ☐ AI use disclosed to relevant users ☐ Recommendation/explanation available where appropriate ☐ Only necessary data is used ☐ Sensitive data access is restricted ☐ Security and privacy controls reviewed ☐ Potential harms identified and mitigated ☐ Human review required for high-impact decisions ☐ Correction/reporting mechanism available ☐ Audit trail implemented where appropriate ☐ Monitoring plan established ☐ Feature can be modified, restricted, or disabled if serious risks occur

Example Accountability Workflow A leader creates a task. A responsible person is assigned. The system records due date and status. The responsible person updates progress. The system provides reminders as appropriate. If an AI assistant is used, it may summarize progress or highlight overdue items. The leader reviews the information and takes action. Completion or changes are recorded in the audit trail.

Success Measures Reduction in manual administrative work. Improved accuracy and completeness of member records. Improved follow-up completion rates. Improved visibility of pending and overdue responsibilities. Improved reporting speed and consistency. High user adoption among authorized leaders and administrators. Low rate of unauthorized data access or privacy incidents. AI features, where used, demonstrate acceptable accuracy, fairness, transparency, and safety through ongoing review.

MVP Release Plan Phase 1: Project setup, authentication, database, roles and permissions. Phase 2: Member and visitor management. Phase 3: Attendance and departments/groups. Phase 4: Events and task/accountability management. Phase 5: Dashboard and reports. Phase 6: Security, privacy, audit logging, testing, and ethical review. Phase 7: Optional AI features after the core system is stable and relevant ethical safeguards are implemented.

Product Principles Simple: users should understand the system without extensive training. Useful: every major feature should solve a real church management problem. Secure: sensitive information must be protected. Accountable: responsibilities and actions should be traceable. Transparent: users should understand important system and AI-supported actions. Fair: avoid unjustified discrimination or harmful personal labeling. Private: collect and expose only information that is necessary and authorized. Safe: important decisions require appropriate human oversight. Human-centered: technology should support people rather than replace responsible human judgment.

Out of Scope for MVP Advanced AI decision-making. Automatic disciplinary or pastoral decisions. Fully automated financial decisions. Predictive scoring of spiritual commitment or personal worth. Unrestricted sharing of member information with external AI services. Complex recurring task automation until the core workflow is stable. Advanced integrations until security, privacy, and core data structures are proven.

Recommended Working Name Church Management & Accountability Platform (CMAP)

Guiding Ethical Statement "We build AI to assist people, not judge people. We use technology to improve church administration, accountability, communication, and service while protecting fairness, privacy, transparency, safety, and human dignity."

Core Rule: AI assists. Humans decide. People remain in control.

