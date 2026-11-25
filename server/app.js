var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/types/enums.ts
var UserRole, ApprovalLevel, CompetitionScope, CompetitionCategory, CompetitionStatus, RegistrationStatus, FacultyDutyStatus, FacultyDutyCategory, ResultCategory, CertificateType;
var init_enums = __esm({
  "src/types/enums.ts"() {
    "use strict";
    UserRole = /* @__PURE__ */ ((UserRole2) => {
      UserRole2["SUPER_ADMIN"] = "SUPER_ADMIN";
      UserRole2["DSW_ADMIN"] = "DSW_ADMIN";
      UserRole2["HOS"] = "HOS";
      UserRole2["HOD"] = "HOD";
      UserRole2["SCHOOL_COORDINATOR"] = "SCHOOL_COORDINATOR";
      UserRole2["CULTURAL_COORDINATOR"] = "CULTURAL_COORDINATOR";
      UserRole2["COMPETITION_ORGANIZER"] = "COMPETITION_ORGANIZER";
      UserRole2["FACULTY"] = "FACULTY";
      UserRole2["JUDGE"] = "JUDGE";
      UserRole2["STUDENT"] = "STUDENT";
      UserRole2["VOLUNTEER"] = "VOLUNTEER";
      return UserRole2;
    })(UserRole || {});
    ApprovalLevel = /* @__PURE__ */ ((ApprovalLevel2) => {
      ApprovalLevel2["NONE"] = "NONE";
      ApprovalLevel2["HOD"] = "HOD";
      ApprovalLevel2["HOS"] = "HOS";
      ApprovalLevel2["DSW"] = "DSW";
      return ApprovalLevel2;
    })(ApprovalLevel || {});
    CompetitionScope = /* @__PURE__ */ ((CompetitionScope2) => {
      CompetitionScope2["SCHOOL_LEVEL"] = "SCHOOL_LEVEL";
      CompetitionScope2["INTER_SCHOOL"] = "INTER_SCHOOL";
      CompetitionScope2["UNIVERSITY_LEVEL"] = "UNIVERSITY_LEVEL";
      CompetitionScope2["OPEN"] = "OPEN";
      CompetitionScope2["EXTERNAL_INTER_UNIVERSITY"] = "EXTERNAL_INTER_UNIVERSITY";
      return CompetitionScope2;
    })(CompetitionScope || {});
    CompetitionCategory = /* @__PURE__ */ ((CompetitionCategory2) => {
      CompetitionCategory2["TECHNICAL"] = "TECHNICAL";
      CompetitionCategory2["CULTURAL"] = "CULTURAL";
      CompetitionCategory2["LITERARY"] = "LITERARY";
      CompetitionCategory2["SPORTS"] = "SPORTS";
      CompetitionCategory2["FINE_ARTS"] = "FINE_ARTS";
      CompetitionCategory2["MANAGEMENT"] = "MANAGEMENT";
      CompetitionCategory2["HEALTH_SCIENCE"] = "HEALTH_SCIENCE";
      CompetitionCategory2["LEGAL_MOOT"] = "LEGAL_MOOT";
      CompetitionCategory2["INNOVATION_STARTUP"] = "INNOVATION_STARTUP";
      CompetitionCategory2["MEDIA_FILM"] = "MEDIA_FILM";
      return CompetitionCategory2;
    })(CompetitionCategory || {});
    CompetitionStatus = /* @__PURE__ */ ((CompetitionStatus3) => {
      CompetitionStatus3["DRAFT"] = "DRAFT";
      CompetitionStatus3["SUBMITTED_TO_HOD"] = "SUBMITTED_TO_HOD";
      CompetitionStatus3["PENDING_HOD_APPROVAL"] = "PENDING_HOD_APPROVAL";
      CompetitionStatus3["PENDING_HOS_APPROVAL"] = "PENDING_HOS_APPROVAL";
      CompetitionStatus3["PENDING_DSW_APPROVAL"] = "PENDING_DSW_APPROVAL";
      CompetitionStatus3["CHANGES_REQUESTED"] = "CHANGES_REQUESTED";
      CompetitionStatus3["APPROVED_BY_DSW"] = "APPROVED_BY_DSW";
      CompetitionStatus3["SUBMITTED"] = "SUBMITTED";
      CompetitionStatus3["UNDER_REVIEW"] = "UNDER_REVIEW";
      CompetitionStatus3["REVISION_REQUIRED"] = "REVISION_REQUIRED";
      CompetitionStatus3["RESUBMITTED"] = "RESUBMITTED";
      CompetitionStatus3["APPROVED"] = "APPROVED";
      CompetitionStatus3["PUBLISHED"] = "PUBLISHED";
      CompetitionStatus3["REGISTRATION_OPEN"] = "REGISTRATION_OPEN";
      CompetitionStatus3["REGISTRATION_CLOSED"] = "REGISTRATION_CLOSED";
      CompetitionStatus3["IN_PROGRESS"] = "IN_PROGRESS";
      CompetitionStatus3["COMPLETED"] = "COMPLETED";
      CompetitionStatus3["ARCHIVED"] = "ARCHIVED";
      CompetitionStatus3["REJECTED"] = "REJECTED";
      CompetitionStatus3["CANCELLED"] = "CANCELLED";
      CompetitionStatus3["POSTPONED"] = "POSTPONED";
      return CompetitionStatus3;
    })(CompetitionStatus || {});
    RegistrationStatus = /* @__PURE__ */ ((RegistrationStatus2) => {
      RegistrationStatus2["PENDING"] = "PENDING";
      RegistrationStatus2["CONFIRMED"] = "CONFIRMED";
      RegistrationStatus2["WAITLISTED"] = "WAITLISTED";
      RegistrationStatus2["REJECTED"] = "REJECTED";
      RegistrationStatus2["CANCELLED"] = "CANCELLED";
      RegistrationStatus2["CHECKED_IN"] = "CHECKED_IN";
      RegistrationStatus2["ABSENT"] = "ABSENT";
      return RegistrationStatus2;
    })(RegistrationStatus || {});
    FacultyDutyStatus = /* @__PURE__ */ ((FacultyDutyStatus2) => {
      FacultyDutyStatus2["ASSIGNED"] = "ASSIGNED";
      FacultyDutyStatus2["ACKNOWLEDGED"] = "ACKNOWLEDGED";
      FacultyDutyStatus2["IN_PROGRESS"] = "IN_PROGRESS";
      FacultyDutyStatus2["COMPLETED"] = "COMPLETED";
      FacultyDutyStatus2["DECLINED"] = "DECLINED";
      FacultyDutyStatus2["REASSIGNMENT_REQUESTED"] = "REASSIGNMENT_REQUESTED";
      FacultyDutyStatus2["OVERDUE"] = "OVERDUE";
      FacultyDutyStatus2["VERIFIED"] = "VERIFIED";
      return FacultyDutyStatus2;
    })(FacultyDutyStatus || {});
    FacultyDutyCategory = /* @__PURE__ */ ((FacultyDutyCategory3) => {
      FacultyDutyCategory3["COMPETITION_INCHARGE"] = "COMPETITION_INCHARGE";
      FacultyDutyCategory3["EVENT_COORDINATOR"] = "EVENT_COORDINATOR";
      FacultyDutyCategory3["REGISTRATION_DESK"] = "REGISTRATION_DESK";
      FacultyDutyCategory3["PARTICIPANT_VERIFICATION"] = "PARTICIPANT_VERIFICATION";
      FacultyDutyCategory3["VENUE_MANAGEMENT"] = "VENUE_MANAGEMENT";
      FacultyDutyCategory3["DISCIPLINE_CROWD"] = "DISCIPLINE_CROWD";
      FacultyDutyCategory3["TECHNICAL_SUPPORT"] = "TECHNICAL_SUPPORT";
      FacultyDutyCategory3["STAGE_MANAGEMENT"] = "STAGE_MANAGEMENT";
      FacultyDutyCategory3["JUDGING"] = "JUDGING";
      FacultyDutyCategory3["PHOTOGRAPHY_MEDIA"] = "PHOTOGRAPHY_MEDIA";
      FacultyDutyCategory3["HOSPITALITY"] = "HOSPITALITY";
      FacultyDutyCategory3["EQUIPMENT_MANAGEMENT"] = "EQUIPMENT_MANAGEMENT";
      FacultyDutyCategory3["CERTIFICATE_DISTRIBUTION"] = "CERTIFICATE_DISTRIBUTION";
      FacultyDutyCategory3["RESULTS_MANAGEMENT"] = "RESULTS_MANAGEMENT";
      FacultyDutyCategory3["LOGISTICS"] = "LOGISTICS";
      FacultyDutyCategory3["VOLUNTEER_MANAGEMENT"] = "VOLUNTEER_MANAGEMENT";
      FacultyDutyCategory3["OTHER"] = "OTHER";
      return FacultyDutyCategory3;
    })(FacultyDutyCategory || {});
    ResultCategory = /* @__PURE__ */ ((ResultCategory3) => {
      ResultCategory3["WINNER"] = "WINNER";
      ResultCategory3["FIRST_RUNNER_UP"] = "FIRST_RUNNER_UP";
      ResultCategory3["SECOND_RUNNER_UP"] = "SECOND_RUNNER_UP";
      ResultCategory3["SPECIAL_RECOGNITION"] = "SPECIAL_RECOGNITION";
      ResultCategory3["PARTICIPATION"] = "PARTICIPATION";
      return ResultCategory3;
    })(ResultCategory || {});
    CertificateType = /* @__PURE__ */ ((CertificateType2) => {
      CertificateType2["PARTICIPANT"] = "PARTICIPANT";
      CertificateType2["WINNER"] = "WINNER";
      CertificateType2["JUDGE"] = "JUDGE";
      CertificateType2["FACULTY_APPRECIATION"] = "FACULTY_APPRECIATION";
      CertificateType2["VOLUNTEER"] = "VOLUNTEER";
      CertificateType2["ORGANIZER"] = "ORGANIZER";
      return CertificateType2;
    })(CertificateType || {});
  }
});

// src/models/User.ts
var User_exports = {};
__export(User_exports, {
  User: () => User
});
import mongoose2, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
var UserSchema, User;
var init_User = __esm({
  "src/models/User.ts"() {
    "use strict";
    init_enums();
    UserSchema = new Schema(
      {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
        password: { type: String, required: true },
        roles: [
          {
            type: String,
            enum: Object.values(UserRole),
            default: ["STUDENT" /* STUDENT */]
          }
        ],
        school: { type: Schema.Types.ObjectId, ref: "School" },
        departmentId: { type: Schema.Types.ObjectId, ref: "Department", index: true },
        department: { type: String, trim: true },
        programme: { type: String, trim: true },
        semester: { type: Number, min: 1, max: 12 },
        registrationNumber: { type: String, trim: true, index: true },
        employeeId: { type: String, trim: true, index: true },
        phone: { type: String, trim: true },
        avatarUrl: { type: String },
        designation: { type: String, trim: true },
        isActive: { type: Boolean, default: true }
      },
      { timestamps: true }
    );
    UserSchema.pre("save", async function(next) {
      if (!this.isModified("password")) return next();
      try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
      } catch (err) {
        next(err);
      }
    });
    UserSchema.methods.comparePassword = async function(candidatePassword) {
      return bcrypt.compare(candidatePassword, this.password);
    };
    User = mongoose2.model("User", UserSchema);
  }
});

// src/models/School.ts
var School_exports = {};
__export(School_exports, {
  School: () => School
});
import mongoose3, { Schema as Schema2 } from "mongoose";
var SchoolSchema, School;
var init_School = __esm({
  "src/models/School.ts"() {
    "use strict";
    SchoolSchema = new Schema2(
      {
        name: { type: String, required: true, unique: true, trim: true },
        code: { type: String, required: true, unique: true, uppercase: true, trim: true },
        description: { type: String, trim: true },
        departments: [{ type: String, trim: true }],
        programmes: [{ type: String, trim: true }],
        deanName: { type: String, trim: true },
        hos: { type: Schema2.Types.ObjectId, ref: "User", index: true },
        contactEmail: { type: String, lowercase: true, trim: true },
        culturalCoordinator: { type: Schema2.Types.ObjectId, ref: "User" },
        coordinatorHistory: [
          {
            coordinator: { type: Schema2.Types.ObjectId, ref: "User", required: true },
            appointedAt: { type: Date, default: Date.now },
            removedAt: { type: Date },
            appointedBy: { type: Schema2.Types.ObjectId, ref: "User" },
            remarks: { type: String, trim: true }
          }
        ],
        isActive: { type: Boolean, default: true }
      },
      { timestamps: true }
    );
    School = mongoose3.model("School", SchoolSchema);
  }
});

// src/models/Department.ts
var Department_exports = {};
__export(Department_exports, {
  Department: () => Department
});
import mongoose4, { Schema as Schema3 } from "mongoose";
var DepartmentSchema, Department;
var init_Department = __esm({
  "src/models/Department.ts"() {
    "use strict";
    DepartmentSchema = new Schema3(
      {
        name: { type: String, required: true, trim: true },
        code: { type: String, required: true, uppercase: true, trim: true },
        school: { type: Schema3.Types.ObjectId, ref: "School", required: true, index: true },
        hod: { type: Schema3.Types.ObjectId, ref: "User", index: true },
        description: { type: String, trim: true },
        isActive: { type: Boolean, default: true }
      },
      { timestamps: true }
    );
    DepartmentSchema.index({ school: 1, name: 1 }, { unique: true });
    DepartmentSchema.index({ school: 1, code: 1 }, { unique: true });
    Department = mongoose4.model("Department", DepartmentSchema);
  }
});

// src/app.ts
import express from "express";
import cors from "cors";
import morgan from "morgan";

// src/config/env.ts
import dotenv from "dotenv";
dotenv.config();
var ENV = {
  PORT: process.env.PORT || 5e3,
  MONGODB_URI: process.env.MONGODB_URI || "mongodb+srv://vashishtsandhu_db_user:TJ8jxQgCdpg9fWZ6@cluster0.ixwtbna.mongodb.net/ctu_competition_hub?retryWrites=true&w=majority",
  USE_IN_MEMORY_DB: process.env.USE_IN_MEMORY_DB === "true" || false,
  JWT_SECRET: process.env.JWT_SECRET || "ctu_super_secure_jwt_secret_key_2026_dsw_competition_hub",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "ctu_super_secure_refresh_secret_key_2026_dsw_competition_hub",
  NODE_ENV: process.env.NODE_ENV || "development",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || ""
};

// src/middleware/errorHandler.ts
import { ZodError } from "zod";
var errorHandler = (err, req, res, next) => {
  console.error("Unhandled Error:", err);
  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message
      }))
    });
    return;
  }
  if (err.name === "CastError") {
    res.status(400).json({
      success: false,
      message: `Invalid identifier format for ${err.path}: ${err.value}`
    });
    return;
  }
  if (err.code === 11e3) {
    const field = Object.keys(err.keyPattern || {})[0] || "field";
    res.status(409).json({
      success: false,
      message: `Duplicate entry detected: ${field} must be unique.`
    });
    return;
  }
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : void 0
  });
};

// src/config/db.ts
import mongoose from "mongoose";
var mongodInstance = null;
var connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }
    if (ENV.USE_IN_MEMORY_DB) {
      console.log("\u26A1 Initializing in-memory MongoDB server as requested...");
      const { MongoMemoryServer } = await import("mongodb-memory-server");
      mongodInstance = await MongoMemoryServer.create();
      const uri = mongodInstance.getUri();
      await mongoose.connect(uri);
      console.log(`\u2705 Connected to In-Memory MongoDB at: ${uri}`);
      return;
    }
    console.log(`\u23F3 Attempting connection to MongoDB at: ${ENV.MONGODB_URI.replace(/:([^@]+)@/, ":****@")}`);
    try {
      await mongoose.connect(ENV.MONGODB_URI, {
        serverSelectionTimeoutMS: 8e3
      });
      console.log(`\u2705 Connected to MongoDB at: ${ENV.MONGODB_URI.replace(/:([^@]+)@/, ":****@")}`);
      return;
    } catch (primaryErr) {
      console.warn(`\u26A0\uFE0F Could not connect to primary MongoDB (${primaryErr.message}).`);
      if (process.env.VERCEL) {
        throw new Error(`MongoDB connection error: ${primaryErr.message}. Verify MONGODB_URI and Atlas Network Access (0.0.0.0/0).`);
      }
      console.log("\u26A1 Falling back to embedded MongoMemoryServer for standalone zero-config runtime...");
      const { MongoMemoryServer } = await import("mongodb-memory-server");
      mongodInstance = await MongoMemoryServer.create();
      const uri = mongodInstance.getUri();
      await mongoose.connect(uri);
      console.log(`\u2705 Connected to Embedded MongoMemoryServer at: ${uri}`);
    }
  } catch (error) {
    console.error("\u274C MongoDB connection error:", error.message);
    if (!process.env.VERCEL) {
      process.exit(1);
    }
    throw error;
  }
};
var disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    if (mongodInstance) {
      await mongodInstance.stop();
    }
  } catch (err) {
    console.error("Error disconnecting MongoDB:", err);
  }
};

// src/app.ts
init_User();

// src/models/index.ts
init_User();
init_School();
init_Department();

// src/models/Competition.ts
init_enums();
import mongoose5, { Schema as Schema4 } from "mongoose";
var CompetitionSchema = new Schema4(
  {
    title: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, uppercase: true, trim: true, index: true },
    description: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: Object.values(CompetitionCategory),
      required: true,
      index: true
    },
    scope: {
      type: String,
      enum: Object.values(CompetitionScope),
      required: true,
      index: true
    },
    organizingSchool: { type: Schema4.Types.ObjectId, ref: "School", index: true },
    organizingDepartment: { type: Schema4.Types.ObjectId, ref: "Department", index: true },
    organizingDepartmentName: { type: String, trim: true },
    coOrganizingSchools: [{ type: Schema4.Types.ObjectId, ref: "School" }],
    isCentralDSW: { type: Boolean, default: false },
    organizer: { type: Schema4.Types.ObjectId, ref: "User", required: true, index: true },
    facultyCoordinator: { type: Schema4.Types.ObjectId, ref: "User" },
    centralCoordinator: { type: Schema4.Types.ObjectId, ref: "User" },
    competitionType: { type: String, trim: true },
    targetAudience: { type: String, trim: true },
    contactEmail: { type: String, trim: true },
    contactPhone: { type: String, trim: true },
    supportingDocuments: [{ type: String }],
    bannerUrl: { type: String },
    objectives: { type: String, trim: true },
    rulesAndRegulations: { type: String, trim: true },
    proposedDate: { type: Date, required: true, index: true },
    startDate: { type: Date },
    endDate: { type: Date },
    startTime: { type: String, default: "09:00 AM" },
    endTime: { type: String, default: "05:00 PM" },
    registrationOpenDate: { type: Date },
    registrationCloseDate: { type: Date },
    venue: { type: String, required: true, trim: true },
    venueType: { type: String, enum: ["CAMPUS", "ONLINE", "HYBRID"], default: "CAMPUS" },
    onlinePlatformUrl: { type: String, trim: true },
    alternativeVenue: { type: String, trim: true },
    durationMinutes: { type: Number, default: 120 },
    reportingTime: { type: String, default: "09:00 AM" },
    rounds: [
      {
        roundNumber: { type: Number, required: true },
        name: { type: String, required: true },
        date: { type: Date },
        venue: { type: String },
        description: { type: String }
      }
    ],
    participationType: {
      type: String,
      enum: ["INDIVIDUAL", "TEAM"],
      default: "INDIVIDUAL"
    },
    minTeamSize: { type: Number, default: 1 },
    maxTeamSize: { type: Number, default: 1 },
    maxRegistrations: { type: Number, default: 100 },
    maxTeams: { type: Number },
    currentRegistrationsCount: { type: Number, default: 0 },
    eligibleSchools: [{ type: Schema4.Types.ObjectId, ref: "School" }],
    eligibleProgrammes: [{ type: String, trim: true }],
    eligibleSemesters: [{ type: Number }],
    eligibilityConditions: { type: String, trim: true },
    registrationFee: { type: Number, default: 0 },
    participantRequirements: { type: String, trim: true },
    requiredDocuments: [{ type: String }],
    customFields: [
      {
        label: { type: String, required: true },
        fieldType: { type: String, enum: ["text", "number", "select", "file"], default: "text" },
        required: { type: Boolean, default: false },
        options: [{ type: String }]
      }
    ],
    requiredFacultyCount: { type: Number, default: 2 },
    requiredVolunteersCount: { type: Number, default: 5 },
    equipment: [{ type: String }],
    venueResources: [{ type: String }],
    budgetProposal: { type: Number, default: 0 },
    prizeDetails: {
      winner: { type: String, default: "\u20B910,000 + Trophy + Certificate of Excellence" },
      firstRunnerUp: { type: String, default: "\u20B95,000 + Trophy + Certificate of Merit" },
      secondRunnerUp: { type: String, default: "\u20B92,500 + Medal + Certificate of Merit" },
      otherPrizes: [{ type: String }]
    },
    sponsorshipInfo: { type: String },
    proposalId: { type: Schema4.Types.ObjectId, ref: "CompetitionProposal", index: true },
    proposalCode: { type: String, trim: true },
    creatorRoleAtSubmission: {
      type: String,
      enum: ["FACULTY", "HOD", "HOS", "DSW"]
    },
    currentApprovalLevel: {
      type: String,
      enum: Object.values(ApprovalLevel),
      default: "NONE" /* NONE */,
      index: true
    },
    returnedFromLevel: {
      type: String,
      enum: [...Object.values(ApprovalLevel), null],
      default: null
    },
    hodApproval: {
      approvedBy: { type: Schema4.Types.ObjectId, ref: "User" },
      approvedAt: { type: Date },
      remarks: { type: String, trim: true }
    },
    hosApproval: {
      approvedBy: { type: Schema4.Types.ObjectId, ref: "User" },
      approvedAt: { type: Date },
      remarks: { type: String, trim: true }
    },
    dswApproval: {
      approvedBy: { type: Schema4.Types.ObjectId, ref: "User" },
      approvedAt: { type: Date },
      remarks: { type: String, trim: true }
    },
    status: {
      type: String,
      enum: Object.values(CompetitionStatus),
      default: "DRAFT" /* DRAFT */,
      index: true
    },
    isPublished: { type: Boolean, default: false, index: true },
    publishedAt: { type: Date },
    submissionRemarks: { type: String, trim: true },
    hodRemarks: { type: String, trim: true },
    hosRemarks: { type: String, trim: true },
    dswRemarks: { type: String, trim: true },
    rejectionReason: { type: String, trim: true },
    revisionNotes: { type: String, trim: true },
    approvalAuditTrail: [
      {
        user: { type: Schema4.Types.ObjectId, ref: "User", required: true },
        role: { type: String, required: true },
        action: { type: String, required: true },
        previousStatus: { type: String, required: true },
        newStatus: { type: String, required: true },
        remarks: { type: String },
        timestamp: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);
var Competition = mongoose5.model("Competition", CompetitionSchema);

// src/models/CompetitionProposal.ts
init_enums();
import mongoose6, { Schema as Schema5 } from "mongoose";
var CompetitionProposalSchema = new Schema5(
  {
    proposalNumber: { type: String, required: true, unique: true, uppercase: true, trim: true, index: true },
    competitionId: { type: Schema5.Types.ObjectId, ref: "Competition", required: true, unique: true, index: true },
    creatorId: { type: Schema5.Types.ObjectId, ref: "User", required: true, index: true },
    creatorRole: { type: String, required: true },
    schoolId: { type: Schema5.Types.ObjectId, ref: "School", index: true },
    departmentId: { type: Schema5.Types.ObjectId, ref: "Department", index: true },
    departmentName: { type: String, trim: true },
    currentApprovalLevel: {
      type: String,
      enum: Object.values(ApprovalLevel),
      default: "NONE" /* NONE */,
      index: true
    },
    returnedFromLevel: {
      type: String,
      enum: [...Object.values(ApprovalLevel), null],
      default: null
    },
    status: {
      type: String,
      enum: Object.values(CompetitionStatus),
      default: "DRAFT" /* DRAFT */,
      index: true
    },
    submittedAt: { type: Date },
    hodApprovedAt: { type: Date },
    hosApprovedAt: { type: Date },
    dswApprovedAt: { type: Date },
    publishedAt: { type: Date },
    version: { type: Number, default: 1 }
  },
  { timestamps: true }
);
var CompetitionProposal = mongoose6.model(
  "CompetitionProposal",
  CompetitionProposalSchema
);

// src/models/ApprovalHistory.ts
init_enums();
import mongoose7, { Schema as Schema6 } from "mongoose";
var ApprovalHistorySchema = new Schema6(
  {
    competitionId: { type: Schema6.Types.ObjectId, ref: "Competition", required: true, index: true },
    proposalId: { type: Schema6.Types.ObjectId, ref: "CompetitionProposal", index: true },
    approverId: { type: Schema6.Types.ObjectId, ref: "User", required: true },
    approverName: { type: String, required: true, trim: true },
    approverRole: { type: String, required: true, trim: true },
    approvalLevel: {
      type: String,
      enum: Object.values(ApprovalLevel),
      default: "NONE" /* NONE */
    },
    decision: {
      type: String,
      enum: [
        "DRAFT_CREATED",
        "SUBMITTED",
        "RESUBMITTED",
        "APPROVED",
        "CHANGES_REQUESTED",
        "REJECTED",
        "PUBLISHED",
        "STATUS_UPDATED"
      ],
      required: true
    },
    comments: { type: String, trim: true },
    previousStatus: { type: String, required: true },
    newStatus: { type: String, required: true },
    timestamp: { type: Date, default: Date.now, index: true }
  },
  { timestamps: true }
);
var ApprovalHistory = mongoose7.model("ApprovalHistory", ApprovalHistorySchema);

// src/models/CompetitionProposalVersion.ts
import mongoose8, { Schema as Schema7 } from "mongoose";
var CompetitionProposalVersionSchema = new Schema7(
  {
    competitionId: { type: Schema7.Types.ObjectId, ref: "Competition", required: true, index: true },
    versionNumber: { type: Number, required: true },
    changesSummary: { type: String, required: true },
    snapshotData: { type: Schema7.Types.Mixed, required: true },
    modifiedBy: { type: Schema7.Types.ObjectId, ref: "User", required: true },
    timestamp: { type: Date, default: Date.now }
  },
  { timestamps: true }
);
var CompetitionProposalVersion = mongoose8.model(
  "CompetitionProposalVersion",
  CompetitionProposalVersionSchema
);

// src/models/Registration.ts
init_enums();
import mongoose9, { Schema as Schema8 } from "mongoose";
var RegistrationSchema = new Schema8(
  {
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true
    },
    competitionId: {
      type: Schema8.Types.ObjectId,
      ref: "Competition",
      required: true,
      index: true
    },
    participantType: {
      type: String,
      enum: ["INDIVIDUAL", "TEAM"],
      default: "INDIVIDUAL"
    },
    userId: {
      type: Schema8.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    school: {
      type: Schema8.Types.ObjectId,
      ref: "School",
      index: true
    },
    departmentId: {
      type: Schema8.Types.ObjectId,
      ref: "Department",
      index: true
    },
    departmentName: {
      type: String,
      trim: true
    },
    teamId: {
      type: Schema8.Types.ObjectId,
      ref: "Team"
    },
    teamName: {
      type: String,
      trim: true
    },
    teamMembers: [
      {
        name: { type: String, required: true },
        email: { type: String, required: true },
        studentId: { type: String },
        phone: { type: String },
        school: { type: String },
        programme: { type: String },
        semester: { type: Number }
      }
    ],
    status: {
      type: String,
      enum: Object.values(RegistrationStatus),
      default: "CONFIRMED" /* CONFIRMED */,
      index: true
    },
    qrCodeData: {
      type: String,
      required: true
    },
    checkedInAt: {
      type: Date
    },
    checkedInBy: {
      type: Schema8.Types.ObjectId,
      ref: "User"
    },
    customFieldResponses: {
      type: Schema8.Types.Mixed
    },
    remarks: {
      type: String
    }
  },
  { timestamps: true }
);
RegistrationSchema.index({ competitionId: 1, userId: 1 }, { unique: true });
var Registration = mongoose9.model("Registration", RegistrationSchema);

// src/models/Team.ts
import mongoose10, { Schema as Schema9 } from "mongoose";
var TeamSchema = new Schema9(
  {
    competitionId: { type: Schema9.Types.ObjectId, ref: "Competition", required: true, index: true },
    registrationId: { type: Schema9.Types.ObjectId, ref: "Registration", index: true },
    teamName: { type: String, required: true, trim: true },
    leaderId: { type: Schema9.Types.ObjectId, ref: "User", required: true, index: true },
    members: [
      {
        name: { type: String, required: true },
        email: { type: String, required: true },
        studentId: { type: String },
        phone: { type: String },
        school: { type: String },
        programme: { type: String },
        semester: { type: Number }
      }
    ],
    teamSize: { type: Number, required: true, min: 1 },
    status: { type: String, enum: ["ACTIVE", "CANCELLED"], default: "ACTIVE" }
  },
  { timestamps: true }
);
TeamSchema.index({ competitionId: 1, teamName: 1 }, { unique: true });
var Team = mongoose10.model("Team", TeamSchema);

// src/models/FacultyDuty.ts
init_enums();
import mongoose11, { Schema as Schema10 } from "mongoose";
var FacultyDutySchema = new Schema10(
  {
    competitionId: { type: Schema10.Types.ObjectId, ref: "Competition", required: true, index: true },
    facultyId: { type: Schema10.Types.ObjectId, ref: "User", required: true, index: true },
    assignedBy: { type: Schema10.Types.ObjectId, ref: "User", required: true },
    dutyTitle: { type: String, required: true, trim: true },
    dutyCategory: {
      type: String,
      enum: Object.values(FacultyDutyCategory),
      required: true,
      index: true
    },
    dutyDescription: { type: String, trim: true },
    date: { type: Date, required: true, index: true },
    reportingTime: { type: String, trim: true },
    dutyStartTime: { type: String, trim: true },
    dutyEndTime: { type: String, trim: true },
    venue: { type: String, required: true, trim: true },
    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "URGENT"],
      default: "MEDIUM"
    },
    supportingInstructions: { type: String },
    completionDeadline: { type: Date },
    supportingDocuments: [{ type: String }],
    status: {
      type: String,
      enum: Object.values(FacultyDutyStatus),
      default: "ASSIGNED" /* ASSIGNED */,
      index: true
    },
    acknowledgedAt: { type: Date },
    completionEvidence: {
      reportText: { type: String },
      fileUrls: [{ type: String }],
      submittedAt: { type: Date }
    },
    supervisorRemarks: { type: String },
    verifiedAt: { type: Date },
    verifiedBy: { type: Schema10.Types.ObjectId, ref: "User" },
    reassignmentRequest: {
      reason: { type: String },
      requestedAt: { type: Date }
    }
  },
  { timestamps: true }
);
var FacultyDuty = mongoose11.model("FacultyDuty", FacultyDutySchema);

// src/models/CulturalCoordinatorAssignment.ts
import mongoose12, { Schema as Schema11 } from "mongoose";
var CulturalCoordinatorAssignmentSchema = new Schema11(
  {
    schoolId: { type: Schema11.Types.ObjectId, ref: "School", required: true, index: true },
    coordinatorId: { type: Schema11.Types.ObjectId, ref: "User", required: true, index: true },
    appointedBy: { type: Schema11.Types.ObjectId, ref: "User", required: true },
    termStart: { type: Date, default: Date.now },
    termEnd: { type: Date },
    isActive: { type: Boolean, default: true, index: true },
    responsibilities: [{ type: String }],
    handoverNotes: { type: String }
  },
  { timestamps: true }
);
var CulturalCoordinatorAssignment = mongoose12.model(
  "CulturalCoordinatorAssignment",
  CulturalCoordinatorAssignmentSchema
);

// src/models/JudgingRubric.ts
import mongoose13, { Schema as Schema12 } from "mongoose";
var JudgingRubricSchema = new Schema12(
  {
    competitionId: { type: Schema12.Types.ObjectId, ref: "Competition", required: true, unique: true, index: true },
    criteria: [
      {
        name: { type: String, required: true },
        description: { type: String },
        maxMarks: { type: Number, required: true, default: 20 },
        weightagePercent: { type: Number, required: true, default: 25 }
      }
    ],
    totalMarks: { type: Number, required: true, default: 100 },
    guidelines: { type: String }
  },
  { timestamps: true }
);
var JudgingRubric = mongoose13.model("JudgingRubric", JudgingRubricSchema);

// src/models/Score.ts
import mongoose14, { Schema as Schema13 } from "mongoose";
var ScoreSchema = new Schema13(
  {
    competitionId: { type: Schema13.Types.ObjectId, ref: "Competition", required: true, index: true },
    judgeId: { type: Schema13.Types.ObjectId, ref: "User", required: true, index: true },
    registrationId: { type: Schema13.Types.ObjectId, ref: "Registration", required: true, index: true },
    roundNumber: { type: Number, default: 1 },
    criteriaScores: [
      {
        criterionName: { type: String, required: true },
        score: { type: Number, required: true },
        maxScore: { type: Number, required: true }
      }
    ],
    totalScore: { type: Number, required: true, default: 0 },
    remarks: { type: String },
    isSubmitted: { type: Boolean, default: false },
    submittedAt: { type: Date }
  },
  { timestamps: true }
);
ScoreSchema.index({ competitionId: 1, judgeId: 1, registrationId: 1, roundNumber: 1 }, { unique: true });
var Score = mongoose14.model("Score", ScoreSchema);

// src/models/CompetitionResult.ts
init_enums();
import mongoose15, { Schema as Schema14 } from "mongoose";
var CompetitionResultSchema = new Schema14(
  {
    competitionId: { type: Schema14.Types.ObjectId, ref: "Competition", required: true, index: true },
    registrationId: { type: Schema14.Types.ObjectId, ref: "Registration", required: true, index: true },
    participantName: { type: String, required: true },
    school: { type: Schema14.Types.ObjectId, ref: "School" },
    rank: { type: Number, required: true },
    category: {
      type: String,
      enum: Object.values(ResultCategory),
      required: true,
      index: true
    },
    finalScore: { type: Number, default: 0 },
    prizeWon: { type: String },
    remarks: { type: String },
    isApprovedByDSW: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false, index: true },
    publishedAt: { type: Date },
    publishedBy: { type: Schema14.Types.ObjectId, ref: "User" },
    history: [
      {
        modifiedBy: { type: Schema14.Types.ObjectId, ref: "User", required: true },
        modifiedAt: { type: Date, default: Date.now },
        reason: { type: String, required: true },
        previousRank: { type: Number },
        previousScore: { type: Number }
      }
    ]
  },
  { timestamps: true }
);
CompetitionResultSchema.index({ competitionId: 1, registrationId: 1 }, { unique: true });
var CompetitionResult = mongoose15.model("CompetitionResult", CompetitionResultSchema);

// src/models/Certificate.ts
init_enums();
import mongoose16, { Schema as Schema15 } from "mongoose";
var CertificateSchema = new Schema15(
  {
    certificateNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true
    },
    verificationCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true
    },
    competitionId: { type: Schema15.Types.ObjectId, ref: "Competition", required: true, index: true },
    recipientId: { type: Schema15.Types.ObjectId, ref: "User", required: true, index: true },
    recipientName: { type: String, required: true, trim: true },
    recipientRole: { type: String, required: true, trim: true },
    schoolName: { type: String, trim: true },
    competitionTitle: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: Object.values(CertificateType),
      required: true,
      index: true
    },
    achievement: { type: String, required: true, trim: true },
    issueDate: { type: Date, default: Date.now },
    authorizedSignatures: [
      {
        name: { type: String, required: true },
        title: { type: String, required: true },
        signatureUrl: { type: String }
      }
    ],
    qrCodeData: { type: String, required: true },
    pdfUrl: { type: String },
    isRevoked: { type: Boolean, default: false }
  },
  { timestamps: true }
);
var Certificate = mongoose16.model("Certificate", CertificateSchema);

// src/models/Notification.ts
import mongoose17, { Schema as Schema16 } from "mongoose";
var NotificationSchema = new Schema16(
  {
    recipient: { type: Schema16.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ["INFO", "SUCCESS", "WARNING", "ALERT"],
      default: "INFO"
    },
    actionUrl: { type: String, trim: true },
    metadata: { type: Schema16.Types.Mixed },
    isRead: { type: Boolean, default: false, index: true }
  },
  { timestamps: true }
);
var Notification = mongoose17.model("Notification", NotificationSchema);

// src/models/AuditLog.ts
import mongoose18, { Schema as Schema17 } from "mongoose";
var AuditLogSchema = new Schema17(
  {
    user: { type: Schema17.Types.ObjectId, ref: "User" },
    userName: { type: String },
    role: { type: String, required: true },
    action: { type: String, required: true, index: true },
    resourceType: { type: String, required: true, index: true },
    resourceId: { type: String, index: true },
    previousState: { type: Schema17.Types.Mixed },
    newState: { type: Schema17.Types.Mixed },
    remarks: { type: String },
    ipAddress: { type: String },
    userAgent: { type: String }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);
var AuditLog = mongoose18.model("AuditLog", AuditLogSchema);

// src/models/SystemSetting.ts
import mongoose19, { Schema as Schema18 } from "mongoose";
var SystemSettingSchema = new Schema18(
  {
    key: { type: String, required: true, unique: true, index: true },
    value: { type: Schema18.Types.Mixed, required: true },
    category: { type: String, default: "GENERAL" },
    description: { type: String },
    updatedBy: { type: Schema18.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);
var SystemSetting = mongoose19.model("SystemSetting", SystemSettingSchema);

// src/scripts/seed.ts
init_enums();

// src/services/qrService.ts
import QRCode from "qrcode";
var generateQRCodeDataUrl = async (text) => {
  try {
    return await QRCode.toDataURL(text, {
      errorCorrectionLevel: "H",
      margin: 1,
      color: {
        dark: "#0b192c",
        light: "#ffffff"
      },
      width: 280
    });
  } catch (err) {
    console.error("QR code generation error:", err);
    return "";
  }
};

// src/scripts/seed.ts
var runSeed = async () => {
  console.log("\u{1F331} Starting CTU Competition Hub database seeding...");
  await Promise.all([
    User.deleteMany({}),
    School.deleteMany({}),
    Competition.deleteMany({}),
    Registration.deleteMany({}),
    FacultyDuty.deleteMany({}),
    CulturalCoordinatorAssignment.deleteMany({}),
    JudgingRubric.deleteMany({}),
    Score.deleteMany({}),
    CompetitionResult.deleteMany({}),
    Certificate.deleteMany({}),
    Notification.deleteMany({}),
    AuditLog.deleteMany({})
  ]);
  console.log("\u{1F9F9} Cleaned existing database collections.");
  const defaultPassword = "ctu@12345";
  const superAdmin = await User.create({
    name: "Er. Gurvinder Singh",
    email: "superadmin@ctuniversity.in",
    password: defaultPassword,
    roles: ["SUPER_ADMIN" /* SUPER_ADMIN */, "DSW_ADMIN" /* DSW_ADMIN */],
    designation: "Chancellor / Chief Administrator",
    phone: "+91 98765 00001",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    isActive: true
  });
  const dswAdmin = await User.create({
    name: "Dr. Gurpreet Singh",
    email: "dsw@ctuniversity.in",
    password: defaultPassword,
    roles: ["DSW_ADMIN" /* DSW_ADMIN */],
    designation: "Director Student Welfare (DSW)",
    department: "Directorate of Student Welfare",
    phone: "+91 98765 00002",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    isActive: true
  });
  console.log("\u{1F464} Created Super Admin and DSW Administrator.");
  const schoolsData = [
    {
      name: "School of Engineering and Technology",
      code: "SOET",
      description: "Hub for cutting-edge computing, artificial intelligence, robotics, and mechanical innovations.",
      deanName: "Dr. Harmeet Singh",
      contactEmail: "dean.soet@ctuniversity.in",
      departments: ["Computer Science & Engineering", "Artificial Intelligence & Data Science", "Civil Engineering", "Mechanical & Robotics Engineering"],
      programmes: ["B.Tech CSE", "B.Tech AI & ML", "BCA", "MCA", "M.Tech CSE"]
    },
    {
      name: "School of Management Studies",
      code: "SMS",
      description: "Developing futuristic leaders, entrepreneurs, and global business strategists.",
      deanName: "Dr. Rohit Sharma",
      contactEmail: "dean.sms@ctuniversity.in",
      departments: ["Marketing & Finance", "Operations & Logistics", "Human Resources", "International Business"],
      programmes: ["BBA", "B.Com (Hons)", "MBA Finance", "MBA Marketing", "MBA Business Analytics"]
    },
    {
      name: "School of Hotel Management, Airlines and Tourism",
      code: "SOHMAT",
      description: "Premier culinary arts, aviation hospitality, and international tourism academy.",
      deanName: "Chef Sanjeev Kapoor (Advisor) / Dr. Vikram Oberoi",
      contactEmail: "dean.sohmat@ctuniversity.in",
      departments: ["Food & Beverage Production", "Airline Cabin Crew Management", "Front Office Operations", "Tourism Development"],
      programmes: ["B.Sc Hotel Management", "B.Sc Airlines & Airport Management", "Diploma in Bakery & Confectionery"]
    },
    {
      name: "School of Law",
      code: "SOL",
      description: "Excellence in legal advocacy, moot court proceedings, constitutional law, and corporate jurisprudence.",
      deanName: "Prof. (Dr.) Ravinder Kaur",
      contactEmail: "dean.law@ctuniversity.in",
      departments: ["Constitutional Law", "Criminal Jurisprudence", "Corporate & Cyber Law", "Intellectual Property Rights"],
      programmes: ["BA LL.B (Hons)", "BBA LL.B (Hons)", "LL.M Corporate Law"]
    },
    {
      name: "School of Pharmaceutical Sciences",
      code: "SOPS",
      description: "Pioneering drug discovery, clinical pharmacy, pharmacology, and drug formulation.",
      deanName: "Dr. Manjinder Singh",
      contactEmail: "dean.sops@ctuniversity.in",
      departments: ["Pharmaceutics", "Pharmacology & Toxicology", "Pharmaceutical Chemistry", "Pharmacognosy"],
      programmes: ["B.Pharm", "D.Pharm", "M.Pharm Pharmaceutics", "Pharm.D"]
    },
    {
      name: "School of Design and Innovation",
      code: "SODI",
      description: "Creative cradle for UI/UX, product design, fashion styling, animation, and multimedia.",
      deanName: "Ar. Ananya Mukherjee",
      contactEmail: "dean.sodi@ctuniversity.in",
      departments: ["UI/UX & Interactive Design", "Fashion & Textile Design", "Graphic & Animation Arts", "Interior Architecture"],
      programmes: ["B.Des UI/UX", "B.Des Fashion", "B.Sc Animation & VFX", "B.Des Interior Design"]
    },
    {
      name: "School of Allied and Healthcare",
      code: "SOAH",
      description: "Advancing medical laboratory technology, radiology, physiotherapy, and optometrist care.",
      deanName: "Dr. Simranjeet Kaur",
      contactEmail: "dean.soah@ctuniversity.in",
      departments: ["Medical Lab Technology", "Physiotherapy & Rehabilitation", "Radiology & Imaging", "Optometry & Vision Science"],
      programmes: ["B.Sc MLT", "BPT (Physiotherapy)", "B.Sc Radiology", "B.Sc Operation Theatre Tech"]
    },
    {
      name: "School of Social Sciences and Liberal Arts",
      code: "SOSSLA",
      description: "Fostering critical discourse, journalism, mass communication, psychology, and public policy.",
      deanName: "Dr. Jasleen Ahluwalia",
      contactEmail: "dean.sossla@ctuniversity.in",
      departments: ["Journalism & Mass Comm", "Clinical Psychology", "Public Administration", "English Literature"],
      programmes: ["BA Journalism", "BA (Hons) Psychology", "MA English", "MA Mass Communication"]
    }
  ];
  const createdSchools = [];
  for (const s of schoolsData) {
    const school = await School.create(s);
    createdSchools.push(school);
  }
  console.log(`\u{1F3EB} Created ${createdSchools.length} official CT University schools.`);
  const soet = createdSchools[0];
  const sms = createdSchools[1];
  const sohmat = createdSchools[2];
  const sol = createdSchools[3];
  const sops = createdSchools[4];
  const sodi = createdSchools[5];
  const schoolCoordinatorsData = [
    {
      name: "Dr. Rajesh Verma",
      email: "soet.coordinator@ctuniversity.in",
      school: soet._id,
      department: "Computer Science & Engineering",
      designation: "Associate Professor & SOET Coordinator",
      roles: ["SCHOOL_COORDINATOR" /* SCHOOL_COORDINATOR */, "FACULTY" /* FACULTY */],
      employeeId: "CTU-EMP-0101",
      phone: "+91 98141 11001",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
    },
    {
      name: "Dr. Meenakshi Arora",
      email: "sms.coordinator@ctuniversity.in",
      school: sms._id,
      department: "Marketing & Finance",
      designation: "Associate Professor & SMS Coordinator",
      roles: ["SCHOOL_COORDINATOR" /* SCHOOL_COORDINATOR */, "FACULTY" /* FACULTY */],
      employeeId: "CTU-EMP-0102",
      phone: "+91 98141 11002",
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
    }
  ];
  const createdCoordinators = [];
  for (const c of schoolCoordinatorsData) {
    const coord = await User.create({ ...c, password: defaultPassword, isActive: true });
    createdCoordinators.push(coord);
  }
  const culturalCoordinatorsData = [
    {
      name: "Prof. Amritpal Singh",
      email: "cultural.soet@ctuniversity.in",
      school: soet._id,
      department: "Mechanical & Robotics Engineering",
      designation: "Assistant Professor & Cultural Coordinator (SOET)",
      roles: ["CULTURAL_COORDINATOR" /* CULTURAL_COORDINATOR */, "FACULTY" /* FACULTY */],
      employeeId: "CTU-CUL-0201",
      phone: "+91 98141 22001",
      avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80"
    },
    {
      name: "Dr. Sunita Rani",
      email: "cultural.sms@ctuniversity.in",
      school: sms._id,
      department: "Human Resources",
      designation: "Assistant Professor & Cultural Coordinator (SMS)",
      roles: ["CULTURAL_COORDINATOR" /* CULTURAL_COORDINATOR */, "FACULTY" /* FACULTY */],
      employeeId: "CTU-CUL-0202",
      phone: "+91 98141 22002",
      avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
    },
    {
      name: "Chef Tarun Deep Singh",
      email: "cultural.sohmat@ctuniversity.in",
      school: sohmat._id,
      department: "Food & Beverage Production",
      designation: "Head Chef & Cultural Coordinator (SOHMAT)",
      roles: ["CULTURAL_COORDINATOR" /* CULTURAL_COORDINATOR */, "FACULTY" /* FACULTY */],
      employeeId: "CTU-CUL-0203",
      phone: "+91 98141 22003",
      avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80"
    }
  ];
  const createdCulturalCoordinators = [];
  for (const cc of culturalCoordinatorsData) {
    const culCoord = await User.create({ ...cc, password: defaultPassword, isActive: true });
    createdCulturalCoordinators.push(culCoord);
    await School.findByIdAndUpdate(cc.school, {
      culturalCoordinator: culCoord._id,
      $push: {
        coordinatorHistory: {
          coordinator: culCoord._id,
          appointedAt: new Date(Date.now() - 60 * 24 * 3600 * 1e3),
          appointedBy: dswAdmin._id,
          remarks: "Appointed by DSW for Academic Year 2026-2027"
        }
      }
    });
    await CulturalCoordinatorAssignment.create({
      schoolId: cc.school,
      coordinatorId: culCoord._id,
      appointedBy: dswAdmin._id,
      termStart: new Date(Date.now() - 60 * 24 * 3600 * 1e3),
      isActive: true,
      responsibilities: [
        "Coordinate school cultural, literary, and technical contingents",
        "Review and endorse competition proposals from school departments",
        "Liaison with DSW office for university festivals",
        "Oversee faculty duty distribution on event days"
      ],
      handoverNotes: "Assigned as primary liaison for university-level competition operations."
    });
  }
  console.log("\u{1F3AD} Appointed Cultural Coordinators for individual schools.");
  const facultyMembersData = [
    {
      name: "Dr. Navneet Kaur",
      email: "navneet.cse@ctuniversity.in",
      school: soet._id,
      department: "Computer Science & Engineering",
      designation: "Assistant Professor",
      roles: ["FACULTY" /* FACULTY */, "JUDGE" /* JUDGE */],
      employeeId: "CTU-FAC-0301",
      phone: "+91 98141 33001",
      avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80"
    },
    {
      name: "Er. Sandeep Bawa",
      email: "sandeep.mech@ctuniversity.in",
      school: soet._id,
      department: "Mechanical & Robotics Engineering",
      designation: "Assistant Professor",
      roles: ["FACULTY" /* FACULTY */],
      employeeId: "CTU-FAC-0302",
      phone: "+91 98141 33002",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    {
      name: "Dr. Priya Singla",
      email: "priya.mba@ctuniversity.in",
      school: sms._id,
      department: "Marketing & Finance",
      designation: "Associate Professor",
      roles: ["FACULTY" /* FACULTY */, "JUDGE" /* JUDGE */],
      employeeId: "CTU-FAC-0303",
      phone: "+91 98141 33003",
      avatarUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80"
    },
    {
      name: "Adv. Manpreet Singh Dhillon",
      email: "judge.law@ctuniversity.in",
      school: sol._id,
      department: "Constitutional Law",
      designation: "Senior Legal Advocate & External Judge",
      roles: ["JUDGE" /* JUDGE */, "FACULTY" /* FACULTY */],
      employeeId: "CTU-FAC-0304",
      phone: "+91 98141 33004",
      avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80"
    }
  ];
  const createdFaculty = [];
  for (const f of facultyMembersData) {
    const fac = await User.create({ ...f, password: defaultPassword, isActive: true });
    createdFaculty.push(fac);
  }
  const studentsData = [
    {
      name: "Aarav Sharma",
      email: "student@ctuniversity.in",
      // Primary evaluator student login
      school: soet._id,
      department: "Computer Science & Engineering",
      programme: "B.Tech CSE",
      semester: 6,
      registrationNumber: "CTU2023CSE042",
      phone: "+91 98720 00101",
      roles: ["STUDENT" /* STUDENT */],
      avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80"
    },
    {
      name: "Simran Kaur Gill",
      email: "simran.gill@ctuniversity.in",
      school: soet._id,
      department: "Artificial Intelligence & Data Science",
      programme: "B.Tech AI & ML",
      semester: 4,
      registrationNumber: "CTU2024AIML018",
      phone: "+91 98720 00102",
      roles: ["STUDENT" /* STUDENT */],
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
    },
    {
      name: "Rohan Mehra",
      email: "rohan.mehra@ctuniversity.in",
      school: sms._id,
      department: "Marketing & Finance",
      programme: "MBA Marketing",
      semester: 2,
      registrationNumber: "CTU2025MBA009",
      phone: "+91 98720 00103",
      roles: ["STUDENT" /* STUDENT */],
      avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80"
    },
    {
      name: "Gurleen Sandhu",
      email: "gurleen.sandhu@ctuniversity.in",
      school: sodi._id,
      department: "UI/UX & Interactive Design",
      programme: "B.Des UI/UX",
      semester: 6,
      registrationNumber: "CTU2023DES014",
      phone: "+91 98720 00104",
      roles: ["STUDENT" /* STUDENT */],
      avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
    }
  ];
  const createdStudents = [];
  for (const s of studentsData) {
    const stu = await User.create({ ...s, password: defaultPassword, isActive: true });
    createdStudents.push(stu);
  }
  console.log(`\u{1F393} Created ${createdStudents.length} student demo accounts.`);
  const now = /* @__PURE__ */ new Date();
  const compHackathon = await Competition.create({
    title: "CTU InnovateX 2026: 36-Hour National Hackathon",
    code: "CTU-HACK-2026-01",
    description: "The flagship hackathon of CT University. Build generative AI agents, smart healthcare platforms, or sustainable green tech solutions to solve real-world industry challenges.",
    category: "TECHNICAL" /* TECHNICAL */,
    scope: "UNIVERSITY_LEVEL" /* UNIVERSITY_LEVEL */,
    organizingSchool: soet._id,
    coOrganizingSchools: [sodi._id],
    isCentralDSW: false,
    organizer: createdCoordinators[0]._id,
    // SOET Coordinator
    facultyCoordinator: createdFaculty[0]._id,
    // Dr. Navneet Kaur
    bannerUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80",
    objectives: "Encourage cross-disciplinary innovation, rapid software prototyping, and venture-grade project incubation among CT University students.",
    rulesAndRegulations: "Teams of 2 to 4 members. All code must be authored during the event. Use of public APIs and generative AI models is encouraged with attribution.",
    proposedDate: new Date(now.getTime() + 14 * 24 * 3600 * 1e3),
    startDate: new Date(now.getTime() + 14 * 24 * 3600 * 1e3),
    endDate: new Date(now.getTime() + 16 * 24 * 3600 * 1e3),
    registrationOpenDate: new Date(now.getTime() - 5 * 24 * 3600 * 1e3),
    registrationCloseDate: new Date(now.getTime() + 10 * 24 * 3600 * 1e3),
    venue: "Swami Vivekananda Central Auditorium & Computing Lab 4",
    alternativeVenue: "SOET Seminar Hall B",
    durationMinutes: 2160,
    reportingTime: "08:30 AM",
    rounds: [
      { roundNumber: 1, name: "Idea Synopsis & Wireframe Screening", date: new Date(now.getTime() + 14 * 24 * 3600 * 1e3), venue: "Main Auditorium" },
      { roundNumber: 2, name: "Midway Sprint & Architecture Evaluation", date: new Date(now.getTime() + 15 * 24 * 3600 * 1e3), venue: "Lab 4" },
      { roundNumber: 3, name: "Grand Finale & Live Jury Pitching", date: new Date(now.getTime() + 16 * 24 * 3600 * 1e3), venue: "Auditorium Main Stage" }
    ],
    participationType: "TEAM",
    minTeamSize: 2,
    maxTeamSize: 4,
    maxRegistrations: 50,
    maxTeams: 50,
    currentRegistrationsCount: 2,
    eligibleSchools: [soet._id, sodi._id, sms._id],
    eligibleProgrammes: ["B.Tech CSE", "B.Tech AI & ML", "BCA", "MCA", "B.Des UI/UX", "MBA Business Analytics"],
    eligibleSemesters: [2, 3, 4, 5, 6, 7, 8],
    eligibilityConditions: "Open to all bonafide students of SOET, SODI, and SMS with no active disciplinary standing.",
    registrationFee: 0,
    participantRequirements: "Bring your own laptops, chargers, extension cords, and university ID card.",
    requiredDocuments: ["Valid CT University ID Card", "Signed No-Objection Form"],
    customFields: [
      { label: "Primary Tech Stack Planned", fieldType: "text", required: true },
      { label: "GitHub Profile or Portfolio URL", fieldType: "text", required: false }
    ],
    requiredFacultyCount: 4,
    requiredVolunteersCount: 12,
    equipment: ["High-speed gigabit Wi-Fi routers", "Dual-screen presentation monitors", "Audio podium", "Power strips"],
    venueResources: ["Auditorium projector", "24/7 air conditioning", "Overnight cafeteria pass"],
    budgetProposal: 75e3,
    prizeDetails: {
      winner: "\u20B925,000 Cash + CTU Innovation Trophy + Pre-Incubation Grant",
      firstRunnerUp: "\u20B915,000 Cash + Merit Trophy + Cloud Credits",
      secondRunnerUp: "\u20B910,000 Cash + Medal + Merch Kit",
      otherPrizes: ["Best UI/UX Award: \u20B95,000", "Best AI Integration Award: \u20B95,000"]
    },
    sponsorshipInfo: "Sponsored in partnership with Google Developer Student Clubs & TiE Punjab",
    status: "REGISTRATION_OPEN" /* REGISTRATION_OPEN */,
    isPublished: true,
    publishedAt: new Date(now.getTime() - 5 * 24 * 3600 * 1e3),
    approvalAuditTrail: [
      {
        user: createdCoordinators[0]._id,
        role: "SCHOOL_COORDINATOR" /* SCHOOL_COORDINATOR */,
        action: "PROPOSAL_SUBMITTED",
        previousStatus: "DRAFT" /* DRAFT */,
        newStatus: "SUBMITTED" /* SUBMITTED */,
        remarks: "Submitted annual inter-school flagship hackathon proposal.",
        timestamp: new Date(now.getTime() - 8 * 24 * 3600 * 1e3)
      },
      {
        user: dswAdmin._id,
        role: "DSW_ADMIN" /* DSW_ADMIN */,
        action: "DSW_APPROVE",
        previousStatus: "SUBMITTED" /* SUBMITTED */,
        newStatus: "APPROVED" /* APPROVED */,
        remarks: "Approved by DSW. Budget sanctioned. High impact event.",
        timestamp: new Date(now.getTime() - 6 * 24 * 3600 * 1e3)
      },
      {
        user: dswAdmin._id,
        role: "DSW_ADMIN" /* DSW_ADMIN */,
        action: "COMPETITION_PUBLISHED",
        previousStatus: "APPROVED" /* APPROVED */,
        newStatus: "REGISTRATION_OPEN" /* REGISTRATION_OPEN */,
        remarks: "Official publication and registration opened.",
        timestamp: new Date(now.getTime() - 5 * 24 * 3600 * 1e3)
      }
    ]
  });
  const compCultural = await Competition.create({
    title: "Virasat-e-Punjab: Inter-School Folk & Classical Dance Championship",
    code: "CTU-CULT-2026-02",
    description: "Annual cultural extravaganza celebrating Punjab heritage, Bhangra, Giddha, Sufi vocals, and classical Indian group choreography.",
    category: "CULTURAL" /* CULTURAL */,
    scope: "UNIVERSITY_LEVEL" /* UNIVERSITY_LEVEL */,
    organizingSchool: createdSchools[7]._id,
    // SOSSLA
    coOrganizingSchools: [sohmat._id],
    isCentralDSW: true,
    organizer: dswAdmin._id,
    facultyCoordinator: createdCulturalCoordinators[0]._id,
    bannerUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop&q=80",
    proposedDate: new Date(now.getTime() - 10 * 24 * 3600 * 1e3),
    startDate: new Date(now.getTime() - 10 * 24 * 3600 * 1e3),
    endDate: new Date(now.getTime() - 9 * 24 * 3600 * 1e3),
    venue: "Open Air Amphitheatre, CT University Campus",
    durationMinutes: 480,
    reportingTime: "10:00 AM",
    participationType: "INDIVIDUAL",
    minTeamSize: 1,
    maxTeamSize: 1,
    maxRegistrations: 30,
    currentRegistrationsCount: 4,
    eligibleSchools: createdSchools.map((s) => s._id),
    status: "COMPLETED" /* COMPLETED */,
    isPublished: true,
    publishedAt: new Date(now.getTime() - 25 * 24 * 3600 * 1e3),
    prizeDetails: {
      winner: "\u20B915,000 + Golden Dhol Trophy",
      firstRunnerUp: "\u20B910,000 + Silver Trophy",
      secondRunnerUp: "\u20B95,000 + Bronze Trophy"
    },
    approvalAuditTrail: [
      {
        user: dswAdmin._id,
        role: "DSW_ADMIN" /* DSW_ADMIN */,
        action: "PROPOSAL_APPROVED_AND_PUBLISHED",
        previousStatus: "DRAFT" /* DRAFT */,
        newStatus: "PUBLISHED" /* PUBLISHED */,
        remarks: "Central DSW annual cultural calendar event.",
        timestamp: new Date(now.getTime() - 25 * 24 * 3600 * 1e3)
      }
    ]
  });
  const compMoot = await Competition.create({
    title: "CTU All-India Moot Court Competition & Constitutional Debate 2026",
    code: "CTU-LAW-2026-03",
    description: "Simulated appellate court proceedings examining Digital Personal Data Protection, AI Liability, and Constitutional Fundamental Rights.",
    category: "LEGAL_MOOT" /* LEGAL_MOOT */,
    scope: "OPEN" /* OPEN */,
    organizingSchool: sol._id,
    organizer: createdFaculty[3]._id,
    // Adv Manpreet Singh
    bannerUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&auto=format&fit=crop&q=80",
    proposedDate: new Date(now.getTime() + 25 * 24 * 3600 * 1e3),
    venue: "Moot Court Hall, School of Law, Block C",
    reportingTime: "09:00 AM",
    durationMinutes: 360,
    participationType: "TEAM",
    minTeamSize: 3,
    maxTeamSize: 3,
    maxRegistrations: 24,
    eligibleSchools: [sol._id],
    budgetProposal: 4e4,
    status: "SUBMITTED" /* SUBMITTED */,
    isPublished: false,
    submissionRemarks: "Submitted by School of Law with comprehensive problem statement and draft memorials.",
    approvalAuditTrail: [
      {
        user: createdFaculty[3]._id,
        role: "FACULTY" /* FACULTY */,
        action: "PROPOSAL_SUBMITTED",
        previousStatus: "DRAFT" /* DRAFT */,
        newStatus: "SUBMITTED" /* SUBMITTED */,
        remarks: "Formally submitted to DSW for evaluation and approval.",
        timestamp: new Date(now.getTime() - 2 * 24 * 3600 * 1e3)
      }
    ]
  });
  const compStartup = await Competition.create({
    title: "CTU VentureCatalyst: Inter-School Startup Pitch & Shark Tank",
    code: "CTU-SMS-2026-04",
    description: "Pitch your entrepreneurial venture to angel investors, venture capitalists, and industry CXOs.",
    category: "INNOVATION_STARTUP" /* INNOVATION_STARTUP */,
    scope: "INTER_SCHOOL" /* INTER_SCHOOL */,
    organizingSchool: sms._id,
    organizer: createdCoordinators[1]._id,
    bannerUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&auto=format&fit=crop&q=80",
    proposedDate: new Date(now.getTime() + 20 * 24 * 3600 * 1e3),
    venue: "Executive Seminar Hall, SMS Block",
    reportingTime: "09:30 AM",
    durationMinutes: 300,
    participationType: "TEAM",
    minTeamSize: 1,
    maxTeamSize: 3,
    maxRegistrations: 20,
    status: "REVISION_REQUIRED" /* REVISION_REQUIRED */,
    isPublished: false,
    dswRemarks: "Please attach the detailed scoring rubric for financial feasibility and clarify external judge honorarium breakdown.",
    revisionNotes: "Need breakdown of external venture capitalist invitations and jury panel accreditation.",
    approvalAuditTrail: [
      {
        user: dswAdmin._id,
        role: "DSW_ADMIN" /* DSW_ADMIN */,
        action: "DSW_REVISION_REQUIRED",
        previousStatus: "SUBMITTED" /* SUBMITTED */,
        newStatus: "REVISION_REQUIRED" /* REVISION_REQUIRED */,
        remarks: "Please attach detailed investor judging criteria and clarify honorarium.",
        timestamp: new Date(now.getTime() - 1 * 24 * 3600 * 1e3)
      }
    ]
  });
  const compCulinary = await Competition.create({
    title: "MasterChef CTU: Pan-Asian & Punjabi Fusion Culinary Challenge",
    code: "CTU-CULN-2026-05",
    description: "Live mystery box cooking competition testing hygiene, culinary craft, plating aesthetics, and flavor profiles.",
    category: "CULTURAL" /* CULTURAL */,
    scope: "SCHOOL_LEVEL" /* SCHOOL_LEVEL */,
    organizingSchool: sohmat._id,
    organizer: createdCulturalCoordinators[2]._id,
    bannerUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=80",
    proposedDate: new Date(now.getTime() + 18 * 24 * 3600 * 1e3),
    venue: "Commercial Training Kitchens & Bakery Lab, SOHMAT",
    durationMinutes: 240,
    reportingTime: "10:00 AM",
    participationType: "INDIVIDUAL",
    minTeamSize: 1,
    maxTeamSize: 1,
    maxRegistrations: 25,
    status: "APPROVED" /* APPROVED */,
    isPublished: false,
    dswRemarks: "Proposal approved. Excellent industry collaboration with Radisson Hotel Group.",
    approvalAuditTrail: [
      {
        user: dswAdmin._id,
        role: "DSW_ADMIN" /* DSW_ADMIN */,
        action: "DSW_APPROVE",
        previousStatus: "SUBMITTED" /* SUBMITTED */,
        newStatus: "APPROVED" /* APPROVED */,
        remarks: "Approved by DSW. Ready to be published.",
        timestamp: new Date(now.getTime() - 2 * 24 * 3600 * 1e3)
      }
    ]
  });
  console.log("\u{1F3C6} Seeded 5 diverse competitions across all lifecycle states.");
  const regQr1 = await generateQRCodeDataUrl(
    JSON.stringify({ regNo: "CTU-REG-2026-01001", comp: compHackathon.code, user: createdStudents[0].name })
  );
  const reg1 = await Registration.create({
    registrationNumber: "CTU-REG-2026-01001",
    competitionId: compHackathon._id,
    participantType: "TEAM",
    userId: createdStudents[0]._id,
    // Aarav Sharma (Team Leader)
    school: soet._id,
    teamName: "NeuralCoders CTU",
    teamMembers: [
      {
        name: "Simran Kaur Gill",
        email: "simran.gill@ctuniversity.in",
        studentId: "CTU2024AIML018",
        school: "SOET",
        programme: "B.Tech AI & ML",
        semester: 4,
        phone: "+91 98720 00102"
      },
      {
        name: "Gurleen Sandhu",
        email: "gurleen.sandhu@ctuniversity.in",
        studentId: "CTU2023DES014",
        school: "SODI",
        programme: "B.Des UI/UX",
        semester: 6,
        phone: "+91 98720 00104"
      }
    ],
    status: "CONFIRMED" /* CONFIRMED */,
    qrCodeData: regQr1,
    customFieldResponses: {
      "Primary Tech Stack Planned": "React, Python FastAPI, Gemini 2.5, MongoDB",
      "GitHub Profile or Portfolio URL": "https://github.com/aarav-ctu"
    }
  });
  const regQr2 = await generateQRCodeDataUrl(
    JSON.stringify({ regNo: "CTU-REG-2026-01002", comp: compHackathon.code, user: createdStudents[2].name })
  );
  await Registration.create({
    registrationNumber: "CTU-REG-2026-01002",
    competitionId: compHackathon._id,
    participantType: "INDIVIDUAL",
    userId: createdStudents[2]._id,
    // Rohan Mehra
    school: sms._id,
    status: "CONFIRMED" /* CONFIRMED */,
    qrCodeData: regQr2,
    customFieldResponses: {
      "Primary Tech Stack Planned": "Next.js, Tailwind, FinTech APIs"
    }
  });
  const cultRegQr1 = await generateQRCodeDataUrl(
    JSON.stringify({ regNo: "CTU-REG-2026-00901", comp: compCultural.code, user: createdStudents[1].name })
  );
  const cultReg1 = await Registration.create({
    registrationNumber: "CTU-REG-2026-00901",
    competitionId: compCultural._id,
    participantType: "INDIVIDUAL",
    userId: createdStudents[1]._id,
    // Simran Kaur Gill (Winner!)
    school: soet._id,
    status: "CHECKED_IN" /* CHECKED_IN */,
    checkedInAt: new Date(compCultural.proposedDate),
    qrCodeData: cultRegQr1
  });
  const cultRegQr2 = await generateQRCodeDataUrl(
    JSON.stringify({ regNo: "CTU-REG-2026-00902", comp: compCultural.code, user: createdStudents[3].name })
  );
  const cultReg2 = await Registration.create({
    registrationNumber: "CTU-REG-2026-00902",
    competitionId: compCultural._id,
    participantType: "INDIVIDUAL",
    userId: createdStudents[3]._id,
    // Gurleen Sandhu (Runner-up!)
    school: sodi._id,
    status: "CHECKED_IN" /* CHECKED_IN */,
    checkedInAt: new Date(compCultural.proposedDate),
    qrCodeData: cultRegQr2
  });
  console.log("\u{1F4DD} Seeded active individual and team participant registrations.");
  await FacultyDuty.create([
    {
      competitionId: compHackathon._id,
      facultyId: createdFaculty[0]._id,
      // Dr. Navneet Kaur
      assignedBy: dswAdmin._id,
      dutyTitle: "Technical Support & Lab Infrastructure Head",
      dutyCategory: "TECHNICAL_SUPPORT" /* TECHNICAL_SUPPORT */,
      dutyDescription: "Oversee uninterrupted gigabit internet connectivity, power distribution, and developer environment access.",
      date: compHackathon.proposedDate,
      reportingTime: "08:00 AM",
      dutyStartTime: "08:30 AM",
      dutyEndTime: "08:00 PM",
      venue: "Computing Lab 4, Block B",
      priority: "HIGH",
      supportingInstructions: "Ensure backup diesel generator link is on standby with maintenance department.",
      status: "ACKNOWLEDGED" /* ACKNOWLEDGED */,
      acknowledgedAt: new Date(now.getTime() - 3 * 24 * 3600 * 1e3)
    },
    {
      competitionId: compHackathon._id,
      facultyId: createdFaculty[1]._id,
      // Er. Sandeep Bawa
      assignedBy: dswAdmin._id,
      dutyTitle: "Participant Check-in & Badge Verification Desk Incharge",
      dutyCategory: "REGISTRATION_DESK" /* REGISTRATION_DESK */,
      dutyDescription: "Scan registration QR codes, issue tamper-evident wristbands, and provide hackathon welcome kits.",
      date: compHackathon.proposedDate,
      reportingTime: "08:00 AM",
      dutyStartTime: "08:30 AM",
      dutyEndTime: "01:00 PM",
      venue: "Auditorium Entrance Foyer",
      priority: "MEDIUM",
      status: "ASSIGNED" /* ASSIGNED */
    },
    {
      competitionId: compCultural._id,
      facultyId: createdFaculty[2]._id,
      // Dr. Priya Singla
      assignedBy: dswAdmin._id,
      dutyTitle: "Stage Management & Audio-Visual Control",
      dutyCategory: "STAGE_MANAGEMENT" /* STAGE_MANAGEMENT */,
      dutyDescription: "Ensure lighting sequences and audio levels for classical dance performances.",
      date: compCultural.proposedDate,
      reportingTime: "09:00 AM",
      dutyStartTime: "09:30 AM",
      dutyEndTime: "06:00 PM",
      venue: "Open Air Amphitheatre",
      priority: "URGENT",
      status: "VERIFIED" /* VERIFIED */,
      acknowledgedAt: new Date(now.getTime() - 12 * 24 * 3600 * 1e3),
      completionEvidence: {
        reportText: "All 24 stage performances executed seamlessly with zero audio disruption. Sound logs submitted to DSW office.",
        fileUrls: ["https://example.com/sound_check_log.pdf"],
        submittedAt: new Date(now.getTime() - 9 * 24 * 3600 * 1e3)
      },
      supervisorRemarks: "Outstanding stage discipline and event execution. Verified by DSW.",
      verifiedAt: new Date(now.getTime() - 8 * 24 * 3600 * 1e3),
      verifiedBy: dswAdmin._id
    }
  ]);
  console.log("\u{1F4CB} Seeded faculty duty assignments across all tracking states.");
  const rubricCultural = await JudgingRubric.create({
    competitionId: compCultural._id,
    criteria: [
      { name: "Rhythm & Footwork (Taal & Laya)", maxMarks: 30, weightagePercent: 30 },
      { name: "Expressions & Abhinaya (Bhava)", maxMarks: 30, weightagePercent: 30 },
      { name: "Authenticity of Costume & Makeup", maxMarks: 20, weightagePercent: 20 },
      { name: "Stage Presence & Overall Impact", maxMarks: 20, weightagePercent: 20 }
    ],
    totalMarks: 100,
    guidelines: "Judges must rate independently without cross-consultation during performances."
  });
  await Score.create([
    {
      competitionId: compCultural._id,
      judgeId: createdFaculty[0]._id,
      // Dr. Navneet Kaur
      registrationId: cultReg1._id,
      roundNumber: 1,
      criteriaScores: [
        { criterionName: "Rhythm & Footwork", score: 29, maxScore: 30 },
        { criterionName: "Expressions & Abhinaya", score: 28, maxScore: 30 },
        { criterionName: "Authenticity of Costume", score: 19, maxScore: 20 },
        { criterionName: "Stage Presence", score: 19, maxScore: 20 }
      ],
      totalScore: 95,
      remarks: "Mesmerizing Kathak and Sufi fusion. Flawless chakkars and graceful expressions.",
      isSubmitted: true,
      submittedAt: new Date(compCultural.proposedDate)
    },
    {
      competitionId: compCultural._id,
      judgeId: createdFaculty[0]._id,
      registrationId: cultReg2._id,
      roundNumber: 1,
      criteriaScores: [
        { criterionName: "Rhythm & Footwork", score: 26, maxScore: 30 },
        { criterionName: "Expressions & Abhinaya", score: 26, maxScore: 30 },
        { criterionName: "Authenticity of Costume", score: 18, maxScore: 20 },
        { criterionName: "Stage Presence", score: 18, maxScore: 20 }
      ],
      totalScore: 88,
      remarks: "Vibrant classical performance with beautiful hand gestures and mudras.",
      isSubmitted: true,
      submittedAt: new Date(compCultural.proposedDate)
    }
  ]);
  const resultWinner = await CompetitionResult.create({
    competitionId: compCultural._id,
    registrationId: cultReg1._id,
    participantName: createdStudents[1].name,
    // Simran Kaur Gill
    school: soet._id,
    rank: 1,
    category: "WINNER" /* WINNER */,
    finalScore: 95,
    prizeWon: "\u20B915,000 + Golden Dhol Trophy + Certificate of Excellence",
    remarks: "Awarded First Place for exemplary classical dance choreography.",
    isApprovedByDSW: true,
    isPublished: true,
    publishedAt: new Date(now.getTime() - 8 * 24 * 3600 * 1e3),
    publishedBy: dswAdmin._id
  });
  const resultRunnerUp = await CompetitionResult.create({
    competitionId: compCultural._id,
    registrationId: cultReg2._id,
    participantName: createdStudents[3].name,
    // Gurleen Sandhu
    school: sodi._id,
    rank: 2,
    category: "FIRST_RUNNER_UP" /* FIRST_RUNNER_UP */,
    finalScore: 88,
    prizeWon: "\u20B910,000 + Silver Trophy + Certificate of Merit",
    remarks: "Awarded First Runner-Up for traditional folk interpretation.",
    isApprovedByDSW: true,
    isPublished: true,
    publishedAt: new Date(now.getTime() - 8 * 24 * 3600 * 1e3),
    publishedBy: dswAdmin._id
  });
  const certNumber1 = "CTU-CERT-2026-00101";
  const certQr1 = await generateQRCodeDataUrl(`http://localhost:5173/verify-certificate/${certNumber1}`);
  await Certificate.create({
    certificateNumber: certNumber1,
    verificationCode: "CTU-WIN-9821",
    competitionId: compCultural._id,
    recipientId: createdStudents[1]._id,
    recipientName: createdStudents[1].name,
    recipientRole: "Student Participant",
    schoolName: "School of Engineering and Technology",
    competitionTitle: compCultural.title,
    type: "WINNER" /* WINNER */,
    achievement: "First Prize - Winner",
    issueDate: new Date(now.getTime() - 7 * 24 * 3600 * 1e3),
    authorizedSignatures: [
      { name: "Dr. Gurpreet Singh", title: "Director Student Welfare (DSW)" },
      { name: "Dr. Satish Kumar", title: "Vice Chancellor, CT University" }
    ],
    qrCodeData: certQr1
  });
  const certNumber2 = "CTU-CERT-2026-00102";
  const certQr2 = await generateQRCodeDataUrl(`http://localhost:5173/verify-certificate/${certNumber2}`);
  await Certificate.create({
    certificateNumber: certNumber2,
    verificationCode: "CTU-RUN-4318",
    competitionId: compCultural._id,
    recipientId: createdStudents[3]._id,
    recipientName: createdStudents[3].name,
    recipientRole: "Student Participant",
    schoolName: "School of Design and Innovation",
    competitionTitle: compCultural.title,
    type: "WINNER" /* WINNER */,
    achievement: "Second Prize - 1st Runner-Up",
    issueDate: new Date(now.getTime() - 7 * 24 * 3600 * 1e3),
    authorizedSignatures: [
      { name: "Dr. Gurpreet Singh", title: "Director Student Welfare (DSW)" },
      { name: "Dr. Satish Kumar", title: "Vice Chancellor, CT University" }
    ],
    qrCodeData: certQr2
  });
  console.log("\u{1F3C5} Seeded official rankings and verifiable certificates with digital QR codes.");
  await Notification.create([
    {
      recipient: dswAdmin._id,
      title: "New Proposal Pending Review",
      message: "CTU All-India Moot Court Competition (CTU-LAW-2026-03) has been submitted by School of Law.",
      type: "INFO",
      actionUrl: "/dsw/approval-queue",
      isRead: false
    },
    {
      recipient: createdStudents[0]._id,
      // Aarav Sharma
      title: "Registration Confirmed: CTU InnovateX 2026",
      message: 'Your team "NeuralCoders CTU" has been confirmed for the 36-Hour National Hackathon.',
      type: "SUCCESS",
      actionUrl: "/student/registrations",
      isRead: false
    },
    {
      recipient: createdFaculty[0]._id,
      // Dr. Navneet Kaur
      title: "Faculty Duty Assigned",
      message: "You have been assigned as Technical Support Head for CTU InnovateX 2026.",
      type: "INFO",
      actionUrl: "/faculty/dashboard",
      isRead: false
    }
  ]);
  await AuditLog.create({
    user: dswAdmin._id,
    userName: dswAdmin.name,
    role: "DSW_ADMIN" /* DSW_ADMIN */,
    action: "SYSTEM_INITIALIZATION",
    resourceType: "SYSTEM",
    remarks: "CTU Competition Hub master dataset seeded with official schools, coordinators, and competitions.",
    ipAddress: "127.0.0.1"
  });
  console.log("\u2728 CTU Competition Hub database seeding completed successfully!");
};
if (process.argv[1]?.endsWith("seed.ts") || process.argv[1]?.endsWith("seed.js")) {
  (async () => {
    try {
      await connectDB();
      await runSeed();
      await disconnectDB();
      process.exit(0);
    } catch (err) {
      console.error("Seed execution error:", err);
      process.exit(1);
    }
  })();
}

// src/services/hierarchyService.ts
init_enums();
init_User();
init_School();
init_Department();

// src/middleware/rbac.ts
init_enums();
var isDswRole = (roles = []) => roles.includes("SUPER_ADMIN" /* SUPER_ADMIN */) || roles.includes("DSW_ADMIN" /* DSW_ADMIN */);
var isHosRole = (roles = []) => roles.includes("HOS" /* HOS */) || roles.includes("SCHOOL_COORDINATOR" /* SCHOOL_COORDINATOR */);
var isHodRole = (roles = []) => roles.includes("HOD" /* HOD */);
var isFacultyOrCoordRole = (roles = []) => roles.includes("FACULTY" /* FACULTY */) || roles.includes("CULTURAL_COORDINATOR" /* CULTURAL_COORDINATOR */) || roles.includes("COMPETITION_ORGANIZER" /* COMPETITION_ORGANIZER */);
var getUserHierarchyOrigin = (roles = []) => {
  if (isDswRole(roles)) return "DSW";
  if (isHosRole(roles)) return "HOS";
  if (isHodRole(roles)) return "HOD";
  if (isFacultyOrCoordRole(roles)) return "FACULTY";
  return null;
};
var requireRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.userRoles) {
      res.status(401).json({ success: false, message: "Unauthorized. Authentication required." });
      return;
    }
    if (isDswRole(req.userRoles)) {
      return next();
    }
    const hasAllowedRole = req.userRoles.some((role) => allowedRoles.includes(role));
    if (!hasAllowedRole) {
      res.status(403).json({
        success: false,
        message: `Forbidden. Requires one of roles: [${allowedRoles.join(", ")}]`
      });
      return;
    }
    next();
  };
};
var requireExactRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.userRoles) {
      res.status(401).json({ success: false, message: "Unauthorized. Authentication required." });
      return;
    }
    const hasAllowedRole = req.userRoles.some((role) => allowedRoles.includes(role));
    if (!hasAllowedRole) {
      res.status(403).json({
        success: false,
        message: `Forbidden. Requires one of roles: [${allowedRoles.join(", ")}]`
      });
      return;
    }
    next();
  };
};

// src/services/hierarchyService.ts
function computeEffectiveStatus(comp) {
  if (!comp.isPublished) {
    return comp.status;
  }
  if ([
    "COMPLETED" /* COMPLETED */,
    "CANCELLED" /* CANCELLED */,
    "POSTPONED" /* POSTPONED */,
    "ARCHIVED" /* ARCHIVED */,
    "IN_PROGRESS" /* IN_PROGRESS */
  ].includes(comp.status)) {
    return comp.status;
  }
  const now = /* @__PURE__ */ new Date();
  if (comp.registrationOpenDate && now < new Date(comp.registrationOpenDate)) {
    return "PUBLISHED" /* PUBLISHED */;
  }
  if (comp.registrationCloseDate && now > new Date(comp.registrationCloseDate)) {
    return "REGISTRATION_CLOSED" /* REGISTRATION_CLOSED */;
  }
  if (comp.maxRegistrations && (comp.currentRegistrationsCount || 0) >= comp.maxRegistrations) {
    return "REGISTRATION_CLOSED" /* REGISTRATION_CLOSED */;
  }
  return "REGISTRATION_OPEN" /* REGISTRATION_OPEN */;
}
function getInitialSubmissionRoute(roles) {
  const origin = getUserHierarchyOrigin(roles) || "FACULTY";
  if (origin === "DSW") {
    return {
      origin: "DSW",
      status: "APPROVED_BY_DSW" /* APPROVED_BY_DSW */,
      level: "NONE" /* NONE */
    };
  }
  if (origin === "HOS") {
    return {
      origin: "HOS",
      status: "PENDING_DSW_APPROVAL" /* PENDING_DSW_APPROVAL */,
      level: "DSW" /* DSW */
    };
  }
  if (origin === "HOD") {
    return {
      origin: "HOD",
      status: "PENDING_HOS_APPROVAL" /* PENDING_HOS_APPROVAL */,
      level: "HOS" /* HOS */
    };
  }
  return {
    origin: "FACULTY",
    status: "PENDING_HOD_APPROVAL" /* PENDING_HOD_APPROVAL */,
    level: "HOD" /* HOD */
  };
}
async function recordApprovalTransition(params) {
  const {
    competition,
    approverId,
    approverName,
    approverRole,
    approvalLevel,
    decision,
    previousStatus,
    newStatus,
    comments,
    actionLabel,
    currentApprovalLevel,
    returnedFromLevel
  } = params;
  const now = /* @__PURE__ */ new Date();
  competition.approvalAuditTrail.push({
    user: approverId,
    role: approverRole,
    action: actionLabel,
    previousStatus,
    newStatus,
    remarks: comments,
    timestamp: now
  });
  let proposal = await CompetitionProposal.findOne({ competitionId: competition._id });
  if (!proposal) {
    const proposalNumber = competition.proposalCode || `PROP-${(/* @__PURE__ */ new Date()).getFullYear()}-${competition._id.toString().slice(-6).toUpperCase()}`;
    proposal = await CompetitionProposal.create({
      proposalNumber,
      competitionId: competition._id,
      creatorId: competition.organizer,
      creatorRole: competition.creatorRoleAtSubmission || "FACULTY",
      schoolId: competition.organizingSchool,
      departmentId: competition.organizingDepartment,
      departmentName: competition.organizingDepartmentName,
      currentApprovalLevel,
      returnedFromLevel: returnedFromLevel ?? null,
      status: newStatus,
      submittedAt: decision === "SUBMITTED" ? now : void 0,
      publishedAt: decision === "PUBLISHED" ? now : void 0
    });
    competition.proposalId = proposal._id;
    competition.proposalCode = proposal.proposalNumber;
  } else {
    proposal.currentApprovalLevel = currentApprovalLevel;
    proposal.returnedFromLevel = returnedFromLevel !== void 0 ? returnedFromLevel : proposal.returnedFromLevel;
    proposal.status = newStatus;
    if (decision === "SUBMITTED" && !proposal.submittedAt) proposal.submittedAt = now;
    if (decision === "APPROVED" && approvalLevel === "HOD" /* HOD */) proposal.hodApprovedAt = now;
    if (decision === "APPROVED" && approvalLevel === "HOS" /* HOS */) proposal.hosApprovedAt = now;
    if (decision === "APPROVED" && approvalLevel === "DSW" /* DSW */) proposal.dswApprovedAt = now;
    if (decision === "PUBLISHED") proposal.publishedAt = now;
    await proposal.save();
  }
  await ApprovalHistory.create({
    competitionId: competition._id,
    proposalId: proposal._id,
    approverId,
    approverName,
    approverRole,
    approvalLevel,
    decision,
    comments,
    previousStatus,
    newStatus,
    timestamp: now
  });
}
var hierarchySynced = false;
async function ensureOrgHierarchySynced() {
  if (hierarchySynced) return;
  try {
    const schools = await School.find({ isActive: true });
    if (schools.length === 0) {
      hierarchySynced = true;
      return;
    }
    const defaultPassword = "ctu@12345";
    for (const school of schools) {
      for (let i = 0; i < (school.departments || []).length; i++) {
        const cleanName = school.departments[i].trim();
        if (!cleanName) continue;
        const existingByName = await Department.findOne({ school: school._id, name: cleanName });
        if (!existingByName) {
          const words = cleanName.split(/[\s&]+/).filter(Boolean);
          let candidateCode = words.length >= 2 ? words.map((w) => w[0]).join("").toUpperCase().slice(0, 8) : cleanName.replace(/[^A-Za-z0-9]/g, "").slice(0, 6).toUpperCase() || `DEPT${i + 1}`;
          let suffix = 2;
          while (await Department.findOne({ school: school._id, code: candidateCode })) {
            candidateCode = `${cleanName.replace(/[^A-Za-z0-9]/g, "").slice(0, 5).toUpperCase()}${suffix}`;
            suffix++;
          }
          await Department.create({
            name: cleanName,
            code: candidateCode,
            school: school._id,
            isActive: true
          });
        }
      }
      const coord = await User.findOne({
        school: school._id,
        roles: { $in: ["HOS" /* HOS */, "SCHOOL_COORDINATOR" /* SCHOOL_COORDINATOR */] },
        isActive: true
      });
      if (coord) {
        if (!coord.roles.includes("HOS" /* HOS */)) {
          coord.roles.push("HOS" /* HOS */);
          await coord.save();
        }
        if (!school.hos) {
          school.hos = coord._id;
          await school.save();
        }
      }
    }
    const soet = schools.find((s) => s.code === "SOET");
    const sms = schools.find((s) => s.code === "SMS");
    if (soet) {
      const cseDept = await Department.findOne({
        school: soet._id,
        name: "Computer Science & Engineering"
      });
      if (cseDept) {
        let hodCse = await User.findOne({ email: "hod.cse@ctuniversity.in" });
        if (!hodCse) {
          hodCse = await User.create({
            name: "Dr. Prabhpreet Singh (HOD CSE)",
            email: "hod.cse@ctuniversity.in",
            password: defaultPassword,
            roles: ["HOD" /* HOD */, "FACULTY" /* FACULTY */],
            school: soet._id,
            departmentId: cseDept._id,
            department: cseDept.name,
            designation: "Professor & Head of Department (CSE)",
            employeeId: "CTU-HOD-0101",
            phone: "+91 98141 11101",
            avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
            isActive: true
          });
        }
        if (!cseDept.hod) {
          cseDept.hod = hodCse._id;
          await cseDept.save();
        }
      }
      const aiDept = await Department.findOne({
        school: soet._id,
        name: "Artificial Intelligence & Data Science"
      });
      if (aiDept && !aiDept.hod) {
        let hodAi = await User.findOne({ email: "hod.ai@ctuniversity.in" });
        if (!hodAi) {
          hodAi = await User.create({
            name: "Dr. Harjot Kaur (HOD AI & DS)",
            email: "hod.ai@ctuniversity.in",
            password: defaultPassword,
            roles: ["HOD" /* HOD */, "FACULTY" /* FACULTY */],
            school: soet._id,
            departmentId: aiDept._id,
            department: aiDept.name,
            designation: "Professor & Head of Department (AI & DS)",
            employeeId: "CTU-HOD-0102",
            phone: "+91 98141 11102",
            isActive: true
          });
        }
        aiDept.hod = hodAi._id;
        await aiDept.save();
      }
    }
    if (sms) {
      const mktDept = await Department.findOne({
        school: sms._id,
        name: "Marketing & Finance"
      });
      if (mktDept && !mktDept.hod) {
        let hodSms = await User.findOne({ email: "hod.sms@ctuniversity.in" });
        if (!hodSms) {
          hodSms = await User.create({
            name: "Dr. Gagandeep Singh (HOD Marketing)",
            email: "hod.sms@ctuniversity.in",
            password: defaultPassword,
            roles: ["HOD" /* HOD */, "FACULTY" /* FACULTY */],
            school: sms._id,
            departmentId: mktDept._id,
            department: mktDept.name,
            designation: "Professor & Head of Department (Marketing & Finance)",
            employeeId: "CTU-HOD-0201",
            phone: "+91 98141 11201",
            isActive: true
          });
        }
        mktDept.hod = hodSms._id;
        await mktDept.save();
      }
    }
    const usersMissingDeptId = await User.find({
      school: { $exists: true, $ne: null },
      department: { $exists: true, $ne: "" },
      departmentId: { $exists: false }
    });
    for (const u of usersMissingDeptId) {
      const matchingDept = await Department.findOne({
        school: u.school,
        name: u.department
      });
      if (matchingDept) {
        u.departmentId = matchingDept._id;
        await u.save();
      }
    }
    await Competition.updateMany(
      {
        status: { $in: ["SUBMITTED" /* SUBMITTED */, "UNDER_REVIEW" /* UNDER_REVIEW */, "RESUBMITTED" /* RESUBMITTED */] },
        currentApprovalLevel: "NONE" /* NONE */
      },
      {
        $set: {
          currentApprovalLevel: "DSW" /* DSW */,
          status: "PENDING_DSW_APPROVAL" /* PENDING_DSW_APPROVAL */
        }
      }
    );
    hierarchySynced = true;
  } catch (err) {
    console.error("Failed to sync org hierarchy:", err);
  }
}

// src/routes/authRoutes.ts
init_User();
init_School();
import { Router } from "express";
import jwt2 from "jsonwebtoken";

// src/middleware/auth.ts
import jwt from "jsonwebtoken";
init_User();
var authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ success: false, message: "Authentication required. No token provided." });
      return;
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user || !user.isActive) {
      res.status(401).json({ success: false, message: "User account is inactive or not found." });
      return;
    }
    req.user = user;
    req.userId = user._id.toString();
    req.userRoles = user.roles;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid or expired authentication token." });
  }
};
var authenticateOptional = async (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, ENV.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");
      if (user && user.isActive) {
        req.user = user;
        req.userId = user._id.toString();
        req.userRoles = user.roles;
      }
    }
  } catch {
  }
  next();
};

// src/routes/authRoutes.ts
init_enums();

// src/services/auditService.ts
import mongoose20 from "mongoose";
var logAudit = async (options) => {
  try {
    await AuditLog.create({
      user: options.user ? new mongoose20.Types.ObjectId(options.user) : void 0,
      userName: options.userName,
      role: options.role,
      action: options.action,
      resourceType: options.resourceType,
      resourceId: options.resourceId,
      previousState: options.previousState,
      newState: options.newState,
      remarks: options.remarks,
      ipAddress: options.ipAddress,
      userAgent: options.userAgent
    });
  } catch (error) {
    console.error("Failed to write audit log:", error);
  }
};

// src/routes/authRoutes.ts
var router = Router();
var generateTokens = (user) => {
  const token = jwt2.sign(
    { id: user._id, roles: user.roles, email: user.email },
    ENV.JWT_SECRET,
    { expiresIn: "7d" }
  );
  const refreshToken = jwt2.sign(
    { id: user._id },
    ENV.JWT_REFRESH_SECRET,
    { expiresIn: "30d" }
  );
  return { token, refreshToken };
};
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ success: false, message: "Email and password are required." });
      return;
    }
    const user = await User.findOne({ email: email.toLowerCase().trim() }).populate("school").populate("departmentId");
    if (!user) {
      res.status(401).json({ success: false, message: "Invalid email or password." });
      return;
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ success: false, message: "Invalid email or password." });
      return;
    }
    if (!user.isActive) {
      res.status(403).json({ success: false, message: "This account has been deactivated. Please contact DSW." });
      return;
    }
    const tokens = generateTokens(user);
    await logAudit({
      user: user._id,
      userName: user.name,
      role: user.roles[0],
      action: "USER_LOGIN",
      resourceType: "AUTH",
      resourceId: user._id.toString(),
      ipAddress: req.ip,
      userAgent: req.get("user-agent")
    });
    res.json({
      success: true,
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          roles: user.roles,
          school: user.school,
          departmentId: user.departmentId,
          department: user.department,
          programme: user.programme,
          semester: user.semester,
          registrationNumber: user.registrationNumber,
          employeeId: user.employeeId,
          designation: user.designation,
          avatarUrl: user.avatarUrl
        },
        ...tokens
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, schoolId, department, programme, semester, registrationNumber, phone } = req.body;
    if (!name || !email || !password || !schoolId) {
      res.status(400).json({ success: false, message: "Name, email, password, and school are required." });
      return;
    }
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      res.status(409).json({ success: false, message: "A user with this email address already exists." });
      return;
    }
    const school = await School.findById(schoolId);
    if (!school) {
      res.status(400).json({ success: false, message: "Invalid school selected." });
      return;
    }
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      roles: ["STUDENT" /* STUDENT */],
      school: school._id,
      department: department?.trim(),
      programme: programme?.trim(),
      semester: semester ? Number(semester) : 1,
      registrationNumber: registrationNumber?.trim() || `CTU-${Date.now().toString().slice(-6)}`,
      phone: phone?.trim(),
      isActive: true
    });
    await user.save();
    const tokens = generateTokens(user);
    res.status(201).json({
      success: true,
      message: "Student account created successfully.",
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          roles: user.roles,
          school,
          department: user.department,
          programme: user.programme,
          semester: user.semester,
          registrationNumber: user.registrationNumber
        },
        ...tokens
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router.get("/me", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("school").populate("departmentId").select("-password");
    if (!user) {
      res.status(404).json({ success: false, message: "User not found." });
      return;
    }
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router.post("/switch-demo-role", async (req, res) => {
  try {
    const { role } = req.body;
    if (!role || !Object.values(UserRole).includes(role)) {
      res.status(400).json({ success: false, message: "Valid role is required." });
      return;
    }
    let user = await User.findOne({ "roles.0": role, isActive: true }).populate("school").populate("departmentId");
    if (!user) {
      user = await User.findOne({ roles: role, isActive: true }).populate("school").populate("departmentId");
    }
    if (!user) {
      res.status(404).json({ success: false, message: `No demo user found for role: ${role}` });
      return;
    }
    const tokens = generateTokens(user);
    res.json({
      success: true,
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          roles: user.roles,
          school: user.school,
          departmentId: user.departmentId,
          department: user.department,
          programme: user.programme,
          semester: user.semester,
          registrationNumber: user.registrationNumber,
          employeeId: user.employeeId,
          designation: user.designation,
          avatarUrl: user.avatarUrl
        },
        ...tokens
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
var authRoutes_default = router;

// src/routes/schoolRoutes.ts
init_School();
init_User();
import { Router as Router2 } from "express";
init_enums();
var router2 = Router2();
router2.get("/", async (req, res) => {
  try {
    const schools = await School.find({ isActive: true }).populate("culturalCoordinator", "name email designation phone avatarUrl").sort({ name: 1 });
    res.json({ success: true, data: schools });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router2.get("/:id", async (req, res) => {
  try {
    const school = await School.findById(req.params.id).populate("culturalCoordinator", "name email designation phone avatarUrl").populate("coordinatorHistory.coordinator", "name email designation").populate("coordinatorHistory.appointedBy", "name email");
    if (!school) {
      res.status(404).json({ success: false, message: "School not found." });
      return;
    }
    res.json({ success: true, data: school });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router2.get("/:id/faculty", authenticate, async (req, res) => {
  try {
    const faculty = await User.find({
      school: req.params.id,
      roles: { $in: ["FACULTY" /* FACULTY */, "CULTURAL_COORDINATOR" /* CULTURAL_COORDINATOR */, "SCHOOL_COORDINATOR" /* SCHOOL_COORDINATOR */] },
      isActive: true
    }).select("name email designation department phone employeeId avatarUrl roles");
    res.json({ success: true, data: faculty });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router2.get("/:id/analytics", authenticate, async (req, res) => {
  try {
    const schoolId = req.params.id;
    const competitionsCount = await Competition.countDocuments({ organizingSchool: schoolId });
    const approvedCompetitions = await Competition.countDocuments({
      organizingSchool: schoolId,
      status: { $in: ["APPROVED", "PUBLISHED", "REGISTRATION_OPEN", "IN_PROGRESS", "COMPLETED"] }
    });
    const pendingCompetitions = await Competition.countDocuments({
      organizingSchool: schoolId,
      status: { $in: ["SUBMITTED", "UNDER_REVIEW", "REVISION_REQUIRED"] }
    });
    const registrationsCount = await Registration.countDocuments({ school: schoolId });
    const facultyCount = await User.countDocuments({ school: schoolId, roles: "FACULTY" /* FACULTY */ });
    const competitions = await Competition.find({ organizingSchool: schoolId }).select("_id");
    const compIds = competitions.map((c) => c._id);
    const totalDuties = await FacultyDuty.countDocuments({ competitionId: { $in: compIds } });
    const completedDuties = await FacultyDuty.countDocuments({
      competitionId: { $in: compIds },
      status: { $in: ["COMPLETED", "VERIFIED"] }
    });
    res.json({
      success: true,
      data: {
        competitionsCount,
        approvedCompetitions,
        pendingCompetitions,
        registrationsCount,
        facultyCount,
        totalDuties,
        completedDuties,
        dutyCompletionRate: totalDuties > 0 ? Math.round(completedDuties / totalDuties * 100) : 100
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router2.post(
  "/",
  authenticate,
  requireRoles("DSW_ADMIN" /* DSW_ADMIN */, "SUPER_ADMIN" /* SUPER_ADMIN */),
  async (req, res) => {
    try {
      const { name, code, description, departments, programmes, deanName, contactEmail } = req.body;
      if (!name || !code) {
        res.status(400).json({ success: false, message: "Name and unique school code are required." });
        return;
      }
      const school = new School({
        name: name.trim(),
        code: code.trim().toUpperCase(),
        description: description?.trim(),
        departments: departments || [],
        programmes: programmes || [],
        deanName: deanName?.trim(),
        contactEmail: contactEmail?.trim(),
        isActive: true
      });
      await school.save();
      await logAudit({
        user: req.user._id,
        userName: req.user.name,
        role: req.user.roles[0],
        action: "CREATE_SCHOOL",
        resourceType: "SCHOOL",
        resourceId: school._id.toString(),
        newState: school.toObject(),
        ipAddress: req.ip
      });
      res.status(201).json({ success: true, message: "School created successfully.", data: school });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);
router2.put(
  "/:id",
  authenticate,
  requireRoles("DSW_ADMIN" /* DSW_ADMIN */, "SUPER_ADMIN" /* SUPER_ADMIN */),
  async (req, res) => {
    try {
      const school = await School.findById(req.params.id);
      if (!school) {
        res.status(404).json({ success: false, message: "School not found." });
        return;
      }
      const previousState = school.toObject();
      const allowedUpdates = ["name", "code", "description", "departments", "programmes", "deanName", "contactEmail", "isActive"];
      allowedUpdates.forEach((field) => {
        if (req.body[field] !== void 0) {
          school[field] = req.body[field];
        }
      });
      await school.save();
      await logAudit({
        user: req.user._id,
        userName: req.user.name,
        role: req.user.roles[0],
        action: "UPDATE_SCHOOL",
        resourceType: "SCHOOL",
        resourceId: school._id.toString(),
        previousState,
        newState: school.toObject(),
        ipAddress: req.ip
      });
      res.json({ success: true, message: "School updated successfully.", data: school });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);
var schoolRoutes_default = router2;

// src/routes/departmentRoutes.ts
init_Department();
import { Router as Router3 } from "express";
var router3 = Router3();
router3.get("/", async (req, res) => {
  try {
    const filter = { isActive: true };
    if (req.query.schoolId && req.query.schoolId !== "undefined") {
      filter.school = req.query.schoolId;
    }
    const departments = await Department.find(filter).populate("school", "name code").populate("hod", "name email designation").sort({ name: 1 });
    res.json({ success: true, data: departments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
var departmentRoutes_default = router3;

// src/routes/coordinatorRoutes.ts
init_School();
init_User();
import { Router as Router4 } from "express";
init_enums();

// src/services/notificationService.ts
import mongoose21 from "mongoose";
var sendNotification = async (options) => {
  try {
    await Notification.create({
      recipient: new mongoose21.Types.ObjectId(options.recipient),
      title: options.title,
      message: options.message,
      type: options.type || "INFO",
      actionUrl: options.actionUrl,
      metadata: options.metadata,
      isRead: false
    });
  } catch (error) {
    console.error("Failed to create notification:", error);
  }
};
var broadcastToUsers = async (recipientIds, title, message, type = "INFO", actionUrl, metadata) => {
  try {
    const uniqueIds = Array.from(
      new Set(recipientIds.filter(Boolean).map((id) => id.toString()))
    );
    if (uniqueIds.length === 0) return;
    const docs = uniqueIds.map((id) => ({
      recipient: new mongoose21.Types.ObjectId(id),
      title,
      message,
      type,
      actionUrl,
      metadata,
      isRead: false
    }));
    await Notification.insertMany(docs);
  } catch (error) {
    console.error("Failed to broadcast notifications to users:", error);
  }
};
var broadcastToRoles = async (roles, title, message, actionUrl, type = "INFO", metadata) => {
  try {
    const { User: User2 } = await Promise.resolve().then(() => (init_User(), User_exports));
    const users = await User2.find({ roles: { $in: roles }, isActive: true }).select("_id");
    await broadcastToUsers(
      users.map((u) => u._id),
      title,
      message,
      type,
      actionUrl,
      metadata
    );
  } catch (error) {
    console.error("Failed to broadcast notifications:", error);
  }
};
var notifyDepartmentHods = async (departmentId, schoolId, title, message, actionUrl, type = "INFO") => {
  try {
    const { User: User2 } = await Promise.resolve().then(() => (init_User(), User_exports));
    const { Department: Department2 } = await Promise.resolve().then(() => (init_Department(), Department_exports));
    const recipientIds = [];
    if (departmentId) {
      const dept = await Department2.findById(departmentId).select("hod");
      if (dept?.hod) recipientIds.push(dept.hod.toString());
      const deptHods = await User2.find({
        departmentId,
        roles: "HOD",
        isActive: true
      }).select("_id");
      deptHods.forEach((u) => recipientIds.push(u._id.toString()));
    }
    if (recipientIds.length === 0 && schoolId) {
      const fallbackHods = await User2.find({
        school: schoolId,
        roles: "HOD",
        isActive: true
      }).select("_id");
      fallbackHods.forEach((u) => recipientIds.push(u._id.toString()));
    }
    await broadcastToUsers(recipientIds, title, message, type, actionUrl);
  } catch (error) {
    console.error("Failed to notify department HODs:", error);
  }
};
var notifySchoolHos = async (schoolId, title, message, actionUrl, type = "INFO") => {
  try {
    if (!schoolId) return;
    const { User: User2 } = await Promise.resolve().then(() => (init_User(), User_exports));
    const { School: School2 } = await Promise.resolve().then(() => (init_School(), School_exports));
    const recipientIds = [];
    const school = await School2.findById(schoolId).select("hos");
    if (school?.hos) recipientIds.push(school.hos.toString());
    const hosUsers = await User2.find({
      school: schoolId,
      roles: { $in: ["HOS", "SCHOOL_COORDINATOR"] },
      isActive: true
    }).select("_id");
    hosUsers.forEach((u) => recipientIds.push(u._id.toString()));
    await broadcastToUsers(recipientIds, title, message, type, actionUrl);
  } catch (error) {
    console.error("Failed to notify school HOS:", error);
  }
};

// src/routes/coordinatorRoutes.ts
var router4 = Router4();
router4.get(
  "/",
  authenticate,
  requireRoles("DSW_ADMIN" /* DSW_ADMIN */, "SUPER_ADMIN" /* SUPER_ADMIN */, "SCHOOL_COORDINATOR" /* SCHOOL_COORDINATOR */, "CULTURAL_COORDINATOR" /* CULTURAL_COORDINATOR */),
  async (req, res) => {
    try {
      const schools = await School.find({ isActive: true }).populate("culturalCoordinator", "name email designation department phone employeeId avatarUrl").select("name code culturalCoordinator departments deanName");
      const assignments = await CulturalCoordinatorAssignment.find({ isActive: true }).populate("schoolId", "name code").populate("coordinatorId", "name email designation phone department avatarUrl").populate("appointedBy", "name email");
      res.json({
        success: true,
        data: {
          schools,
          activeAssignments: assignments
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);
router4.post(
  "/assign",
  authenticate,
  requireRoles("DSW_ADMIN" /* DSW_ADMIN */, "SUPER_ADMIN" /* SUPER_ADMIN */),
  async (req, res) => {
    try {
      const { schoolId, coordinatorUserId, responsibilities, handoverNotes } = req.body;
      if (!schoolId || !coordinatorUserId) {
        res.status(400).json({ success: false, message: "School ID and Coordinator User ID are required." });
        return;
      }
      const school = await School.findById(schoolId);
      if (!school) {
        res.status(404).json({ success: false, message: "School not found." });
        return;
      }
      const user = await User.findById(coordinatorUserId);
      if (!user) {
        res.status(404).json({ success: false, message: "Faculty user not found." });
        return;
      }
      if (!user.roles.includes("CULTURAL_COORDINATOR" /* CULTURAL_COORDINATOR */)) {
        user.roles.push("CULTURAL_COORDINATOR" /* CULTURAL_COORDINATOR */);
        await user.save();
      }
      if (school.culturalCoordinator) {
        await CulturalCoordinatorAssignment.updateMany(
          { schoolId: school._id, coordinatorId: school.culturalCoordinator, isActive: true },
          { isActive: false, termEnd: /* @__PURE__ */ new Date(), handoverNotes }
        );
        const activeHistoryIndex = school.coordinatorHistory.findIndex(
          (h) => h.coordinator.toString() === school.culturalCoordinator.toString() && !h.removedAt
        );
        if (activeHistoryIndex !== -1) {
          school.coordinatorHistory[activeHistoryIndex].removedAt = /* @__PURE__ */ new Date();
          school.coordinatorHistory[activeHistoryIndex].remarks = handoverNotes || "Replaced by DSW";
        }
      }
      school.culturalCoordinator = user._id;
      school.coordinatorHistory.push({
        coordinator: user._id,
        appointedAt: /* @__PURE__ */ new Date(),
        appointedBy: req.user._id,
        remarks: handoverNotes || "Appointed as Cultural Coordinator"
      });
      await school.save();
      const assignment = new CulturalCoordinatorAssignment({
        schoolId: school._id,
        coordinatorId: user._id,
        appointedBy: req.user._id,
        termStart: /* @__PURE__ */ new Date(),
        isActive: true,
        responsibilities: responsibilities || [
          "Coordinate school-level competitions",
          "Monitor student registrations & eligibility",
          "Coordinate faculty duty distribution",
          "Review competition operational requirements",
          "Assist in university cultural festivals & DSW liaison"
        ],
        handoverNotes
      });
      await assignment.save();
      await logAudit({
        user: req.user._id,
        userName: req.user.name,
        role: req.user.roles[0],
        action: "APPOINT_CULTURAL_COORDINATOR",
        resourceType: "COORDINATOR_ASSIGNMENT",
        resourceId: assignment._id.toString(),
        newState: { school: school.name, coordinator: user.name },
        ipAddress: req.ip
      });
      await sendNotification({
        recipient: user._id,
        title: "Appointed as School Cultural Coordinator",
        message: `You have been appointed as Cultural Coordinator for ${school.name} by DSW.`,
        type: "SUCCESS",
        actionUrl: "/cultural-coordinator/dashboard"
      });
      res.status(200).json({
        success: true,
        message: `Successfully appointed ${user.name} as Cultural Coordinator for ${school.name}.`,
        data: { school, assignment }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);
router4.post(
  "/remove",
  authenticate,
  requireRoles("DSW_ADMIN" /* DSW_ADMIN */, "SUPER_ADMIN" /* SUPER_ADMIN */),
  async (req, res) => {
    try {
      const { schoolId, remarks } = req.body;
      const school = await School.findById(schoolId);
      if (!school || !school.culturalCoordinator) {
        res.status(404).json({ success: false, message: "No active coordinator found for this school." });
        return;
      }
      const prevCoordinatorId = school.culturalCoordinator;
      await CulturalCoordinatorAssignment.updateMany(
        { schoolId: school._id, coordinatorId: prevCoordinatorId, isActive: true },
        { isActive: false, termEnd: /* @__PURE__ */ new Date(), handoverNotes: remarks }
      );
      const activeHist = school.coordinatorHistory.find(
        (h) => h.coordinator.toString() === prevCoordinatorId.toString() && !h.removedAt
      );
      if (activeHist) {
        activeHist.removedAt = /* @__PURE__ */ new Date();
        activeHist.remarks = remarks || "Relieved by DSW";
      }
      school.culturalCoordinator = void 0;
      await school.save();
      await logAudit({
        user: req.user._id,
        userName: req.user.name,
        role: req.user.roles[0],
        action: "REMOVE_CULTURAL_COORDINATOR",
        resourceType: "COORDINATOR_ASSIGNMENT",
        resourceId: school._id.toString(),
        remarks,
        ipAddress: req.ip
      });
      res.json({ success: true, message: "Cultural coordinator relieved successfully." });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);
router4.get(
  "/my-overview",
  authenticate,
  requireRoles("CULTURAL_COORDINATOR" /* CULTURAL_COORDINATOR */, "SCHOOL_COORDINATOR" /* SCHOOL_COORDINATOR */, "DSW_ADMIN" /* DSW_ADMIN */),
  async (req, res) => {
    try {
      const userSchoolId = req.user?.school;
      if (!userSchoolId) {
        res.status(400).json({ success: false, message: "No school associated with your account." });
        return;
      }
      const school = await School.findById(userSchoolId);
      const competitions = await Competition.find({ organizingSchool: userSchoolId }).sort({ createdAt: -1 });
      const upcomingCount = competitions.filter(
        (c) => ["APPROVED", "PUBLISHED", "REGISTRATION_OPEN"].includes(c.status)
      ).length;
      const inProgressCount = competitions.filter((c) => c.status === "IN_PROGRESS").length;
      const completedCount = competitions.filter((c) => c.status === "COMPLETED").length;
      res.json({
        success: true,
        data: {
          school,
          totalCompetitions: competitions.length,
          upcomingCount,
          inProgressCount,
          completedCount,
          competitions
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);
var coordinatorRoutes_default = router4;

// src/routes/competitionRoutes.ts
import { Router as Router5 } from "express";
init_Department();
init_enums();
var router5 = Router5();
var cleanParam = (val) => {
  if (typeof val !== "string") return void 0;
  const trimmed = val.trim();
  if (!trimmed || trimmed === "undefined" || trimmed === "null") return void 0;
  return trimmed;
};
var sanitizeForStudentOrPublic = (compDoc) => {
  const obj = typeof compDoc.toObject === "function" ? compDoc.toObject() : { ...compDoc };
  const effectiveStatus = computeEffectiveStatus(obj);
  const remainingSeats = Math.max(0, (obj.maxRegistrations || 0) - (obj.currentRegistrationsCount || 0));
  const percentageFilled = obj.maxRegistrations > 0 ? Math.min(100, Math.round((obj.currentRegistrationsCount || 0) / obj.maxRegistrations * 100)) : 0;
  delete obj.approvalAuditTrail;
  delete obj.hodRemarks;
  delete obj.hosRemarks;
  delete obj.dswRemarks;
  delete obj.hodApproval;
  delete obj.hosApproval;
  delete obj.dswApproval;
  delete obj.rejectionReason;
  delete obj.revisionNotes;
  delete obj.submissionRemarks;
  delete obj.budgetProposal;
  return {
    ...obj,
    status: effectiveStatus,
    effectiveRegistrationStatus: effectiveStatus,
    remainingSeats,
    percentageFilled
  };
};
var notifyTargetLevelApprovers = async (level, competition, title, message) => {
  if (level === "HOD" /* HOD */) {
    await notifyDepartmentHods(
      competition.organizingDepartment,
      competition.organizingSchool,
      title,
      message,
      "/hod/dashboard",
      "INFO"
    );
  } else if (level === "HOS" /* HOS */) {
    await notifySchoolHos(
      competition.organizingSchool,
      title,
      message,
      "/hos/dashboard",
      "INFO"
    );
  } else if (level === "DSW" /* DSW */) {
    await broadcastToRoles(
      ["DSW_ADMIN" /* DSW_ADMIN */, "SUPER_ADMIN" /* SUPER_ADMIN */],
      title,
      message,
      "/dsw/approval-queue",
      "INFO"
    );
  }
};
router5.get("/public", async (req, res) => {
  try {
    const category = cleanParam(req.query.category);
    const scope = cleanParam(req.query.scope);
    const schoolId = cleanParam(req.query.schoolId);
    const search = cleanParam(req.query.search);
    const status = cleanParam(req.query.status);
    const filter = {
      isPublished: true,
      status: {
        $in: [
          "PUBLISHED" /* PUBLISHED */,
          "REGISTRATION_OPEN" /* REGISTRATION_OPEN */,
          "REGISTRATION_CLOSED" /* REGISTRATION_CLOSED */,
          "IN_PROGRESS" /* IN_PROGRESS */,
          "COMPLETED" /* COMPLETED */
        ]
      }
    };
    if (category) filter.category = category;
    if (scope) filter.scope = scope;
    if (schoolId) filter.organizingSchool = schoolId;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { code: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }
    const competitions = await Competition.find(filter).populate("organizingSchool", "name code").populate("organizingDepartment", "name code").populate("organizer", "name email").populate("facultyCoordinator", "name email designation").sort({ proposedDate: 1 });
    let data = competitions.map((c) => sanitizeForStudentOrPublic(c));
    if (status) {
      data = data.filter((c) => c.effectiveRegistrationStatus === status);
    }
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router5.get(
  "/student-feed",
  authenticate,
  requireRoles("STUDENT" /* STUDENT */, "VOLUNTEER" /* VOLUNTEER */, "DSW_ADMIN" /* DSW_ADMIN */, "SUPER_ADMIN" /* SUPER_ADMIN */),
  async (req, res) => {
    try {
      const category = cleanParam(req.query.category);
      const search = cleanParam(req.query.search);
      const filter = {
        isPublished: true,
        status: {
          $in: [
            "PUBLISHED" /* PUBLISHED */,
            "REGISTRATION_OPEN" /* REGISTRATION_OPEN */,
            "REGISTRATION_CLOSED" /* REGISTRATION_CLOSED */,
            "IN_PROGRESS" /* IN_PROGRESS */,
            "COMPLETED" /* COMPLETED */
          ]
        }
      };
      if (category) filter.category = category;
      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: "i" } },
          { code: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } }
        ];
      }
      const [competitions, myRegs] = await Promise.all([
        Competition.find(filter).populate("organizingSchool", "name code").populate("organizingDepartment", "name code").populate("organizer", "name email").populate("facultyCoordinator", "name email designation").sort({ proposedDate: 1 }),
        Registration.find({
          userId: req.user._id,
          status: { $ne: "CANCELLED" /* CANCELLED */ }
        }).select("competitionId status registrationNumber")
      ]);
      const regMap = /* @__PURE__ */ new Map();
      myRegs.forEach((r) => regMap.set(r.competitionId.toString(), r));
      const now = /* @__PURE__ */ new Date();
      const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1e3);
      const enriched = competitions.map((comp) => {
        const sanitized = sanitizeForStudentOrPublic(comp);
        let isEligible = true;
        if (comp.eligibleSchools?.length > 0) {
          const userSchool = req.user?.school?.toString();
          if (!userSchool || !comp.eligibleSchools.some((s) => s.toString() === userSchool)) {
            isEligible = false;
          }
        }
        if (isEligible && comp.eligibleProgrammes?.length > 0 && req.user?.programme) {
          if (!comp.eligibleProgrammes.includes(req.user.programme)) {
            isEligible = false;
          }
        }
        if (isEligible && comp.eligibleSemesters?.length > 0 && req.user?.semester) {
          if (!comp.eligibleSemesters.includes(req.user.semester)) {
            isEligible = false;
          }
        }
        const existingReg = regMap.get(comp._id.toString());
        return {
          ...sanitized,
          isEligible,
          isAlreadyRegistered: Boolean(existingReg),
          myRegistration: existingReg || null
        };
      });
      const sections = {
        all: enriched,
        upcoming: enriched.filter(
          (c) => c.effectiveRegistrationStatus === "PUBLISHED" /* PUBLISHED */ || c.proposedDate && new Date(c.proposedDate) > now && c.effectiveRegistrationStatus !== "COMPLETED" /* COMPLETED */
        ),
        openForRegistration: enriched.filter(
          (c) => c.effectiveRegistrationStatus === "REGISTRATION_OPEN" /* REGISTRATION_OPEN */
        ),
        closingSoon: enriched.filter(
          (c) => c.effectiveRegistrationStatus === "REGISTRATION_OPEN" /* REGISTRATION_OPEN */ && c.registrationCloseDate && new Date(c.registrationCloseDate) <= sevenDaysFromNow && new Date(c.registrationCloseDate) >= now
        ),
        registrationClosed: enriched.filter(
          (c) => c.effectiveRegistrationStatus === "REGISTRATION_CLOSED" /* REGISTRATION_CLOSED */
        ),
        completed: enriched.filter(
          (c) => c.effectiveRegistrationStatus === "COMPLETED" /* COMPLETED */
        )
      };
      res.json({ success: true, data: sections });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);
router5.get("/", authenticate, async (req, res) => {
  try {
    const roles = req.userRoles || [];
    const isStaff = isDswRole(roles) || isHosRole(roles) || isHodRole(roles) || roles.includes("FACULTY" /* FACULTY */) || roles.includes("CULTURAL_COORDINATOR" /* CULTURAL_COORDINATOR */) || roles.includes("COMPETITION_ORGANIZER" /* COMPETITION_ORGANIZER */) || roles.includes("JUDGE" /* JUDGE */);
    if (!isStaff) {
      res.status(403).json({
        success: false,
        message: "Students cannot access internal proposal queues. Use /api/competitions/student-feed."
      });
      return;
    }
    const category = cleanParam(req.query.category);
    const scope = cleanParam(req.query.scope);
    const schoolId = cleanParam(req.query.schoolId);
    const departmentId = cleanParam(req.query.departmentId);
    const status = cleanParam(req.query.status);
    const approvalLevel = cleanParam(req.query.approvalLevel);
    const queue = cleanParam(req.query.queue);
    const search = cleanParam(req.query.search);
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 50;
    const andConditions = [];
    if (isDswRole(roles)) {
      if (schoolId) andConditions.push({ organizingSchool: schoolId });
      if (departmentId) andConditions.push({ organizingDepartment: departmentId });
      if (queue === "pending") {
        andConditions.push({
          $or: [
            { currentApprovalLevel: "DSW" /* DSW */ },
            {
              status: {
                $in: [
                  "PENDING_DSW_APPROVAL" /* PENDING_DSW_APPROVAL */,
                  "SUBMITTED" /* SUBMITTED */,
                  "UNDER_REVIEW" /* UNDER_REVIEW */,
                  "RESUBMITTED" /* RESUBMITTED */
                ]
              }
            }
          ]
        });
      }
    } else if (isHosRole(roles)) {
      const userSchoolId = req.user?.school;
      if (userSchoolId) {
        andConditions.push({
          $or: [
            { organizingSchool: userSchoolId },
            { coOrganizingSchools: userSchoolId },
            { organizer: req.user._id }
          ]
        });
      } else {
        andConditions.push({ organizer: req.user._id });
      }
      if (queue === "pending") {
        andConditions.push({
          $or: [
            { currentApprovalLevel: "HOS" /* HOS */ },
            { status: "PENDING_HOS_APPROVAL" /* PENDING_HOS_APPROVAL */ }
          ]
        });
      }
    } else if (isHodRole(roles)) {
      const deptOr = [{ organizer: req.user._id }];
      if (req.user?.departmentId) {
        deptOr.push({ organizingDepartment: req.user.departmentId });
      }
      if (req.user?.department && req.user?.school) {
        deptOr.push({
          organizingSchool: req.user.school,
          organizingDepartmentName: req.user.department
        });
      }
      andConditions.push({ $or: deptOr });
      if (queue === "pending") {
        andConditions.push({
          $or: [
            { currentApprovalLevel: "HOD" /* HOD */ },
            { status: { $in: ["PENDING_HOD_APPROVAL" /* PENDING_HOD_APPROVAL */, "SUBMITTED_TO_HOD" /* SUBMITTED_TO_HOD */] } }
          ]
        });
      }
    } else if (roles.includes("JUDGE" /* JUDGE */) && !roles.includes("FACULTY" /* FACULTY */)) {
      andConditions.push({ isPublished: true });
    } else {
      andConditions.push({
        $or: [{ organizer: req.user._id }, { facultyCoordinator: req.user._id }]
      });
    }
    if (category) andConditions.push({ category });
    if (scope) andConditions.push({ scope });
    if (status) andConditions.push({ status });
    if (approvalLevel) andConditions.push({ currentApprovalLevel: approvalLevel });
    if (search) {
      andConditions.push({
        $or: [
          { title: { $regex: search, $options: "i" } },
          { code: { $regex: search, $options: "i" } },
          { proposalCode: { $regex: search, $options: "i" } }
        ]
      });
    }
    const filter = andConditions.length > 0 ? { $and: andConditions } : {};
    const skip = (page - 1) * limit;
    const [competitions, total] = await Promise.all([
      Competition.find(filter).populate("organizingSchool", "name code").populate("organizingDepartment", "name code").populate("coOrganizingSchools", "name code").populate("organizer", "name email designation roles department departmentId").populate("facultyCoordinator", "name email designation").populate("centralCoordinator", "name email").populate("approvalAuditTrail.user", "name email roles designation").sort({ updatedAt: -1 }).skip(skip).limit(limit),
      Competition.countDocuments(filter)
    ]);
    res.json({
      success: true,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: competitions
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router5.get("/:id", authenticateOptional, async (req, res) => {
  try {
    const competition = await Competition.findById(req.params.id).populate("organizingSchool", "name code description deanName").populate("organizingDepartment", "name code").populate("coOrganizingSchools", "name code").populate("eligibleSchools", "name code").populate("organizer", "name email phone designation roles department").populate("facultyCoordinator", "name email phone designation").populate("centralCoordinator", "name email phone designation").populate("hodApproval.approvedBy", "name email designation").populate("hosApproval.approvedBy", "name email designation").populate("dswApproval.approvedBy", "name email designation").populate("approvalAuditTrail.user", "name email roles designation");
    if (!competition) {
      res.status(404).json({ success: false, message: "Competition not found." });
      return;
    }
    const roles = req.userRoles || [];
    const isStaffViewer = Boolean(req.user) && (isDswRole(roles) || isHosRole(roles) || isHodRole(roles) || competition.organizer?._id?.toString() === req.user._id.toString() || competition.facultyCoordinator?._id?.toString() === req.user._id.toString());
    if (!competition.isPublished && !isStaffViewer) {
      res.status(403).json({
        success: false,
        message: "This competition has not been approved and published by DSW yet."
      });
      return;
    }
    if (!isStaffViewer) {
      res.json({ success: true, data: sanitizeForStudentOrPublic(competition) });
      return;
    }
    const obj = competition.toObject();
    const effectiveStatus = computeEffectiveStatus(competition);
    res.json({
      success: true,
      data: {
        ...obj,
        effectiveRegistrationStatus: effectiveStatus,
        remainingSeats: Math.max(0, (obj.maxRegistrations || 0) - (obj.currentRegistrationsCount || 0))
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router5.get("/:id/timeline", authenticate, async (req, res) => {
  try {
    const roles = req.userRoles || [];
    if (!isDswRole(roles) && !isHosRole(roles) && !isHodRole(roles) && !roles.includes("FACULTY" /* FACULTY */) && !roles.includes("CULTURAL_COORDINATOR" /* CULTURAL_COORDINATOR */)) {
      res.status(403).json({ success: false, message: "Students cannot inspect internal approval history." });
      return;
    }
    const [competition, proposal, history] = await Promise.all([
      Competition.findById(req.params.id).populate("organizingSchool", "name code").populate("organizingDepartment", "name code").populate("organizer", "name email designation"),
      CompetitionProposal.findOne({ competitionId: req.params.id }),
      ApprovalHistory.find({ competitionId: req.params.id }).sort({ timestamp: 1 })
    ]);
    if (!competition) {
      res.status(404).json({ success: false, message: "Competition not found." });
      return;
    }
    res.json({
      success: true,
      data: {
        competition,
        proposal,
        history: history.length > 0 ? history : competition.approvalAuditTrail
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router5.post(
  "/",
  authenticate,
  requireRoles(
    "FACULTY" /* FACULTY */,
    "HOD" /* HOD */,
    "HOS" /* HOS */,
    "SCHOOL_COORDINATOR" /* SCHOOL_COORDINATOR */,
    "CULTURAL_COORDINATOR" /* CULTURAL_COORDINATOR */,
    "COMPETITION_ORGANIZER" /* COMPETITION_ORGANIZER */,
    "DSW_ADMIN" /* DSW_ADMIN */,
    "SUPER_ADMIN" /* SUPER_ADMIN */
  ),
  async (req, res) => {
    try {
      const {
        title,
        code,
        description,
        category,
        competitionType,
        scope,
        organizingSchool,
        organizingDepartment,
        organizingDepartmentName,
        coOrganizingSchools,
        isCentralDSW,
        facultyCoordinator,
        bannerUrl,
        objectives,
        rulesAndRegulations,
        proposedDate,
        startDate,
        endDate,
        startTime,
        endTime,
        registrationOpenDate,
        registrationCloseDate,
        venue,
        venueType,
        onlinePlatformUrl,
        alternativeVenue,
        durationMinutes,
        reportingTime,
        rounds,
        participationType,
        minTeamSize,
        maxTeamSize,
        maxRegistrations,
        maxTeams,
        eligibleSchools,
        eligibleProgrammes,
        eligibleSemesters,
        eligibilityConditions,
        targetAudience,
        contactEmail,
        contactPhone,
        registrationFee,
        participantRequirements,
        requiredDocuments,
        supportingDocuments,
        customFields,
        requiredFacultyCount,
        requiredVolunteersCount,
        equipment,
        venueResources,
        budgetProposal,
        prizeDetails,
        sponsorshipInfo,
        submitForReview,
        submissionRemarks
      } = req.body;
      if (!title || !code || !proposedDate || !venue) {
        res.status(400).json({
          success: false,
          message: "Title, unique code, proposed date, and venue are mandatory."
        });
        return;
      }
      const existing = await Competition.findOne({ code: code.toUpperCase().trim() });
      if (existing) {
        res.status(409).json({ success: false, message: `Competition code ${code} is already in use.` });
        return;
      }
      const roles = req.userRoles || [];
      const isDsw = isDswRole(roles);
      const resolvedSchool = isCentralDSW ? void 0 : isDsw && organizingSchool ? organizingSchool : req.user?.school || organizingSchool;
      let resolvedDeptId = isDsw && organizingDepartment ? organizingDepartment : req.user?.departmentId;
      let resolvedDeptName = isDsw && organizingDepartmentName ? organizingDepartmentName : req.user?.department;
      if (!resolvedDeptId && resolvedSchool && resolvedDeptName) {
        const matchedDept = await Department.findOne({ school: resolvedSchool, name: resolvedDeptName });
        if (matchedDept) resolvedDeptId = matchedDept._id;
      } else if (resolvedDeptId && !resolvedDeptName) {
        const matchedDept = await Department.findById(resolvedDeptId);
        if (matchedDept) resolvedDeptName = matchedDept.name;
      }
      const route = getInitialSubmissionRoute(roles);
      const initialStatus = submitForReview ? route.status : "DRAFT" /* DRAFT */;
      const initialLevel = submitForReview ? route.level : "NONE" /* NONE */;
      const parsedBudget = typeof budgetProposal === "object" && budgetProposal !== null ? Number(budgetProposal.totalEstimatedBudget || budgetProposal.amount || 0) || 0 : Number(budgetProposal) || 0;
      const competition = new Competition({
        title: title.trim(),
        code: code.toUpperCase().trim(),
        description: description?.trim() || "Competition description",
        category: category || "TECHNICAL" /* TECHNICAL */,
        competitionType: competitionType?.trim() || category || "COMPETITION",
        scope: scope || "UNIVERSITY_LEVEL" /* UNIVERSITY_LEVEL */,
        organizingSchool: resolvedSchool,
        organizingDepartment: resolvedDeptId,
        organizingDepartmentName: resolvedDeptName,
        coOrganizingSchools: coOrganizingSchools || [],
        isCentralDSW: Boolean(isCentralDSW),
        organizer: req.user._id,
        facultyCoordinator: facultyCoordinator || req.user._id,
        targetAudience: targetAudience?.trim(),
        contactEmail: contactEmail?.trim() || req.user?.email,
        contactPhone: contactPhone?.trim() || req.user?.phone,
        supportingDocuments: supportingDocuments || [],
        bannerUrl: bannerUrl || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80",
        objectives: objectives?.trim(),
        rulesAndRegulations: rulesAndRegulations?.trim(),
        proposedDate: new Date(proposedDate),
        startDate: startDate ? new Date(startDate) : new Date(proposedDate),
        endDate: endDate ? new Date(endDate) : new Date(proposedDate),
        startTime: startTime || reportingTime || "09:00 AM",
        endTime: endTime || "05:00 PM",
        registrationOpenDate: registrationOpenDate ? new Date(registrationOpenDate) : void 0,
        registrationCloseDate: registrationCloseDate ? new Date(registrationCloseDate) : void 0,
        venue: venue.trim(),
        venueType: venueType || "CAMPUS",
        onlinePlatformUrl: onlinePlatformUrl?.trim(),
        alternativeVenue: alternativeVenue?.trim(),
        durationMinutes: durationMinutes ? Number(durationMinutes) : 180,
        reportingTime: reportingTime || startTime || "09:00 AM",
        rounds: rounds && rounds.length > 0 ? rounds : [{ roundNumber: 1, name: "Main Round", date: new Date(proposedDate), venue: venue.trim() }],
        participationType: participationType || "INDIVIDUAL",
        minTeamSize: minTeamSize ? Number(minTeamSize) : 1,
        maxTeamSize: maxTeamSize ? Number(maxTeamSize) : 1,
        maxRegistrations: maxRegistrations ? Number(maxRegistrations) : 100,
        maxTeams: maxTeams ? Number(maxTeams) : void 0,
        eligibleSchools: eligibleSchools || [],
        eligibleProgrammes: eligibleProgrammes || [],
        eligibleSemesters: eligibleSemesters || [],
        eligibilityConditions: eligibilityConditions?.trim(),
        registrationFee: registrationFee ? Number(registrationFee) : 0,
        participantRequirements: participantRequirements?.trim(),
        requiredDocuments: requiredDocuments || [],
        customFields: customFields || [],
        requiredFacultyCount: requiredFacultyCount ? Number(requiredFacultyCount) : 2,
        requiredVolunteersCount: requiredVolunteersCount ? Number(requiredVolunteersCount) : 5,
        equipment: equipment || [],
        venueResources: venueResources || [],
        budgetProposal: parsedBudget,
        prizeDetails: prizeDetails || {
          winner: "\u20B910,000 + Trophy + Certificate",
          firstRunnerUp: "\u20B95,000 + Trophy + Certificate",
          secondRunnerUp: "\u20B92,500 + Medal + Certificate"
        },
        sponsorshipInfo: sponsorshipInfo?.trim(),
        creatorRoleAtSubmission: route.origin,
        currentApprovalLevel: initialLevel,
        returnedFromLevel: null,
        status: initialStatus,
        isPublished: false,
        submissionRemarks: submissionRemarks?.trim(),
        dswApproval: submitForReview && route.origin === "DSW" ? {
          approvedBy: req.user._id,
          approvedAt: /* @__PURE__ */ new Date(),
          remarks: "Created and approved directly by DSW"
        } : void 0,
        approvalAuditTrail: []
      });
      const proposalNum = `PROP-${(/* @__PURE__ */ new Date()).getFullYear()}-${competition._id.toString().slice(-6).toUpperCase()}`;
      competition.proposalCode = proposalNum;
      await recordApprovalTransition({
        competition,
        approverId: req.user._id,
        approverName: req.user.name,
        approverRole: route.origin,
        approvalLevel: route.origin === "DSW" ? "DSW" /* DSW */ : "NONE" /* NONE */,
        decision: submitForReview ? "SUBMITTED" : "DRAFT_CREATED",
        previousStatus: "DRAFT" /* DRAFT */,
        newStatus: initialStatus,
        comments: submitForReview ? submissionRemarks || `Submitted by ${route.origin} (${req.user.name})` : "Draft saved",
        actionLabel: submitForReview ? `SUBMITTED_BY_${route.origin}` : "DRAFT_CREATED",
        currentApprovalLevel: initialLevel,
        returnedFromLevel: null
      });
      await competition.save();
      await CompetitionProposalVersion.create({
        competitionId: competition._id,
        versionNumber: 1,
        changesSummary: "Initial proposal creation",
        snapshotData: competition.toObject(),
        modifiedBy: req.user._id
      });
      await logAudit({
        user: req.user._id,
        userName: req.user.name,
        role: req.user.roles[0],
        action: "CREATE_COMPETITION_PROPOSAL",
        resourceType: "COMPETITION",
        resourceId: competition._id.toString(),
        newState: { status: initialStatus, level: initialLevel, origin: route.origin },
        ipAddress: req.ip
      });
      if (submitForReview && initialLevel !== "NONE" /* NONE */) {
        await notifyTargetLevelApprovers(
          initialLevel,
          competition,
          `New Proposal Awaiting ${initialLevel} Approval`,
          `"${competition.title}" (${competition.code}) submitted by ${req.user.name} requires ${initialLevel} review.`
        );
        await sendNotification({
          recipient: req.user._id,
          title: "Proposal Submitted Successfully",
          message: `Your proposal "${competition.title}" has been routed to ${initialLevel} for approval.`,
          type: "SUCCESS",
          actionUrl: `/competitions/${competition._id}`
        });
      }
      res.status(201).json({
        success: true,
        message: submitForReview ? route.origin === "DSW" ? "Competition created and DSW-approved. Ready to publish!" : `Proposal submitted and routed to ${initialLevel} for approval.` : "Draft proposal saved successfully.",
        data: competition
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);
router5.put("/:id", authenticate, async (req, res) => {
  try {
    const competition = await Competition.findById(req.params.id);
    if (!competition) {
      res.status(404).json({ success: false, message: "Competition not found." });
      return;
    }
    const isDSW = isDswRole(req.userRoles || []);
    const isOrganizer = competition.organizer.toString() === req.user._id.toString();
    if (!isDSW && !isOrganizer) {
      res.status(403).json({ success: false, message: "Only the proposal creator or DSW can edit this competition." });
      return;
    }
    const editableStatuses = [
      "DRAFT" /* DRAFT */,
      "CHANGES_REQUESTED" /* CHANGES_REQUESTED */,
      "REVISION_REQUIRED" /* REVISION_REQUIRED */
    ];
    if (!isDSW && !editableStatuses.includes(competition.status)) {
      res.status(400).json({
        success: false,
        message: `Cannot edit proposal while status is ${competition.status}.`
      });
      return;
    }
    const updatableFields = [
      "title",
      "description",
      "category",
      "competitionType",
      "scope",
      "organizingSchool",
      "organizingDepartment",
      "organizingDepartmentName",
      "coOrganizingSchools",
      "facultyCoordinator",
      "centralCoordinator",
      "bannerUrl",
      "objectives",
      "rulesAndRegulations",
      "proposedDate",
      "startDate",
      "endDate",
      "startTime",
      "endTime",
      "registrationOpenDate",
      "registrationCloseDate",
      "venue",
      "venueType",
      "onlinePlatformUrl",
      "alternativeVenue",
      "durationMinutes",
      "reportingTime",
      "rounds",
      "participationType",
      "minTeamSize",
      "maxTeamSize",
      "maxRegistrations",
      "maxTeams",
      "eligibleSchools",
      "eligibleProgrammes",
      "eligibleSemesters",
      "eligibilityConditions",
      "targetAudience",
      "contactEmail",
      "contactPhone",
      "registrationFee",
      "participantRequirements",
      "requiredDocuments",
      "supportingDocuments",
      "customFields",
      "requiredFacultyCount",
      "requiredVolunteersCount",
      "equipment",
      "venueResources",
      "budgetProposal",
      "prizeDetails",
      "sponsorshipInfo"
    ];
    updatableFields.forEach((field) => {
      if (req.body[field] !== void 0) {
        if (field === "budgetProposal") {
          competition.budgetProposal = typeof req.body.budgetProposal === "object" && req.body.budgetProposal !== null ? Number(req.body.budgetProposal.totalEstimatedBudget || req.body.budgetProposal.amount || 0) || 0 : Number(req.body.budgetProposal) || 0;
        } else {
          competition[field] = req.body[field];
        }
      }
    });
    const isResubmit = Boolean(req.body.resubmit) && ["CHANGES_REQUESTED" /* CHANGES_REQUESTED */, "REVISION_REQUIRED" /* REVISION_REQUIRED */].includes(competition.status);
    if (isResubmit) {
      const prevStatus = competition.status;
      const resumeLevel = req.body.materialScopeChange ? getInitialSubmissionRoute(req.userRoles || []).level : competition.returnedFromLevel || getInitialSubmissionRoute(req.userRoles || []).level;
      const statusByLevel = {
        ["HOD" /* HOD */]: "PENDING_HOD_APPROVAL" /* PENDING_HOD_APPROVAL */,
        ["HOS" /* HOS */]: "PENDING_HOS_APPROVAL" /* PENDING_HOS_APPROVAL */,
        ["DSW" /* DSW */]: "PENDING_DSW_APPROVAL" /* PENDING_DSW_APPROVAL */,
        ["NONE" /* NONE */]: "APPROVED_BY_DSW" /* APPROVED_BY_DSW */
      };
      const nextStatus = statusByLevel[resumeLevel];
      competition.status = nextStatus;
      competition.currentApprovalLevel = resumeLevel;
      competition.returnedFromLevel = null;
      await recordApprovalTransition({
        competition,
        approverId: req.user._id,
        approverName: req.user.name,
        approverRole: req.user.roles[0],
        approvalLevel: "NONE" /* NONE */,
        decision: "RESUBMITTED",
        previousStatus: prevStatus,
        newStatus: nextStatus,
        comments: req.body.resubmissionNotes || "Addressed requested modifications and resubmitted.",
        actionLabel: `RESUBMITTED_TO_${resumeLevel}`,
        currentApprovalLevel: resumeLevel,
        returnedFromLevel: null
      });
      await notifyTargetLevelApprovers(
        resumeLevel,
        competition,
        `Resubmitted Proposal Awaiting ${resumeLevel} Review`,
        `"${competition.title}" was updated by ${req.user.name} and resubmitted for ${resumeLevel} review.`
      );
    }
    await competition.save();
    const versionCount = await CompetitionProposalVersion.countDocuments({ competitionId: competition._id });
    await CompetitionProposalVersion.create({
      competitionId: competition._id,
      versionNumber: versionCount + 1,
      changesSummary: req.body.changesSummary || (isResubmit ? "Resubmitted after modifications" : "Updated proposal details"),
      snapshotData: competition.toObject(),
      modifiedBy: req.user._id
    });
    res.json({ success: true, message: isResubmit ? "Proposal resubmitted successfully." : "Competition updated successfully.", data: competition });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router5.post("/:id/submit", authenticate, async (req, res) => {
  try {
    const competition = await Competition.findById(req.params.id);
    if (!competition) {
      res.status(404).json({ success: false, message: "Competition not found." });
      return;
    }
    const isCreator = competition.organizer.toString() === req.user._id.toString();
    if (!isCreator && !isDswRole(req.userRoles || [])) {
      res.status(403).json({ success: false, message: "Only the proposal creator can submit this proposal." });
      return;
    }
    const submittable = [
      "DRAFT" /* DRAFT */,
      "CHANGES_REQUESTED" /* CHANGES_REQUESTED */,
      "REVISION_REQUIRED" /* REVISION_REQUIRED */
    ];
    if (!submittable.includes(competition.status)) {
      res.status(400).json({
        success: false,
        message: `Cannot submit proposal in ${competition.status} status.`
      });
      return;
    }
    const previousStatus = competition.status;
    const isResubmission = ["CHANGES_REQUESTED" /* CHANGES_REQUESTED */, "REVISION_REQUIRED" /* REVISION_REQUIRED */].includes(previousStatus);
    const route = getInitialSubmissionRoute(req.userRoles || []);
    const targetLevel = isResubmission && competition.returnedFromLevel ? competition.returnedFromLevel : route.level;
    const statusByLevel = {
      ["HOD" /* HOD */]: "PENDING_HOD_APPROVAL" /* PENDING_HOD_APPROVAL */,
      ["HOS" /* HOS */]: "PENDING_HOS_APPROVAL" /* PENDING_HOS_APPROVAL */,
      ["DSW" /* DSW */]: "PENDING_DSW_APPROVAL" /* PENDING_DSW_APPROVAL */,
      ["NONE" /* NONE */]: "APPROVED_BY_DSW" /* APPROVED_BY_DSW */
    };
    const newStatus = statusByLevel[targetLevel];
    competition.status = newStatus;
    competition.currentApprovalLevel = targetLevel;
    competition.returnedFromLevel = null;
    competition.submissionRemarks = req.body.remarks || competition.submissionRemarks || "Submitted for review";
    await recordApprovalTransition({
      competition,
      approverId: req.user._id,
      approverName: req.user.name,
      approverRole: route.origin,
      approvalLevel: "NONE" /* NONE */,
      decision: isResubmission ? "RESUBMITTED" : "SUBMITTED",
      previousStatus,
      newStatus,
      comments: competition.submissionRemarks,
      actionLabel: isResubmission ? `RESUBMITTED_TO_${targetLevel}` : `SUBMITTED_TO_${targetLevel}`,
      currentApprovalLevel: targetLevel,
      returnedFromLevel: null
    });
    await competition.save();
    if (targetLevel !== "NONE" /* NONE */) {
      await notifyTargetLevelApprovers(
        targetLevel,
        competition,
        `Proposal Pending ${targetLevel} Approval`,
        `"${competition.title}" (${competition.code}) has been submitted by ${req.user.name} for ${targetLevel} review.`
      );
      await sendNotification({
        recipient: req.user._id,
        title: isResubmission ? "Proposal Resubmitted" : "Proposal Submitted",
        message: `"${competition.title}" has been forwarded to ${targetLevel} for approval.`,
        type: "SUCCESS",
        actionUrl: `/competitions/${competition._id}`
      });
    }
    res.json({
      success: true,
      message: targetLevel === "NONE" /* NONE */ ? "Proposal approved by DSW." : `Proposal submitted to ${targetLevel} for review.`,
      data: competition
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
async function processLevelReview(req, res, level) {
  try {
    const rawAction = req.body.action;
    const action = rawAction === "REVISION_REQUIRED" ? "CHANGES_REQUESTED" : rawAction;
    const remarks = (req.body.remarks || req.body.comments || "").trim();
    const { centralCoordinatorId } = req.body;
    if (!["APPROVE", "REJECT", "CHANGES_REQUESTED"].includes(action)) {
      res.status(400).json({
        success: false,
        message: "Action must be APPROVE, CHANGES_REQUESTED (or REVISION_REQUIRED), or REJECT."
      });
      return;
    }
    if ((action === "REJECT" || action === "CHANGES_REQUESTED") && remarks.length < 5) {
      res.status(400).json({
        success: false,
        message: "Detailed comments (at least 5 characters) are mandatory when rejecting or requesting modifications."
      });
      return;
    }
    const competition = await Competition.findById(req.params.id);
    if (!competition) {
      res.status(404).json({ success: false, message: "Competition not found." });
      return;
    }
    if (level !== "DSW" /* DSW */ && competition.organizer.toString() === req.user._id.toString()) {
      res.status(403).json({
        success: false,
        message: "Authority violation: You cannot approve or review your own competition proposal."
      });
      return;
    }
    if (level === "HOD" /* HOD */) {
      const sameDeptId = req.user?.departmentId && competition.organizingDepartment && req.user.departmentId.toString() === competition.organizingDepartment.toString();
      const sameDeptName = req.user?.school && competition.organizingSchool && req.user.school.toString() === competition.organizingSchool.toString() && req.user?.department && competition.organizingDepartmentName === req.user.department;
      if (!sameDeptId && !sameDeptName) {
        res.status(403).json({
          success: false,
          message: "Department scope violation: You can only review proposals belonging to your department."
        });
        return;
      }
    } else if (level === "HOS" /* HOS */) {
      if (!req.user?.school || !competition.organizingSchool || req.user.school.toString() !== competition.organizingSchool.toString()) {
        res.status(403).json({
          success: false,
          message: "School scope violation: You can only review proposals belonging to your school."
        });
        return;
      }
    }
    const allowedAtLevel = {
      ["HOD" /* HOD */]: competition.currentApprovalLevel === "HOD" /* HOD */ || ["PENDING_HOD_APPROVAL" /* PENDING_HOD_APPROVAL */, "SUBMITTED_TO_HOD" /* SUBMITTED_TO_HOD */].includes(competition.status),
      ["HOS" /* HOS */]: competition.currentApprovalLevel === "HOS" /* HOS */ || competition.status === "PENDING_HOS_APPROVAL" /* PENDING_HOS_APPROVAL */,
      ["DSW" /* DSW */]: competition.currentApprovalLevel === "DSW" /* DSW */ || [
        "PENDING_DSW_APPROVAL" /* PENDING_DSW_APPROVAL */,
        "SUBMITTED" /* SUBMITTED */,
        "UNDER_REVIEW" /* UNDER_REVIEW */,
        "RESUBMITTED" /* RESUBMITTED */
      ].includes(competition.status)
    };
    if (!allowedAtLevel[level]) {
      res.status(400).json({
        success: false,
        message: `Proposal is currently at ${competition.currentApprovalLevel || competition.status} stage and cannot be reviewed at the ${level} level.`
      });
      return;
    }
    const previousStatus = competition.status;
    let newStatus;
    let nextLevel = "NONE" /* NONE */;
    let returnedFrom = null;
    if (action === "APPROVE") {
      if (level === "HOD" /* HOD */) {
        newStatus = "PENDING_HOS_APPROVAL" /* PENDING_HOS_APPROVAL */;
        nextLevel = "HOS" /* HOS */;
        competition.hodApproval = {
          approvedBy: req.user._id,
          approvedAt: /* @__PURE__ */ new Date(),
          remarks: remarks || "Approved by HOD"
        };
        competition.hodRemarks = remarks || "Approved by HOD";
      } else if (level === "HOS" /* HOS */) {
        newStatus = "PENDING_DSW_APPROVAL" /* PENDING_DSW_APPROVAL */;
        nextLevel = "DSW" /* DSW */;
        competition.hosApproval = {
          approvedBy: req.user._id,
          approvedAt: /* @__PURE__ */ new Date(),
          remarks: remarks || "Approved by HOS"
        };
        competition.hosRemarks = remarks || "Approved by HOS";
      } else {
        newStatus = "APPROVED_BY_DSW" /* APPROVED_BY_DSW */;
        nextLevel = "NONE" /* NONE */;
        competition.dswApproval = {
          approvedBy: req.user._id,
          approvedAt: /* @__PURE__ */ new Date(),
          remarks: remarks || "Final approval granted by DSW"
        };
        competition.dswRemarks = remarks || "Final approval granted by DSW";
        if (centralCoordinatorId) {
          competition.centralCoordinator = centralCoordinatorId;
        }
      }
    } else if (action === "REJECT") {
      newStatus = "REJECTED" /* REJECTED */;
      nextLevel = "NONE" /* NONE */;
      competition.rejectionReason = remarks;
    } else {
      newStatus = "CHANGES_REQUESTED" /* CHANGES_REQUESTED */;
      nextLevel = "NONE" /* NONE */;
      returnedFrom = level;
      competition.revisionNotes = remarks;
    }
    competition.status = newStatus;
    competition.currentApprovalLevel = nextLevel;
    competition.returnedFromLevel = returnedFrom;
    await recordApprovalTransition({
      competition,
      approverId: req.user._id,
      approverName: req.user.name,
      approverRole: level,
      approvalLevel: level,
      decision: action === "APPROVE" ? "APPROVED" : action === "REJECT" ? "REJECTED" : "CHANGES_REQUESTED",
      previousStatus,
      newStatus,
      comments: remarks,
      actionLabel: `${level}_${action}`,
      currentApprovalLevel: nextLevel,
      returnedFromLevel: returnedFrom
    });
    await competition.save();
    await logAudit({
      user: req.user._id,
      userName: req.user.name,
      role: level,
      action: `${level}_REVIEW_${action}`,
      resourceType: "COMPETITION",
      resourceId: competition._id.toString(),
      previousState: { status: previousStatus },
      newState: { status: newStatus, currentApprovalLevel: nextLevel },
      remarks,
      ipAddress: req.ip
    });
    const creatorMsg = action === "APPROVE" ? nextLevel !== "NONE" /* NONE */ ? `"${competition.title}" was approved by ${level} (${req.user.name}) and forwarded to ${nextLevel}.` : `"${competition.title}" received FINAL APPROVAL from DSW (${req.user.name}) and is ready to publish!` : action === "REJECT" ? `"${competition.title}" was rejected by ${level} (${req.user.name}): ${remarks}` : `Modifications were requested on "${competition.title}" by ${level} (${req.user.name}): ${remarks}`;
    await sendNotification({
      recipient: competition.organizer,
      title: `Proposal ${action === "APPROVE" ? "Approved" : action === "REJECT" ? "Rejected" : "Changes Requested"} (${level})`,
      message: creatorMsg,
      type: action === "APPROVE" ? "SUCCESS" : action === "REJECT" ? "ALERT" : "WARNING",
      actionUrl: `/competitions/${competition._id}`
    });
    if (action === "APPROVE" && nextLevel !== "NONE" /* NONE */) {
      await notifyTargetLevelApprovers(
        nextLevel,
        competition,
        `Proposal Forwarded by ${level} for ${nextLevel} Approval`,
        `"${competition.title}" (${competition.code}) was endorsed by ${level} and awaits your review.`
      );
    }
    if (action === "APPROVE" && level === "DSW" /* DSW */) {
      await notifyDepartmentHods(
        competition.organizingDepartment,
        competition.organizingSchool,
        "Department Proposal Approved by DSW",
        `"${competition.title}" has received final DSW approval.`,
        `/competitions/${competition._id}`,
        "SUCCESS"
      );
      await notifySchoolHos(
        competition.organizingSchool,
        "School Proposal Approved by DSW",
        `"${competition.title}" has received final DSW approval.`,
        `/competitions/${competition._id}`,
        "SUCCESS"
      );
    }
    res.json({
      success: true,
      message: action === "APPROVE" ? nextLevel !== "NONE" /* NONE */ ? `Proposal approved by ${level} and forwarded to ${nextLevel}.` : "Proposal granted final DSW approval!" : action === "REJECT" ? `Proposal rejected by ${level}.` : `Modification request sent back to proposer by ${level}.`,
      data: competition
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
router5.post(
  "/:id/hod-review",
  authenticate,
  requireExactRoles("HOD" /* HOD */),
  async (req, res) => processLevelReview(req, res, "HOD" /* HOD */)
);
router5.post(
  "/:id/hos-review",
  authenticate,
  requireExactRoles("HOS" /* HOS */, "SCHOOL_COORDINATOR" /* SCHOOL_COORDINATOR */),
  async (req, res) => processLevelReview(req, res, "HOS" /* HOS */)
);
router5.post(
  "/:id/dsw-review",
  authenticate,
  requireRoles("DSW_ADMIN" /* DSW_ADMIN */, "SUPER_ADMIN" /* SUPER_ADMIN */),
  async (req, res) => processLevelReview(req, res, "DSW" /* DSW */)
);
router5.post(
  "/:id/review",
  authenticate,
  requireRoles("DSW_ADMIN" /* DSW_ADMIN */, "SUPER_ADMIN" /* SUPER_ADMIN */),
  async (req, res) => processLevelReview(req, res, "DSW" /* DSW */)
);
router5.post(
  "/:id/publish",
  authenticate,
  requireRoles("DSW_ADMIN" /* DSW_ADMIN */, "SUPER_ADMIN" /* SUPER_ADMIN */),
  async (req, res) => {
    try {
      const competition = await Competition.findById(req.params.id);
      if (!competition) {
        res.status(404).json({ success: false, message: "Competition not found." });
        return;
      }
      if (!["APPROVED_BY_DSW" /* APPROVED_BY_DSW */, "APPROVED" /* APPROVED */].includes(competition.status)) {
        res.status(400).json({
          success: false,
          message: `Only DSW-approved competitions can be published. Current status is ${competition.status}.`
        });
        return;
      }
      const previousStatus = competition.status;
      competition.isPublished = true;
      competition.publishedAt = /* @__PURE__ */ new Date();
      competition.currentApprovalLevel = "NONE" /* NONE */;
      const effectiveStatus = computeEffectiveStatus(competition);
      competition.status = effectiveStatus;
      await recordApprovalTransition({
        competition,
        approverId: req.user._id,
        approverName: req.user.name,
        approverRole: "DSW",
        approvalLevel: "DSW" /* DSW */,
        decision: "PUBLISHED",
        previousStatus,
        newStatus: effectiveStatus,
        comments: req.body.remarks || (effectiveStatus === "PUBLISHED" /* PUBLISHED */ ? "Competition published as upcoming. Registration will open on scheduled opening date." : "Competition officially published and registration opened university-wide."),
        actionLabel: "COMPETITION_PUBLISHED",
        currentApprovalLevel: "NONE" /* NONE */
      });
      await competition.save();
      await logAudit({
        user: req.user._id,
        userName: req.user.name,
        role: req.user.roles[0],
        action: "PUBLISH_COMPETITION",
        resourceType: "COMPETITION",
        resourceId: competition._id.toString(),
        previousState: { isPublished: false, status: previousStatus },
        newState: { isPublished: true, status: effectiveStatus },
        ipAddress: req.ip
      });
      await broadcastToRoles(
        ["STUDENT" /* STUDENT */],
        effectiveStatus === "REGISTRATION_OPEN" /* REGISTRATION_OPEN */ ? `Registration Open: ${competition.title}` : `New Upcoming Competition: ${competition.title}`,
        effectiveStatus === "REGISTRATION_OPEN" /* REGISTRATION_OPEN */ ? `Registration is now open for ${competition.title}! Check details and register before seats fill up.` : `${competition.title} has been published! Registration opens on ${new Date(competition.registrationOpenDate).toLocaleDateString()}.`,
        `/competitions/${competition._id}`,
        "INFO"
      );
      await broadcastToUsers(
        [competition.organizer, competition.facultyCoordinator],
        "Your Competition is Now Published!",
        `"${competition.title}" is now visible to CT University students (Status: ${effectiveStatus.replace(/_/g, " ")}).`,
        "SUCCESS",
        `/competitions/${competition._id}`
      );
      await notifyDepartmentHods(
        competition.organizingDepartment,
        competition.organizingSchool,
        "Department Competition Published",
        `"${competition.title}" is live for student visibility.`,
        `/competitions/${competition._id}`,
        "SUCCESS"
      );
      await notifySchoolHos(
        competition.organizingSchool,
        "School Competition Published",
        `"${competition.title}" is live for student visibility.`,
        `/competitions/${competition._id}`,
        "SUCCESS"
      );
      res.json({
        success: true,
        message: effectiveStatus === "REGISTRATION_OPEN" /* REGISTRATION_OPEN */ ? "Competition published and registration opened successfully!" : effectiveStatus === "PUBLISHED" /* PUBLISHED */ ? "Competition published as upcoming; registration remains closed until the scheduled opening date." : "Competition published (registration closed per deadline/capacity).",
        data: competition
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);
router5.post(
  "/:id/status",
  authenticate,
  requireRoles(
    "DSW_ADMIN" /* DSW_ADMIN */,
    "SUPER_ADMIN" /* SUPER_ADMIN */,
    "HOS" /* HOS */,
    "SCHOOL_COORDINATOR" /* SCHOOL_COORDINATOR */,
    "HOD" /* HOD */,
    "COMPETITION_ORGANIZER" /* COMPETITION_ORGANIZER */
  ),
  async (req, res) => {
    try {
      const { status, remarks } = req.body;
      const operationalStatuses = [
        "IN_PROGRESS" /* IN_PROGRESS */,
        "COMPLETED" /* COMPLETED */,
        "POSTPONED" /* POSTPONED */,
        "CANCELLED" /* CANCELLED */,
        "REGISTRATION_CLOSED" /* REGISTRATION_CLOSED */,
        "REGISTRATION_OPEN" /* REGISTRATION_OPEN */
      ];
      if (!operationalStatuses.includes(status)) {
        res.status(400).json({
          success: false,
          message: "Status transition endpoint only supports operational statuses (REGISTRATION_OPEN/CLOSED, IN_PROGRESS, COMPLETED, POSTPONED, CANCELLED)."
        });
        return;
      }
      const competition = await Competition.findById(req.params.id);
      if (!competition) {
        res.status(404).json({ success: false, message: "Competition not found." });
        return;
      }
      if (!competition.isPublished && !isDswRole(req.userRoles || [])) {
        res.status(400).json({
          success: false,
          message: "Cannot change operational status before DSW approval and publication."
        });
        return;
      }
      const previousStatus = competition.status;
      competition.status = status;
      await recordApprovalTransition({
        competition,
        approverId: req.user._id,
        approverName: req.user.name,
        approverRole: req.user.roles[0],
        approvalLevel: isDswRole(req.userRoles || []) ? "DSW" /* DSW */ : "NONE" /* NONE */,
        decision: "STATUS_UPDATED",
        previousStatus,
        newStatus: status,
        comments: remarks || `Status updated from ${previousStatus} to ${status}`,
        actionLabel: `STATUS_CHANGE_TO_${status}`,
        currentApprovalLevel: competition.currentApprovalLevel || "NONE" /* NONE */
      });
      await competition.save();
      if (status === "CANCELLED" /* CANCELLED */ || status === "POSTPONED" /* POSTPONED */) {
        const regs = await Registration.find({ competitionId: competition._id, status: { $ne: "CANCELLED" /* CANCELLED */ } }).select("userId");
        await broadcastToUsers(
          regs.map((r) => r.userId),
          `Event Update: ${competition.title} (${status})`,
          `"${competition.title}" has been marked as ${status}. ${remarks || ""}`,
          "ALERT",
          `/competitions/${competition._id}`
        );
      }
      res.json({ success: true, message: `Status updated to ${status}.`, data: competition });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);
var competitionRoutes_default = router5;

// src/routes/registrationRoutes.ts
import { Router as Router6 } from "express";
init_enums();

// src/services/exportService.ts
import * as XLSX from "xlsx";
var generateExcelBuffer = (sheetName, data) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  return XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
};
var generateCsvBuffer = (data) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const csvString = XLSX.utils.sheet_to_csv(worksheet);
  return Buffer.from(csvString, "utf-8");
};

// src/routes/registrationRoutes.ts
var router6 = Router6();
function canMonitorCompetition(req, competition) {
  const roles = req.userRoles || [];
  if (isDswRole(roles)) return true;
  if (competition.organizer?.toString() === req.user._id.toString() || competition.facultyCoordinator?.toString() === req.user._id.toString()) {
    return true;
  }
  if (isHosRole(roles) && req.user?.school && competition.organizingSchool) {
    if (req.user.school.toString() === competition.organizingSchool.toString()) return true;
  }
  if (isHodRole(roles)) {
    if (req.user?.departmentId && competition.organizingDepartment && req.user.departmentId.toString() === competition.organizingDepartment.toString()) {
      return true;
    }
    if (req.user?.school && competition.organizingSchool && req.user.school.toString() === competition.organizingSchool.toString() && req.user?.department && competition.organizingDepartmentName === req.user.department) {
      return true;
    }
  }
  return false;
}
router6.post(
  "/",
  authenticate,
  requireExactRoles("STUDENT" /* STUDENT */),
  async (req, res) => {
    try {
      const { competitionId, participantType, teamName, teamMembers, customFieldResponses } = req.body;
      const userId = req.user._id;
      if (!competitionId) {
        res.status(400).json({ success: false, message: "Competition ID is required." });
        return;
      }
      const competition = await Competition.findById(competitionId);
      if (!competition) {
        res.status(404).json({ success: false, message: "Competition not found." });
        return;
      }
      if (!competition.isPublished) {
        res.status(403).json({
          success: false,
          message: "Registration is blocked: this competition has not been approved and published by DSW."
        });
        return;
      }
      const now = /* @__PURE__ */ new Date();
      if (competition.registrationOpenDate && now < new Date(competition.registrationOpenDate)) {
        res.status(400).json({
          success: false,
          message: `Registration is not open yet. It opens on ${new Date(competition.registrationOpenDate).toLocaleString()}.`
        });
        return;
      }
      if (competition.registrationCloseDate && now > new Date(competition.registrationCloseDate)) {
        if (competition.status === "REGISTRATION_OPEN" /* REGISTRATION_OPEN */) {
          competition.status = "REGISTRATION_CLOSED" /* REGISTRATION_CLOSED */;
          await competition.save();
        }
        res.status(400).json({ success: false, message: "Registration deadline has passed." });
        return;
      }
      const effectiveStatus = computeEffectiveStatus(competition);
      if (effectiveStatus !== "REGISTRATION_OPEN" /* REGISTRATION_OPEN */) {
        res.status(400).json({
          success: false,
          message: `Registrations are currently closed for this competition (Status: ${effectiveStatus.replace(/_/g, " ")}).`
        });
        return;
      }
      const existing = await Registration.findOne({ competitionId, userId });
      if (existing && existing.status !== "CANCELLED" /* CANCELLED */) {
        res.status(409).json({
          success: false,
          message: `You are already registered for this competition (Reg #: ${existing.registrationNumber}).`
        });
        return;
      }
      if (competition.eligibleSchools && competition.eligibleSchools.length > 0) {
        const userSchool = req.user?.school?.toString();
        const isEligibleSchool = userSchool && competition.eligibleSchools.some((s) => s.toString() === userSchool);
        if (!isEligibleSchool) {
          res.status(403).json({
            success: false,
            message: "Your school is not eligible to participate in this competition."
          });
          return;
        }
      }
      if (competition.eligibleProgrammes && competition.eligibleProgrammes.length > 0) {
        if (req.user?.programme && !competition.eligibleProgrammes.includes(req.user.programme)) {
          res.status(403).json({
            success: false,
            message: `Your programme (${req.user.programme}) is not eligible for this competition.`
          });
          return;
        }
      }
      if (competition.eligibleSemesters && competition.eligibleSemesters.length > 0) {
        if (req.user?.semester && !competition.eligibleSemesters.includes(req.user.semester)) {
          res.status(403).json({
            success: false,
            message: `Your semester (${req.user.semester}) is not eligible for this competition.`
          });
          return;
        }
      }
      const isTeamMode = competition.participationType === "TEAM" || participantType === "TEAM";
      const cleanedMembers = Array.isArray(teamMembers) ? teamMembers.filter((m) => m && m.name?.trim() && m.email?.trim()) : [];
      if (isTeamMode) {
        if (!teamName || teamName.trim().length === 0) {
          res.status(400).json({ success: false, message: "Team name is required for team participation." });
          return;
        }
        const membersCount = 1 + cleanedMembers.length;
        if (competition.minTeamSize && membersCount < competition.minTeamSize) {
          res.status(400).json({
            success: false,
            message: `Minimum team size is ${competition.minTeamSize} members (including leader). Provided: ${membersCount}.`
          });
          return;
        }
        if (competition.maxTeamSize && membersCount > competition.maxTeamSize) {
          res.status(400).json({
            success: false,
            message: `Maximum team size is ${competition.maxTeamSize} members (including leader). Provided: ${membersCount}.`
          });
          return;
        }
        const memberEmails = cleanedMembers.map((m) => m.email.toLowerCase().trim());
        const leaderEmail = req.user.email.toLowerCase().trim();
        if (memberEmails.includes(leaderEmail) || new Set(memberEmails).size !== memberEmails.length) {
          res.status(400).json({
            success: false,
            message: "Team members must have unique email addresses and cannot duplicate the team leader."
          });
          return;
        }
        const existingTeam = await Team.findOne({
          competitionId,
          teamName: teamName.trim(),
          status: "ACTIVE"
        });
        if (existingTeam) {
          res.status(409).json({
            success: false,
            message: `A team named "${teamName.trim()}" is already registered for this competition.`
          });
          return;
        }
      }
      const reservedComp = await Competition.findOneAndUpdate(
        {
          _id: competitionId,
          isPublished: true,
          status: "REGISTRATION_OPEN" /* REGISTRATION_OPEN */,
          $or: [
            { maxRegistrations: { $lte: 0 } },
            { maxRegistrations: { $exists: false } },
            { $expr: { $lt: ["$currentRegistrationsCount", "$maxRegistrations"] } }
          ]
        },
        { $inc: { currentRegistrationsCount: 1 } },
        { new: true }
      );
      if (!reservedComp) {
        if (competition.maxRegistrations > 0 && competition.currentRegistrationsCount >= competition.maxRegistrations) {
          await Competition.findByIdAndUpdate(competitionId, {
            $set: { status: "REGISTRATION_CLOSED" /* REGISTRATION_CLOSED */ }
          });
        }
        res.status(400).json({
          success: false,
          message: "Registration failed: competition capacity has been reached or registration just closed."
        });
        return;
      }
      let registration;
      try {
        if (existing && existing.status === "CANCELLED" /* CANCELLED */) {
          await Registration.deleteOne({ _id: existing._id });
        }
        const randomSuffix = Math.floor(1e4 + Math.random() * 9e4);
        const registrationNumber = `CTU-REG-${(/* @__PURE__ */ new Date()).getFullYear()}-${randomSuffix}`;
        const qrPayload = JSON.stringify({
          regNo: registrationNumber,
          comp: competition.code,
          user: req.user?.name,
          studentId: req.user?.registrationNumber,
          issuedAt: now.toISOString()
        });
        const qrCodeData = await generateQRCodeDataUrl(qrPayload);
        registration = new Registration({
          registrationNumber,
          competitionId,
          participantType: isTeamMode ? "TEAM" : "INDIVIDUAL",
          userId,
          school: req.user?.school,
          departmentId: req.user?.departmentId,
          departmentName: req.user?.department,
          teamName: isTeamMode ? teamName.trim() : void 0,
          teamMembers: isTeamMode ? cleanedMembers : [],
          status: "CONFIRMED" /* CONFIRMED */,
          qrCodeData,
          customFieldResponses
        });
        await registration.save();
        if (isTeamMode) {
          const team = await Team.create({
            competitionId,
            registrationId: registration._id,
            teamName: teamName.trim(),
            leaderId: userId,
            members: [
              {
                name: req.user.name,
                email: req.user.email,
                studentId: req.user.registrationNumber,
                phone: req.user.phone,
                programme: req.user.programme,
                semester: req.user.semester
              },
              ...cleanedMembers
            ],
            teamSize: 1 + cleanedMembers.length,
            status: "ACTIVE"
          });
          registration.teamId = team._id;
          await registration.save();
        }
      } catch (saveErr) {
        await Competition.findByIdAndUpdate(competitionId, {
          $inc: { currentRegistrationsCount: -1 }
        });
        throw saveErr;
      }
      if (reservedComp.maxRegistrations > 0 && reservedComp.currentRegistrationsCount >= reservedComp.maxRegistrations) {
        await Competition.findByIdAndUpdate(competitionId, {
          $set: { status: "REGISTRATION_CLOSED" /* REGISTRATION_CLOSED */ }
        });
        await CompetitionProposal.findOneAndUpdate(
          { competitionId },
          { $set: { status: "REGISTRATION_CLOSED" /* REGISTRATION_CLOSED */ } }
        );
        await broadcastToRoles(
          ["DSW_ADMIN" /* DSW_ADMIN */, "SUPER_ADMIN" /* SUPER_ADMIN */],
          `Capacity Reached: ${competition.title}`,
          `"${competition.title}" reached 100% capacity (${reservedComp.currentRegistrationsCount}/${reservedComp.maxRegistrations}) and automatically closed registrations.`,
          `/competitions/${competition._id}`,
          "WARNING"
        );
      } else if (reservedComp.maxRegistrations > 0 && reservedComp.currentRegistrationsCount / reservedComp.maxRegistrations >= 0.8) {
        await broadcastToRoles(
          ["DSW_ADMIN" /* DSW_ADMIN */],
          `Nearing Capacity: ${competition.title}`,
          `"${competition.title}" is now ${Math.round(reservedComp.currentRegistrationsCount / reservedComp.maxRegistrations * 100)}% full (${reservedComp.currentRegistrationsCount}/${reservedComp.maxRegistrations}).`,
          `/reports`,
          "INFO"
        );
      }
      await logAudit({
        user: req.user._id,
        userName: req.user.name,
        role: req.user.roles[0],
        action: "REGISTER_COMPETITION",
        resourceType: "REGISTRATION",
        resourceId: registration._id.toString(),
        newState: {
          registrationNumber: registration.registrationNumber,
          status: "CONFIRMED" /* CONFIRMED */,
          competitionTitle: competition.title
        },
        ipAddress: req.ip
      });
      await sendNotification({
        recipient: userId,
        title: "Registration Confirmed!",
        message: `Your registration (${registration.registrationNumber}) for "${competition.title}" is confirmed.`,
        type: "SUCCESS",
        actionUrl: `/student/registrations`
      });
      if (reservedComp.currentRegistrationsCount === 1 || reservedComp.currentRegistrationsCount % 5 === 0) {
        await sendNotification({
          recipient: competition.organizer,
          title: `Registration Update: ${competition.title}`,
          message: `Current registrations: ${reservedComp.currentRegistrationsCount} / ${reservedComp.maxRegistrations || "\u221E"}.`,
          type: "INFO",
          actionUrl: `/competitions/${competition._id}`
        });
        await notifyDepartmentHods(
          competition.organizingDepartment,
          competition.organizingSchool,
          `Department Registration Update: ${competition.title}`,
          `Registrations reached ${reservedComp.currentRegistrationsCount} / ${reservedComp.maxRegistrations || "\u221E"}.`,
          `/hod/dashboard`
        );
        await notifySchoolHos(
          competition.organizingSchool,
          `School Registration Update: ${competition.title}`,
          `Registrations reached ${reservedComp.currentRegistrationsCount} / ${reservedComp.maxRegistrations || "\u221E"}.`,
          `/hos/dashboard`
        );
      }
      res.status(201).json({
        success: true,
        message: "Registration successful! Your digital badge and QR code are ready.",
        data: registration
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);
router6.get("/my", authenticate, async (req, res) => {
  try {
    const registrations = await Registration.find({ userId: req.user._id }).populate("competitionId").populate("school", "name code").populate("teamId").sort({ createdAt: -1 });
    res.json({ success: true, count: registrations.length, data: registrations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router6.get(
  "/competition/:competitionId",
  authenticate,
  async (req, res) => {
    try {
      const competition = await Competition.findById(req.params.competitionId);
      if (!competition) {
        res.status(404).json({ success: false, message: "Competition not found." });
        return;
      }
      if (!canMonitorCompetition(req, competition)) {
        res.status(403).json({
          success: false,
          message: "Forbidden: You do not have authority to view registrations for this competition."
        });
        return;
      }
      const { status, search, page = 1, limit = 50 } = req.query;
      const filter = { competitionId: req.params.competitionId };
      if (status && status !== "undefined") filter.status = status;
      if (search && search !== "undefined") {
        filter.$or = [
          { registrationNumber: { $regex: String(search), $options: "i" } },
          { teamName: { $regex: String(search), $options: "i" } }
        ];
      }
      const skip = (Number(page) - 1) * Number(limit);
      const [registrations, total] = await Promise.all([
        Registration.find(filter).populate("userId", "name email registrationNumber phone department programme semester avatarUrl").populate("school", "name code").populate("teamId").sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
        Registration.countDocuments(filter)
      ]);
      res.json({
        success: true,
        total,
        page: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        data: registrations
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);
router6.post("/:id/checkin", authenticate, async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id).populate("userId", "name email registrationNumber").populate("competitionId");
    if (!registration) {
      res.status(404).json({ success: false, message: "Registration record not found." });
      return;
    }
    const comp = registration.competitionId;
    if (!canMonitorCompetition(req, comp)) {
      res.status(403).json({ success: false, message: "Not authorized to check in participants for this event." });
      return;
    }
    if (registration.status === "CHECKED_IN" /* CHECKED_IN */) {
      res.status(400).json({
        success: false,
        message: `Participant was already checked in at ${registration.checkedInAt?.toLocaleTimeString()}.`,
        data: registration
      });
      return;
    }
    registration.status = "CHECKED_IN" /* CHECKED_IN */;
    registration.checkedInAt = /* @__PURE__ */ new Date();
    registration.checkedInBy = req.user._id;
    await registration.save();
    await logAudit({
      user: req.user._id,
      userName: req.user.name,
      role: req.user.roles[0],
      action: "PARTICIPANT_CHECK_IN",
      resourceType: "REGISTRATION",
      resourceId: registration._id.toString(),
      newState: { status: "CHECKED_IN" /* CHECKED_IN */, checkedInAt: registration.checkedInAt },
      ipAddress: req.ip
    });
    res.json({
      success: true,
      message: `Participant ${registration.registrationNumber} successfully checked in!`,
      data: registration
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router6.post("/:id/cancel", authenticate, async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    if (!registration) {
      res.status(404).json({ success: false, message: "Registration not found." });
      return;
    }
    if (registration.userId.toString() !== req.user._id.toString()) {
      res.status(403).json({ success: false, message: "You can only cancel your own registration." });
      return;
    }
    if (registration.status === "CHECKED_IN" /* CHECKED_IN */) {
      res.status(400).json({ success: false, message: "Cannot cancel an already checked-in registration." });
      return;
    }
    if (registration.status === "CANCELLED" /* CANCELLED */) {
      res.status(400).json({ success: false, message: "Registration is already cancelled." });
      return;
    }
    registration.status = "CANCELLED" /* CANCELLED */;
    registration.remarks = req.body.reason || "Withdrawn by student";
    await registration.save();
    if (registration.teamId) {
      await Team.findByIdAndUpdate(registration.teamId, { $set: { status: "CANCELLED" } });
    }
    const updatedComp = await Competition.findOneAndUpdate(
      { _id: registration.competitionId, currentRegistrationsCount: { $gt: 0 } },
      { $inc: { currentRegistrationsCount: -1 } },
      { new: true }
    );
    if (updatedComp && updatedComp.isPublished && updatedComp.status === "REGISTRATION_CLOSED" /* REGISTRATION_CLOSED */ && (!updatedComp.registrationCloseDate || /* @__PURE__ */ new Date() <= new Date(updatedComp.registrationCloseDate)) && (!updatedComp.maxRegistrations || updatedComp.currentRegistrationsCount < updatedComp.maxRegistrations)) {
      updatedComp.status = "REGISTRATION_OPEN" /* REGISTRATION_OPEN */;
      await updatedComp.save();
    }
    res.json({ success: true, message: "Registration successfully cancelled.", data: registration });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router6.get(
  "/competition/:competitionId/export/excel",
  authenticate,
  async (req, res) => {
    try {
      const competition = await Competition.findById(req.params.competitionId);
      if (!competition || !canMonitorCompetition(req, competition)) {
        res.status(403).json({ success: false, message: "Forbidden: Not authorized to export registrations." });
        return;
      }
      const registrations = await Registration.find({ competitionId: req.params.competitionId }).populate("userId", "name email registrationNumber phone programme semester").populate("school", "name code");
      const exportRows = registrations.map((r) => ({
        "Registration No": r.registrationNumber,
        "Participant Name": r.userId?.name || "N/A",
        "Student ID": r.userId?.registrationNumber || "N/A",
        "Email": r.userId?.email || "N/A",
        "Phone": r.userId?.phone || "N/A",
        "School": r.school?.name || "N/A",
        "Programme": r.userId?.programme || "N/A",
        "Semester": r.userId?.semester || "N/A",
        "Type": r.participantType,
        "Team Name": r.teamName || "N/A",
        "Status": r.status,
        "Checked In": r.checkedInAt ? r.checkedInAt.toLocaleString() : "No",
        "Registration Date": r.createdAt.toLocaleString()
      }));
      const buffer = generateExcelBuffer("Registrations", exportRows);
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      res.setHeader("Content-Disposition", `attachment; filename="registrations_${req.params.competitionId}.xlsx"`);
      res.send(buffer);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);
router6.get(
  "/competition/:competitionId/export/csv",
  authenticate,
  async (req, res) => {
    try {
      const competition = await Competition.findById(req.params.competitionId);
      if (!competition || !canMonitorCompetition(req, competition)) {
        res.status(403).json({ success: false, message: "Forbidden: Not authorized to export registrations." });
        return;
      }
      const registrations = await Registration.find({ competitionId: req.params.competitionId }).populate("userId", "name email registrationNumber phone programme semester").populate("school", "name code");
      const exportRows = registrations.map((r) => ({
        "Registration No": r.registrationNumber,
        "Participant Name": r.userId?.name || "N/A",
        "Student ID": r.userId?.registrationNumber || "N/A",
        "Email": r.userId?.email || "N/A",
        "Phone": r.userId?.phone || "N/A",
        "School": r.school?.name || "N/A",
        "Programme": r.userId?.programme || "N/A",
        "Semester": r.userId?.semester || "N/A",
        "Type": r.participantType,
        "Team Name": r.teamName || "N/A",
        "Status": r.status,
        "Checked In": r.checkedInAt ? r.checkedInAt.toISOString() : "No"
      }));
      const buffer = generateCsvBuffer(exportRows);
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", `attachment; filename="registrations_${req.params.competitionId}.csv"`);
      res.send(buffer);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);
var registrationRoutes_default = router6;

// src/routes/facultyDutyRoutes.ts
import { Router as Router7 } from "express";
init_enums();
var router7 = Router7();
router7.get("/", authenticate, async (req, res) => {
  try {
    const { competitionId, facultyId, status, category, priority, date } = req.query;
    const filter = {};
    if (competitionId) filter.competitionId = competitionId;
    if (facultyId) filter.facultyId = facultyId;
    if (status) filter.status = status;
    if (category) filter.dutyCategory = category;
    if (priority) filter.priority = priority;
    if (date) {
      const d = new Date(String(date));
      const nextD = new Date(d);
      nextD.setDate(d.getDate() + 1);
      filter.date = { $gte: d, $lt: nextD };
    }
    const duties = await FacultyDuty.find(filter).populate("competitionId", "title code venue proposedDate").populate("facultyId", "name email designation department phone employeeId avatarUrl").populate("assignedBy", "name email designation").populate("verifiedBy", "name email").sort({ date: 1, reportingTime: 1 });
    res.json({ success: true, count: duties.length, data: duties });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router7.get("/my", authenticate, async (req, res) => {
  try {
    const duties = await FacultyDuty.find({ facultyId: req.user._id }).populate("competitionId", "title code venue proposedDate organizer").populate("assignedBy", "name email designation").sort({ date: 1 });
    res.json({ success: true, count: duties.length, data: duties });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router7.post(
  "/",
  authenticate,
  requireRoles(
    "DSW_ADMIN" /* DSW_ADMIN */,
    "SUPER_ADMIN" /* SUPER_ADMIN */,
    "SCHOOL_COORDINATOR" /* SCHOOL_COORDINATOR */,
    "CULTURAL_COORDINATOR" /* CULTURAL_COORDINATOR */,
    "COMPETITION_ORGANIZER" /* COMPETITION_ORGANIZER */
  ),
  async (req, res) => {
    try {
      const {
        competitionId,
        facultyId,
        dutyTitle,
        dutyCategory,
        dutyDescription,
        date,
        reportingTime,
        dutyStartTime,
        dutyEndTime,
        venue,
        priority,
        supportingInstructions,
        completionDeadline,
        allowConflictOverride
      } = req.body;
      if (!competitionId || !facultyId || !dutyTitle || !dutyCategory || !date || !venue) {
        res.status(400).json({
          success: false,
          message: "Competition, faculty member, duty title, category, date, and venue are mandatory."
        });
        return;
      }
      const dutyDate = new Date(date);
      const startOfDay = new Date(dutyDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(dutyDate);
      endOfDay.setHours(23, 59, 59, 999);
      const existingDutiesOnDate = await FacultyDuty.find({
        facultyId,
        date: { $gte: startOfDay, $lte: endOfDay },
        status: { $nin: ["DECLINED" /* DECLINED */, "COMPLETED" /* COMPLETED */, "VERIFIED" /* VERIFIED */] }
      }).populate("competitionId", "title code");
      if (existingDutiesOnDate.length > 0 && !allowConflictOverride) {
        res.status(409).json({
          success: false,
          hasConflict: true,
          message: `Schedule Alert: Faculty member already has ${existingDutiesOnDate.length} active assignment(s) on ${dutyDate.toLocaleDateString()} (${existingDutiesOnDate[0].dutyTitle} at ${existingDutiesOnDate[0].venue}). Confirm override to proceed.`,
          conflictingDuties: existingDutiesOnDate
        });
        return;
      }
      const duty = new FacultyDuty({
        competitionId,
        facultyId,
        assignedBy: req.user._id,
        dutyTitle: dutyTitle.trim(),
        dutyCategory,
        dutyDescription: dutyDescription?.trim(),
        date: dutyDate,
        reportingTime: reportingTime || "09:00 AM",
        dutyStartTime: dutyStartTime || "09:30 AM",
        dutyEndTime: dutyEndTime || "04:30 PM",
        venue: venue.trim(),
        priority: priority || "MEDIUM",
        supportingInstructions: supportingInstructions?.trim(),
        completionDeadline: completionDeadline ? new Date(completionDeadline) : void 0,
        status: "ASSIGNED" /* ASSIGNED */
      });
      await duty.save();
      const populatedDuty = await FacultyDuty.findById(duty._id).populate("competitionId", "title code").populate("facultyId", "name email designation phone");
      await logAudit({
        user: req.user._id,
        userName: req.user.name,
        role: req.user.roles[0],
        action: "ASSIGN_FACULTY_DUTY",
        resourceType: "FACULTY_DUTY",
        resourceId: duty._id.toString(),
        newState: duty.toObject(),
        ipAddress: req.ip
      });
      await sendNotification({
        recipient: facultyId,
        title: "New Competition Duty Assigned",
        message: `You have been assigned as ${dutyCategory.replace("_", " ")} for "${populatedDuty?.competitionId?.title}" on ${dutyDate.toLocaleDateString()}.`,
        type: "INFO",
        actionUrl: `/faculty/dashboard`
      });
      res.status(201).json({
        success: true,
        message: "Faculty duty assigned successfully.",
        data: populatedDuty
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);
router7.post("/:id/acknowledge", authenticate, async (req, res) => {
  try {
    const duty = await FacultyDuty.findById(req.params.id);
    if (!duty) {
      res.status(404).json({ success: false, message: "Duty not found." });
      return;
    }
    if (duty.facultyId.toString() !== req.user._id.toString()) {
      res.status(403).json({ success: false, message: "You can only acknowledge your own assigned duty." });
      return;
    }
    duty.status = "ACKNOWLEDGED" /* ACKNOWLEDGED */;
    duty.acknowledgedAt = /* @__PURE__ */ new Date();
    await duty.save();
    res.json({ success: true, message: "Duty acknowledged successfully.", data: duty });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router7.post("/:id/complete", authenticate, async (req, res) => {
  try {
    const { reportText, fileUrls } = req.body;
    const duty = await FacultyDuty.findById(req.params.id).populate("competitionId", "title");
    if (!duty) {
      res.status(404).json({ success: false, message: "Duty not found." });
      return;
    }
    if (duty.facultyId.toString() !== req.user._id.toString()) {
      res.status(403).json({ success: false, message: "You can only submit completion for your own assigned duty." });
      return;
    }
    duty.status = "COMPLETED" /* COMPLETED */;
    duty.completionEvidence = {
      reportText: reportText || "Duty completed in full accordance with instructions.",
      fileUrls: fileUrls || [],
      submittedAt: /* @__PURE__ */ new Date()
    };
    await duty.save();
    await logAudit({
      user: req.user._id,
      userName: req.user.name,
      role: req.user.roles[0],
      action: "COMPLETE_FACULTY_DUTY",
      resourceType: "FACULTY_DUTY",
      resourceId: duty._id.toString(),
      newState: { status: "COMPLETED" /* COMPLETED */, completionEvidence: duty.completionEvidence },
      ipAddress: req.ip
    });
    await sendNotification({
      recipient: duty.assignedBy,
      title: "Duty Completion Submitted",
      message: `${req.user.name} has marked their duty (${duty.dutyTitle}) as COMPLETED and submitted report.`,
      type: "SUCCESS",
      actionUrl: `/faculty-duties`
    });
    res.json({ success: true, message: "Duty marked as completed. Evidence submitted to supervisor for verification.", data: duty });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router7.post(
  "/:id/verify",
  authenticate,
  requireRoles("DSW_ADMIN" /* DSW_ADMIN */, "SUPER_ADMIN" /* SUPER_ADMIN */, "SCHOOL_COORDINATOR" /* SCHOOL_COORDINATOR */, "COMPETITION_ORGANIZER" /* COMPETITION_ORGANIZER */),
  async (req, res) => {
    try {
      const { verified, remarks } = req.body;
      const duty = await FacultyDuty.findById(req.params.id);
      if (!duty) {
        res.status(404).json({ success: false, message: "Duty not found." });
        return;
      }
      if (verified) {
        duty.status = "VERIFIED" /* VERIFIED */;
        duty.verifiedAt = /* @__PURE__ */ new Date();
        duty.verifiedBy = req.user._id;
        duty.supervisorRemarks = remarks || "Verified and approved by supervisor.";
      } else {
        duty.status = "IN_PROGRESS" /* IN_PROGRESS */;
        duty.supervisorRemarks = remarks || "Incomplete evidence. Please revise and resubmit.";
      }
      await duty.save();
      await sendNotification({
        recipient: duty.facultyId,
        title: verified ? "Duty Completion Verified" : "Duty Report Returned",
        message: verified ? `Your completion report for "${duty.dutyTitle}" has been verified and approved.` : `Your duty report requires revision: ${remarks}`,
        type: verified ? "SUCCESS" : "WARNING",
        actionUrl: `/faculty/dashboard`
      });
      res.json({
        success: true,
        message: verified ? "Duty verified and closed successfully." : "Duty returned for revision.",
        data: duty
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);
router7.post("/:id/reassign-request", authenticate, async (req, res) => {
  try {
    const { reason } = req.body;
    if (!reason) {
      res.status(400).json({ success: false, message: "Reason for reassignment request is required." });
      return;
    }
    const duty = await FacultyDuty.findById(req.params.id);
    if (!duty) {
      res.status(404).json({ success: false, message: "Duty not found." });
      return;
    }
    duty.status = "REASSIGNMENT_REQUESTED" /* REASSIGNMENT_REQUESTED */;
    duty.reassignmentRequest = {
      reason,
      requestedAt: /* @__PURE__ */ new Date()
    };
    await duty.save();
    await sendNotification({
      recipient: duty.assignedBy,
      title: "Duty Reassignment Requested",
      message: `${req.user.name} has requested reassignment for "${duty.dutyTitle}": ${reason}`,
      type: "ALERT",
      actionUrl: `/faculty-duties`
    });
    res.json({ success: true, message: "Reassignment request submitted to supervisor.", data: duty });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router7.get("/analytics/overview", authenticate, async (req, res) => {
  try {
    const totalDuties = await FacultyDuty.countDocuments();
    const completedDuties = await FacultyDuty.countDocuments({
      status: { $in: ["COMPLETED" /* COMPLETED */, "VERIFIED" /* VERIFIED */] }
    });
    const pendingDuties = await FacultyDuty.countDocuments({
      status: { $in: ["ASSIGNED" /* ASSIGNED */, "ACKNOWLEDGED" /* ACKNOWLEDGED */, "IN_PROGRESS" /* IN_PROGRESS */] }
    });
    const overdueDuties = await FacultyDuty.countDocuments({
      status: { $in: ["ASSIGNED" /* ASSIGNED */, "ACKNOWLEDGED" /* ACKNOWLEDGED */, "IN_PROGRESS" /* IN_PROGRESS */] },
      date: { $lt: /* @__PURE__ */ new Date() }
    });
    const categoryStats = await FacultyDuty.aggregate([
      { $group: { _id: "$dutyCategory", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    const statusStats = await FacultyDuty.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);
    res.json({
      success: true,
      data: {
        totalDuties,
        completedDuties,
        pendingDuties,
        overdueDuties,
        completionPercentage: totalDuties > 0 ? Math.round(completedDuties / totalDuties * 100) : 100,
        categoryStats,
        statusStats
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
var facultyDutyRoutes_default = router7;

// src/routes/judgingRoutes.ts
import { Router as Router8 } from "express";
init_enums();
var router8 = Router8();
router8.get("/rubric/:competitionId", authenticate, async (req, res) => {
  try {
    let rubric = await JudgingRubric.findOne({ competitionId: req.params.competitionId });
    if (!rubric) {
      rubric = new JudgingRubric({
        competitionId: req.params.competitionId,
        criteria: [
          { name: "Originality & Innovation", description: "Novelty and creativity of concept", maxMarks: 25, weightagePercent: 25 },
          { name: "Technical Execution / Skill", description: "Proficiency, quality and craft", maxMarks: 35, weightagePercent: 35 },
          { name: "Presentation & Defense", description: "Clarity, stage presence, answering judges", maxMarks: 25, weightagePercent: 25 },
          { name: "Adherence to Rules & Timing", description: "Compliance with competition specifications", maxMarks: 15, weightagePercent: 15 }
        ],
        totalMarks: 100,
        guidelines: "Evaluate each participant objectively based on the criteria specified."
      });
      await rubric.save();
    }
    res.json({ success: true, data: rubric });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router8.post(
  "/rubric/:competitionId",
  authenticate,
  requireRoles("DSW_ADMIN" /* DSW_ADMIN */, "SUPER_ADMIN" /* SUPER_ADMIN */, "SCHOOL_COORDINATOR" /* SCHOOL_COORDINATOR */, "COMPETITION_ORGANIZER" /* COMPETITION_ORGANIZER */, "JUDGE" /* JUDGE */),
  async (req, res) => {
    try {
      const { criteria, totalMarks, guidelines } = req.body;
      if (!criteria || !Array.isArray(criteria) || criteria.length === 0) {
        res.status(400).json({ success: false, message: "Valid criteria array is required." });
        return;
      }
      let rubric = await JudgingRubric.findOne({ competitionId: req.params.competitionId });
      if (rubric) {
        rubric.criteria = criteria;
        rubric.totalMarks = totalMarks || 100;
        rubric.guidelines = guidelines;
        await rubric.save();
      } else {
        rubric = new JudgingRubric({
          competitionId: req.params.competitionId,
          criteria,
          totalMarks: totalMarks || 100,
          guidelines
        });
        await rubric.save();
      }
      res.json({ success: true, message: "Judging rubric saved successfully.", data: rubric });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);
router8.get(
  "/competition/:competitionId/evaluations",
  authenticate,
  requireRoles("JUDGE" /* JUDGE */, "DSW_ADMIN" /* DSW_ADMIN */, "SUPER_ADMIN" /* SUPER_ADMIN */, "SCHOOL_COORDINATOR" /* SCHOOL_COORDINATOR */, "COMPETITION_ORGANIZER" /* COMPETITION_ORGANIZER */),
  async (req, res) => {
    try {
      const { competitionId } = req.params;
      const roundNumber = Number(req.query.roundNumber) || 1;
      const participants = await Registration.find({
        competitionId,
        status: { $in: ["CONFIRMED" /* CONFIRMED */, "CHECKED_IN" /* CHECKED_IN */] }
      }).populate("userId", "name email registrationNumber department programme").populate("school", "name code");
      const judgeScores = await Score.find({
        competitionId,
        judgeId: req.user._id,
        roundNumber
      });
      const scoreMap = /* @__PURE__ */ new Map();
      judgeScores.forEach((s) => scoreMap.set(s.registrationId.toString(), s));
      const evaluationList = participants.map((p) => ({
        registration: p,
        score: scoreMap.get(p._id.toString()) || null,
        isEvaluated: scoreMap.has(p._id.toString())
      }));
      res.json({ success: true, count: evaluationList.length, data: evaluationList });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);
router8.post(
  "/score",
  authenticate,
  requireRoles("JUDGE" /* JUDGE */, "DSW_ADMIN" /* DSW_ADMIN */, "SUPER_ADMIN" /* SUPER_ADMIN */),
  async (req, res) => {
    try {
      const { competitionId, registrationId, roundNumber = 1, criteriaScores, remarks } = req.body;
      if (!competitionId || !registrationId || !criteriaScores || !Array.isArray(criteriaScores)) {
        res.status(400).json({ success: false, message: "Competition, Registration, and Criteria Scores are required." });
        return;
      }
      const totalScore = criteriaScores.reduce((sum, c) => sum + (Number(c.score) || 0), 0);
      const score = await Score.findOneAndUpdate(
        {
          competitionId,
          judgeId: req.user._id,
          registrationId,
          roundNumber
        },
        {
          criteriaScores,
          totalScore,
          remarks,
          isSubmitted: true,
          submittedAt: /* @__PURE__ */ new Date()
        },
        { upsert: true, new: true }
      );
      await logAudit({
        user: req.user._id,
        userName: req.user.name,
        role: req.user.roles[0],
        action: "SUBMIT_JUDGE_SCORE",
        resourceType: "SCORE",
        resourceId: score._id.toString(),
        newState: { totalScore, remarks },
        ipAddress: req.ip
      });
      res.json({ success: true, message: "Score successfully recorded.", data: score });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);
var judgingRoutes_default = router8;

// src/routes/resultRoutes.ts
import { Router as Router9 } from "express";
init_enums();
var router9 = Router9();
router9.get("/competition/:competitionId", async (req, res) => {
  try {
    const results = await CompetitionResult.find({ competitionId: req.params.competitionId }).populate("registrationId").populate("school", "name code").populate("publishedBy", "name email").sort({ rank: 1 });
    const competition = await Competition.findById(req.params.competitionId).select("title code status prizeDetails");
    res.json({ success: true, count: results.length, data: { competition, results } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router9.post(
  "/competition/:competitionId/generate",
  authenticate,
  requireRoles("DSW_ADMIN" /* DSW_ADMIN */, "SUPER_ADMIN" /* SUPER_ADMIN */, "SCHOOL_COORDINATOR" /* SCHOOL_COORDINATOR */, "COMPETITION_ORGANIZER" /* COMPETITION_ORGANIZER */),
  async (req, res) => {
    try {
      const { competitionId } = req.params;
      const competition = await Competition.findById(competitionId);
      if (!competition) {
        res.status(404).json({ success: false, message: "Competition not found." });
        return;
      }
      const scoreAgg = await Score.aggregate([
        { $match: { competitionId: competition._id, isSubmitted: true } },
        {
          $group: {
            _id: "$registrationId",
            avgScore: { $avg: "$totalScore" },
            scoresCount: { $sum: 1 }
          }
        },
        { $sort: { avgScore: -1 } }
      ]);
      if (scoreAgg.length === 0) {
        res.status(400).json({
          success: false,
          message: "No submitted judge scores found for this competition yet."
        });
        return;
      }
      const registrationIds = scoreAgg.map((s) => s._id);
      const registrations = await Registration.find({ _id: { $in: registrationIds } }).populate("userId school");
      const regMap = /* @__PURE__ */ new Map();
      registrations.forEach((r) => regMap.set(r._id.toString(), r));
      const generatedResults = [];
      let rank = 1;
      for (const item of scoreAgg) {
        const reg = regMap.get(item._id.toString());
        if (!reg) continue;
        let category = "PARTICIPATION" /* PARTICIPATION */;
        let prize = "";
        if (rank === 1) {
          category = "WINNER" /* WINNER */;
          prize = competition.prizeDetails?.winner || "\u20B910,000 + Trophy";
        } else if (rank === 2) {
          category = "FIRST_RUNNER_UP" /* FIRST_RUNNER_UP */;
          prize = competition.prizeDetails?.firstRunnerUp || "\u20B95,000 + Trophy";
        } else if (rank === 3) {
          category = "SECOND_RUNNER_UP" /* SECOND_RUNNER_UP */;
          prize = competition.prizeDetails?.secondRunnerUp || "\u20B92,500 + Medal";
        } else if (rank === 4 || rank === 5) {
          category = "SPECIAL_RECOGNITION" /* SPECIAL_RECOGNITION */;
          prize = "Merit Certificate & Commendation";
        }
        const participantName = reg.participantType === "TEAM" && reg.teamName ? reg.teamName : reg.userId?.name || "Participant";
        const resultDoc = await CompetitionResult.findOneAndUpdate(
          { competitionId: competition._id, registrationId: reg._id },
          {
            participantName,
            school: reg.school?._id,
            rank,
            category,
            finalScore: Math.round(item.avgScore * 10) / 10,
            prizeWon: prize,
            isApprovedByDSW: false,
            isPublished: false
          },
          { upsert: true, new: true }
        );
        generatedResults.push(resultDoc);
        rank++;
      }
      res.json({
        success: true,
        message: `Successfully computed rankings for ${generatedResults.length} participants. Ready for DSW approval.`,
        data: generatedResults
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);
router9.post(
  "/competition/:competitionId/publish",
  authenticate,
  requireRoles("DSW_ADMIN" /* DSW_ADMIN */, "SUPER_ADMIN" /* SUPER_ADMIN */),
  async (req, res) => {
    try {
      const { competitionId } = req.params;
      const competition = await Competition.findById(competitionId);
      if (!competition) {
        res.status(404).json({ success: false, message: "Competition not found." });
        return;
      }
      await CompetitionResult.updateMany(
        { competitionId: competition._id },
        {
          isApprovedByDSW: true,
          isPublished: true,
          publishedAt: /* @__PURE__ */ new Date(),
          publishedBy: req.user._id
        }
      );
      competition.status = "COMPLETED" /* COMPLETED */;
      await competition.save();
      await logAudit({
        user: req.user._id,
        userName: req.user.name,
        role: req.user.roles[0],
        action: "PUBLISH_COMPETITION_RESULTS",
        resourceType: "RESULTS",
        resourceId: competition._id.toString(),
        remarks: "Official competition results approved and published.",
        ipAddress: req.ip
      });
      await broadcastToRoles(
        ["STUDENT" /* STUDENT */, "FACULTY" /* FACULTY */],
        `Results Announced: ${competition.title}`,
        `Official results and ranks for "${competition.title}" have been verified by DSW and published.`,
        `/competitions/${competition._id}`
      );
      res.json({ success: true, message: "Competition results approved and published university-wide!" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);
router9.post(
  "/:id/correct",
  authenticate,
  requireRoles("DSW_ADMIN" /* DSW_ADMIN */, "SUPER_ADMIN" /* SUPER_ADMIN */),
  async (req, res) => {
    try {
      const { rank, finalScore, prizeWon, remarks, reason } = req.body;
      if (!reason || reason.trim().length < 5) {
        res.status(400).json({ success: false, message: "Mandatory reason required for official result modification." });
        return;
      }
      const result = await CompetitionResult.findById(req.params.id);
      if (!result) {
        res.status(404).json({ success: false, message: "Result record not found." });
        return;
      }
      const previousRank = result.rank;
      const previousScore = result.finalScore;
      result.history.push({
        modifiedBy: req.user._id,
        modifiedAt: /* @__PURE__ */ new Date(),
        reason,
        previousRank,
        previousScore
      });
      if (rank !== void 0) result.rank = Number(rank);
      if (finalScore !== void 0) result.finalScore = Number(finalScore);
      if (prizeWon !== void 0) result.prizeWon = prizeWon;
      if (remarks !== void 0) result.remarks = remarks;
      await result.save();
      await logAudit({
        user: req.user._id,
        userName: req.user.name,
        role: req.user.roles[0],
        action: "CORRECT_COMPETITION_RESULT",
        resourceType: "RESULTS",
        resourceId: result._id.toString(),
        previousState: { rank: previousRank, finalScore: previousScore },
        newState: { rank: result.rank, finalScore: result.finalScore, reason },
        remarks: reason,
        ipAddress: req.ip
      });
      res.json({ success: true, message: "Result corrected with immutable audit trail recorded.", data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);
var resultRoutes_default = router9;

// src/routes/certificateRoutes.ts
import { Router as Router10 } from "express";
init_enums();
var router10 = Router10();
router10.get("/verify/:certNumber", async (req, res) => {
  try {
    const certNumber = req.params.certNumber.toUpperCase().trim();
    const certificate = await Certificate.findOne({
      $or: [{ certificateNumber: certNumber }, { verificationCode: certNumber }]
    }).populate("competitionId", "title code proposedDate category");
    if (!certificate) {
      res.status(404).json({
        success: false,
        isValid: false,
        message: "No certificate found matching the provided certificate identifier."
      });
      return;
    }
    if (certificate.isRevoked) {
      res.status(400).json({
        success: false,
        isValid: false,
        message: "This certificate has been revoked by CT University administration.",
        data: certificate
      });
      return;
    }
    res.json({
      success: true,
      isValid: true,
      message: "Certificate verified as authentic by CT University Competition Hub.",
      data: {
        certificateNumber: certificate.certificateNumber,
        verificationCode: certificate.verificationCode,
        recipientName: certificate.recipientName,
        recipientRole: certificate.recipientRole,
        schoolName: certificate.schoolName,
        competitionTitle: certificate.competitionTitle,
        type: certificate.type,
        achievement: certificate.achievement,
        issueDate: certificate.issueDate,
        authorizedSignatures: certificate.authorizedSignatures,
        isRevoked: certificate.isRevoked
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router10.get("/my", authenticate, async (req, res) => {
  try {
    const certificates = await Certificate.find({ recipientId: req.user._id, isRevoked: false }).populate("competitionId", "title code proposedDate").sort({ issueDate: -1 });
    res.json({ success: true, count: certificates.length, data: certificates });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router10.get("/:id", authenticate, async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id).populate("competitionId");
    if (!certificate) {
      res.status(404).json({ success: false, message: "Certificate not found." });
      return;
    }
    res.json({ success: true, data: certificate });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router10.post(
  "/issue",
  authenticate,
  requireRoles("DSW_ADMIN" /* DSW_ADMIN */, "SUPER_ADMIN" /* SUPER_ADMIN */),
  async (req, res) => {
    try {
      const { competitionId, type = "WINNER" /* WINNER */ } = req.body;
      const competition = await Competition.findById(competitionId).populate("organizingSchool");
      if (!competition) {
        res.status(404).json({ success: false, message: "Competition not found." });
        return;
      }
      const results = await CompetitionResult.find({ competitionId, isPublished: true }).populate({
        path: "registrationId",
        populate: { path: "userId" }
      });
      if (results.length === 0) {
        res.status(400).json({
          success: false,
          message: "No published results found for this competition. Please publish results first."
        });
        return;
      }
      const issuedCertificates = [];
      for (const resItem of results) {
        const reg = resItem.registrationId;
        if (!reg || !reg.userId) continue;
        const recipientUser = reg.userId;
        const count = await Certificate.countDocuments();
        const certificateNumber = `CTU-CERT-2026-${String(count + 1001).padStart(5, "0")}`;
        const verificationCode = `CTU-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        const verifyUrl = `${req.protocol}://${req.get("host")}/verify-certificate/${certificateNumber}`;
        const qrCodeData = await generateQRCodeDataUrl(verifyUrl);
        let achievement = "Certificate of Participation";
        let certType = "PARTICIPANT" /* PARTICIPANT */;
        if (resItem.rank === 1) {
          achievement = "First Prize - Winner";
          certType = "WINNER" /* WINNER */;
        } else if (resItem.rank === 2) {
          achievement = "Second Prize - 1st Runner-Up";
          certType = "WINNER" /* WINNER */;
        } else if (resItem.rank === 3) {
          achievement = "Third Prize - 2nd Runner-Up";
          certType = "WINNER" /* WINNER */;
        } else if (resItem.rank <= 5) {
          achievement = "Special Commendation & Recognition";
          certType = "WINNER" /* WINNER */;
        }
        const cert = await Certificate.findOneAndUpdate(
          { competitionId: competition._id, recipientId: recipientUser._id, type: certType },
          {
            certificateNumber,
            verificationCode,
            competitionId: competition._id,
            recipientId: recipientUser._id,
            recipientName: recipientUser.name,
            recipientRole: "Student Participant",
            schoolName: competition.organizingSchool?.name || "CT University",
            competitionTitle: competition.title,
            type: certType,
            achievement,
            issueDate: /* @__PURE__ */ new Date(),
            authorizedSignatures: [
              { name: "Dr. Gurpreet Singh", title: "Director Student Welfare (DSW)" },
              { name: "Dr. Satish Kumar", title: "Vice Chancellor, CT University" }
            ],
            qrCodeData,
            isRevoked: false
          },
          { upsert: true, new: true }
        );
        issuedCertificates.push(cert);
      }
      await logAudit({
        user: req.user._id,
        userName: req.user.name,
        role: req.user.roles[0],
        action: "ISSUE_CERTIFICATES",
        resourceType: "CERTIFICATE",
        resourceId: competition._id.toString(),
        remarks: `Issued ${issuedCertificates.length} certificates for "${competition.title}".`,
        ipAddress: req.ip
      });
      res.status(200).json({
        success: true,
        message: `Successfully issued ${issuedCertificates.length} authenticated certificates with digital QR codes!`,
        count: issuedCertificates.length,
        data: issuedCertificates
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);
var certificateRoutes_default = router10;

// src/routes/notificationRoutes.ts
import { Router as Router11 } from "express";
var router11 = Router11();
router11.get("/", authenticate, async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id }).sort({ createdAt: -1 }).limit(50);
    const unreadCount = await Notification.countDocuments({ recipient: req.user._id, isRead: false });
    res.json({ success: true, unreadCount, count: notifications.length, data: notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router11.post("/:id/read", authenticate, async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, recipient: req.user._id },
      { isRead: true },
      { new: true }
    );
    res.json({ success: true, data: notification });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router11.post("/read-all", authenticate, async (req, res) => {
  try {
    await Notification.updateMany({ recipient: req.user._id, isRead: false }, { isRead: true });
    res.json({ success: true, message: "All notifications marked as read." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
var notificationRoutes_default = router11;

// src/routes/reportRoutes.ts
import { Router as Router12 } from "express";
init_School();
init_enums();
var router12 = Router12();
router12.get(
  "/dsw-overview",
  authenticate,
  requireRoles("DSW_ADMIN" /* DSW_ADMIN */, "SUPER_ADMIN" /* SUPER_ADMIN */),
  async (req, res) => {
    try {
      const [
        totalCompetitions,
        pendingProposals,
        approvedCompetitions,
        publishedCompetitions,
        completedCompetitions,
        totalRegistrations,
        totalDuties,
        completedDuties,
        overdueDuties
      ] = await Promise.all([
        Competition.countDocuments(),
        Competition.countDocuments({
          status: {
            $in: [
              "SUBMITTED_TO_HOD",
              "PENDING_HOD_APPROVAL",
              "PENDING_HOS_APPROVAL",
              "PENDING_DSW_APPROVAL",
              "CHANGES_REQUESTED",
              "SUBMITTED",
              "UNDER_REVIEW",
              "REVISION_REQUIRED",
              "RESUBMITTED"
            ]
          }
        }),
        Competition.countDocuments({ status: { $in: ["APPROVED_BY_DSW", "APPROVED"] } }),
        Competition.countDocuments({ status: { $in: ["PUBLISHED", "REGISTRATION_OPEN", "IN_PROGRESS"] } }),
        Competition.countDocuments({ status: "COMPLETED" }),
        Registration.countDocuments(),
        FacultyDuty.countDocuments(),
        FacultyDuty.countDocuments({ status: { $in: ["COMPLETED", "VERIFIED"] } }),
        FacultyDuty.countDocuments({ status: { $in: ["ASSIGNED", "ACKNOWLEDGED", "IN_PROGRESS"] }, date: { $lt: /* @__PURE__ */ new Date() } })
      ]);
      const categoryDistribution = await Competition.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 }, totalBudget: { $sum: "$budgetProposal" } } },
        { $sort: { count: -1 } }
      ]);
      const scopeDistribution = await Competition.aggregate([
        { $group: { _id: "$scope", count: { $sum: 1 } } }
      ]);
      const schools = await School.find({ isActive: true }).select("name code");
      const schoolStats = await Promise.all(
        schools.map(async (school) => {
          const compCount = await Competition.countDocuments({ organizingSchool: school._id });
          const regCount = await Registration.countDocuments({ school: school._id });
          const dutiesCount = await FacultyDuty.countDocuments({
            competitionId: { $in: (await Competition.find({ organizingSchool: school._id }).select("_id")).map((c) => c._id) }
          });
          return {
            schoolId: school._id,
            name: school.name,
            code: school.code,
            competitionsOrganized: compCount,
            participantsRegistered: regCount,
            facultyDuties: dutiesCount
          };
        })
      );
      res.json({
        success: true,
        data: {
          metrics: {
            totalCompetitions,
            pendingProposals,
            approvedCompetitions,
            publishedCompetitions,
            completedCompetitions,
            totalRegistrations,
            totalDuties,
            completedDuties,
            overdueDuties,
            dutyCompletionRate: totalDuties > 0 ? Math.round(completedDuties / totalDuties * 100) : 100
          },
          categoryDistribution,
          scopeDistribution,
          schoolStats
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);
router12.get(
  "/export/:reportType",
  authenticate,
  requireRoles("DSW_ADMIN" /* DSW_ADMIN */, "SUPER_ADMIN" /* SUPER_ADMIN */),
  async (req, res) => {
    try {
      const { reportType } = req.params;
      const format = req.query.format || "excel";
      let dataToExport = [];
      let filename = `report_${reportType}_${Date.now()}`;
      if (reportType === "competitions") {
        const competitions = await Competition.find().populate("organizingSchool", "name code").populate("organizer", "name email");
        dataToExport = competitions.map((c) => ({
          "Code": c.code,
          "Title": c.title,
          "Category": c.category,
          "Scope": c.scope,
          "Organizing School": c.organizingSchool?.name || (c.isCentralDSW ? "Central DSW" : "N/A"),
          "Organizer": c.organizer?.name || "N/A",
          "Status": c.status,
          "Venue": c.venue,
          "Proposed Date": c.proposedDate?.toLocaleDateString(),
          "Registrations": c.currentRegistrationsCount,
          "Budget (INR)": c.budgetProposal
        }));
      } else if (reportType === "faculty-duties") {
        const duties = await FacultyDuty.find().populate("competitionId", "title code").populate("facultyId", "name email designation department").populate("assignedBy", "name email");
        dataToExport = duties.map((d) => ({
          "Competition": d.competitionId?.title || "N/A",
          "Faculty Member": d.facultyId?.name || "N/A",
          "Designation": d.facultyId?.designation || "N/A",
          "Department": d.facultyId?.department || "N/A",
          "Duty Title": d.dutyTitle,
          "Category": d.dutyCategory,
          "Date": d.date?.toLocaleDateString(),
          "Venue": d.venue,
          "Priority": d.priority,
          "Status": d.status,
          "Assigned By": d.assignedBy?.name || "N/A"
        }));
      } else if (reportType === "schools-summary") {
        const schools = await School.find({ isActive: true });
        for (const s of schools) {
          const compCount = await Competition.countDocuments({ organizingSchool: s._id });
          const regCount = await Registration.countDocuments({ school: s._id });
          dataToExport.push({
            "School Name": s.name,
            "Code": s.code,
            "Dean": s.deanName || "N/A",
            "Contact Email": s.contactEmail || "N/A",
            "Competitions Organized": compCount,
            "Student Participants": regCount
          });
        }
      }
      if (format === "csv") {
        const csvBuffer = generateCsvBuffer(dataToExport);
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", `attachment; filename="${filename}.csv"`);
        res.send(csvBuffer);
      } else {
        const excelBuffer = generateExcelBuffer("Report Data", dataToExport);
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", `attachment; filename="${filename}.xlsx"`);
        res.send(excelBuffer);
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);
var reportRoutes_default = router12;

// src/routes/auditRoutes.ts
import { Router as Router13 } from "express";
init_enums();
var router13 = Router13();
router13.get(
  "/",
  authenticate,
  requireRoles("DSW_ADMIN" /* DSW_ADMIN */, "SUPER_ADMIN" /* SUPER_ADMIN */),
  async (req, res) => {
    try {
      const { action, resourceType, role, search, page = 1, limit = 50 } = req.query;
      const filter = {};
      if (action) filter.action = action;
      if (resourceType) filter.resourceType = resourceType;
      if (role) filter.role = role;
      if (search) {
        filter.$or = [
          { userName: { $regex: String(search), $options: "i" } },
          { remarks: { $regex: String(search), $options: "i" } },
          { action: { $regex: String(search), $options: "i" } }
        ];
      }
      const skip = (Number(page) - 1) * Number(limit);
      const [logs, total] = await Promise.all([
        AuditLog.find(filter).populate("user", "name email roles designation").sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
        AuditLog.countDocuments(filter)
      ]);
      res.json({
        success: true,
        total,
        page: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        data: logs
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);
var auditRoutes_default = router13;

// src/routes/monitoringRoutes.ts
import { Router as Router14 } from "express";
init_enums();
var router14 = Router14();
router14.get("/overview", authenticate, async (req, res) => {
  try {
    const roles = req.userRoles || [];
    const isStaff = isDswRole(roles) || isHosRole(roles) || isHodRole(roles) || roles.includes("FACULTY" /* FACULTY */) || roles.includes("CULTURAL_COORDINATOR" /* CULTURAL_COORDINATOR */) || roles.includes("COMPETITION_ORGANIZER" /* COMPETITION_ORGANIZER */);
    if (!isStaff) {
      res.status(403).json({
        success: false,
        message: "Forbidden: Students cannot access competition registration monitoring dashboards."
      });
      return;
    }
    let filter = {};
    let scopeLabel = "University-Wide (DSW)";
    if (isDswRole(roles)) {
      filter = {};
      scopeLabel = "University-Wide (DSW)";
    } else if (isHosRole(roles)) {
      scopeLabel = "School-Level (HOS)";
      filter = req.user?.school ? {
        $or: [
          { organizingSchool: req.user.school },
          { coOrganizingSchools: req.user.school },
          { organizer: req.user._id }
        ]
      } : { organizer: req.user._id };
    } else if (isHodRole(roles)) {
      scopeLabel = `Department-Level (${req.user?.department || "HOD"})`;
      const deptOr = [{ organizer: req.user._id }];
      if (req.user?.departmentId) {
        deptOr.push({ organizingDepartment: req.user.departmentId });
      }
      if (req.user?.department && req.user?.school) {
        deptOr.push({
          organizingSchool: req.user.school,
          organizingDepartmentName: req.user.department
        });
      }
      filter = { $or: deptOr };
    } else {
      scopeLabel = "My Proposed & Coordinated Events (Faculty)";
      filter = {
        $or: [{ organizer: req.user._id }, { facultyCoordinator: req.user._id }]
      };
    }
    const competitions = await Competition.find(filter).populate("organizingSchool", "name code").populate("organizingDepartment", "name code").populate("organizer", "name email designation").sort({ updatedAt: -1 });
    const compIds = competitions.map((c) => c._id);
    const regCounts = await Registration.aggregate([
      {
        $match: {
          competitionId: { $in: compIds },
          status: { $ne: "CANCELLED" /* CANCELLED */ }
        }
      },
      {
        $group: {
          _id: "$competitionId",
          count: { $sum: 1 }
        }
      }
    ]);
    const countMap = /* @__PURE__ */ new Map();
    regCounts.forEach((row) => countMap.set(row._id.toString(), row.count));
    const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1e3);
    const trendAgg = await Registration.aggregate([
      {
        $match: {
          competitionId: { $in: compIds },
          status: { $ne: "CANCELLED" /* CANCELLED */ },
          createdAt: { $gte: fourteenDaysAgo }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          registrations: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    const cards = competitions.map((c) => {
      const liveRegCount = countMap.get(c._id.toString()) ?? c.currentRegistrationsCount ?? 0;
      const capacity = c.maxRegistrations || 0;
      const remainingSeats = capacity > 0 ? Math.max(0, capacity - liveRegCount) : null;
      const percentageFilled = capacity > 0 ? Math.min(100, Math.round(liveRegCount / capacity * 100)) : 0;
      const effectiveStatus = computeEffectiveStatus({
        status: c.status,
        isPublished: c.isPublished,
        dswApproval: c.dswApproval,
        registrationOpenDate: c.registrationOpenDate,
        registrationCloseDate: c.registrationCloseDate,
        currentRegistrationsCount: liveRegCount,
        maxRegistrations: c.maxRegistrations
      });
      return {
        _id: c._id,
        title: c.title,
        code: c.code,
        proposalCode: c.proposalCode,
        category: c.category,
        scope: c.scope,
        organizingSchool: c.organizingSchool,
        organizingDepartment: c.organizingDepartment,
        organizingDepartmentName: c.organizingDepartmentName,
        organizer: c.organizer,
        status: c.status,
        effectiveRegistrationStatus: effectiveStatus,
        currentApprovalLevel: c.currentApprovalLevel || "NONE" /* NONE */,
        isPublished: c.isPublished,
        proposedDate: c.proposedDate,
        registrationOpenDate: c.registrationOpenDate,
        registrationCloseDate: c.registrationCloseDate,
        venue: c.venue,
        maxCapacity: capacity,
        registrationsReceived: liveRegCount,
        remainingSeats,
        percentageFilled
      };
    });
    const pendingStatuses = [
      "SUBMITTED_TO_HOD" /* SUBMITTED_TO_HOD */,
      "PENDING_HOD_APPROVAL" /* PENDING_HOD_APPROVAL */,
      "PENDING_HOS_APPROVAL" /* PENDING_HOS_APPROVAL */,
      "PENDING_DSW_APPROVAL" /* PENDING_DSW_APPROVAL */,
      "CHANGES_REQUESTED" /* CHANGES_REQUESTED */,
      "SUBMITTED" /* SUBMITTED */,
      "UNDER_REVIEW" /* UNDER_REVIEW */,
      "REVISION_REQUIRED" /* REVISION_REQUIRED */,
      "RESUBMITTED" /* RESUBMITTED */
    ];
    const summary = {
      scopeLabel,
      totalProposed: cards.length,
      pendingApproval: cards.filter((c) => pendingStatuses.includes(c.status)).length,
      approvedCompetitions: cards.filter(
        (c) => ["APPROVED_BY_DSW" /* APPROVED_BY_DSW */, "APPROVED" /* APPROVED */].includes(c.status) || c.isPublished
      ).length,
      publishedCompetitions: cards.filter((c) => c.isPublished).length,
      openRegistrations: cards.filter(
        (c) => c.effectiveRegistrationStatus === "REGISTRATION_OPEN" /* REGISTRATION_OPEN */
      ).length,
      totalRegistrations: cards.reduce((acc, c) => acc + c.registrationsReceived, 0),
      totalCapacity: cards.filter((c) => c.isPublished).reduce((acc, c) => acc + c.maxCapacity, 0)
    };
    res.json({
      success: true,
      data: {
        summary,
        competitions: cards,
        trends: trendAgg.map((t) => ({ date: t._id, registrations: t.registrations }))
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
var monitoringRoutes_default = router14;

// src/routes/chatRoutes.ts
import { Router as Router15 } from "express";

// src/services/chatbotService.ts
init_enums();
function getPrimaryRoleLabel(user) {
  if (!user || !user.roles?.length) return "Visitor / Guest";
  if (user.roles.includes("SUPER_ADMIN" /* SUPER_ADMIN */)) return "Super Admin";
  if (user.roles.includes("DSW_ADMIN" /* DSW_ADMIN */)) return "Director Student Welfare (DSW)";
  if (user.roles.includes("HOS" /* HOS */) || user.roles.includes("SCHOOL_COORDINATOR" /* SCHOOL_COORDINATOR */)) return "Head of School (HOS)";
  if (user.roles.includes("HOD" /* HOD */)) return "Head of Department (HOD)";
  if (user.roles.includes("CULTURAL_COORDINATOR" /* CULTURAL_COORDINATOR */)) return "Cultural Coordinator";
  if (user.roles.includes("FACULTY" /* FACULTY */)) return "Faculty Coordinator";
  if (user.roles.includes("JUDGE" /* JUDGE */)) return "Judge";
  return "Student";
}
function getRoleActions(user) {
  if (!user) {
    return [
      { label: "Explore Competitions", path: "/discover" },
      { label: "Sign In", path: "/login" }
    ];
  }
  if (user.roles.includes("DSW_ADMIN" /* DSW_ADMIN */) || user.roles.includes("SUPER_ADMIN" /* SUPER_ADMIN */)) {
    return [
      { label: "DSW Dashboard", path: "/dsw/dashboard" },
      { label: "Approval Queue", path: "/dsw/approval-queue" }
    ];
  }
  if (user.roles.includes("HOS" /* HOS */) || user.roles.includes("SCHOOL_COORDINATOR" /* SCHOOL_COORDINATOR */)) {
    return [
      { label: "HOS Dashboard", path: "/hos/dashboard" },
      { label: "New Proposal", path: "/competitions/create" }
    ];
  }
  if (user.roles.includes("HOD" /* HOD */)) {
    return [
      { label: "HOD Dashboard", path: "/hod/dashboard" },
      { label: "New Proposal", path: "/competitions/create" }
    ];
  }
  if (user.roles.includes("FACULTY" /* FACULTY */) || user.roles.includes("CULTURAL_COORDINATOR" /* CULTURAL_COORDINATOR */)) {
    return [
      { label: "Faculty Dashboard", path: "/faculty/dashboard" },
      { label: "Create Proposal", path: "/competitions/create" }
    ];
  }
  if (user.roles.includes("JUDGE" /* JUDGE */)) {
    return [{ label: "Judging Portal", path: "/judging/dashboard" }];
  }
  return [
    { label: "Student Dashboard", path: "/student/dashboard" },
    { label: "My Registrations", path: "/student/registrations" }
  ];
}
function getRoleSuggestions(user) {
  if (!user) {
    return [
      "What is CTU Competition Hub?",
      "How does the approval hierarchy work?",
      "Suppose registrations are closed, how can we extend them?",
      "How do students register for competitions?"
    ];
  }
  if (user.roles.includes("DSW_ADMIN" /* DSW_ADMIN */) || user.roles.includes("SUPER_ADMIN" /* SUPER_ADMIN */)) {
    return [
      "How do we extend registration deadline or capacity?",
      "What is my pending DSW queue right now?",
      "How does registration monitoring work?",
      "Explain all competition statuses"
    ];
  }
  if (user.roles.includes("HOS" /* HOS */) || user.roles.includes("SCHOOL_COORDINATOR" /* SCHOOL_COORDINATOR */)) {
    return [
      "How do I review HOS proposals?",
      "Can we extend registration after it closes?",
      "How do I monitor school registrations?",
      "What happens if changes are requested?"
    ];
  }
  if (user.roles.includes("HOD" /* HOD */)) {
    return [
      "How do I review department faculty proposals?",
      "What happens when I create a proposal as HOD?",
      "Can we extend registration after it closes?",
      "How do I monitor department registrations?"
    ];
  }
  if (user.roles.includes("FACULTY" /* FACULTY */) || user.roles.includes("CULTURAL_COORDINATOR" /* CULTURAL_COORDINATOR */)) {
    return [
      "How do I submit a competition proposal?",
      "Suppose registrations are closed, how do we extend them?",
      'How do I fix a "Changes Requested" proposal?',
      "How do I track registrations for my event?"
    ];
  }
  if (user.roles.includes("JUDGE" /* JUDGE */)) {
    return [
      "How do I score participants as a Judge?",
      "How are results published?",
      "What if there is a tie or score correction?"
    ];
  }
  return [
    "How do I register for a competition?",
    "How many competitions are open right now?",
    "Can I cancel or modify my registration?",
    "Where do I find my QR certificate?"
  ];
}
async function gatherLiveContext(user) {
  const ctx = {
    openCompetitionsCount: 0,
    upcomingCompetitionsCount: 0,
    closedCompetitionsCount: 0,
    pendingForRoleCount: 0,
    myProposalsCount: 0,
    myRegistrationsCount: 0,
    publishedList: []
  };
  try {
    const [openCount, upcomingCount, closedCount, publishedDocs] = await Promise.all([
      Competition.countDocuments({
        isPublished: true,
        status: "REGISTRATION_OPEN" /* REGISTRATION_OPEN */
      }),
      Competition.countDocuments({
        isPublished: true,
        status: { $in: ["PUBLISHED" /* PUBLISHED */, "APPROVED_BY_DSW" /* APPROVED_BY_DSW */] }
      }),
      Competition.countDocuments({
        isPublished: true,
        status: "REGISTRATION_CLOSED" /* REGISTRATION_CLOSED */
      }),
      Competition.find({ isPublished: true }).select("title status category participationType maxRegistrations currentRegistrationsCount registrationCloseDate proposedDate").sort({ createdAt: -1 }).limit(12).lean()
    ]);
    ctx.openCompetitionsCount = openCount;
    ctx.upcomingCompetitionsCount = upcomingCount;
    ctx.closedCompetitionsCount = closedCount;
    ctx.publishedList = publishedDocs.map((d) => ({
      id: d._id.toString(),
      title: d.title,
      status: d.status,
      category: d.category,
      participationType: d.participationType,
      maxRegistrations: d.maxRegistrations || 0,
      currentRegistrationsCount: d.currentRegistrationsCount || 0,
      registrationCloseDate: d.registrationCloseDate,
      proposedDate: d.proposedDate
    }));
    if (user) {
      const userId = user._id;
      if (user.roles.includes("DSW_ADMIN" /* DSW_ADMIN */) || user.roles.includes("SUPER_ADMIN" /* SUPER_ADMIN */)) {
        ctx.pendingForRoleCount = await Competition.countDocuments({
          status: "PENDING_DSW_APPROVAL" /* PENDING_DSW_APPROVAL */
        });
      } else if (user.roles.includes("HOS" /* HOS */) || user.roles.includes("SCHOOL_COORDINATOR" /* SCHOOL_COORDINATOR */)) {
        const filter = {
          status: "PENDING_HOS_APPROVAL" /* PENDING_HOS_APPROVAL */
        };
        if (user.school) filter.schoolId = user.school;
        ctx.pendingForRoleCount = await Competition.countDocuments(filter);
      } else if (user.roles.includes("HOD" /* HOD */)) {
        const filter = {
          status: { $in: ["PENDING_HOD_APPROVAL" /* PENDING_HOD_APPROVAL */, "SUBMITTED_TO_HOD" /* SUBMITTED_TO_HOD */] }
        };
        if (user.departmentId) filter.departmentId = user.departmentId;
        ctx.pendingForRoleCount = await Competition.countDocuments(filter);
      }
      if (user.roles.includes("FACULTY" /* FACULTY */) || user.roles.includes("HOD" /* HOD */) || user.roles.includes("HOS" /* HOS */) || user.roles.includes("CULTURAL_COORDINATOR" /* CULTURAL_COORDINATOR */)) {
        ctx.myProposalsCount = await Competition.countDocuments({ createdBy: userId });
      }
      if (user.roles.includes("STUDENT" /* STUDENT */)) {
        ctx.myRegistrationsCount = await Registration.countDocuments({ studentId: userId });
      }
    }
  } catch {
  }
  return ctx;
}
function editDistance(a, b) {
  if (Math.abs(a.length - b.length) > 3) return 99;
  const dp = Array.from(
    { length: a.length + 1 },
    (_, i) => Array.from({ length: b.length + 1 }, (_2, j) => i === 0 ? j : j === 0 ? i : 0)
  );
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[a.length][b.length];
}
function tokenize(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter((w) => w.length >= 2);
}
function fuzzyMatchScore(tokens, keywords) {
  let score = 0;
  for (const kw of keywords) {
    const kwLower = kw.toLowerCase();
    if (kwLower.includes(" ")) {
      if (tokens.join(" ").includes(kwLower)) score += 4;
      continue;
    }
    for (const tok of tokens) {
      if (tok === kwLower) {
        score += 3;
        break;
      }
      if (tok.startsWith(kwLower) || kwLower.startsWith(tok)) {
        if (Math.min(tok.length, kwLower.length) >= 4) {
          score += 2.2;
          break;
        }
      }
      if (kwLower.length >= 5 && editDistance(tok, kwLower) <= 2) {
        score += 1.8;
        break;
      }
    }
  }
  return score;
}
async function tryGeminiAnswer(userMessage, history, user, ctx, roleLabel) {
  if (!ENV.GEMINI_API_KEY) return null;
  const liveCompetitionsSummary = ctx.publishedList.slice(0, 8).map(
    (c) => `- "${c.title}" (${c.category}, ${c.participationType}) | Status: ${c.status} | Seats: ${c.currentRegistrationsCount}/${c.maxRegistrations}`
  ).join("\n");
  const systemInstruction = `You are the official **CTU Competition Hub Guide** for CT University, Ludhiana (Directorate of Student Welfare - DSW).
Answer the user's question clearly, concisely, and accurately based on the real system architecture below.

USER CONTEXT:
- Role: ${roleLabel}${user?.name ? ` (${user.name})` : ""}
- Open Competitions: ${ctx.openCompetitionsCount}, Upcoming: ${ctx.upcomingCompetitionsCount}, Closed: ${ctx.closedCompetitionsCount}
- Pending Queue for Role: ${ctx.pendingForRoleCount}
${liveCompetitionsSummary ? `
LIVE PUBLISHED COMPETITIONS:
${liveCompetitionsSummary}` : ""}

SYSTEM ARCHITECTURE & EXACT WORKFLOW RULES:
1. Organizational Hierarchy: Faculty / Coordinator -> Head of Department (HOD) -> Head of School (HOS) -> Director Student Welfare (DSW).
   - Scenario A (Faculty initiates): HOD -> HOS -> DSW.
   - Scenario B (HOD initiates): HOS -> DSW (HOD cannot self-approve).
   - Scenario C (HOS initiates): DSW.
   - Scenario D (DSW initiates): Direct approval & publication with audit log.
2. Changes Requested & Resubmission: Reviewers (HOD/HOS/DSW) can request changes with comments. Creator edits and resubmits; resubmission resumes at the exact level that requested changes (unless material scope change).
3. Publication & Schedule: Students NEVER see unapproved/draft competitions. Only DSW can publish (POST /api/competitions/:id/publish). If registrationOpenDate is future, it publishes as PUBLISHED (Upcoming); once open, status is REGISTRATION_OPEN.
4. Extending / Reopening Closed Registrations (IMPORTANT):
   - Once a competition is approved/published/closed, non-DSW organizers CANNOT edit it directly (PUT /api/competitions/:id locks non-DSW edits to DRAFT / CHANGES_REQUESTED).
   - Only **DSW (DSW_ADMIN / SUPER_ADMIN)** can extend registrationCloseDate (if deadline passed) or increase maxRegistrations / maxTeams (if capacity is full) and reopen registration.
   - Alternatively, Faculty/HOD/HOS can submit a follow-up Round 2 / Wildcard proposal through the approval hierarchy.
5. Student Registration: Atomic seat reservation (currentRegistrationsCount < maxRegistrations). Prevents duplicates, before-open, after-close, or over-capacity registrations. Supports Individual and Team (Team Leader + Team Members + size validation). Students can view registrations (/student/registrations) and cancel if allowed before event start.
6. Monitoring: Role-scoped (/api/monitoring/overview) \u2014 Faculty sees own events, HOD sees department, HOS sees school, DSW sees all university.
7. Judging & Certificates: Judges score via /judging/dashboard, DSW/Coordinators publish results via /results/publishing, students download QR-verified PDF certificates (/student/certificates), public verification at /verify-certificate/:certNumber.
8. Excel / Bulk Updates: Exports (.xlsx/.csv) are built-in at /reports and per-competition registration lists. Bulk faculty Excel import can be added via DSW admin upload or CLI script.

FORMATTING RULES:
- Use clean markdown (**bold**, bullet lists, numbered steps).
- Be direct, practical, and tailored to the user's role.`;
  try {
    const contents = [
      ...history.slice(-6).map((h) => ({
        role: h.sender === "user" ? "user" : "model",
        parts: [{ text: h.text }]
      })),
      { role: "user", parts: [{ text: userMessage }] }
    ];
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${ENV.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemInstruction }] },
          contents,
          generationConfig: {
            temperature: 0.35,
            maxOutputTokens: 700
          }
        })
      }
    );
    if (!response.ok) return null;
    const json = await response.json();
    const replyText = json?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!replyText) return null;
    return {
      reply: replyText.trim(),
      actions: getRoleActions(user),
      suggestions: getRoleSuggestions(user),
      roleLabel,
      mode: "ai"
    };
  } catch {
    return null;
  }
}
async function getChatWelcome(user) {
  const roleLabel = getPrimaryRoleLabel(user);
  const ctx = await gatherLiveContext(user);
  const name = user?.name ? `**${user.name}**` : "there";
  let roleIntro = "";
  if (!user) {
    roleIntro = `There are currently **${ctx.openCompetitionsCount}** competition(s) open for registration. Ask me anything\u2014even dynamic "what-if" questions about workflows, extending registrations, hierarchy rules, or how to use any feature!`;
  } else if (user.roles.includes("DSW_ADMIN" /* DSW_ADMIN */) || user.roles.includes("SUPER_ADMIN" /* SUPER_ADMIN */)) {
    roleIntro = `You are logged in as **${roleLabel}**. You currently have **${ctx.pendingForRoleCount}** proposal(s) waiting for final DSW approval, and **${ctx.openCompetitionsCount}** competition(s) open across the university.`;
  } else if (user.roles.includes("HOS" /* HOS */) || user.roles.includes("SCHOOL_COORDINATOR" /* SCHOOL_COORDINATOR */)) {
    roleIntro = `You are logged in as **${roleLabel}**. You currently have **${ctx.pendingForRoleCount}** school proposal(s) pending your HOS review.`;
  } else if (user.roles.includes("HOD" /* HOD */)) {
    roleIntro = `You are logged in as **${roleLabel}**. You currently have **${ctx.pendingForRoleCount}** department proposal(s) pending your HOD review.`;
  } else if (user.roles.includes("FACULTY" /* FACULTY */) || user.roles.includes("CULTURAL_COORDINATOR" /* CULTURAL_COORDINATOR */)) {
    roleIntro = `You are logged in as **${roleLabel}**. You have created **${ctx.myProposalsCount}** proposal(s) so far. Ask me how to submit a proposal, extend registrations, or monitor participants!`;
  } else if (user.roles.includes("JUDGE" /* JUDGE */)) {
    roleIntro = `You are logged in as **${roleLabel}**. I can guide you through scoring participants, tie-breakers, and publishing results.`;
  } else {
    roleIntro = `You are logged in as a **Student**. There are **${ctx.openCompetitionsCount}** competition(s) open for registration right now, and you have **${ctx.myRegistrationsCount}** active registration(s).`;
  }
  return {
    reply: `Hi ${name}! Welcome to the **CTU Competition Hub Assistant**.

${roleIntro}`,
    actions: getRoleActions(user),
    suggestions: getRoleSuggestions(user),
    roleLabel,
    mode: ENV.GEMINI_API_KEY ? "ai" : "smart-engine"
  };
}
async function generateChatReply(rawMessage, user, history = []) {
  const roleLabel = getPrimaryRoleLabel(user);
  const ctx = await gatherLiveContext(user);
  const defaultSuggestions = getRoleSuggestions(user);
  const aiResult = await tryGeminiAnswer(rawMessage, history, user, ctx, roleLabel);
  if (aiResult) return aiResult;
  const msg = rawMessage.trim().toLowerCase();
  const tokens = tokenize(rawMessage);
  const lastUserTurn = [...history].reverse().find((h) => h.sender === "user")?.text || "";
  const combinedTokens = tokens.length <= 6 && lastUserTurn ? [...tokens, ...tokenize(lastUserTurn)] : tokens;
  const matchedCompetition = ctx.publishedList.find((c) => {
    const titleWords = tokenize(c.title).filter((w) => w.length >= 4);
    const hits = titleWords.filter((tw) => tokens.some((ut) => ut === tw || editDistance(ut, tw) <= 1));
    return hits.length >= 2 || titleWords.length === 1 && hits.length === 1;
  });
  if (matchedCompetition && (msg.includes("about") || msg.includes("when") || msg.includes("seat") || msg.includes("status") || msg.includes("open") || msg.includes("date") || msg.includes("detail"))) {
    const remaining = Math.max(
      0,
      matchedCompetition.maxRegistrations - matchedCompetition.currentRegistrationsCount
    );
    const closeDateStr = matchedCompetition.registrationCloseDate ? new Date(matchedCompetition.registrationCloseDate).toLocaleDateString() : "TBA";
    return {
      reply: `**${matchedCompetition.title}**
- **Category:** ${matchedCompetition.category} (${matchedCompetition.participationType})
- **Current Status:** \`${matchedCompetition.status}\`
- **Registrations:** ${matchedCompetition.currentRegistrationsCount} / ${matchedCompetition.maxRegistrations} (${remaining} seats remaining)
- **Registration Deadline:** ${closeDateStr}`,
      actions: [
        { label: `Open ${matchedCompetition.title}`, path: `/competitions/${matchedCompetition.id}` }
      ],
      suggestions: defaultSuggestions,
      roleLabel,
      mode: "smart-engine"
    };
  }
  if (/^(hi|hello|hey|namaste|help|start|menu)\b/.test(msg) && msg.length < 25) {
    return getChatWelcome(user);
  }
  const intents = [
    {
      id: "extend_registration",
      keywords: [
        "extend",
        "extension",
        "reopen",
        "re-open",
        "increase",
        "deadline",
        "date",
        "capacity",
        "limit",
        "seats",
        "full",
        "done",
        "closed",
        "after closing",
        "more students",
        "pathway",
        "pathways",
        "postpone",
        "reschedule",
        "prolong"
      ],
      minScore: 4.5
    },
    {
      id: "cancel_registration",
      keywords: ["cancel", "withdraw", "unregister", "drop", "remove registration", "leave competition"],
      minScore: 3
    },
    {
      id: "edit_after_approval",
      keywords: ["edit", "update", "modify", "change details", "after submit", "after approval", "published"],
      minScore: 4.5
    },
    {
      id: "excel_import",
      keywords: ["excel", "xlsx", "csv", "bulk", "import", "upload faculty", "spreadsheet", "sheet"],
      minScore: 3
    },
    {
      id: "overview",
      keywords: ["what is", "about this project", "overview", "purpose", "explain project", "ctu competition hub"],
      minScore: 3
    },
    {
      id: "hierarchy",
      keywords: ["hierarchy", "approval flow", "workflow", "who approves", "bypass", "chain", "hod", "hos", "dsw"],
      minScore: 4
    },
    {
      id: "changes_requested",
      keywords: ["changes requested", "modification", "reject", "resubmit", "returned", "revision"],
      minScore: 3
    },
    {
      id: "live_queue",
      keywords: ["pending", "my queue", "how many", "open right now", "live count", "stats"],
      minScore: 3
    },
    {
      id: "create_proposal",
      keywords: ["create", "submit", "proposal", "new competition", "organize", "host event"],
      minScore: 3
    },
    {
      id: "review_approve",
      keywords: ["review", "approve", "publish", "final approval", "sign off"],
      minScore: 3
    },
    {
      id: "team_registration",
      keywords: ["team", "group", "leader", "members", "team size"],
      minScore: 3
    },
    {
      id: "student_registration",
      keywords: ["register", "registration", "join", "participate", "apply", "enroll", "eligibility", "eligible"],
      minScore: 3
    },
    {
      id: "certificates",
      keywords: ["certificate", "qr", "verify", "download certificate"],
      minScore: 3
    },
    {
      id: "monitoring",
      keywords: ["monitor", "monitoring", "progress bar", "remaining seats", "fill rate", "dashboard"],
      minScore: 3
    },
    {
      id: "judging_results",
      keywords: ["judge", "judging", "score", "rubric", "result", "winner", "tie", "correction"],
      minScore: 3
    },
    {
      id: "statuses",
      keywords: ["status", "statuses", "state", "draft", "lifecycle"],
      minScore: 3
    },
    {
      id: "reports_audit",
      keywords: ["report", "export", "audit", "logs", "history"],
      minScore: 3
    }
  ];
  const scored = intents.map((intent) => ({
    id: intent.id,
    score: fuzzyMatchScore(combinedTokens, intent.keywords),
    minScore: intent.minScore ?? 3
  })).sort((a, b) => b.score - a.score);
  const hasExtendIntent = fuzzyMatchScore(tokens, ["extend", "reopen", "increase", "postpone", "done", "closed", "pathway", "full"]) >= 2.2 && fuzzyMatchScore(tokens, ["registration", "registrations", "deadline", "capacity", "seats"]) >= 2.2;
  const topIntent = hasExtendIntent ? "extend_registration" : scored[0] && scored[0].score >= scored[0].minScore ? scored[0].id : "fallback";
  switch (topIntent) {
    case "extend_registration":
      return {
        reply: `**Pathways to Extend Registrations After Closing / Completion:**

Because registration rules are enforced strictly on the backend, **only DSW (\`DSW_ADMIN\` / \`SUPER_ADMIN\`)** can modify a competition once it is approved/published:

1. **Pathway 1 \u2014 Extend the Registration Deadline:**
   - If the closing date passed (\`REGISTRATION_CLOSED\`), **DSW** updates \`registrationCloseDate\` to a new future date (via \`PUT /api/competitions/:id\` or DSW management) and sets the status back to \`REGISTRATION_OPEN\`.
2. **Pathway 2 \u2014 Increase Participant / Team Capacity:**
   - If registrations stopped because **maximum seats filled up**, increasing \`registrationCloseDate\` alone is not enough\u2014**DSW** must also increase \`maxRegistrations\` (or \`maxTeams\`) above the current count and reopen registration.
3. **Pathway 3 \u2014 Faculty / HOD / HOS Request:**
   - Faculty, HOD, and HOS cannot directly edit a published competition. They must contact **DSW** to extend the window, **or** submit a fresh **Round 2 / Wildcard Entry** proposal through \`Faculty \u2192 HOD \u2192 HOS \u2192 DSW\`.`,
        actions: user && (user.roles.includes("DSW_ADMIN" /* DSW_ADMIN */) || user.roles.includes("SUPER_ADMIN" /* SUPER_ADMIN */)) ? [{ label: "DSW Dashboard", path: "/dsw/dashboard" }] : getRoleActions(user),
        suggestions: [
          "Who can edit a competition after approval?",
          "How does registration monitoring work?",
          "Explain all competition statuses"
        ],
        roleLabel,
        mode: "smart-engine"
      };
    case "cancel_registration":
      return {
        reply: `**Cancelling / Modifying a Student Registration:**

- Open **My Registrations** (\`/student/registrations\`) to view your active entries and unique Registration IDs.
- If a student cancels a valid registration before the event locks, the competition's \`currentRegistrationsCount\` automatically decrements and frees up a seat for other students.
- Unauthorized modifications by other users are blocked on the backend.`,
        actions: [{ label: "My Registrations", path: "/student/registrations" }],
        suggestions: defaultSuggestions,
        roleLabel,
        mode: "smart-engine"
      };
    case "edit_after_approval":
      return {
        reply: `**Who Can Edit a Competition & When:**

- **Creator (Faculty / HOD / HOS):** Can edit freely while status is \`DRAFT\`, \`CHANGES_REQUESTED\`, or \`REVISION_REQUIRED\`.
- **While Pending Approval:** Locked for creator edits so reviewers see an immutable proposal.
- **After Approval / Publication:** Only **DSW** can edit fields (such as dates, venue, capacity, or registration window) to preserve university governance and audit integrity.`,
        actions: getRoleActions(user),
        suggestions: [
          "Suppose registrations are closed, how can we extend them?",
          "What happens if changes are requested?"
        ],
        roleLabel,
        mode: "smart-engine"
      };
    case "excel_import":
      return {
        reply: `**Excel (\`.xlsx\` / \`.csv\`) Support in CTU Competition Hub:**

- **Built-in Exports:** You can currently export **Registrations** per competition and **University Reports** as \`.xlsx\` or \`.csv\` from **Reports & Exports** (\`/reports\`).
- **Bulk Faculty / User Import via Excel:** The server already includes \`xlsx\` and \`multer\`. An admin upload panel or import script can parse an Excel sheet (\`Name, Email, Role, School, Department, Phone\`) to create/update faculty accounts and map them automatically into the \`Faculty \u2192 HOD \u2192 HOS \u2192 DSW\` hierarchy.`,
        actions: [{ label: "Reports & Exports", path: "/reports" }],
        suggestions: defaultSuggestions,
        roleLabel,
        mode: "smart-engine"
      };
    case "overview":
      return {
        reply: `**CTU Competition Hub** is CT University's official, centralized competition management platform built for the **Directorate of Student Welfare (DSW)**.

- **Hierarchical Proposal Approvals:** \`Faculty \u2192 HOD \u2192 HOS \u2192 DSW\` workflow.
- **Schedule-Aware Publication:** Automatic \`PUBLISHED\` (upcoming) vs \`REGISTRATION_OPEN\` / \`REGISTRATION_CLOSED\` transitions.
- **Atomic Student Registration:** Individual & Team registration with database-level anti-overbooking locks.
- **Live Monitoring, Judging & QR Certificates:** Role-scoped analytics, rubric scoring, and verifiable PDF certificates.`,
        actions: getRoleActions(user),
        suggestions: defaultSuggestions,
        roleLabel,
        mode: "smart-engine"
      };
    case "hierarchy":
      return {
        reply: `**CT University Organizational Approval Hierarchy:**
\`Faculty / Coordinator \u2192 Head of Department (HOD) \u2192 Head of School (HOS) \u2192 Director Student Welfare (DSW)\`

1. **Faculty initiates:** Goes to **HOD** \u2192 **HOS** \u2192 **DSW**.
2. **HOD initiates:** Goes directly to **HOS** \u2192 **DSW** *(HOD cannot self-approve)*.
3. **HOS initiates:** Goes directly to **DSW**.
4. **DSW initiates:** Approves and publishes directly with full audit logging.

**Business Rule:** No competition becomes visible to students until **DSW** grants final approval and publishes it.`,
        actions: getRoleActions(user),
        suggestions: [
          "What happens if changes are requested?",
          "Suppose registrations are closed, how can we extend them?"
        ],
        roleLabel,
        mode: "smart-engine"
      };
    case "changes_requested":
      return {
        reply: `**How "Changes Requested" & Smart Resubmission Works:**

- Any reviewer (**HOD**, **HOS**, or **DSW**) can request modifications with comments.
- The proposal returns to the creator with status \`CHANGES_REQUESTED\`.
- When the creator edits and clicks **Resubmit**, it **resumes at the exact level that requested the changes** (e.g., if HOS requested changes, it returns directly to HOS\u2014not back to HOD).`,
        actions: getRoleActions(user),
        suggestions: defaultSuggestions,
        roleLabel,
        mode: "smart-engine"
      };
    case "live_queue":
      return {
        reply: `**Live Platform Counts:**
- **Open for Registration:** ${ctx.openCompetitionsCount} competition(s)
- **Upcoming Published:** ${ctx.upcomingCompetitionsCount} competition(s)
- **Registration Closed:** ${ctx.closedCompetitionsCount} competition(s)
` + (user ? `- **Pending for Your Role (${roleLabel}):** ${ctx.pendingForRoleCount} item(s)
` : "") + (user?.roles.includes("STUDENT" /* STUDENT */) ? `- **Your Registrations:** ${ctx.myRegistrationsCount}` : ""),
        actions: getRoleActions(user),
        suggestions: defaultSuggestions,
        roleLabel,
        mode: "smart-engine"
      };
    case "create_proposal":
      return {
        reply: `**How to Create & Submit a Competition Proposal:**

1. Open **Create Proposal** (\`/competitions/create\`).
2. Fill in title, category, individual/team format, proposed date/time, registration open/close dates, capacity, rules, and budget.
3. Your **School & Department** are auto-mapped from your account.
4. Save as **Draft** or click **Submit for Approval** to route it up the hierarchy.`,
        actions: user && !user.roles.includes("STUDENT" /* STUDENT */) ? [{ label: "Create Proposal", path: "/competitions/create" }] : [{ label: "Sign In as Staff", path: "/login" }],
        suggestions: defaultSuggestions,
        roleLabel,
        mode: "smart-engine"
      };
    case "review_approve":
      return {
        reply: `**How Approvals & Publication Work:**

- **HOD** reviews department proposals in **HOD Dashboard** and forwards to HOS.
- **HOS** reviews school proposals in **HOS Dashboard** and forwards to DSW.
- **DSW** performs final approval in **Approval Queue** and clicks **Publish**, making it visible to students based on the registration open/close schedule.`,
        actions: getRoleActions(user),
        suggestions: defaultSuggestions,
        roleLabel,
        mode: "smart-engine"
      };
    case "team_registration":
      return {
        reply: `**Team Registration Pathway:**

1. Open any team-based competition and click **Register**.
2. Enter your **Team Name** and add **Team Members** within the allowed \`minTeamSize\`\u2013\`maxTeamSize\`.
3. You are recorded as the **Team Leader**, a unique Registration ID is issued, and capacity is updated atomically.`,
        actions: getRoleActions(user),
        suggestions: defaultSuggestions,
        roleLabel,
        mode: "smart-engine"
      };
    case "student_registration":
      return {
        reply: `**Student Registration & Eligibility:**

1. Browse all DSW-published events on **Student Dashboard** or **Discover** (you don't need to belong to the organizing school for university-wide events).
2. Open the competition details page and click **Register Now**.
3. The backend checks eligibility, opening/closing dates, duplicate entries, and remaining seats atomically before issuing your Registration ID.`,
        actions: [
          { label: "Browse Competitions", path: user?.roles.includes("STUDENT" /* STUDENT */) ? "/student/dashboard" : "/discover" }
        ],
        suggestions: defaultSuggestions,
        roleLabel,
        mode: "smart-engine"
      };
    case "certificates":
      return {
        reply: `**Certificates & QR Verification:**

- Students download PDF certificates from **My Certificates** (\`/student/certificates\`) once results are published.
- Every certificate carries a QR code and unique number verifiable at \`/verify-certificate/:certNumber\`.`,
        actions: user?.roles.includes("STUDENT" /* STUDENT */) ? [{ label: "My Certificates", path: "/student/certificates" }] : [{ label: "Results Publishing", path: "/results/publishing" }],
        suggestions: defaultSuggestions,
        roleLabel,
        mode: "smart-engine"
      };
    case "monitoring":
      return {
        reply: `**Role-Scoped Registration Monitoring:**

- **Faculty:** Sees competitions they proposed/coordinate.
- **HOD:** Sees all competitions in their **Department**.
- **HOS:** Sees all competitions in their **School**.
- **DSW:** Sees **all university** competitions.

Each card displays live capacity, registrations received, remaining seats, and fill percentage.`,
        actions: getRoleActions(user),
        suggestions: defaultSuggestions,
        roleLabel,
        mode: "smart-engine"
      };
    case "judging_results":
      return {
        reply: `**Judging, Scoring & Results Publishing:**

1. Judges score participants using competition rubrics in **Judging Portal** (\`/judging/dashboard\`).
2. DSW / Coordinators generate & publish official results in **Results Publishing** (\`/results/publishing\`).
3. Official score corrections (if needed) are logged with audit trails.`,
        actions: [
          { label: "Judging Portal", path: "/judging/dashboard" },
          { label: "Results Publishing", path: "/results/publishing" }
        ],
        suggestions: defaultSuggestions,
        roleLabel,
        mode: "smart-engine"
      };
    case "statuses":
      return {
        reply: `**Competition Lifecycle Statuses:**
\`DRAFT\` \u2192 \`PENDING_HOD_APPROVAL\` \u2192 \`PENDING_HOS_APPROVAL\` \u2192 \`PENDING_DSW_APPROVAL\` \u2192 \`APPROVED_BY_DSW\` \u2192 \`PUBLISHED\` (Upcoming) \u2192 \`REGISTRATION_OPEN\` \u2192 \`REGISTRATION_CLOSED\` \u2192 \`COMPLETED\`.

Branch states: \`CHANGES_REQUESTED\`, \`REJECTED\`, \`CANCELLED\`.`,
        actions: getRoleActions(user),
        suggestions: defaultSuggestions,
        roleLabel,
        mode: "smart-engine"
      };
    case "reports_audit":
      return {
        reply: `**Reports & Audit Logs:**
- **Reports & Exports (\`/reports\`):** Export Excel/CSV participation and registration data.
- **Audit Logs (\`/audit-logs\`):** Immutable record of every approval decision, rejection reason, publication, and administrative action.`,
        actions: [
          { label: "Reports & Exports", path: "/reports" },
          { label: "Audit Logs", path: "/audit-logs" }
        ],
        suggestions: defaultSuggestions,
        roleLabel,
        mode: "smart-engine"
      };
    default:
      return {
        reply: `I'm your **CTU Competition Hub Guide** (${roleLabel}). I can answer questions about **workflows, extending closed registrations, approval hierarchy, proposal edits, student/team registration, judging, certificates, and live event stats**.

Could you rephrase or pick one of the topics below? *(Tip: Adding a \`GEMINI_API_KEY\` in \`server/.env\` also enables full conversational AI responses for any open-ended question.)*`,
        actions: getRoleActions(user),
        suggestions: defaultSuggestions,
        roleLabel,
        mode: "smart-engine"
      };
  }
}

// src/routes/chatRoutes.ts
var router15 = Router15();
router15.get("/welcome", authenticateOptional, async (req, res) => {
  try {
    const payload = await getChatWelcome(req.user);
    res.json({ success: true, data: payload });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Failed to load assistant." });
  }
});
router15.post("/ask", authenticateOptional, async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== "string" || !message.trim()) {
      res.status(400).json({ success: false, message: "Please enter a question." });
      return;
    }
    const payload = await generateChatReply(message, req.user, Array.isArray(history) ? history : []);
    res.json({ success: true, data: payload });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Failed to generate reply." });
  }
});
var chatRoutes_default = router15;

// src/app.ts
var isConnected = false;
var ensureConnected = async () => {
  if (!isConnected) {
    await connectDB();
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log("\u{1F331} No users found in database. Automatically running initial CTU seed data...");
      await runSeed();
    }
    await ensureOrgHierarchySynced();
    isConnected = true;
  }
};
var createApp = () => {
  const app2 = express();
  app2.use(cors({
    origin: "*",
    credentials: true
  }));
  app2.use(express.json({ limit: "10mb" }));
  app2.use(express.urlencoded({ extended: true, limit: "10mb" }));
  if (ENV.NODE_ENV !== "test") {
    app2.use(morgan("dev"));
  }
  app2.get(["/api/health", "/health"], (req, res) => {
    res.json({
      status: "UP",
      platform: "CTU Competition Hub",
      university: "CT University, Ludhiana, Punjab, India",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      version: "1.0.0"
    });
  });
  app2.use(async (req, res, next) => {
    if (req.path === "/api/health" || req.path === "/health" || req.path === "/") {
      return next();
    }
    try {
      await ensureConnected();
      next();
    } catch (err) {
      console.error("Database connection error in request:", err);
      res.status(500).json({
        success: false,
        message: "Database connection failed: " + err.message + ". Please ensure Atlas Network Access (0.0.0.0/0) is enabled."
      });
    }
  });
  const mountRoutes = (prefix) => {
    app2.use(`${prefix}/auth`, authRoutes_default);
    app2.use(`${prefix}/schools`, schoolRoutes_default);
    app2.use(`${prefix}/departments`, departmentRoutes_default);
    app2.use(`${prefix}/coordinators`, coordinatorRoutes_default);
    app2.use(`${prefix}/competitions`, competitionRoutes_default);
    app2.use(`${prefix}/registrations`, registrationRoutes_default);
    app2.use(`${prefix}/duties`, facultyDutyRoutes_default);
    app2.use(`${prefix}/judging`, judgingRoutes_default);
    app2.use(`${prefix}/results`, resultRoutes_default);
    app2.use(`${prefix}/certificates`, certificateRoutes_default);
    app2.use(`${prefix}/notifications`, notificationRoutes_default);
    app2.use(`${prefix}/reports`, reportRoutes_default);
    app2.use(`${prefix}/audit-logs`, auditRoutes_default);
    app2.use(`${prefix}/monitoring`, monitoringRoutes_default);
    app2.use(`${prefix}/chat`, chatRoutes_default);
  };
  mountRoutes("/api");
  mountRoutes("");
  app2.use(errorHandler);
  return app2;
};
var app = createApp();
function handler(req, res) {
  return app(req, res);
}
Object.assign(handler, app);
export {
  app,
  createApp,
  handler as default,
  ensureConnected
};
