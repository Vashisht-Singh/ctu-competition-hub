# CTU Competition Hub
## Enterprise-Grade MERN Stack University Competition Management Platform
**CT University, Ludhiana, Punjab, India**  
*Directorate of Student Welfare (DSW)*

---

## 🌟 Executive Summary

**CTU Competition Hub** is a software platform designed to manage the end-to-end competition lifecycle across all 8 constituent schools of CT University, Ludhiana.

It replaces disparate paper forms and isolated spreadsheets with an integrated, role-based system for competition proposal verification, DSW administrative governance, school cultural coordination, participant registrations with digital QR passes, faculty duty assignments with conflict detection, rubric judging, official result publishing, and digital certificate verification.

---

## 🏛️ Official Schools of CT University (Master Data)

The platform dynamically models CT University's official school hierarchy:

1. **School of Engineering and Technology (SOET)**
2. **School of Management Studies (SMS)**
3. **School of Hotel Management, Airlines and Tourism (SOHMAT)**
4. **School of Law (SOL)**
5. **School of Pharmaceutical Sciences (SOPS)**
6. **School of Design and Innovation (SODI)**
7. **School of Allied and Healthcare (SOAH)**
8. **School of Social Sciences and Liberal Arts (SOSSLA)**

*Reference: [CT University Schools](https://www.ctuniversity.in/schools)*

---

## 🔑 Demo Access Credentials (1-Click Switcher Available in UI)

The application includes an **interactive 1-Click Role Switcher** on the top navigation bar and login screen:

| Role | Name & Designation | Demo Email | Default Password |
|---|---|---|---|
| **DSW Admin** | Dr. Gurpreet Singh *(Director Student Welfare)* | `dsw@ctuniversity.in` | `ctu@12345` |
| **School Coordinator** | Dr. Rajesh Verma *(Associate Professor, SOET)* | `soet.coordinator@ctuniversity.in` | `ctu@12345` |
| **Cultural Coordinator** | Prof. Amritpal Singh *(Cultural Coordinator, SOET)* | `cultural.soet@ctuniversity.in` | `ctu@12345` |
| **Faculty Member** | Dr. Navneet Kaur *(Assistant Professor, CSE)* | `navneet.cse@ctuniversity.in` | `ctu@12345` |
| **Student** | Aarav Sharma *(B.Tech CSE - 6th Sem)* | `student@ctuniversity.in` | `ctu@12345` |
| **Judge** | Dr. Priya Singla *(Associate Professor, MBA)* | `priya.mba@ctuniversity.in` | `ctu@12345` |
| **Super Admin** | Er. Gurvinder Singh *(Chief Administrator)* | `superadmin@ctuniversity.in` | `ctu@12345` |

---

## ⚡ Key Capabilities & Modules

### 1. DSW Central Executive Dashboard
- **Centralized Proposal Approval Queue**: Review incoming competition proposals from all 8 schools. One-click `APPROVE`, `REJECT` (with mandatory remarks), or return for `REVISION_REQUIRED`.
- **Publication Engine**: Publish approved events and open registrations with configured capacities and deadlines.
- **Cultural Coordinator Management**: Appoint, track, or replace school cultural coordinators with full historical tenure logs.
- **Dynamic School Master**: Manage CT University schools, constituent departments, programmes, and deans.
- **University Analytics**: Interactive charts for disciplinary distribution, school participation comparisons, and duty compliance.

### 2. Competition Management & Workflows
- **Scopes Supported**: School-Level, Inter-School, University-Level, Open, External/Inter-University.
- **Participation Modes**: Individual or Team participation with min/max team size validation.
- **Multi-Round Scheduling**: Configure preliminary screening, semifinals, and grand finals with distinct dates and venues.
- **Proposal History & Audit Trail**: Every status transition records an immutable audit log entry.

### 3. Student Registration & Digital Entry Pass
- **Eligibility Validation**: Automated restrictions on eligible schools, degree programmes, and semesters.
- **Duplicate Prevention & Waitlisting**: Capacity-controlled registration with automatic waitlisting.
- **Cryptographic QR Badges**: Instant generation of digital check-in passes.
- **Self-Withdrawal**: Students can cancel registration within the permitted window.

### 4. Faculty Duty Management System
- **17 Duty Categories**: Technical Support, Registration Desk, Participant Verification, Stage Management, Judging, Logistics, Venue Management, etc.
- **Overlap Conflict Warning Engine**: Detects if a faculty member is already scheduled for another event on that date and prompts for authorized supervisor override.
- **Tracking Lifecycle**: `ASSIGNED` ➔ `ACKNOWLEDGED` ➔ `IN_PROGRESS` ➔ `COMPLETED` ➔ `VERIFIED`.
- **Evidence Submission**: Faculty submit completion reports and evidence URLs; supervisors inspect and verify.

### 5. Judging, Rankings & Certificates
- **Customizable Rubrics**: Weighted criteria scoring (e.g. Innovation, Technical Execution, Presentation).
- **Auto-Compute Rankings**: Aggregates jury scores and derives podium standings (Winner, 1st Runner-Up, 2nd Runner-Up, Special Recognition).
- **Result Correction Audit**: Correct results with mandatory administrative reason recording.
- **Verifiable Digital Certificates**: Issued with unique certificate numbers and QR verification codes linked to the public verification endpoint (`/verify-certificate/:certNumber`).

### 6. Institutional Export Reports
- Export Competitions Master Ledger to **Excel (.xlsx)** and **CSV**.
- Export Faculty Duty Audits and Evidence to **Excel (.xlsx)** and **CSV**.
- Export School Performance Summary to **Excel (.xlsx)** and **CSV**.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS, custom design system inspired by Linear, Stripe, and modern university portals
- **Icons**: Lucide React
- **Visualizations**: Recharts (Bar charts, Pie charts, Donut charts)
- **Routing**: React Router v7
- **Authentication**: JWT Bearer token with persistence in LocalStorage

### Backend
- **Runtime**: Node.js v24+, Express.js, TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Embedded Database Option**: `mongodb-memory-server` for zero-configuration setup
- **Validation**: Zod schema validation
- **Security**: bcryptjs password hashing, JWT access & refresh tokens, RBAC middleware, Helmet security headers, CORS
- **Media & Documents**: QR code generation (QRCode), Excel spreadsheet generation (XLSX), PDFKit

---

## 🚀 Quick Start & Installation

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)
- Optional: Local MongoDB or MongoDB Atlas URI (if not present, embedded MongoDB runs automatically)

### 1. Clone & Install Dependencies
```bash
# In the root repository directory
npm install
```

### 2. Environment Setup
Create a `.env` file in `server/` (or copy from `.env.example`):
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/ctu_competition_hub
USE_IN_MEMORY_DB=false
JWT_SECRET=ctu_super_secure_jwt_secret_key_2026_dsw_competition_hub
JWT_REFRESH_SECRET=ctu_super_secure_refresh_secret_key_2026_dsw_competition_hub
CLIENT_URL=http://localhost:5173
```

### 3. Seed Database with Official CT University Dataset
```bash
npm run seed --workspace=server
```
*Populates all 8 CT University schools, DSW Admin, Coordinators, Faculty, Students, Judges, Competitions across all lifecycle stages, Registrations with QR badges, and Authenticated Certificates.*

### 4. Run Development Servers
```bash
# Starts both Express backend (Port 5000) and Vite frontend (Port 5173) concurrently
npm run dev
```

- **Frontend Application**: [http://localhost:5173](http://localhost:5173)
- **Backend API Server**: [http://localhost:5000/api](http://localhost:5000/api)
- **Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 📁 Repository Structure

```
ctu-competition-hub/
│
├── client/                     # Vite + React + TypeScript Frontend
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx             # Protected routing & role-based routes
│   │   ├── types/              # Frontend TypeScript definitions
│   │   ├── context/            # AuthContext & NotificationContext
│   │   ├── services/           # REST API client with JWT interceptor
│   │   ├── components/         # Navbar, Sidebar, Layout, StatCard, Badge, Modal, DataTable
│   │   └── pages/
│   │       ├── DiscoveryPage.tsx               # Public CTU Events Portal
│   │       ├── CompetitionDetailPage.tsx       # Detail view & direct registration
│   │       ├── LoginPage.tsx                   # Auth with 1-click Demo Role Switcher
│   │       ├── RegisterPage.tsx                # Student self-registration
│   │       ├── CertificateVerifyPage.tsx       # Public QR Certificate Verification
│   │       ├── dsw/                            # DSW Dashboard, Approval Queue, Coordinators, Schools
│   │       ├── school/                         # School Dashboard, Create Competition Proposal
│   │       ├── cultural/                       # Cultural Coordinator Dashboard
│   │       ├── faculty/                        # Faculty Duties, Evidence submission, Duty Board
│   │       ├── student/                        # Student Hub, My Registrations, My Certificates
│   │       ├── judging/                        # Scoring Rubrics & Participant Evaluations
│   │       ├── results/                        # Auto-Rankings, DSW Approval, Certificate Issuance
│   │       └── reports/                        # Analytics Charts & Excel/CSV Exports
│   └── package.json
│
├── server/                     # Node.js + Express + TypeScript Backend
│   ├── src/
│   │   ├── server.ts           # Server bootstrap & auto-seed
│   │   ├── app.ts              # Express configuration & route mounting
│   │   ├── config/             # MongoDB connection & environment vars
│   │   ├── models/             # Mongoose Models (User, School, Competition, Duty, Result, etc.)
│   │   ├── middleware/         # Auth, RBAC, Error Handler, Audit
│   │   ├── routes/             # Modular REST API endpoints
│   │   ├── services/           # QR generator, Excel/CSV export, Notifications, Audit
│   │   └── scripts/
│   │       └── seed.ts         # Master CT University demonstration seed
│   ├── tsconfig.json
│   └── package.json
│
├── shared/                     # Shared TypeScript contracts & Enums
├── docs/                       # Architecture & API Documentation
├── .env.example
├── README.md
└── package.json                # Root concurrently workspace runner
```

---

## 🔒 Security & Data Integrity

- **Password Hashing**: Strong salting and hashing via `bcryptjs`.
- **Role-Based Access Control (RBAC)**: Enforced in backend middleware (`requireRoles`), validating permissions per endpoint.
- **Strict School Scoping**: School coordinators are isolated to their affiliated schools; DSW holds central oversight.
- **Duplicate Prevention**: Compound indexes prevent duplicate active student registrations per competition.
- **Immutable Audit Logging**: Every administrative review, rejection, status change, and result correction records the user, previous state, new state, remarks, and timestamp.
- **Sanitized Outputs**: Passwords and sensitive tokens are excluded from all API responses.

---

## 📜 License
Developed for **CT University, Ludhiana, Punjab, India**.  
All rights reserved © 2026 Directorate of Student Welfare (DSW).
