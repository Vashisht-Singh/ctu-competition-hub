import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { connectDB, disconnectDB } from '../config/db.js';
import {
  User,
  School,
  Competition,
  Registration,
  FacultyDuty,
  CulturalCoordinatorAssignment,
  JudgingRubric,
  Score,
  CompetitionResult,
  Certificate,
  Notification,
  AuditLog,
} from '../models/index.js';
import {
  UserRole,
  CompetitionScope,
  CompetitionCategory,
  CompetitionStatus,
  RegistrationStatus,
  FacultyDutyCategory,
  FacultyDutyStatus,
  ResultCategory,
  CertificateType,
} from '../types/enums.js';
import { generateQRCodeDataUrl } from '../services/qrService.js';

export const runSeed = async () => {
  console.log('🌱 Starting CTU Competition Hub database seeding...');

  // Clear existing collections
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
    AuditLog.deleteMany({}),
  ]);

  console.log('🧹 Cleaned existing database collections.');

  // Common password for demo accounts
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('ctu@12345', salt);

  // 1. Create Core Administrators
  const superAdmin = await User.create({
    name: 'Er. Gurvinder Singh',
    email: 'superadmin@ctuniversity.in',
    password: hashedPassword,
    roles: [UserRole.SUPER_ADMIN, UserRole.DSW_ADMIN],
    designation: 'Chancellor / Chief Administrator',
    phone: '+91 98765 00001',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    isActive: true,
  });

  const dswAdmin = await User.create({
    name: 'Dr. Gurpreet Singh',
    email: 'dsw@ctuniversity.in',
    password: hashedPassword,
    roles: [UserRole.DSW_ADMIN],
    designation: 'Director Student Welfare (DSW)',
    department: 'Directorate of Student Welfare',
    phone: '+91 98765 00002',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    isActive: true,
  });

  console.log('👤 Created Super Admin and DSW Administrator.');

  // 2. Create the 8 Official Schools of CT University
  const schoolsData = [
    {
      name: 'School of Engineering and Technology',
      code: 'SOET',
      description: 'Hub for cutting-edge computing, artificial intelligence, robotics, and mechanical innovations.',
      deanName: 'Dr. Harmeet Singh',
      contactEmail: 'dean.soet@ctuniversity.in',
      departments: ['Computer Science & Engineering', 'Artificial Intelligence & Data Science', 'Civil Engineering', 'Mechanical & Robotics Engineering'],
      programmes: ['B.Tech CSE', 'B.Tech AI & ML', 'BCA', 'MCA', 'M.Tech CSE'],
    },
    {
      name: 'School of Management Studies',
      code: 'SMS',
      description: 'Developing futuristic leaders, entrepreneurs, and global business strategists.',
      deanName: 'Dr. Rohit Sharma',
      contactEmail: 'dean.sms@ctuniversity.in',
      departments: ['Marketing & Finance', 'Operations & Logistics', 'Human Resources', 'International Business'],
      programmes: ['BBA', 'B.Com (Hons)', 'MBA Finance', 'MBA Marketing', 'MBA Business Analytics'],
    },
    {
      name: 'School of Hotel Management, Airlines and Tourism',
      code: 'SOHMAT',
      description: 'Premier culinary arts, aviation hospitality, and international tourism academy.',
      deanName: 'Chef Sanjeev Kapoor (Advisor) / Dr. Vikram Oberoi',
      contactEmail: 'dean.sohmat@ctuniversity.in',
      departments: ['Food & Beverage Production', 'Airline Cabin Crew Management', 'Front Office Operations', 'Tourism Development'],
      programmes: ['B.Sc Hotel Management', 'B.Sc Airlines & Airport Management', 'Diploma in Bakery & Confectionery'],
    },
    {
      name: 'School of Law',
      code: 'SOL',
      description: 'Excellence in legal advocacy, moot court proceedings, constitutional law, and corporate jurisprudence.',
      deanName: 'Prof. (Dr.) Ravinder Kaur',
      contactEmail: 'dean.law@ctuniversity.in',
      departments: ['Constitutional Law', 'Criminal Jurisprudence', 'Corporate & Cyber Law', 'Intellectual Property Rights'],
      programmes: ['BA LL.B (Hons)', 'BBA LL.B (Hons)', 'LL.M Corporate Law'],
    },
    {
      name: 'School of Pharmaceutical Sciences',
      code: 'SOPS',
      description: 'Pioneering drug discovery, clinical pharmacy, pharmacology, and drug formulation.',
      deanName: 'Dr. Manjinder Singh',
      contactEmail: 'dean.sops@ctuniversity.in',
      departments: ['Pharmaceutics', 'Pharmacology & Toxicology', 'Pharmaceutical Chemistry', 'Pharmacognosy'],
      programmes: ['B.Pharm', 'D.Pharm', 'M.Pharm Pharmaceutics', 'Pharm.D'],
    },
    {
      name: 'School of Design and Innovation',
      code: 'SODI',
      description: 'Creative cradle for UI/UX, product design, fashion styling, animation, and multimedia.',
      deanName: 'Ar. Ananya Mukherjee',
      contactEmail: 'dean.sodi@ctuniversity.in',
      departments: ['UI/UX & Interactive Design', 'Fashion & Textile Design', 'Graphic & Animation Arts', 'Interior Architecture'],
      programmes: ['B.Des UI/UX', 'B.Des Fashion', 'B.Sc Animation & VFX', 'B.Des Interior Design'],
    },
    {
      name: 'School of Allied and Healthcare',
      code: 'SOAH',
      description: 'Advancing medical laboratory technology, radiology, physiotherapy, and optometrist care.',
      deanName: 'Dr. Simranjeet Kaur',
      contactEmail: 'dean.soah@ctuniversity.in',
      departments: ['Medical Lab Technology', 'Physiotherapy & Rehabilitation', 'Radiology & Imaging', 'Optometry & Vision Science'],
      programmes: ['B.Sc MLT', 'BPT (Physiotherapy)', 'B.Sc Radiology', 'B.Sc Operation Theatre Tech'],
    },
    {
      name: 'School of Social Sciences and Liberal Arts',
      code: 'SOSSLA',
      description: 'Fostering critical discourse, journalism, mass communication, psychology, and public policy.',
      deanName: 'Dr. Jasleen Ahluwalia',
      contactEmail: 'dean.sossla@ctuniversity.in',
      departments: ['Journalism & Mass Comm', 'Clinical Psychology', 'Public Administration', 'English Literature'],
      programmes: ['BA Journalism', 'BA (Hons) Psychology', 'MA English', 'MA Mass Communication'],
    },
  ];

  const createdSchools: any[] = [];
  for (const s of schoolsData) {
    const school = await School.create(s);
    createdSchools.push(school);
  }

  console.log(`🏫 Created ${createdSchools.length} official CT University schools.`);

  const soet = createdSchools[0];
  const sms = createdSchools[1];
  const sohmat = createdSchools[2];
  const sol = createdSchools[3];
  const sops = createdSchools[4];
  const sodi = createdSchools[5];

  // 3. Create Coordinators and Faculty for Schools
  const schoolCoordinatorsData = [
    {
      name: 'Dr. Rajesh Verma',
      email: 'soet.coordinator@ctuniversity.in',
      school: soet._id,
      department: 'Computer Science & Engineering',
      designation: 'Associate Professor & SOET Coordinator',
      roles: [UserRole.SCHOOL_COORDINATOR, UserRole.FACULTY],
      employeeId: 'CTU-EMP-0101',
      phone: '+91 98141 11001',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    },
    {
      name: 'Dr. Meenakshi Arora',
      email: 'sms.coordinator@ctuniversity.in',
      school: sms._id,
      department: 'Marketing & Finance',
      designation: 'Associate Professor & SMS Coordinator',
      roles: [UserRole.SCHOOL_COORDINATOR, UserRole.FACULTY],
      employeeId: 'CTU-EMP-0102',
      phone: '+91 98141 11002',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    },
  ];

  const createdCoordinators: any[] = [];
  for (const c of schoolCoordinatorsData) {
    const coord = await User.create({ ...c, password: hashedPassword, isActive: true });
    createdCoordinators.push(coord);
  }

  // 4. Cultural Coordinators (Appointed by DSW)
  const culturalCoordinatorsData = [
    {
      name: 'Prof. Amritpal Singh',
      email: 'cultural.soet@ctuniversity.in',
      school: soet._id,
      department: 'Mechanical & Robotics Engineering',
      designation: 'Assistant Professor & Cultural Coordinator (SOET)',
      roles: [UserRole.CULTURAL_COORDINATOR, UserRole.FACULTY],
      employeeId: 'CTU-CUL-0201',
      phone: '+91 98141 22001',
      avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    },
    {
      name: 'Dr. Sunita Rani',
      email: 'cultural.sms@ctuniversity.in',
      school: sms._id,
      department: 'Human Resources',
      designation: 'Assistant Professor & Cultural Coordinator (SMS)',
      roles: [UserRole.CULTURAL_COORDINATOR, UserRole.FACULTY],
      employeeId: 'CTU-CUL-0202',
      phone: '+91 98141 22002',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    },
    {
      name: 'Chef Tarun Deep Singh',
      email: 'cultural.sohmat@ctuniversity.in',
      school: sohmat._id,
      department: 'Food & Beverage Production',
      designation: 'Head Chef & Cultural Coordinator (SOHMAT)',
      roles: [UserRole.CULTURAL_COORDINATOR, UserRole.FACULTY],
      employeeId: 'CTU-CUL-0203',
      phone: '+91 98141 22003',
      avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    },
  ];

  const createdCulturalCoordinators: any[] = [];
  for (const cc of culturalCoordinatorsData) {
    const culCoord = await User.create({ ...cc, password: hashedPassword, isActive: true });
    createdCulturalCoordinators.push(culCoord);

    // Update school model & record assignment
    await School.findByIdAndUpdate(cc.school, {
      culturalCoordinator: culCoord._id,
      $push: {
        coordinatorHistory: {
          coordinator: culCoord._id,
          appointedAt: new Date(Date.now() - 60 * 24 * 3600 * 1000),
          appointedBy: dswAdmin._id,
          remarks: 'Appointed by DSW for Academic Year 2026-2027',
        },
      },
    });

    await CulturalCoordinatorAssignment.create({
      schoolId: cc.school,
      coordinatorId: culCoord._id,
      appointedBy: dswAdmin._id,
      termStart: new Date(Date.now() - 60 * 24 * 3600 * 1000),
      isActive: true,
      responsibilities: [
        'Coordinate school cultural, literary, and technical contingents',
        'Review and endorse competition proposals from school departments',
        'Liaison with DSW office for university festivals',
        'Oversee faculty duty distribution on event days',
      ],
      handoverNotes: 'Assigned as primary liaison for university-level competition operations.',
    });
  }

  console.log('🎭 Appointed Cultural Coordinators for individual schools.');

  // 5. Additional Faculty Members & Judges
  const facultyMembersData = [
    {
      name: 'Dr. Navneet Kaur',
      email: 'navneet.cse@ctuniversity.in',
      school: soet._id,
      department: 'Computer Science & Engineering',
      designation: 'Assistant Professor',
      roles: [UserRole.FACULTY, UserRole.JUDGE],
      employeeId: 'CTU-FAC-0301',
      phone: '+91 98141 33001',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    },
    {
      name: 'Er. Sandeep Bawa',
      email: 'sandeep.mech@ctuniversity.in',
      school: soet._id,
      department: 'Mechanical & Robotics Engineering',
      designation: 'Assistant Professor',
      roles: [UserRole.FACULTY],
      employeeId: 'CTU-FAC-0302',
      phone: '+91 98141 33002',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    {
      name: 'Dr. Priya Singla',
      email: 'priya.mba@ctuniversity.in',
      school: sms._id,
      department: 'Marketing & Finance',
      designation: 'Associate Professor',
      roles: [UserRole.FACULTY, UserRole.JUDGE],
      employeeId: 'CTU-FAC-0303',
      phone: '+91 98141 33003',
      avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
    },
    {
      name: 'Adv. Manpreet Singh Dhillon',
      email: 'judge.law@ctuniversity.in',
      school: sol._id,
      department: 'Constitutional Law',
      designation: 'Senior Legal Advocate & External Judge',
      roles: [UserRole.JUDGE, UserRole.FACULTY],
      employeeId: 'CTU-FAC-0304',
      phone: '+91 98141 33004',
      avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    },
  ];

  const createdFaculty: any[] = [];
  for (const f of facultyMembersData) {
    const fac = await User.create({ ...f, password: hashedPassword, isActive: true });
    createdFaculty.push(fac);
  }

  // 6. Student Accounts
  const studentsData = [
    {
      name: 'Aarav Sharma',
      email: 'student@ctuniversity.in', // Primary evaluator student login
      school: soet._id,
      department: 'Computer Science & Engineering',
      programme: 'B.Tech CSE',
      semester: 6,
      registrationNumber: 'CTU2023CSE042',
      phone: '+91 98720 00101',
      roles: [UserRole.STUDENT],
      avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    },
    {
      name: 'Simran Kaur Gill',
      email: 'simran.gill@ctuniversity.in',
      school: soet._id,
      department: 'Artificial Intelligence & Data Science',
      programme: 'B.Tech AI & ML',
      semester: 4,
      registrationNumber: 'CTU2024AIML018',
      phone: '+91 98720 00102',
      roles: [UserRole.STUDENT],
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    },
    {
      name: 'Rohan Mehra',
      email: 'rohan.mehra@ctuniversity.in',
      school: sms._id,
      department: 'Marketing & Finance',
      programme: 'MBA Marketing',
      semester: 2,
      registrationNumber: 'CTU2025MBA009',
      phone: '+91 98720 00103',
      roles: [UserRole.STUDENT],
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    },
    {
      name: 'Gurleen Sandhu',
      email: 'gurleen.sandhu@ctuniversity.in',
      school: sodi._id,
      department: 'UI/UX & Interactive Design',
      programme: 'B.Des UI/UX',
      semester: 6,
      registrationNumber: 'CTU2023DES014',
      phone: '+91 98720 00104',
      roles: [UserRole.STUDENT],
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    },
  ];

  const createdStudents: any[] = [];
  for (const s of studentsData) {
    const stu = await User.create({ ...s, password: hashedPassword, isActive: true });
    createdStudents.push(stu);
  }

  console.log(`🎓 Created ${createdStudents.length} student demo accounts.`);

  // 7. Seed Sample Competitions in Different Lifecycle Stages
  const now = new Date();

  // Competition 1: PUBLISHED / REGISTRATION_OPEN - Hackathon
  const compHackathon = await Competition.create({
    title: 'CTU InnovateX 2026: 36-Hour National Hackathon',
    code: 'CTU-HACK-2026-01',
    description: 'The flagship hackathon of CT University. Build generative AI agents, smart healthcare platforms, or sustainable green tech solutions to solve real-world industry challenges.',
    category: CompetitionCategory.TECHNICAL,
    scope: CompetitionScope.UNIVERSITY_LEVEL,
    organizingSchool: soet._id,
    coOrganizingSchools: [sodi._id],
    isCentralDSW: false,
    organizer: createdCoordinators[0]._id, // SOET Coordinator
    facultyCoordinator: createdFaculty[0]._id, // Dr. Navneet Kaur
    bannerUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80',
    objectives: 'Encourage cross-disciplinary innovation, rapid software prototyping, and venture-grade project incubation among CT University students.',
    rulesAndRegulations: 'Teams of 2 to 4 members. All code must be authored during the event. Use of public APIs and generative AI models is encouraged with attribution.',
    proposedDate: new Date(now.getTime() + 14 * 24 * 3600 * 1000),
    startDate: new Date(now.getTime() + 14 * 24 * 3600 * 1000),
    endDate: new Date(now.getTime() + 16 * 24 * 3600 * 1000),
    registrationOpenDate: new Date(now.getTime() - 5 * 24 * 3600 * 1000),
    registrationCloseDate: new Date(now.getTime() + 10 * 24 * 3600 * 1000),
    venue: 'Swami Vivekananda Central Auditorium & Computing Lab 4',
    alternativeVenue: 'SOET Seminar Hall B',
    durationMinutes: 2160,
    reportingTime: '08:30 AM',
    rounds: [
      { roundNumber: 1, name: 'Idea Synopsis & Wireframe Screening', date: new Date(now.getTime() + 14 * 24 * 3600 * 1000), venue: 'Main Auditorium' },
      { roundNumber: 2, name: 'Midway Sprint & Architecture Evaluation', date: new Date(now.getTime() + 15 * 24 * 3600 * 1000), venue: 'Lab 4' },
      { roundNumber: 3, name: 'Grand Finale & Live Jury Pitching', date: new Date(now.getTime() + 16 * 24 * 3600 * 1000), venue: 'Auditorium Main Stage' },
    ],
    participationType: 'TEAM',
    minTeamSize: 2,
    maxTeamSize: 4,
    maxRegistrations: 50,
    maxTeams: 50,
    currentRegistrationsCount: 2,
    eligibleSchools: [soet._id, sodi._id, sms._id],
    eligibleProgrammes: ['B.Tech CSE', 'B.Tech AI & ML', 'BCA', 'MCA', 'B.Des UI/UX', 'MBA Business Analytics'],
    eligibleSemesters: [2, 3, 4, 5, 6, 7, 8],
    eligibilityConditions: 'Open to all bonafide students of SOET, SODI, and SMS with no active disciplinary standing.',
    registrationFee: 0,
    participantRequirements: 'Bring your own laptops, chargers, extension cords, and university ID card.',
    requiredDocuments: ['Valid CT University ID Card', 'Signed No-Objection Form'],
    customFields: [
      { label: 'Primary Tech Stack Planned', fieldType: 'text', required: true },
      { label: 'GitHub Profile or Portfolio URL', fieldType: 'text', required: false },
    ],
    requiredFacultyCount: 4,
    requiredVolunteersCount: 12,
    equipment: ['High-speed gigabit Wi-Fi routers', 'Dual-screen presentation monitors', 'Audio podium', 'Power strips'],
    venueResources: ['Auditorium projector', '24/7 air conditioning', 'Overnight cafeteria pass'],
    budgetProposal: 75000,
    prizeDetails: {
      winner: '₹25,000 Cash + CTU Innovation Trophy + Pre-Incubation Grant',
      firstRunnerUp: '₹15,000 Cash + Merit Trophy + Cloud Credits',
      secondRunnerUp: '₹10,000 Cash + Medal + Merch Kit',
      otherPrizes: ['Best UI/UX Award: ₹5,000', 'Best AI Integration Award: ₹5,000'],
    },
    sponsorshipInfo: 'Sponsored in partnership with Google Developer Student Clubs & TiE Punjab',
    status: CompetitionStatus.REGISTRATION_OPEN,
    isPublished: true,
    publishedAt: new Date(now.getTime() - 5 * 24 * 3600 * 1000),
    approvalAuditTrail: [
      {
        user: createdCoordinators[0]._id,
        role: UserRole.SCHOOL_COORDINATOR,
        action: 'PROPOSAL_SUBMITTED',
        previousStatus: CompetitionStatus.DRAFT,
        newStatus: CompetitionStatus.SUBMITTED,
        remarks: 'Submitted annual inter-school flagship hackathon proposal.',
        timestamp: new Date(now.getTime() - 8 * 24 * 3600 * 1000),
      },
      {
        user: dswAdmin._id,
        role: UserRole.DSW_ADMIN,
        action: 'DSW_APPROVE',
        previousStatus: CompetitionStatus.SUBMITTED,
        newStatus: CompetitionStatus.APPROVED,
        remarks: 'Approved by DSW. Budget sanctioned. High impact event.',
        timestamp: new Date(now.getTime() - 6 * 24 * 3600 * 1000),
      },
      {
        user: dswAdmin._id,
        role: UserRole.DSW_ADMIN,
        action: 'COMPETITION_PUBLISHED',
        previousStatus: CompetitionStatus.APPROVED,
        newStatus: CompetitionStatus.REGISTRATION_OPEN,
        remarks: 'Official publication and registration opened.',
        timestamp: new Date(now.getTime() - 5 * 24 * 3600 * 1000),
      },
    ],
  });

  // Competition 2: COMPLETED - National Youth Cultural Fiesta (Dance & Music)
  const compCultural = await Competition.create({
    title: 'Virasat-e-Punjab: Inter-School Folk & Classical Dance Championship',
    code: 'CTU-CULT-2026-02',
    description: 'Annual cultural extravaganza celebrating Punjab heritage, Bhangra, Giddha, Sufi vocals, and classical Indian group choreography.',
    category: CompetitionCategory.CULTURAL,
    scope: CompetitionScope.UNIVERSITY_LEVEL,
    organizingSchool: createdSchools[7]._id, // SOSSLA
    coOrganizingSchools: [sohmat._id],
    isCentralDSW: true,
    organizer: dswAdmin._id,
    facultyCoordinator: createdCulturalCoordinators[0]._id,
    bannerUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop&q=80',
    proposedDate: new Date(now.getTime() - 10 * 24 * 3600 * 1000),
    startDate: new Date(now.getTime() - 10 * 24 * 3600 * 1000),
    endDate: new Date(now.getTime() - 9 * 24 * 3600 * 1000),
    venue: 'Open Air Amphitheatre, CT University Campus',
    durationMinutes: 480,
    reportingTime: '10:00 AM',
    participationType: 'INDIVIDUAL',
    minTeamSize: 1,
    maxTeamSize: 1,
    maxRegistrations: 30,
    currentRegistrationsCount: 4,
    eligibleSchools: createdSchools.map((s) => s._id),
    status: CompetitionStatus.COMPLETED,
    isPublished: true,
    publishedAt: new Date(now.getTime() - 25 * 24 * 3600 * 1000),
    prizeDetails: {
      winner: '₹15,000 + Golden Dhol Trophy',
      firstRunnerUp: '₹10,000 + Silver Trophy',
      secondRunnerUp: '₹5,000 + Bronze Trophy',
    },
    approvalAuditTrail: [
      {
        user: dswAdmin._id,
        role: UserRole.DSW_ADMIN,
        action: 'PROPOSAL_APPROVED_AND_PUBLISHED',
        previousStatus: CompetitionStatus.DRAFT,
        newStatus: CompetitionStatus.PUBLISHED,
        remarks: 'Central DSW annual cultural calendar event.',
        timestamp: new Date(now.getTime() - 25 * 24 * 3600 * 1000),
      },
    ],
  });

  // Competition 3: SUBMITTED (Awaiting DSW Review in Queue)
  const compMoot = await Competition.create({
    title: 'CTU All-India Moot Court Competition & Constitutional Debate 2026',
    code: 'CTU-LAW-2026-03',
    description: 'Simulated appellate court proceedings examining Digital Personal Data Protection, AI Liability, and Constitutional Fundamental Rights.',
    category: CompetitionCategory.LEGAL_MOOT,
    scope: CompetitionScope.OPEN,
    organizingSchool: sol._id,
    organizer: createdFaculty[3]._id, // Adv Manpreet Singh
    bannerUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&auto=format&fit=crop&q=80',
    proposedDate: new Date(now.getTime() + 25 * 24 * 3600 * 1000),
    venue: 'Moot Court Hall, School of Law, Block C',
    reportingTime: '09:00 AM',
    durationMinutes: 360,
    participationType: 'TEAM',
    minTeamSize: 3,
    maxTeamSize: 3,
    maxRegistrations: 24,
    eligibleSchools: [sol._id],
    budgetProposal: 40000,
    status: CompetitionStatus.SUBMITTED,
    isPublished: false,
    submissionRemarks: 'Submitted by School of Law with comprehensive problem statement and draft memorials.',
    approvalAuditTrail: [
      {
        user: createdFaculty[3]._id,
        role: UserRole.FACULTY,
        action: 'PROPOSAL_SUBMITTED',
        previousStatus: CompetitionStatus.DRAFT,
        newStatus: CompetitionStatus.SUBMITTED,
        remarks: 'Formally submitted to DSW for evaluation and approval.',
        timestamp: new Date(now.getTime() - 2 * 24 * 3600 * 1000),
      },
    ],
  });

  // Competition 4: REVISION_REQUIRED
  const compStartup = await Competition.create({
    title: 'CTU VentureCatalyst: Inter-School Startup Pitch & Shark Tank',
    code: 'CTU-SMS-2026-04',
    description: 'Pitch your entrepreneurial venture to angel investors, venture capitalists, and industry CXOs.',
    category: CompetitionCategory.INNOVATION_STARTUP,
    scope: CompetitionScope.INTER_SCHOOL,
    organizingSchool: sms._id,
    organizer: createdCoordinators[1]._id,
    bannerUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&auto=format&fit=crop&q=80',
    proposedDate: new Date(now.getTime() + 20 * 24 * 3600 * 1000),
    venue: 'Executive Seminar Hall, SMS Block',
    reportingTime: '09:30 AM',
    durationMinutes: 300,
    participationType: 'TEAM',
    minTeamSize: 1,
    maxTeamSize: 3,
    maxRegistrations: 20,
    status: CompetitionStatus.REVISION_REQUIRED,
    isPublished: false,
    dswRemarks: 'Please attach the detailed scoring rubric for financial feasibility and clarify external judge honorarium breakdown.',
    revisionNotes: 'Need breakdown of external venture capitalist invitations and jury panel accreditation.',
    approvalAuditTrail: [
      {
        user: dswAdmin._id,
        role: UserRole.DSW_ADMIN,
        action: 'DSW_REVISION_REQUIRED',
        previousStatus: CompetitionStatus.SUBMITTED,
        newStatus: CompetitionStatus.REVISION_REQUIRED,
        remarks: 'Please attach detailed investor judging criteria and clarify honorarium.',
        timestamp: new Date(now.getTime() - 1 * 24 * 3600 * 1000),
      },
    ],
  });

  // Competition 5: APPROVED (Awaiting Official Publishing by DSW)
  const compCulinary = await Competition.create({
    title: 'MasterChef CTU: Pan-Asian & Punjabi Fusion Culinary Challenge',
    code: 'CTU-CULN-2026-05',
    description: 'Live mystery box cooking competition testing hygiene, culinary craft, plating aesthetics, and flavor profiles.',
    category: CompetitionCategory.CULTURAL,
    scope: CompetitionScope.SCHOOL_LEVEL,
    organizingSchool: sohmat._id,
    organizer: createdCulturalCoordinators[2]._id,
    bannerUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=80',
    proposedDate: new Date(now.getTime() + 18 * 24 * 3600 * 1000),
    venue: 'Commercial Training Kitchens & Bakery Lab, SOHMAT',
    durationMinutes: 240,
    reportingTime: '10:00 AM',
    participationType: 'INDIVIDUAL',
    minTeamSize: 1,
    maxTeamSize: 1,
    maxRegistrations: 25,
    status: CompetitionStatus.APPROVED,
    isPublished: false,
    dswRemarks: 'Proposal approved. Excellent industry collaboration with Radisson Hotel Group.',
    approvalAuditTrail: [
      {
        user: dswAdmin._id,
        role: UserRole.DSW_ADMIN,
        action: 'DSW_APPROVE',
        previousStatus: CompetitionStatus.SUBMITTED,
        newStatus: CompetitionStatus.APPROVED,
        remarks: 'Approved by DSW. Ready to be published.',
        timestamp: new Date(now.getTime() - 2 * 24 * 3600 * 1000),
      },
    ],
  });

  console.log('🏆 Seeded 5 diverse competitions across all lifecycle states.');

  // 8. Seed Registrations for Hackathon & Completed Cultural
  const regQr1 = await generateQRCodeDataUrl(
    JSON.stringify({ regNo: 'CTU-REG-2026-01001', comp: compHackathon.code, user: createdStudents[0].name })
  );
  const reg1 = await Registration.create({
    registrationNumber: 'CTU-REG-2026-01001',
    competitionId: compHackathon._id,
    participantType: 'TEAM',
    userId: createdStudents[0]._id, // Aarav Sharma (Team Leader)
    school: soet._id,
    teamName: 'NeuralCoders CTU',
    teamMembers: [
      {
        name: 'Simran Kaur Gill',
        email: 'simran.gill@ctuniversity.in',
        studentId: 'CTU2024AIML018',
        school: 'SOET',
        programme: 'B.Tech AI & ML',
        semester: 4,
        phone: '+91 98720 00102',
      },
      {
        name: 'Gurleen Sandhu',
        email: 'gurleen.sandhu@ctuniversity.in',
        studentId: 'CTU2023DES014',
        school: 'SODI',
        programme: 'B.Des UI/UX',
        semester: 6,
        phone: '+91 98720 00104',
      },
    ],
    status: RegistrationStatus.CONFIRMED,
    qrCodeData: regQr1,
    customFieldResponses: {
      'Primary Tech Stack Planned': 'React, Python FastAPI, Gemini 2.5, MongoDB',
      'GitHub Profile or Portfolio URL': 'https://github.com/aarav-ctu',
    },
  });

  const regQr2 = await generateQRCodeDataUrl(
    JSON.stringify({ regNo: 'CTU-REG-2026-01002', comp: compHackathon.code, user: createdStudents[2].name })
  );
  await Registration.create({
    registrationNumber: 'CTU-REG-2026-01002',
    competitionId: compHackathon._id,
    participantType: 'INDIVIDUAL',
    userId: createdStudents[2]._id, // Rohan Mehra
    school: sms._id,
    status: RegistrationStatus.CONFIRMED,
    qrCodeData: regQr2,
    customFieldResponses: {
      'Primary Tech Stack Planned': 'Next.js, Tailwind, FinTech APIs',
    },
  });

  // Registrations for the COMPLETED cultural competition
  const cultRegQr1 = await generateQRCodeDataUrl(
    JSON.stringify({ regNo: 'CTU-REG-2026-00901', comp: compCultural.code, user: createdStudents[1].name })
  );
  const cultReg1 = await Registration.create({
    registrationNumber: 'CTU-REG-2026-00901',
    competitionId: compCultural._id,
    participantType: 'INDIVIDUAL',
    userId: createdStudents[1]._id, // Simran Kaur Gill (Winner!)
    school: soet._id,
    status: RegistrationStatus.CHECKED_IN,
    checkedInAt: new Date(compCultural.proposedDate),
    qrCodeData: cultRegQr1,
  });

  const cultRegQr2 = await generateQRCodeDataUrl(
    JSON.stringify({ regNo: 'CTU-REG-2026-00902', comp: compCultural.code, user: createdStudents[3].name })
  );
  const cultReg2 = await Registration.create({
    registrationNumber: 'CTU-REG-2026-00902',
    competitionId: compCultural._id,
    participantType: 'INDIVIDUAL',
    userId: createdStudents[3]._id, // Gurleen Sandhu (Runner-up!)
    school: sodi._id,
    status: RegistrationStatus.CHECKED_IN,
    checkedInAt: new Date(compCultural.proposedDate),
    qrCodeData: cultRegQr2,
  });

  console.log('📝 Seeded active individual and team participant registrations.');

  // 9. Seed Faculty Duties
  await FacultyDuty.create([
    {
      competitionId: compHackathon._id,
      facultyId: createdFaculty[0]._id, // Dr. Navneet Kaur
      assignedBy: dswAdmin._id,
      dutyTitle: 'Technical Support & Lab Infrastructure Head',
      dutyCategory: FacultyDutyCategory.TECHNICAL_SUPPORT,
      dutyDescription: 'Oversee uninterrupted gigabit internet connectivity, power distribution, and developer environment access.',
      date: compHackathon.proposedDate,
      reportingTime: '08:00 AM',
      dutyStartTime: '08:30 AM',
      dutyEndTime: '08:00 PM',
      venue: 'Computing Lab 4, Block B',
      priority: 'HIGH',
      supportingInstructions: 'Ensure backup diesel generator link is on standby with maintenance department.',
      status: FacultyDutyStatus.ACKNOWLEDGED,
      acknowledgedAt: new Date(now.getTime() - 3 * 24 * 3600 * 1000),
    },
    {
      competitionId: compHackathon._id,
      facultyId: createdFaculty[1]._id, // Er. Sandeep Bawa
      assignedBy: dswAdmin._id,
      dutyTitle: 'Participant Check-in & Badge Verification Desk Incharge',
      dutyCategory: FacultyDutyCategory.REGISTRATION_DESK,
      dutyDescription: 'Scan registration QR codes, issue tamper-evident wristbands, and provide hackathon welcome kits.',
      date: compHackathon.proposedDate,
      reportingTime: '08:00 AM',
      dutyStartTime: '08:30 AM',
      dutyEndTime: '01:00 PM',
      venue: 'Auditorium Entrance Foyer',
      priority: 'MEDIUM',
      status: FacultyDutyStatus.ASSIGNED,
    },
    {
      competitionId: compCultural._id,
      facultyId: createdFaculty[2]._id, // Dr. Priya Singla
      assignedBy: dswAdmin._id,
      dutyTitle: 'Stage Management & Audio-Visual Control',
      dutyCategory: FacultyDutyCategory.STAGE_MANAGEMENT,
      dutyDescription: 'Ensure lighting sequences and audio levels for classical dance performances.',
      date: compCultural.proposedDate,
      reportingTime: '09:00 AM',
      dutyStartTime: '09:30 AM',
      dutyEndTime: '06:00 PM',
      venue: 'Open Air Amphitheatre',
      priority: 'URGENT',
      status: FacultyDutyStatus.VERIFIED,
      acknowledgedAt: new Date(now.getTime() - 12 * 24 * 3600 * 1000),
      completionEvidence: {
        reportText: 'All 24 stage performances executed seamlessly with zero audio disruption. Sound logs submitted to DSW office.',
        fileUrls: ['https://example.com/sound_check_log.pdf'],
        submittedAt: new Date(now.getTime() - 9 * 24 * 3600 * 1000),
      },
      supervisorRemarks: 'Outstanding stage discipline and event execution. Verified by DSW.',
      verifiedAt: new Date(now.getTime() - 8 * 24 * 3600 * 1000),
      verifiedBy: dswAdmin._id,
    },
  ]);

  console.log('📋 Seeded faculty duty assignments across all tracking states.');

  // 10. Seed Judging Rubric, Scores, Results & Certificates for Cultural Competition
  const rubricCultural = await JudgingRubric.create({
    competitionId: compCultural._id,
    criteria: [
      { name: 'Rhythm & Footwork (Taal & Laya)', maxMarks: 30, weightagePercent: 30 },
      { name: 'Expressions & Abhinaya (Bhava)', maxMarks: 30, weightagePercent: 30 },
      { name: 'Authenticity of Costume & Makeup', maxMarks: 20, weightagePercent: 20 },
      { name: 'Stage Presence & Overall Impact', maxMarks: 20, weightagePercent: 20 },
    ],
    totalMarks: 100,
    guidelines: 'Judges must rate independently without cross-consultation during performances.',
  });

  // Scores
  await Score.create([
    {
      competitionId: compCultural._id,
      judgeId: createdFaculty[0]._id, // Dr. Navneet Kaur
      registrationId: cultReg1._id,
      roundNumber: 1,
      criteriaScores: [
        { criterionName: 'Rhythm & Footwork', score: 29, maxScore: 30 },
        { criterionName: 'Expressions & Abhinaya', score: 28, maxScore: 30 },
        { criterionName: 'Authenticity of Costume', score: 19, maxScore: 20 },
        { criterionName: 'Stage Presence', score: 19, maxScore: 20 },
      ],
      totalScore: 95,
      remarks: 'Mesmerizing Kathak and Sufi fusion. Flawless chakkars and graceful expressions.',
      isSubmitted: true,
      submittedAt: new Date(compCultural.proposedDate),
    },
    {
      competitionId: compCultural._id,
      judgeId: createdFaculty[0]._id,
      registrationId: cultReg2._id,
      roundNumber: 1,
      criteriaScores: [
        { criterionName: 'Rhythm & Footwork', score: 26, maxScore: 30 },
        { criterionName: 'Expressions & Abhinaya', score: 26, maxScore: 30 },
        { criterionName: 'Authenticity of Costume', score: 18, maxScore: 20 },
        { criterionName: 'Stage Presence', score: 18, maxScore: 20 },
      ],
      totalScore: 88,
      remarks: 'Vibrant classical performance with beautiful hand gestures and mudras.',
      isSubmitted: true,
      submittedAt: new Date(compCultural.proposedDate),
    },
  ]);

  // Results
  const resultWinner = await CompetitionResult.create({
    competitionId: compCultural._id,
    registrationId: cultReg1._id,
    participantName: createdStudents[1].name, // Simran Kaur Gill
    school: soet._id,
    rank: 1,
    category: ResultCategory.WINNER,
    finalScore: 95,
    prizeWon: '₹15,000 + Golden Dhol Trophy + Certificate of Excellence',
    remarks: 'Awarded First Place for exemplary classical dance choreography.',
    isApprovedByDSW: true,
    isPublished: true,
    publishedAt: new Date(now.getTime() - 8 * 24 * 3600 * 1000),
    publishedBy: dswAdmin._id,
  });

  const resultRunnerUp = await CompetitionResult.create({
    competitionId: compCultural._id,
    registrationId: cultReg2._id,
    participantName: createdStudents[3].name, // Gurleen Sandhu
    school: sodi._id,
    rank: 2,
    category: ResultCategory.FIRST_RUNNER_UP,
    finalScore: 88,
    prizeWon: '₹10,000 + Silver Trophy + Certificate of Merit',
    remarks: 'Awarded First Runner-Up for traditional folk interpretation.',
    isApprovedByDSW: true,
    isPublished: true,
    publishedAt: new Date(now.getTime() - 8 * 24 * 3600 * 1000),
    publishedBy: dswAdmin._id,
  });

  // 11. Authenticated Certificates with QR Codes
  const certNumber1 = 'CTU-CERT-2026-00101';
  const certQr1 = await generateQRCodeDataUrl(`http://localhost:5173/verify-certificate/${certNumber1}`);
  await Certificate.create({
    certificateNumber: certNumber1,
    verificationCode: 'CTU-WIN-9821',
    competitionId: compCultural._id,
    recipientId: createdStudents[1]._id,
    recipientName: createdStudents[1].name,
    recipientRole: 'Student Participant',
    schoolName: 'School of Engineering and Technology',
    competitionTitle: compCultural.title,
    type: CertificateType.WINNER,
    achievement: 'First Prize - Winner',
    issueDate: new Date(now.getTime() - 7 * 24 * 3600 * 1000),
    authorizedSignatures: [
      { name: 'Dr. Gurpreet Singh', title: 'Director Student Welfare (DSW)' },
      { name: 'Dr. Satish Kumar', title: 'Vice Chancellor, CT University' },
    ],
    qrCodeData: certQr1,
  });

  const certNumber2 = 'CTU-CERT-2026-00102';
  const certQr2 = await generateQRCodeDataUrl(`http://localhost:5173/verify-certificate/${certNumber2}`);
  await Certificate.create({
    certificateNumber: certNumber2,
    verificationCode: 'CTU-RUN-4318',
    competitionId: compCultural._id,
    recipientId: createdStudents[3]._id,
    recipientName: createdStudents[3].name,
    recipientRole: 'Student Participant',
    schoolName: 'School of Design and Innovation',
    competitionTitle: compCultural.title,
    type: CertificateType.WINNER,
    achievement: 'Second Prize - 1st Runner-Up',
    issueDate: new Date(now.getTime() - 7 * 24 * 3600 * 1000),
    authorizedSignatures: [
      { name: 'Dr. Gurpreet Singh', title: 'Director Student Welfare (DSW)' },
      { name: 'Dr. Satish Kumar', title: 'Vice Chancellor, CT University' },
    ],
    qrCodeData: certQr2,
  });

  console.log('🏅 Seeded official rankings and verifiable certificates with digital QR codes.');

  // 12. Seed Notifications
  await Notification.create([
    {
      recipient: dswAdmin._id,
      title: 'New Proposal Pending Review',
      message: 'CTU All-India Moot Court Competition (CTU-LAW-2026-03) has been submitted by School of Law.',
      type: 'INFO',
      actionUrl: '/dsw/approval-queue',
      isRead: false,
    },
    {
      recipient: createdStudents[0]._id, // Aarav Sharma
      title: 'Registration Confirmed: CTU InnovateX 2026',
      message: 'Your team "NeuralCoders CTU" has been confirmed for the 36-Hour National Hackathon.',
      type: 'SUCCESS',
      actionUrl: '/student/registrations',
      isRead: false,
    },
    {
      recipient: createdFaculty[0]._id, // Dr. Navneet Kaur
      title: 'Faculty Duty Assigned',
      message: 'You have been assigned as Technical Support Head for CTU InnovateX 2026.',
      type: 'INFO',
      actionUrl: '/faculty/dashboard',
      isRead: false,
    },
  ]);

  // 13. Seed Initial Audit Log Record
  await AuditLog.create({
    user: dswAdmin._id,
    userName: dswAdmin.name,
    role: UserRole.DSW_ADMIN,
    action: 'SYSTEM_INITIALIZATION',
    resourceType: 'SYSTEM',
    remarks: 'CTU Competition Hub master dataset seeded with official schools, coordinators, and competitions.',
    ipAddress: '127.0.0.1',
  });

  console.log('✨ CTU Competition Hub database seeding completed successfully!');
};

// If run directly from CLI
if (process.argv[1]?.endsWith('seed.ts') || process.argv[1]?.endsWith('seed.js')) {
  (async () => {
    try {
      await connectDB();
      await runSeed();
      await disconnectDB();
      process.exit(0);
    } catch (err) {
      console.error('Seed execution error:', err);
      process.exit(1);
    }
  })();
}
