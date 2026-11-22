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

// server/src/types/enums.ts
var UserRole, CompetitionScope, CompetitionCategory, CompetitionStatus, RegistrationStatus, FacultyDutyStatus, FacultyDutyCategory, ResultCategory, CertificateType;
var init_enums = __esm({
  "server/src/types/enums.ts"() {
    "use strict";
    UserRole = /* @__PURE__ */ ((UserRole3) => {
      UserRole3["SUPER_ADMIN"] = "SUPER_ADMIN";
      UserRole3["DSW_ADMIN"] = "DSW_ADMIN";
      UserRole3["SCHOOL_COORDINATOR"] = "SCHOOL_COORDINATOR";
      UserRole3["CULTURAL_COORDINATOR"] = "CULTURAL_COORDINATOR";
      UserRole3["COMPETITION_ORGANIZER"] = "COMPETITION_ORGANIZER";
      UserRole3["FACULTY"] = "FACULTY";
      UserRole3["JUDGE"] = "JUDGE";
      UserRole3["STUDENT"] = "STUDENT";
      UserRole3["VOLUNTEER"] = "VOLUNTEER";
      return UserRole3;
    })(UserRole || {});
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
    CompetitionStatus = /* @__PURE__ */ ((CompetitionStatus2) => {
      CompetitionStatus2["DRAFT"] = "DRAFT";
      CompetitionStatus2["SUBMITTED"] = "SUBMITTED";
      CompetitionStatus2["UNDER_REVIEW"] = "UNDER_REVIEW";
      CompetitionStatus2["REVISION_REQUIRED"] = "REVISION_REQUIRED";
      CompetitionStatus2["RESUBMITTED"] = "RESUBMITTED";
      CompetitionStatus2["APPROVED"] = "APPROVED";
      CompetitionStatus2["PUBLISHED"] = "PUBLISHED";
      CompetitionStatus2["REGISTRATION_OPEN"] = "REGISTRATION_OPEN";
      CompetitionStatus2["REGISTRATION_CLOSED"] = "REGISTRATION_CLOSED";
      CompetitionStatus2["IN_PROGRESS"] = "IN_PROGRESS";
      CompetitionStatus2["COMPLETED"] = "COMPLETED";
      CompetitionStatus2["ARCHIVED"] = "ARCHIVED";
      CompetitionStatus2["REJECTED"] = "REJECTED";
      CompetitionStatus2["CANCELLED"] = "CANCELLED";
      CompetitionStatus2["POSTPONED"] = "POSTPONED";
      return CompetitionStatus2;
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

// server/src/models/User.ts
var User_exports = {};
__export(User_exports, {
  User: () => User
});
import mongoose2, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
var UserSchema, User;
var init_User = __esm({
  "server/src/models/User.ts"() {
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

// server/src/app.ts
import express from "express";
import cors from "cors";
import morgan from "morgan";

// server/src/config/env.ts
import dotenv from "dotenv";
dotenv.config();
var ENV = {
  PORT: process.env.PORT || 5e3,
  MONGODB_URI: process.env.MONGODB_URI || "mongodb+srv://vashishtsandhu_db_user:TJ8jxQgCdpg9fWZ6@cluster0.ixwtbna.mongodb.net/ctu_competition_hub?retryWrites=true&w=majority",
  USE_IN_MEMORY_DB: process.env.USE_IN_MEMORY_DB === "true" || false,
  JWT_SECRET: process.env.JWT_SECRET || "ctu_super_secure_jwt_secret_key_2026_dsw_competition_hub",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "ctu_super_secure_refresh_secret_key_2026_dsw_competition_hub",
  NODE_ENV: process.env.NODE_ENV || "development",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173"
};

// server/src/middleware/errorHandler.ts
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

// server/src/config/db.ts
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

// server/src/app.ts
init_User();

// server/src/models/index.ts
init_User();

// server/src/models/School.ts
import mongoose3, { Schema as Schema2 } from "mongoose";
var SchoolSchema = new Schema2(
  {
    name: { type: String, required: true, unique: true, trim: true },
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    description: { type: String, trim: true },
    departments: [{ type: String, trim: true }],
    programmes: [{ type: String, trim: true }],
    deanName: { type: String, trim: true },
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
var School = mongoose3.model("School", SchoolSchema);

// server/src/models/Competition.ts
init_enums();
import mongoose4, { Schema as Schema3 } from "mongoose";
var CompetitionSchema = new Schema3(
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
    organizingSchool: { type: Schema3.Types.ObjectId, ref: "School", index: true },
    coOrganizingSchools: [{ type: Schema3.Types.ObjectId, ref: "School" }],
    isCentralDSW: { type: Boolean, default: false },
    organizer: { type: Schema3.Types.ObjectId, ref: "User", required: true, index: true },
    facultyCoordinator: { type: Schema3.Types.ObjectId, ref: "User" },
    centralCoordinator: { type: Schema3.Types.ObjectId, ref: "User" },
    bannerUrl: { type: String },
    objectives: { type: String, trim: true },
    rulesAndRegulations: { type: String, trim: true },
    proposedDate: { type: Date, required: true, index: true },
    startDate: { type: Date },
    endDate: { type: Date },
    registrationOpenDate: { type: Date },
    registrationCloseDate: { type: Date },
    venue: { type: String, required: true, trim: true },
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
    eligibleSchools: [{ type: Schema3.Types.ObjectId, ref: "School" }],
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
    status: {
      type: String,
      enum: Object.values(CompetitionStatus),
      default: "DRAFT" /* DRAFT */,
      index: true
    },
    isPublished: { type: Boolean, default: false, index: true },
    publishedAt: { type: Date },
    submissionRemarks: { type: String, trim: true },
    dswRemarks: { type: String, trim: true },
    rejectionReason: { type: String, trim: true },
    revisionNotes: { type: String, trim: true },
    approvalAuditTrail: [
      {
        user: { type: Schema3.Types.ObjectId, ref: "User", required: true },
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
var Competition = mongoose4.model("Competition", CompetitionSchema);

// server/src/models/CompetitionProposalVersion.ts
import mongoose5, { Schema as Schema4 } from "mongoose";
var CompetitionProposalVersionSchema = new Schema4(
  {
    competitionId: { type: Schema4.Types.ObjectId, ref: "Competition", required: true, index: true },
    versionNumber: { type: Number, required: true },
    changesSummary: { type: String, required: true },
    snapshotData: { type: Schema4.Types.Mixed, required: true },
    modifiedBy: { type: Schema4.Types.ObjectId, ref: "User", required: true },
    timestamp: { type: Date, default: Date.now }
  },
  { timestamps: true }
);
var CompetitionProposalVersion = mongoose5.model(
  "CompetitionProposalVersion",
  CompetitionProposalVersionSchema
);

// server/src/models/Registration.ts
init_enums();
import mongoose6, { Schema as Schema5 } from "mongoose";
var RegistrationSchema = new Schema5(
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
      type: Schema5.Types.ObjectId,
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
      type: Schema5.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    school: {
      type: Schema5.Types.ObjectId,
      ref: "School",
      index: true
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
      type: Schema5.Types.ObjectId,
      ref: "User"
    },
    customFieldResponses: {
      type: Schema5.Types.Mixed
    },
    remarks: {
      type: String
    }
  },
  { timestamps: true }
);
RegistrationSchema.index({ competitionId: 1, userId: 1 }, { unique: true });
var Registration = mongoose6.model("Registration", RegistrationSchema);

// server/src/models/FacultyDuty.ts
init_enums();
import mongoose7, { Schema as Schema6 } from "mongoose";
var FacultyDutySchema = new Schema6(
  {
    competitionId: { type: Schema6.Types.ObjectId, ref: "Competition", required: true, index: true },
    facultyId: { type: Schema6.Types.ObjectId, ref: "User", required: true, index: true },
    assignedBy: { type: Schema6.Types.ObjectId, ref: "User", required: true },
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
    verifiedBy: { type: Schema6.Types.ObjectId, ref: "User" },
    reassignmentRequest: {
      reason: { type: String },
      requestedAt: { type: Date }
    }
  },
  { timestamps: true }
);
var FacultyDuty = mongoose7.model("FacultyDuty", FacultyDutySchema);

// server/src/models/CulturalCoordinatorAssignment.ts
import mongoose8, { Schema as Schema7 } from "mongoose";
var CulturalCoordinatorAssignmentSchema = new Schema7(
  {
    schoolId: { type: Schema7.Types.ObjectId, ref: "School", required: true, index: true },
    coordinatorId: { type: Schema7.Types.ObjectId, ref: "User", required: true, index: true },
    appointedBy: { type: Schema7.Types.ObjectId, ref: "User", required: true },
    termStart: { type: Date, default: Date.now },
    termEnd: { type: Date },
    isActive: { type: Boolean, default: true, index: true },
    responsibilities: [{ type: String }],
    handoverNotes: { type: String }
  },
  { timestamps: true }
);
var CulturalCoordinatorAssignment = mongoose8.model(
  "CulturalCoordinatorAssignment",
  CulturalCoordinatorAssignmentSchema
);

// server/src/models/JudgingRubric.ts
import mongoose9, { Schema as Schema8 } from "mongoose";
var JudgingRubricSchema = new Schema8(
  {
    competitionId: { type: Schema8.Types.ObjectId, ref: "Competition", required: true, unique: true, index: true },
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
var JudgingRubric = mongoose9.model("JudgingRubric", JudgingRubricSchema);

// server/src/models/Score.ts
import mongoose10, { Schema as Schema9 } from "mongoose";
var ScoreSchema = new Schema9(
  {
    competitionId: { type: Schema9.Types.ObjectId, ref: "Competition", required: true, index: true },
    judgeId: { type: Schema9.Types.ObjectId, ref: "User", required: true, index: true },
    registrationId: { type: Schema9.Types.ObjectId, ref: "Registration", required: true, index: true },
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
var Score = mongoose10.model("Score", ScoreSchema);

// server/src/models/CompetitionResult.ts
init_enums();
import mongoose11, { Schema as Schema10 } from "mongoose";
var CompetitionResultSchema = new Schema10(
  {
    competitionId: { type: Schema10.Types.ObjectId, ref: "Competition", required: true, index: true },
    registrationId: { type: Schema10.Types.ObjectId, ref: "Registration", required: true, index: true },
    participantName: { type: String, required: true },
    school: { type: Schema10.Types.ObjectId, ref: "School" },
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
    publishedBy: { type: Schema10.Types.ObjectId, ref: "User" },
    history: [
      {
        modifiedBy: { type: Schema10.Types.ObjectId, ref: "User", required: true },
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
var CompetitionResult = mongoose11.model("CompetitionResult", CompetitionResultSchema);

// server/src/models/Certificate.ts
init_enums();
import mongoose12, { Schema as Schema11 } from "mongoose";
var CertificateSchema = new Schema11(
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
    competitionId: { type: Schema11.Types.ObjectId, ref: "Competition", required: true, index: true },
    recipientId: { type: Schema11.Types.ObjectId, ref: "User", required: true, index: true },
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
var Certificate = mongoose12.model("Certificate", CertificateSchema);

// server/src/models/Notification.ts
import mongoose13, { Schema as Schema12 } from "mongoose";
var NotificationSchema = new Schema12(
  {
    recipient: { type: Schema12.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ["INFO", "SUCCESS", "WARNING", "ALERT"],
      default: "INFO"
    },
    actionUrl: { type: String, trim: true },
    metadata: { type: Schema12.Types.Mixed },
    isRead: { type: Boolean, default: false, index: true }
  },
  { timestamps: true }
);
var Notification = mongoose13.model("Notification", NotificationSchema);

// server/src/models/AuditLog.ts
import mongoose14, { Schema as Schema13 } from "mongoose";
var AuditLogSchema = new Schema13(
  {
    user: { type: Schema13.Types.ObjectId, ref: "User" },
    userName: { type: String },
    role: { type: String, required: true },
    action: { type: String, required: true, index: true },
    resourceType: { type: String, required: true, index: true },
    resourceId: { type: String, index: true },
    previousState: { type: Schema13.Types.Mixed },
    newState: { type: Schema13.Types.Mixed },
    remarks: { type: String },
    ipAddress: { type: String },
    userAgent: { type: String }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);
var AuditLog = mongoose14.model("AuditLog", AuditLogSchema);

// server/src/models/SystemSetting.ts
import mongoose15, { Schema as Schema14 } from "mongoose";
var SystemSettingSchema = new Schema14(
  {
    key: { type: String, required: true, unique: true, index: true },
    value: { type: Schema14.Types.Mixed, required: true },
    category: { type: String, default: "GENERAL" },
    description: { type: String },
    updatedBy: { type: Schema14.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);
var SystemSetting = mongoose15.model("SystemSetting", SystemSettingSchema);

// server/src/scripts/seed.ts
init_enums();

// server/src/services/qrService.ts
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

// server/src/scripts/seed.ts
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

// server/src/routes/authRoutes.ts
init_User();
import { Router } from "express";
import jwt2 from "jsonwebtoken";

// server/src/middleware/auth.ts
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

// server/src/routes/authRoutes.ts
init_enums();

// server/src/services/auditService.ts
import mongoose16 from "mongoose";
var logAudit = async (options) => {
  try {
    await AuditLog.create({
      user: options.user ? new mongoose16.Types.ObjectId(options.user) : void 0,
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

// server/src/routes/authRoutes.ts
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
    const user = await User.findOne({ email: email.toLowerCase().trim() }).populate("school");
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
    const user = await User.findById(req.userId).populate("school").select("-password");
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
    const user = await User.findOne({ roles: role, isActive: true }).populate("school");
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

// server/src/routes/schoolRoutes.ts
import { Router as Router2 } from "express";
init_User();

// server/src/middleware/rbac.ts
init_enums();
var requireRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.userRoles) {
      res.status(401).json({ success: false, message: "Unauthorized. Authentication required." });
      return;
    }
    const hasGlobalAccess = req.userRoles.includes("SUPER_ADMIN" /* SUPER_ADMIN */) || req.userRoles.includes("DSW_ADMIN" /* DSW_ADMIN */);
    if (hasGlobalAccess) {
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

// server/src/routes/schoolRoutes.ts
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

// server/src/routes/coordinatorRoutes.ts
import { Router as Router3 } from "express";
init_User();
init_enums();

// server/src/services/notificationService.ts
import mongoose17 from "mongoose";
var sendNotification = async (options) => {
  try {
    await Notification.create({
      recipient: new mongoose17.Types.ObjectId(options.recipient),
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
var broadcastToRoles = async (roles, title, message, actionUrl) => {
  try {
    const { User: User2 } = await Promise.resolve().then(() => (init_User(), User_exports));
    const users = await User2.find({ roles: { $in: roles }, isActive: true }).select("_id");
    const docs = users.map((u) => ({
      recipient: u._id,
      title,
      message,
      type: "INFO",
      actionUrl,
      isRead: false
    }));
    if (docs.length > 0) {
      await Notification.insertMany(docs);
    }
  } catch (error) {
    console.error("Failed to broadcast notifications:", error);
  }
};

// server/src/routes/coordinatorRoutes.ts
var router3 = Router3();
router3.get(
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
router3.post(
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
router3.post(
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
router3.get(
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
var coordinatorRoutes_default = router3;

// server/src/routes/competitionRoutes.ts
import { Router as Router4 } from "express";
init_enums();
var router4 = Router4();
router4.get("/public", async (req, res) => {
  try {
    const { category, scope, schoolId, search, status } = req.query;
    const filter = {
      isPublished: true,
      status: { $in: ["PUBLISHED" /* PUBLISHED */, "REGISTRATION_OPEN" /* REGISTRATION_OPEN */, "REGISTRATION_CLOSED" /* REGISTRATION_CLOSED */, "IN_PROGRESS" /* IN_PROGRESS */, "COMPLETED" /* COMPLETED */] }
    };
    if (category) filter.category = category;
    if (scope) filter.scope = scope;
    if (schoolId) filter.organizingSchool = schoolId;
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { title: { $regex: String(search), $options: "i" } },
        { code: { $regex: String(search), $options: "i" } },
        { description: { $regex: String(search), $options: "i" } }
      ];
    }
    const competitions = await Competition.find(filter).populate("organizingSchool", "name code").populate("organizer", "name email").populate("facultyCoordinator", "name email designation").sort({ proposedDate: 1 });
    res.json({ success: true, count: competitions.length, data: competitions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router4.get("/", authenticate, async (req, res) => {
  try {
    const { category, scope, schoolId, status, search, page = 1, limit = 50 } = req.query;
    const filter = {};
    const isGlobal = req.userRoles?.includes("DSW_ADMIN" /* DSW_ADMIN */) || req.userRoles?.includes("SUPER_ADMIN" /* SUPER_ADMIN */);
    if (!isGlobal && req.userRoles?.includes("SCHOOL_COORDINATOR" /* SCHOOL_COORDINATOR */) && req.user?.school) {
      filter.$or = [
        { organizingSchool: req.user.school },
        { coOrganizingSchools: req.user.school },
        { organizer: req.user._id }
      ];
    }
    if (category) filter.category = category;
    if (scope) filter.scope = scope;
    if (schoolId) filter.organizingSchool = schoolId;
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { title: { $regex: String(search), $options: "i" } },
        { code: { $regex: String(search), $options: "i" } }
      ];
    }
    const skip = (Number(page) - 1) * Number(limit);
    const [competitions, total] = await Promise.all([
      Competition.find(filter).populate("organizingSchool", "name code").populate("coOrganizingSchools", "name code").populate("organizer", "name email designation").populate("facultyCoordinator", "name email designation").populate("centralCoordinator", "name email").sort({ updatedAt: -1 }).skip(skip).limit(Number(limit)),
      Competition.countDocuments(filter)
    ]);
    res.json({
      success: true,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      data: competitions
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router4.get("/:id", async (req, res) => {
  try {
    const competition = await Competition.findById(req.params.id).populate("organizingSchool", "name code description deanName").populate("coOrganizingSchools", "name code").populate("eligibleSchools", "name code").populate("organizer", "name email phone designation").populate("facultyCoordinator", "name email phone designation").populate("centralCoordinator", "name email phone designation").populate("approvalAuditTrail.user", "name email roles");
    if (!competition) {
      res.status(404).json({ success: false, message: "Competition not found." });
      return;
    }
    res.json({ success: true, data: competition });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router4.post(
  "/",
  authenticate,
  requireRoles(
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
        scope,
        organizingSchool,
        coOrganizingSchools,
        isCentralDSW,
        facultyCoordinator,
        bannerUrl,
        objectives,
        rulesAndRegulations,
        proposedDate,
        startDate,
        endDate,
        registrationOpenDate,
        registrationCloseDate,
        venue,
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
        registrationFee,
        participantRequirements,
        requiredDocuments,
        customFields,
        requiredFacultyCount,
        requiredVolunteersCount,
        equipment,
        venueResources,
        budgetProposal,
        prizeDetails,
        sponsorshipInfo,
        submitForReview
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
      const initialStatus = submitForReview ? "SUBMITTED" /* SUBMITTED */ : "DRAFT" /* DRAFT */;
      const competition = new Competition({
        title: title.trim(),
        code: code.toUpperCase().trim(),
        description: description?.trim() || "Competition description",
        category: category || "TECHNICAL" /* TECHNICAL */,
        scope: scope || "UNIVERSITY_LEVEL" /* UNIVERSITY_LEVEL */,
        organizingSchool: isCentralDSW ? void 0 : organizingSchool || req.user?.school,
        coOrganizingSchools: coOrganizingSchools || [],
        isCentralDSW: Boolean(isCentralDSW),
        organizer: req.user._id,
        facultyCoordinator: facultyCoordinator || void 0,
        bannerUrl: bannerUrl || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80",
        objectives: objectives?.trim(),
        rulesAndRegulations: rulesAndRegulations?.trim(),
        proposedDate: new Date(proposedDate),
        startDate: startDate ? new Date(startDate) : new Date(proposedDate),
        endDate: endDate ? new Date(endDate) : new Date(proposedDate),
        registrationOpenDate: registrationOpenDate ? new Date(registrationOpenDate) : void 0,
        registrationCloseDate: registrationCloseDate ? new Date(registrationCloseDate) : void 0,
        venue: venue.trim(),
        alternativeVenue: alternativeVenue?.trim(),
        durationMinutes: durationMinutes ? Number(durationMinutes) : 180,
        reportingTime: reportingTime || "09:00 AM",
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
        budgetProposal: typeof budgetProposal === "object" && budgetProposal !== null ? Number(budgetProposal.totalEstimatedBudget || budgetProposal.amount || 0) || 0 : Number(budgetProposal) || 0,
        prizeDetails: prizeDetails || {
          winner: "\u20B910,000 + Trophy + Certificate",
          firstRunnerUp: "\u20B95,000 + Trophy + Certificate",
          secondRunnerUp: "\u20B92,500 + Medal + Certificate"
        },
        sponsorshipInfo: sponsorshipInfo?.trim(),
        status: initialStatus,
        isPublished: false,
        approvalAuditTrail: [
          {
            user: req.user._id,
            role: req.user.roles[0],
            action: submitForReview ? "PROPOSAL_SUBMITTED" : "DRAFT_CREATED",
            previousStatus: "DRAFT" /* DRAFT */,
            newStatus: initialStatus,
            remarks: submitForReview ? "Submitted directly for DSW review" : "Draft created",
            timestamp: /* @__PURE__ */ new Date()
          }
        ]
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
        newState: competition.toObject(),
        ipAddress: req.ip
      });
      if (submitForReview) {
        await broadcastToRoles(
          ["DSW_ADMIN" /* DSW_ADMIN */, "SUPER_ADMIN" /* SUPER_ADMIN */],
          "New Competition Proposal Submitted",
          `"${competition.title}" (${competition.code}) has been submitted for DSW verification.`,
          `/dsw/approval-queue`
        );
      }
      res.status(201).json({
        success: true,
        message: submitForReview ? "Proposal created and submitted for review." : "Draft proposal saved successfully.",
        data: competition
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);
router4.put("/:id", authenticate, async (req, res) => {
  try {
    const competition = await Competition.findById(req.params.id);
    if (!competition) {
      res.status(404).json({ success: false, message: "Competition not found." });
      return;
    }
    const isDSW = req.userRoles?.includes("DSW_ADMIN" /* DSW_ADMIN */) || req.userRoles?.includes("SUPER_ADMIN" /* SUPER_ADMIN */);
    const isOrganizer = competition.organizer.toString() === req.user._id.toString();
    if (!isDSW && !isOrganizer) {
      res.status(403).json({ success: false, message: "You do not have permission to edit this competition." });
      return;
    }
    if (!isDSW && !["DRAFT", "REVISION_REQUIRED"].includes(competition.status)) {
      res.status(400).json({
        success: false,
        message: `Cannot edit competition in ${competition.status} status. Only DRAFT and REVISION_REQUIRED can be updated.`
      });
      return;
    }
    const previousSnapshot = competition.toObject();
    const updatableFields = [
      "title",
      "description",
      "category",
      "scope",
      "organizingSchool",
      "coOrganizingSchools",
      "facultyCoordinator",
      "centralCoordinator",
      "bannerUrl",
      "objectives",
      "rulesAndRegulations",
      "proposedDate",
      "startDate",
      "endDate",
      "registrationOpenDate",
      "registrationCloseDate",
      "venue",
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
      "registrationFee",
      "participantRequirements",
      "requiredDocuments",
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
    if (req.body.resubmit && competition.status === "REVISION_REQUIRED" /* REVISION_REQUIRED */) {
      competition.status = "RESUBMITTED" /* RESUBMITTED */;
      competition.approvalAuditTrail.push({
        user: req.user._id,
        role: req.user.roles[0],
        action: "PROPOSAL_RESUBMITTED",
        previousStatus: "REVISION_REQUIRED" /* REVISION_REQUIRED */,
        newStatus: "RESUBMITTED" /* RESUBMITTED */,
        remarks: req.body.resubmissionNotes || "Addressed requested revisions and resubmitted.",
        timestamp: /* @__PURE__ */ new Date()
      });
    }
    await competition.save();
    const versionCount = await CompetitionProposalVersion.countDocuments({ competitionId: competition._id });
    await CompetitionProposalVersion.create({
      competitionId: competition._id,
      versionNumber: versionCount + 1,
      changesSummary: req.body.changesSummary || "Updated proposal configuration",
      snapshotData: competition.toObject(),
      modifiedBy: req.user._id
    });
    res.json({ success: true, message: "Competition updated successfully.", data: competition });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router4.post("/:id/submit", authenticate, async (req, res) => {
  try {
    const competition = await Competition.findById(req.params.id);
    if (!competition) {
      res.status(404).json({ success: false, message: "Competition not found." });
      return;
    }
    if (!["DRAFT" /* DRAFT */, "REVISION_REQUIRED" /* REVISION_REQUIRED */].includes(competition.status)) {
      res.status(400).json({
        success: false,
        message: `Only DRAFT or REVISION_REQUIRED competitions can be submitted. Current status: ${competition.status}`
      });
      return;
    }
    const previousStatus = competition.status;
    const newStatus = previousStatus === "REVISION_REQUIRED" /* REVISION_REQUIRED */ ? "RESUBMITTED" /* RESUBMITTED */ : "SUBMITTED" /* SUBMITTED */;
    competition.status = newStatus;
    competition.submissionRemarks = req.body.remarks || "Submitted for DSW evaluation";
    competition.approvalAuditTrail.push({
      user: req.user._id,
      role: req.user.roles[0],
      action: newStatus === "RESUBMITTED" /* RESUBMITTED */ ? "PROPOSAL_RESUBMITTED" : "PROPOSAL_SUBMITTED",
      previousStatus,
      newStatus,
      remarks: competition.submissionRemarks,
      timestamp: /* @__PURE__ */ new Date()
    });
    await competition.save();
    await broadcastToRoles(
      ["DSW_ADMIN" /* DSW_ADMIN */, "SUPER_ADMIN" /* SUPER_ADMIN */],
      "Competition Proposal Ready for Review",
      `"${competition.title}" has been submitted for DSW verification.`,
      "/dsw/approval-queue"
    );
    res.json({ success: true, message: "Proposal submitted for DSW review.", data: competition });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router4.post(
  "/:id/review",
  authenticate,
  requireRoles("DSW_ADMIN" /* DSW_ADMIN */, "SUPER_ADMIN" /* SUPER_ADMIN */),
  async (req, res) => {
    try {
      const { action, remarks, centralCoordinatorId } = req.body;
      if (!["APPROVE", "REJECT", "REVISION_REQUIRED"].includes(action)) {
        res.status(400).json({ success: false, message: "Action must be APPROVE, REJECT, or REVISION_REQUIRED." });
        return;
      }
      if ((action === "REJECT" || action === "REVISION_REQUIRED") && (!remarks || remarks.trim().length < 5)) {
        res.status(400).json({ success: false, message: "Mandatory detailed remarks required for rejection or revision request." });
        return;
      }
      const competition = await Competition.findById(req.params.id);
      if (!competition) {
        res.status(404).json({ success: false, message: "Competition not found." });
        return;
      }
      const previousStatus = competition.status;
      let newStatus;
      if (action === "APPROVE") {
        newStatus = "APPROVED" /* APPROVED */;
        competition.dswRemarks = remarks || "Approved by DSW";
        if (centralCoordinatorId) {
          competition.centralCoordinator = centralCoordinatorId;
        }
      } else if (action === "REJECT") {
        newStatus = "REJECTED" /* REJECTED */;
        competition.rejectionReason = remarks;
      } else {
        newStatus = "REVISION_REQUIRED" /* REVISION_REQUIRED */;
        competition.revisionNotes = remarks;
      }
      competition.status = newStatus;
      competition.approvalAuditTrail.push({
        user: req.user._id,
        role: req.user.roles[0],
        action: `DSW_${action}`,
        previousStatus,
        newStatus,
        remarks,
        timestamp: /* @__PURE__ */ new Date()
      });
      await competition.save();
      await logAudit({
        user: req.user._id,
        userName: req.user.name,
        role: req.user.roles[0],
        action: `DSW_REVIEW_${action}`,
        resourceType: "COMPETITION",
        resourceId: competition._id.toString(),
        previousState: { status: previousStatus },
        newState: { status: newStatus },
        remarks,
        ipAddress: req.ip
      });
      await sendNotification({
        recipient: competition.organizer,
        title: `Competition Proposal ${action === "APPROVE" ? "Approved" : action === "REJECT" ? "Rejected" : "Returned for Revision"}`,
        message: `Your competition "${competition.title}" was reviewed by DSW: ${remarks || action}`,
        type: action === "APPROVE" ? "SUCCESS" : action === "REJECT" ? "ALERT" : "WARNING",
        actionUrl: `/competitions/${competition._id}`
      });
      res.json({
        success: true,
        message: `Competition successfully ${action === "APPROVE" ? "approved" : action === "REJECT" ? "rejected" : "returned for revision"}.`,
        data: competition
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);
router4.post(
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
      if (competition.status !== "APPROVED" /* APPROVED */) {
        res.status(400).json({
          success: false,
          message: `Only APPROVED competitions can be published. Current status is ${competition.status}.`
        });
        return;
      }
      const previousStatus = competition.status;
      const newStatus = "PUBLISHED" /* PUBLISHED */;
      competition.status = newStatus;
      competition.isPublished = true;
      competition.publishedAt = /* @__PURE__ */ new Date();
      competition.status = "REGISTRATION_OPEN" /* REGISTRATION_OPEN */;
      competition.approvalAuditTrail.push({
        user: req.user._id,
        role: req.user.roles[0],
        action: "COMPETITION_PUBLISHED",
        previousStatus,
        newStatus: "REGISTRATION_OPEN" /* REGISTRATION_OPEN */,
        remarks: req.body.remarks || "Competition officially published and registrations opened university-wide.",
        timestamp: /* @__PURE__ */ new Date()
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
        newState: { isPublished: true, status: "REGISTRATION_OPEN" /* REGISTRATION_OPEN */ },
        ipAddress: req.ip
      });
      await broadcastToRoles(
        ["STUDENT" /* STUDENT */],
        `New Competition Open: ${competition.title}`,
        `Registration is now open for ${competition.title}! Check details and register now.`,
        `/competitions/${competition._id}`
      );
      res.json({
        success: true,
        message: "Competition published and registration opened successfully!",
        data: competition
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);
router4.post(
  "/:id/status",
  authenticate,
  requireRoles("DSW_ADMIN" /* DSW_ADMIN */, "SUPER_ADMIN" /* SUPER_ADMIN */, "SCHOOL_COORDINATOR" /* SCHOOL_COORDINATOR */, "COMPETITION_ORGANIZER" /* COMPETITION_ORGANIZER */),
  async (req, res) => {
    try {
      const { status, remarks } = req.body;
      if (!Object.values(CompetitionStatus).includes(status)) {
        res.status(400).json({ success: false, message: "Invalid competition status." });
        return;
      }
      const competition = await Competition.findById(req.params.id);
      if (!competition) {
        res.status(404).json({ success: false, message: "Competition not found." });
        return;
      }
      const previousStatus = competition.status;
      competition.status = status;
      competition.approvalAuditTrail.push({
        user: req.user._id,
        role: req.user.roles[0],
        action: `STATUS_CHANGE_TO_${status}`,
        previousStatus,
        newStatus: status,
        remarks: remarks || `Status changed from ${previousStatus} to ${status}`,
        timestamp: /* @__PURE__ */ new Date()
      });
      await competition.save();
      res.json({ success: true, message: `Status updated to ${status}.`, data: competition });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);
var competitionRoutes_default = router4;

// server/src/routes/registrationRoutes.ts
import { Router as Router5 } from "express";
init_enums();

// server/src/services/exportService.ts
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

// server/src/routes/registrationRoutes.ts
var router5 = Router5();
router5.post("/", authenticate, async (req, res) => {
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
    if (!competition.isPublished || competition.status !== "REGISTRATION_OPEN" /* REGISTRATION_OPEN */) {
      res.status(400).json({
        success: false,
        message: `Registrations are not open for this competition. Current status: ${competition.status}`
      });
      return;
    }
    if (competition.registrationCloseDate && /* @__PURE__ */ new Date() > new Date(competition.registrationCloseDate)) {
      res.status(400).json({ success: false, message: "Registration deadline has passed." });
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
      const isEligibleSchool = competition.eligibleSchools.some((s) => s.toString() === userSchool);
      if (!isEligibleSchool) {
        res.status(403).json({
          success: false,
          message: "Your school is not eligible to participate in this competition according to the defined scope."
        });
        return;
      }
    }
    if (competition.eligibleProgrammes && competition.eligibleProgrammes.length > 0) {
      if (req.user?.programme && !competition.eligibleProgrammes.includes(req.user.programme)) {
        res.status(403).json({
          success: false,
          message: `Your programme (${req.user.programme}) is not among the eligible programmes.`
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
    const currentConfirmed = await Registration.countDocuments({
      competitionId,
      status: { $in: ["CONFIRMED" /* CONFIRMED */, "CHECKED_IN" /* CHECKED_IN */] }
    });
    let regStatus = "CONFIRMED" /* CONFIRMED */;
    if (competition.maxRegistrations && currentConfirmed >= competition.maxRegistrations) {
      regStatus = "WAITLISTED" /* WAITLISTED */;
    }
    if (competition.participationType === "TEAM" || participantType === "TEAM") {
      if (!teamName || teamName.trim().length === 0) {
        res.status(400).json({ success: false, message: "Team name is required for team participation." });
        return;
      }
      const membersCount = 1 + (teamMembers ? teamMembers.length : 0);
      if (competition.minTeamSize && membersCount < competition.minTeamSize) {
        res.status(400).json({
          success: false,
          message: `Minimum team size is ${competition.minTeamSize} members. You provided ${membersCount}.`
        });
        return;
      }
      if (competition.maxTeamSize && membersCount > competition.maxTeamSize) {
        res.status(400).json({
          success: false,
          message: `Maximum team size is ${competition.maxTeamSize} members. You provided ${membersCount}.`
        });
        return;
      }
    }
    const count = await Registration.countDocuments();
    const registrationNumber = `CTU-REG-2026-${String(count + 1001).padStart(5, "0")}`;
    const qrPayload = JSON.stringify({
      regNo: registrationNumber,
      comp: competition.code,
      user: req.user?.name,
      studentId: req.user?.registrationNumber,
      issuedAt: (/* @__PURE__ */ new Date()).toISOString()
    });
    const qrCodeData = await generateQRCodeDataUrl(qrPayload);
    const registration = new Registration({
      registrationNumber,
      competitionId,
      participantType: participantType || competition.participationType || "INDIVIDUAL",
      userId,
      school: req.user?.school,
      teamName: teamName?.trim(),
      teamMembers: teamMembers || [],
      status: regStatus,
      qrCodeData,
      customFieldResponses
    });
    await registration.save();
    await Competition.findByIdAndUpdate(competitionId, { $inc: { currentRegistrationsCount: 1 } });
    await logAudit({
      user: req.user._id,
      userName: req.user.name,
      role: req.user.roles[0],
      action: "REGISTER_COMPETITION",
      resourceType: "REGISTRATION",
      resourceId: registration._id.toString(),
      newState: { registrationNumber, status: regStatus, competitionTitle: competition.title },
      ipAddress: req.ip
    });
    await sendNotification({
      recipient: userId,
      title: regStatus === "CONFIRMED" /* CONFIRMED */ ? "Registration Confirmed!" : "Waitlisted for Competition",
      message: `Your registration (${registrationNumber}) for "${competition.title}" has been ${regStatus.toLowerCase()}.`,
      type: regStatus === "CONFIRMED" /* CONFIRMED */ ? "SUCCESS" : "WARNING",
      actionUrl: `/student/registrations`
    });
    res.status(201).json({
      success: true,
      message: regStatus === "CONFIRMED" /* CONFIRMED */ ? "Registration successful! Your digital badge and QR code are ready." : "Competition capacity reached. You have been placed on the waiting list.",
      data: registration
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router5.get("/my", authenticate, async (req, res) => {
  try {
    const registrations = await Registration.find({ userId: req.user._id }).populate("competitionId").populate("school", "name code").sort({ createdAt: -1 });
    res.json({ success: true, count: registrations.length, data: registrations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router5.get(
  "/competition/:competitionId",
  authenticate,
  async (req, res) => {
    try {
      const { status, search, page = 1, limit = 50 } = req.query;
      const filter = { competitionId: req.params.competitionId };
      if (status) filter.status = status;
      if (search) {
        filter.$or = [
          { registrationNumber: { $regex: String(search), $options: "i" } },
          { teamName: { $regex: String(search), $options: "i" } }
        ];
      }
      const skip = (Number(page) - 1) * Number(limit);
      const [registrations, total] = await Promise.all([
        Registration.find(filter).populate("userId", "name email registrationNumber phone department programme semester avatarUrl").populate("school", "name code").sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
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
router5.post("/:id/checkin", authenticate, async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id).populate("userId", "name email registrationNumber").populate("competitionId", "title code");
    if (!registration) {
      res.status(404).json({ success: false, message: "Registration record not found." });
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
router5.post("/:id/cancel", authenticate, async (req, res) => {
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
    registration.status = "CANCELLED" /* CANCELLED */;
    registration.remarks = req.body.reason || "Withdrawn by student";
    await registration.save();
    await Competition.findByIdAndUpdate(registration.competitionId, { $inc: { currentRegistrationsCount: -1 } });
    res.json({ success: true, message: "Registration successfully cancelled.", data: registration });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router5.get(
  "/competition/:competitionId/export/excel",
  authenticate,
  async (req, res) => {
    try {
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
router5.get(
  "/competition/:competitionId/export/csv",
  authenticate,
  async (req, res) => {
    try {
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
var registrationRoutes_default = router5;

// server/src/routes/facultyDutyRoutes.ts
import { Router as Router6 } from "express";
init_enums();
var router6 = Router6();
router6.get("/", authenticate, async (req, res) => {
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
router6.get("/my", authenticate, async (req, res) => {
  try {
    const duties = await FacultyDuty.find({ facultyId: req.user._id }).populate("competitionId", "title code venue proposedDate organizer").populate("assignedBy", "name email designation").sort({ date: 1 });
    res.json({ success: true, count: duties.length, data: duties });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router6.post(
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
router6.post("/:id/acknowledge", authenticate, async (req, res) => {
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
router6.post("/:id/complete", authenticate, async (req, res) => {
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
router6.post(
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
router6.post("/:id/reassign-request", authenticate, async (req, res) => {
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
router6.get("/analytics/overview", authenticate, async (req, res) => {
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
var facultyDutyRoutes_default = router6;

// server/src/routes/judgingRoutes.ts
import { Router as Router7 } from "express";
init_enums();
var router7 = Router7();
router7.get("/rubric/:competitionId", authenticate, async (req, res) => {
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
router7.post(
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
router7.get(
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
router7.post(
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
var judgingRoutes_default = router7;

// server/src/routes/resultRoutes.ts
import { Router as Router8 } from "express";
init_enums();
var router8 = Router8();
router8.get("/competition/:competitionId", async (req, res) => {
  try {
    const results = await CompetitionResult.find({ competitionId: req.params.competitionId }).populate("registrationId").populate("school", "name code").populate("publishedBy", "name email").sort({ rank: 1 });
    const competition = await Competition.findById(req.params.competitionId).select("title code status prizeDetails");
    res.json({ success: true, count: results.length, data: { competition, results } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router8.post(
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
router8.post(
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
router8.post(
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
var resultRoutes_default = router8;

// server/src/routes/certificateRoutes.ts
import { Router as Router9 } from "express";
init_enums();
var router9 = Router9();
router9.get("/verify/:certNumber", async (req, res) => {
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
router9.get("/my", authenticate, async (req, res) => {
  try {
    const certificates = await Certificate.find({ recipientId: req.user._id, isRevoked: false }).populate("competitionId", "title code proposedDate").sort({ issueDate: -1 });
    res.json({ success: true, count: certificates.length, data: certificates });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router9.get("/:id", authenticate, async (req, res) => {
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
router9.post(
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
var certificateRoutes_default = router9;

// server/src/routes/notificationRoutes.ts
import { Router as Router10 } from "express";
var router10 = Router10();
router10.get("/", authenticate, async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id }).sort({ createdAt: -1 }).limit(50);
    const unreadCount = await Notification.countDocuments({ recipient: req.user._id, isRead: false });
    res.json({ success: true, unreadCount, count: notifications.length, data: notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router10.post("/:id/read", authenticate, async (req, res) => {
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
router10.post("/read-all", authenticate, async (req, res) => {
  try {
    await Notification.updateMany({ recipient: req.user._id, isRead: false }, { isRead: true });
    res.json({ success: true, message: "All notifications marked as read." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
var notificationRoutes_default = router10;

// server/src/routes/reportRoutes.ts
import { Router as Router11 } from "express";
init_enums();
var router11 = Router11();
router11.get(
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
        Competition.countDocuments({ status: { $in: ["SUBMITTED", "UNDER_REVIEW", "REVISION_REQUIRED", "RESUBMITTED"] } }),
        Competition.countDocuments({ status: "APPROVED" }),
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
router11.get(
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
var reportRoutes_default = router11;

// server/src/routes/auditRoutes.ts
import { Router as Router12 } from "express";
init_enums();
var router12 = Router12();
router12.get(
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
var auditRoutes_default = router12;

// server/src/app.ts
var isConnected = false;
var ensureConnected = async () => {
  if (!isConnected) {
    await connectDB();
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log("\u{1F331} No users found in database. Automatically running initial CTU seed data...");
      await runSeed();
    }
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

// server/src/server.ts
if (!process.env.VERCEL) {
  const startServer = async () => {
    try {
      await ensureConnected();
      const server = handler.listen(ENV.PORT, () => {
        console.log(`=======================================================`);
        console.log(`\u{1F680} CTU Competition Hub Server is LIVE on port ${ENV.PORT}`);
        console.log(`\u{1F3DB}\uFE0F  Institution: CT University, Ludhiana, Punjab, India`);
        console.log(`\u{1F310} Base API URL: http://localhost:${ENV.PORT}/api`);
        console.log(`\u{1F3E5} Health Check: http://localhost:${ENV.PORT}/api/health`);
        console.log(`=======================================================`);
      });
      const shutdown = async () => {
        console.log("\n\u{1F6D1} Gracefully shutting down CTU Competition Hub server...");
        server.close(async () => {
          await disconnectDB();
          console.log("\u{1F50C} Database disconnected. Process terminated.");
          process.exit(0);
        });
      };
      process.on("SIGTERM", shutdown);
      process.on("SIGINT", shutdown);
    } catch (error) {
      console.error("\u274C Failed to start server:", error.message);
      process.exit(1);
    }
  };
  startServer();
}
var server_default = handler;
export {
  server_default as default
};
