# CTU Competition Hub - Architecture & Design Specifications
**CT University, Ludhiana, Punjab, India**

---

## 1. Architectural Overview

CTU Competition Hub is designed as an enterprise-grade university competition platform built on a decoupled, modular MERN architecture (MongoDB, Express, React, Node.js + TypeScript).

```
                         [ CLIENT (Vite + React 18 + TS) ]
                                    │
                               REST APIs (JSON)
                                    ▼
                         [ SERVER (Express + Node + TS) ]
                                    │
       ┌────────────────────────────┼───────────────────────────┐
       ▼                            ▼                           ▼
[ Authentication & RBAC ]    [ Business Logic ]        [ Services & Integrations ]
- JWT Bearer Tokens          - Proposal Workflow       - Excel / CSV Generation
- Role Matrix Enforcement    - Registration Engine     - QR Code Generator
- School Access Boundaries   - Faculty Duty Tracking   - Audit Logging Engine
                             - Judging & Podiums       - Notification Broadcaster
                                    │
                                    ▼
                     [ DATABASE (Mongoose ODM / MongoDB) ]
                     - Normalised Collections
                     - Compound Indexes
                     - Transaction & Versioning
```

---

## 2. Institutional Hierarchy & Role Matrix

| Role | Scope | Key Capabilities |
|---|---|---|
| `SUPER_ADMIN` | Global University | Full system administrative governance, database management, user provisioning |
| `DSW_ADMIN` | Global University | Director Student Welfare: Approves/rejects proposals, publishes events, appoints cultural coordinators, verifies duty completion, publishes results, issues certificates |
| `SCHOOL_COORDINATOR` | Single School | Creates school proposals, monitors school student participation, coordinates faculty duty requests |
| `CULTURAL_COORDINATOR` | Assigned School | DSW-appointed liaison: Leads cultural contingents, assists verification, monitors logistics |
| `COMPETITION_ORGANIZER`| Assigned Event | Configures competition parameters, judging rubrics, manages participant rosters |
| `FACULTY` | Department / School | Acknowledges assigned duties, executes duties, submits completion evidence & reports |
| `JUDGE` | Assigned Competition| Independent rubric scoring, criteria weightages, qualitatively remarks |
| `STUDENT` | Individual / Team | Browses approved competitions, registers, receives digital QR badges, cancels entries, downloads certificates |

---

## 3. Competition Approval State Machine

```
      [ DRAFT ]
          │ (Coordinator Submits)
          ▼
    [ SUBMITTED ] ◄───────────────┐
          │                       │ (Coordinator Resubmits)
          ▼                       │
   [ UNDER_REVIEW ]               │
          │                       │
          ├── (DSW: Revision) ──► [ REVISION_REQUIRED ]
          ├── (DSW: Reject)   ──► [ REJECTED ]
          │
          └── (DSW: Approve)
                  │
                  ▼
            [ APPROVED ]
                  │ (DSW Publishes)
                  ▼
            [ PUBLISHED ]
                  │
                  ▼
         [ REGISTRATION_OPEN ]
                  │ (Deadline reached or Cap full)
                  ▼
        [ REGISTRATION_CLOSED ]
                  │ (Event Day Begins)
                  ▼
           [ IN_PROGRESS ]
                  │ (Scores entered & Ranks verified)
                  ▼
            [ COMPLETED ]
                  │ (Certificates issued)
                  ▼
            [ ARCHIVED ]
```

---

## 4. Faculty Duty Lifecycle & Conflict Prevention

```
[ ASSIGNED ] ──► [ ACKNOWLEDGED ] ──► [ IN_PROGRESS ] ──► [ COMPLETED (Evidence Submitted) ]
      │                                                           │
      │                                                           ▼
      ├──► [ REASSIGNMENT_REQUESTED ]                     [ VERIFIED (DSW Approved) ]
      │                                                           │
      └──► [ OVERDUE (Alert Generated) ]                          └──► (Returned if Incomplete)
```

**Conflict Prevention Engine:**
When assigning a faculty member, the system queries for existing duties assigned to that individual on the same date. If an overlap is detected, the API returns a `409 Conflict` warning detailing the existing event and venue. The assignment can only proceed with an explicit, recorded supervisor override.
