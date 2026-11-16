# CTU Competition Hub - API Documentation
**Institution:** CT University, Ludhiana, Punjab, India  
**Directorate:** Directorate of Student Welfare (DSW)

---

## Base URL
```
http://localhost:5000/api
```

---

## 1. Authentication (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/login` | Authenticate user with email and password | No |
| `POST` | `/register` | Student self-registration | No |
| `GET` | `/me` | Get current logged-in user profile | Yes (Bearer) |
| `POST` | `/switch-demo-role` | 1-Click quick role switcher for evaluator testing | No |

---

## 2. Schools Master Data (`/api/schools`)

| Method | Endpoint | Description | Auth / Role |
|---|---|---|---|
| `GET` | `/` | List all 8 active CT University schools | Public |
| `GET` | `/:id` | Get school details, departments, and programmes | Public |
| `GET` | `/:id/faculty` | Get faculty members belonging to school | Authenticated |
| `GET` | `/:id/analytics` | Get school competition and duty metrics | Authenticated |
| `POST` | `/` | Create new school in registry | DSW_ADMIN / SUPER_ADMIN |
| `PUT` | `/:id` | Update school master data | DSW_ADMIN / SUPER_ADMIN |

---

## 3. Cultural Coordinators (`/api/coordinators`)

| Method | Endpoint | Description | Auth / Role |
|---|---|---|---|
| `GET` | `/` | List cultural coordinators across schools | DSW / Coordinator |
| `POST` | `/assign` | DSW appoints or updates school cultural coordinator | DSW_ADMIN / SUPER_ADMIN |
| `POST` | `/remove` | DSW relieves current cultural coordinator | DSW_ADMIN / SUPER_ADMIN |
| `GET` | `/my-overview` | Cultural coordinator dashboard metrics & contingent tracking | Cultural Coordinator |

---

## 4. Competition Management (`/api/competitions`)

| Method | Endpoint | Description | Auth / Role |
|---|---|---|---|
| `GET` | `/public` | Public events discovery portal feed | Public |
| `GET` | `/` | Admin & coordinator listing with query filters | Authenticated |
| `GET` | `/:id` | Detailed competition view with rounds & audit trail | Public / Authenticated |
| `POST` | `/` | Create competition proposal (Draft or Submit) | Coordinator / DSW |
| `PUT` | `/:id` | Update competition proposal configuration | Coordinator / DSW |
| `POST` | `/:id/submit` | Submit draft proposal for DSW verification | Coordinator |
| `POST` | `/:id/review` | DSW review action: `APPROVE`, `REJECT`, `REVISION_REQUIRED` | DSW_ADMIN / SUPER_ADMIN |
| `POST` | `/:id/publish` | DSW publishes approved competition & opens registration | DSW_ADMIN / SUPER_ADMIN |
| `POST` | `/:id/status` | Transition status (`IN_PROGRESS`, `COMPLETED`, `CANCELLED`) | Coordinator / DSW |

---

## 5. Registration Management (`/api/registrations`)

| Method | Endpoint | Description | Auth / Role |
|---|---|---|---|
| `POST` | `/` | Register individual or team entry (generates QR badge) | Authenticated Student |
| `GET` | `/my` | Get current student's registrations & badges | Authenticated Student |
| `GET` | `/competition/:competitionId` | Get participant roster for competition | Coordinator / DSW |
| `POST` | `/:id/checkin` | Check-in participant via QR scan or manual confirmation | Faculty / Desk Incharge |
| `POST` | `/:id/cancel` | Student cancels/withdraws registration | Student Owner |
| `GET` | `/competition/:competitionId/export/excel` | Export participant list to Excel (.xlsx) | Coordinator / DSW |
| `GET` | `/competition/:competitionId/export/csv` | Export participant list to CSV | Coordinator / DSW |

---

## 6. Faculty Duty Management (`/api/duties`)

| Method | Endpoint | Description | Auth / Role |
|---|---|---|---|
| `GET` | `/` | Query duties with filters (competition, status, date) | Authenticated |
| `GET` | `/my` | Get assigned duties for logged-in faculty member | Authenticated Faculty |
| `POST` | `/` | Assign duty to faculty (with schedule overlap warning) | DSW / Coordinator |
| `POST` | `/:id/acknowledge` | Faculty acknowledges assigned duty | Faculty Incharge |
| `POST` | `/:id/complete` | Faculty submits completion report & drive/photo evidence | Faculty Incharge |
| `POST` | `/:id/verify` | Supervisor/DSW verifies completion or returns for revision | DSW / Supervisor |
| `POST` | `/:id/reassign-request`| Faculty requests duty reassignment with reason | Faculty Incharge |
| `GET` | `/analytics/overview` | Overall duty execution metrics & completion rate | Authenticated |

---

## 7. Judging & Results (`/api/judging` & `/api/results`)

| Method | Endpoint | Description | Auth / Role |
|---|---|---|---|
| `GET` | `/judging/rubric/:competitionId` | Get scoring rubric with weighted criteria | Authenticated |
| `POST` | `/judging/rubric/:competitionId` | Create or update judging rubric | Organizer / DSW |
| `GET` | `/judging/competition/:competitionId/evaluations` | List participants for judge scoring | Judge / Organizer |
| `POST` | `/judging/score` | Submit judge evaluation marks & qualitative feedback | Judge / DSW |
| `GET` | `/results/competition/:competitionId` | Get ranked podium standings | Public |
| `POST` | `/results/competition/:competitionId/generate` | Auto-compute rankings from judge scores | DSW / Organizer |
| `POST` | `/results/competition/:competitionId/publish` | DSW officially approves and publishes results | DSW_ADMIN / SUPER_ADMIN |
| `POST` | `/results/:id/correct` | Modify official rank with mandatory audit trail reason | DSW_ADMIN / SUPER_ADMIN |

---

## 8. Certificates (`/api/certificates`)

| Method | Endpoint | Description | Auth / Role |
|---|---|---|---|
| `GET` | `/verify/:certNumber` | Public verification endpoint (validates authentic seal) | Public |
| `GET` | `/my` | Get current user's awarded certificates | Authenticated |
| `POST` | `/issue` | Batch issue digital certificates with QR codes for winners | DSW_ADMIN / SUPER_ADMIN |

---

## 9. Reports & Audit (`/api/reports` & `/api/audit-logs`)

| Method | Endpoint | Description | Auth / Role |
|---|---|---|---|
| `GET` | `/reports/dsw-overview` | Central university analytics & comparison metrics | DSW_ADMIN / SUPER_ADMIN |
| `GET` | `/reports/export/:reportType` | Export master data to Excel (.xlsx) or CSV | DSW_ADMIN / SUPER_ADMIN |
| `GET` | `/audit-logs` | Query immutable audit log trail | DSW_ADMIN / SUPER_ADMIN |
