import http from 'http';
import mongoose from 'mongoose';
import { createApp, ensureConnected } from '../app.js';
import { Competition } from '../models/Competition.js';
import { Registration } from '../models/Registration.js';
import { Team } from '../models/Team.js';
import { ApprovalHistory } from '../models/ApprovalHistory.js';
import { CompetitionProposal } from '../models/CompetitionProposal.js';
import { User } from '../models/User.js';
import { School } from '../models/School.js';
import { Department } from '../models/Department.js';
import { ApprovalLevel, CompetitionStatus, UserRole } from '../types/enums.js';

interface TestRecord {
  name: string;
  passed: boolean;
  error?: string;
}

const results: TestRecord[] = [];

async function assertTest(name: string, fn: () => Promise<void>) {
  const start = Date.now();
  try {
    await fn();
    results.push({ name, passed: true });
    console.log(`  ✅ PASS: ${name} (${Date.now() - start}ms)`);
  } catch (err: any) {
    results.push({ name, passed: false, error: err.message });
    console.error(`  ❌ FAIL: ${name} -> ${err.message}`);
  }
}

function assert(cond: unknown, msg: string) {
  if (!cond) throw new Error(msg);
}

async function loginRole(baseUrl: string, email: string) {
  const res = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: 'ctu@12345' }),
  });
  const data = (await res.json()) as any;
  if (!data.success || !data.data?.token) {
    throw new Error(`Login failed for ${email}: ${JSON.stringify(data)}`);
  }
  return data.data;
}

async function main() {
  console.log('===================================================================');
  console.log('🧪 PART 14 VERIFICATION SUITE — HIERARCHICAL WORKFLOW & MONITORING');
  console.log('===================================================================\n');

  await ensureConnected();

  // Clean up test artifacts from prior runs
  const testCodes = [
    'TEST-FAC-FLOW-01',
    'TEST-HOD-FLOW-02',
    'TEST-HOS-FLOW-03',
    'TEST-REJ-FLOW-04',
    'TEST-CHG-FLOW-05',
    'TEST-UPCOMING-06',
    'TEST-DEADLINE-07',
    'TEST-CAP-08',
  ];
  const oldComps = await Competition.find({ code: { $in: testCodes } }).select('_id');
  const oldIds = oldComps.map((c) => c._id);
  if (oldIds.length > 0) {
    await Promise.all([
      Registration.deleteMany({ competitionId: { $in: oldIds } }),
      Team.deleteMany({ competitionId: { $in: oldIds } }),
      ApprovalHistory.deleteMany({ competitionId: { $in: oldIds } }),
      CompetitionProposal.deleteMany({ competitionId: { $in: oldIds } }),
      Competition.deleteMany({ _id: { $in: oldIds } }),
    ]);
  }

  // Ensure a second student exists for concurrency / capacity testing
  const soet = await School.findOne({ code: 'SOET' });
  const cseDept = await Department.findOne({ school: soet?._id, name: 'Computer Science & Engineering' });
  let secondStudent = await User.findOne({ email: 'student2.test@ctuniversity.in' });
  if (!secondStudent && soet) {
    secondStudent = await User.create({
      name: 'Test Student Two',
      email: 'student2.test@ctuniversity.in',
      password: 'ctu@12345',
      roles: [UserRole.STUDENT],
      school: soet._id,
      departmentId: cseDept?._id,
      department: 'Computer Science & Engineering',
      programme: 'B.Tech CSE',
      semester: 4,
      registrationNumber: 'CTU-TEST-STU-02',
      isActive: true,
    });
  }

  const app = createApp();
  const server = http.createServer(app);
  await new Promise<void>((resolve) => server.listen(0, resolve));
  const port = (server.address() as any).port;
  const baseUrl = `http://127.0.0.1:${port}`;

  // Login all hierarchy actors
  const facultyAuth = await loginRole(baseUrl, 'navneet.cse@ctuniversity.in'); // CSE Faculty
  const hodAuth = await loginRole(baseUrl, 'hod.cse@ctuniversity.in'); // CSE HOD
  const otherHodAuth = await loginRole(baseUrl, 'hod.sms@ctuniversity.in'); // SMS HOD (different dept/school)
  const hosAuth = await loginRole(baseUrl, 'soet.coordinator@ctuniversity.in'); // SOET HOS
  const otherHosAuth = await loginRole(baseUrl, 'sms.coordinator@ctuniversity.in'); // SMS HOS (different school)
  const dswAuth = await loginRole(baseUrl, 'dsw@ctuniversity.in'); // DSW
  const student1Auth = await loginRole(baseUrl, 'student@ctuniversity.in'); // Student 1
  const student2Auth = await loginRole(baseUrl, 'student2.test@ctuniversity.in'); // Student 2

  const futureDate = new Date(Date.now() + 20 * 24 * 3600 * 1000).toISOString();
  const openPastDate = new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString();
  const closeFutureDate = new Date(Date.now() + 10 * 24 * 3600 * 1000).toISOString();

  let facCompId = '';
  let hodCompId = '';
  let hosCompId = '';
  let rejCompId = '';
  let chgCompId = '';
  let upcomingCompId = '';
  let capCompId = '';
  let student1RegId = '';

  // =========================================================================
  // APPROVAL TESTS (1–10)
  // =========================================================================
  console.log('\n--- PART 14A: APPROVAL HIERARCHY TESTS ---');

  await assertTest('A1. Faculty proposal routes to HOD (PENDING_HOD_APPROVAL), bypassing nothing', async () => {
    const res = await fetch(`${baseUrl}/api/competitions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${facultyAuth.token}` },
      body: JSON.stringify({
        title: 'Faculty CSE Algorithm Challenge',
        code: 'TEST-FAC-FLOW-01',
        description: 'Faculty-initiated coding competition',
        category: 'TECHNICAL',
        scope: 'UNIVERSITY_LEVEL',
        proposedDate: futureDate,
        registrationOpenDate: openPastDate,
        registrationCloseDate: closeFutureDate,
        venue: 'CSE Block Lab 1',
        maxRegistrations: 50,
        submitForReview: true,
      }),
    });
    const body = (await res.json()) as any;
    assert(res.status === 201 && body.success, `Create failed: ${JSON.stringify(body)}`);
    assert(body.data.status === CompetitionStatus.PENDING_HOD_APPROVAL, `Expected PENDING_HOD_APPROVAL, got ${body.data.status}`);
    assert(body.data.currentApprovalLevel === ApprovalLevel.HOD, `Expected level HOD, got ${body.data.currentApprovalLevel}`);
    facCompId = body.data._id;
  });

  await assertTest('A2. Unapproved competition is invisible to students & student registration fails (403)', async () => {
    const feedRes = await fetch(`${baseUrl}/api/competitions/student-feed`, {
      headers: { Authorization: `Bearer ${student1Auth.token}` },
    });
    const feedData = (await feedRes.json()) as any;
    const found = feedData.data.all.find((c: any) => c._id === facCompId);
    assert(!found, 'Unapproved competition leaked into student feed!');

    const detailRes = await fetch(`${baseUrl}/api/competitions/${facCompId}`, {
      headers: { Authorization: `Bearer ${student1Auth.token}` },
    });
    assert(detailRes.status === 403, `Student should get 403 on unapproved detail, got ${detailRes.status}`);

    const regRes = await fetch(`${baseUrl}/api/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${student1Auth.token}` },
      body: JSON.stringify({ competitionId: facCompId }),
    });
    assert(regRes.status === 403, `Student registration before DSW publish should be 403, got ${regRes.status}`);
  });

  await assertTest('A3. Unauthorized roles & wrong-dept HOD & creator cannot approve at HOD level', async () => {
    // Faculty (self-review) blocked
    const selfRes = await fetch(`${baseUrl}/api/competitions/${facCompId}/hod-review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${facultyAuth.token}` },
      body: JSON.stringify({ action: 'APPROVE', remarks: 'Self approve attempt' }),
    });
    assert(selfRes.status === 403, `Faculty should get 403 on /hod-review, got ${selfRes.status}`);

    // Wrong department HOD blocked
    const wrongDeptRes = await fetch(`${baseUrl}/api/competitions/${facCompId}/hod-review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${otherHodAuth.token}` },
      body: JSON.stringify({ action: 'APPROVE', remarks: 'Cross-dept attempt' }),
    });
    assert(wrongDeptRes.status === 403, `Wrong-dept HOD should get 403, got ${wrongDeptRes.status}`);

    // DSW cannot bypass HOD & HOS to approve early
    const dswBypassRes = await fetch(`${baseUrl}/api/competitions/${facCompId}/dsw-review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${dswAuth.token}` },
      body: JSON.stringify({ action: 'APPROVE', remarks: 'Bypass attempt' }),
    });
    assert(dswBypassRes.status === 400, `DSW bypass should return 400, got ${dswBypassRes.status}`);
  });

  await assertTest('A4. HOD approves Faculty proposal -> forwards to HOS (PENDING_HOS_APPROVAL)', async () => {
    const res = await fetch(`${baseUrl}/api/competitions/${facCompId}/hod-review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${hodAuth.token}` },
      body: JSON.stringify({ action: 'APPROVE', remarks: 'HOD verified technical scope' }),
    });
    const body = (await res.json()) as any;
    assert(res.status === 200 && body.success, `HOD approve failed: ${JSON.stringify(body)}`);
    assert(body.data.status === CompetitionStatus.PENDING_HOS_APPROVAL, `Expected PENDING_HOS_APPROVAL, got ${body.data.status}`);
    assert(body.data.currentApprovalLevel === ApprovalLevel.HOS, `Expected level HOS, got ${body.data.currentApprovalLevel}`);
  });

  await assertTest('A5. Wrong-school HOS blocked; SOET HOS approves -> forwards to DSW (PENDING_DSW_APPROVAL)', async () => {
    const wrongSchoolRes = await fetch(`${baseUrl}/api/competitions/${facCompId}/hos-review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${otherHosAuth.token}` },
      body: JSON.stringify({ action: 'APPROVE', remarks: 'Wrong school HOS attempt' }),
    });
    assert(wrongSchoolRes.status === 403, `Wrong-school HOS should get 403, got ${wrongSchoolRes.status}`);

    const res = await fetch(`${baseUrl}/api/competitions/${facCompId}/hos-review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${hosAuth.token}` },
      body: JSON.stringify({ action: 'APPROVE', remarks: 'HOS endorsed school resources' }),
    });
    const body = (await res.json()) as any;
    assert(res.status === 200 && body.success, `HOS approve failed: ${JSON.stringify(body)}`);
    assert(body.data.status === CompetitionStatus.PENDING_DSW_APPROVAL, `Expected PENDING_DSW_APPROVAL, got ${body.data.status}`);
    assert(body.data.currentApprovalLevel === ApprovalLevel.DSW, `Expected level DSW, got ${body.data.currentApprovalLevel}`);
  });

  await assertTest('A6. DSW grants final approval (APPROVED_BY_DSW) & publishes -> REGISTRATION_OPEN', async () => {
    const revRes = await fetch(`${baseUrl}/api/competitions/${facCompId}/dsw-review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${dswAuth.token}` },
      body: JSON.stringify({ action: 'APPROVE', remarks: 'Final DSW approval granted' }),
    });
    const revBody = (await revRes.json()) as any;
    assert(revRes.status === 200 && revBody.data.status === CompetitionStatus.APPROVED_BY_DSW, `Expected APPROVED_BY_DSW, got ${revBody.data?.status}`);

    const pubRes = await fetch(`${baseUrl}/api/competitions/${facCompId}/publish`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${dswAuth.token}` },
    });
    const pubBody = (await pubRes.json()) as any;
    assert(pubRes.status === 200 && pubBody.data.isPublished === true, `Publish failed: ${JSON.stringify(pubBody)}`);
    assert(pubBody.data.status === CompetitionStatus.REGISTRATION_OPEN, `Expected REGISTRATION_OPEN, got ${pubBody.data.status}`);
  });

  await assertTest('A7. HOD-created proposal skips HOD and goes to HOS (cannot self-approve)', async () => {
    const res = await fetch(`${baseUrl}/api/competitions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${hodAuth.token}` },
      body: JSON.stringify({
        title: 'HOD Initiated CSE Summit',
        code: 'TEST-HOD-FLOW-02',
        description: 'HOD proposal',
        category: 'TECHNICAL',
        scope: 'UNIVERSITY_LEVEL',
        proposedDate: futureDate,
        venue: 'Seminar Hall 1',
        submitForReview: true,
      }),
    });
    const body = (await res.json()) as any;
    assert(body.data.status === CompetitionStatus.PENDING_HOS_APPROVAL, `Expected PENDING_HOS_APPROVAL, got ${body.data.status}`);
    hodCompId = body.data._id;

    // HOD cannot review own proposal
    const selfHod = await fetch(`${baseUrl}/api/competitions/${hodCompId}/hod-review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${hodAuth.token}` },
      body: JSON.stringify({ action: 'APPROVE', remarks: 'Self approve' }),
    });
    assert(selfHod.status === 403, `HOD self-approval should be 403, got ${selfHod.status}`);
  });

  await assertTest('A8. HOS-created proposal skips HOD & HOS and goes directly to DSW', async () => {
    const res = await fetch(`${baseUrl}/api/competitions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${hosAuth.token}` },
      body: JSON.stringify({
        title: 'HOS Inter-School Tech Conclave',
        code: 'TEST-HOS-FLOW-03',
        description: 'HOS proposal',
        category: 'INNOVATION_STARTUP',
        scope: 'INTER_SCHOOL',
        proposedDate: futureDate,
        venue: 'Main Auditorium',
        submitForReview: true,
      }),
    });
    const body = (await res.json()) as any;
    assert(body.data.status === CompetitionStatus.PENDING_DSW_APPROVAL, `Expected PENDING_DSW_APPROVAL, got ${body.data.status}`);
    hosCompId = body.data._id;

    // HOS cannot self-approve at HOS or DSW
    const selfHos = await fetch(`${baseUrl}/api/competitions/${hosCompId}/hos-review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${hosAuth.token}` },
      body: JSON.stringify({ action: 'APPROVE', remarks: 'Self approve' }),
    });
    assert(selfHos.status === 403, `HOS self-approval should be 403, got ${selfHos.status}`);
  });

  await assertTest('A9. Rejected proposal records reason and cannot proceed further', async () => {
    const createRes = await fetch(`${baseUrl}/api/competitions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${facultyAuth.token}` },
      body: JSON.stringify({
        title: 'Proposal To Reject',
        code: 'TEST-REJ-FLOW-04',
        description: 'Incomplete plan',
        proposedDate: futureDate,
        venue: 'Lab 2',
        submitForReview: true,
      }),
    });
    rejCompId = ((await createRes.json()) as any).data._id;

    const rejRes = await fetch(`${baseUrl}/api/competitions/${rejCompId}/hod-review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${hodAuth.token}` },
      body: JSON.stringify({ action: 'REJECT', remarks: 'Insufficient safety and budget planning.' }),
    });
    const rejBody = (await rejRes.json()) as any;
    assert(rejBody.data.status === CompetitionStatus.REJECTED, 'Status should be REJECTED');
    assert(rejBody.data.rejectionReason === 'Insufficient safety and budget planning.', 'Rejection reason mismatch');

    // Attempt to advance rejected proposal via HOS or submit should fail
    const hosTry = await fetch(`${baseUrl}/api/competitions/${rejCompId}/hos-review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${hosAuth.token}` },
      body: JSON.stringify({ action: 'APPROVE', remarks: 'Try advance' }),
    });
    assert(hosTry.status === 400, `Rejected proposal should not advance, got ${hosTry.status}`);
  });

  await assertTest('A10. Changes requested at HOS returns to creator and resumes directly at HOS upon resubmission', async () => {
    const createRes = await fetch(`${baseUrl}/api/competitions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${facultyAuth.token}` },
      body: JSON.stringify({
        title: 'Proposal For HOS Changes',
        code: 'TEST-CHG-FLOW-05',
        description: 'Initial draft',
        proposedDate: futureDate,
        venue: 'Lab 3',
        submitForReview: true,
      }),
    });
    chgCompId = ((await createRes.json()) as any).data._id;

    // HOD approves -> HOS
    await fetch(`${baseUrl}/api/competitions/${chgCompId}/hod-review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${hodAuth.token}` },
      body: JSON.stringify({ action: 'APPROVE', remarks: 'HOD OK' }),
    });

    // HOS requests changes
    const chgRes = await fetch(`${baseUrl}/api/competitions/${chgCompId}/hos-review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${hosAuth.token}` },
      body: JSON.stringify({ action: 'CHANGES_REQUESTED', remarks: 'Please clarify evaluation rubric details.' }),
    });
    const chgBody = (await chgRes.json()) as any;
    assert(chgBody.data.status === CompetitionStatus.CHANGES_REQUESTED, `Expected CHANGES_REQUESTED, got ${chgBody.data.status}`);
    assert(chgBody.data.returnedFromLevel === ApprovalLevel.HOS, `Expected returnedFromLevel HOS, got ${chgBody.data.returnedFromLevel}`);

    // Creator edits & resubmits -> should resume directly at PENDING_HOS_APPROVAL (not HOD!)
    const resRes = await fetch(`${baseUrl}/api/competitions/${chgCompId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${facultyAuth.token}` },
      body: JSON.stringify({
        description: 'Updated with full rubric details',
        resubmit: true,
        resubmissionNotes: 'Added rubric criteria per HOS request.',
      }),
    });
    const resBody = (await resRes.json()) as any;
    assert(resBody.data.status === CompetitionStatus.PENDING_HOS_APPROVAL, `Expected resume at PENDING_HOS_APPROVAL, got ${resBody.data.status}`);
    assert(resBody.data.currentApprovalLevel === ApprovalLevel.HOS, `Expected level HOS, got ${resBody.data.currentApprovalLevel}`);
  });

  // =========================================================================
  // STUDENT VISIBILITY & REGISTRATION TESTS (1–9)
  // =========================================================================
  console.log('\n--- PART 14B: STUDENT VISIBILITY & REGISTRATION TESTS ---');

  await assertTest('S1. DSW-approved & published competition visible to students without confidential remarks', async () => {
    const feedRes = await fetch(`${baseUrl}/api/competitions/student-feed`, {
      headers: { Authorization: `Bearer ${student1Auth.token}` },
    });
    const feedBody = (await feedRes.json()) as any;
    const found = feedBody.data.openForRegistration.find((c: any) => c._id === facCompId);
    assert(Boolean(found), 'Published competition missing from student openForRegistration feed');
    assert(!found.approvalAuditTrail, 'Confidential audit trail leaked to student feed!');

    const detailRes = await fetch(`${baseUrl}/api/competitions/${facCompId}`, {
      headers: { Authorization: `Bearer ${student1Auth.token}` },
    });
    const detailBody = (await detailRes.json()) as any;
    assert(detailRes.status === 200, `Expected 200, got ${detailRes.status}`);
    assert(!detailBody.data.approvalAuditTrail && !detailBody.data.dswRemarks && !detailBody.data.budgetProposal, 'Confidential approval remarks leaked on detail!');
  });

  await assertTest('S2. Upcoming competition (future open date) visible as PUBLISHED, registration stays closed', async () => {
    const futureOpen = new Date(Date.now() + 5 * 24 * 3600 * 1000).toISOString();
    const futureClose = new Date(Date.now() + 12 * 24 * 3600 * 1000).toISOString();
    const cRes = await fetch(`${baseUrl}/api/competitions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${dswAuth.token}` },
      body: JSON.stringify({
        title: 'Upcoming Future Event',
        code: 'TEST-UPCOMING-06',
        description: 'Opens in 5 days',
        proposedDate: futureDate,
        registrationOpenDate: futureOpen,
        registrationCloseDate: futureClose,
        venue: 'CTU Lawn',
        submitForReview: true,
      }),
    });
    upcomingCompId = ((await cRes.json()) as any).data._id;

    const pRes = await fetch(`${baseUrl}/api/competitions/${upcomingCompId}/publish`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${dswAuth.token}` },
    });
    const pBody = (await pRes.json()) as any;
    assert(pBody.data.status === CompetitionStatus.PUBLISHED, `Expected PUBLISHED (upcoming), got ${pBody.data.status}`);

    const regTry = await fetch(`${baseUrl}/api/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${student1Auth.token}` },
      body: JSON.stringify({ competitionId: upcomingCompId }),
    });
    assert(regTry.status === 400, `Expected 400 before registration open date, got ${regTry.status}`);
  });

  await assertTest('S3. Eligible student registers cleanly, non-student blocked, duplicate blocked (409)', async () => {
    // Faculty cannot register as student
    const facTry = await fetch(`${baseUrl}/api/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${facultyAuth.token}` },
      body: JSON.stringify({ competitionId: facCompId }),
    });
    assert(facTry.status === 403, `Faculty should get 403 on student registration, got ${facTry.status}`);

    // Valid student registration
    const rRes = await fetch(`${baseUrl}/api/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${student1Auth.token}` },
      body: JSON.stringify({ competitionId: facCompId }),
    });
    const rBody = (await rRes.json()) as any;
    assert(rRes.status === 201 && rBody.success, `Student reg failed: ${JSON.stringify(rBody)}`);
    student1RegId = rBody.data._id;

    // Duplicate registration blocked
    const dupRes = await fetch(`${baseUrl}/api/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${student1Auth.token}` },
      body: JSON.stringify({ competitionId: facCompId }),
    });
    assert(dupRes.status === 409, `Duplicate reg should return 409, got ${dupRes.status}`);
  });

  await assertTest('S4. Registration after deadline prevented', async () => {
    const pastOpen = new Date(Date.now() - 10 * 24 * 3600 * 1000).toISOString();
    const pastClose = new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString();
    const cRes = await fetch(`${baseUrl}/api/competitions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${dswAuth.token}` },
      body: JSON.stringify({
        title: 'Closed Deadline Event',
        code: 'TEST-DEADLINE-07',
        description: 'Deadline passed',
        proposedDate: futureDate,
        registrationOpenDate: pastOpen,
        registrationCloseDate: pastClose,
        venue: 'Hall C',
        submitForReview: true,
      }),
    });
    const dlId = ((await cRes.json()) as any).data._id;
    await fetch(`${baseUrl}/api/competitions/${dlId}/publish`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${dswAuth.token}` },
    });

    const regTry = await fetch(`${baseUrl}/api/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${student1Auth.token}` },
      body: JSON.stringify({ competitionId: dlId }),
    });
    assert(regTry.status === 400, `Expected 400 after deadline, got ${regTry.status}`);
  });

  await assertTest('S5. Atomic capacity limit prevents concurrent overbooking & auto-closes when full', async () => {
    const cRes = await fetch(`${baseUrl}/api/competitions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${dswAuth.token}` },
      body: JSON.stringify({
        title: 'Limited Seat Workshop',
        code: 'TEST-CAP-08',
        description: 'Max 1 seat!',
        proposedDate: futureDate,
        registrationOpenDate: openPastDate,
        registrationCloseDate: closeFutureDate,
        venue: 'Room 101',
        maxRegistrations: 1,
        submitForReview: true,
      }),
    });
    capCompId = ((await cRes.json()) as any).data._id;
    await fetch(`${baseUrl}/api/competitions/${capCompId}/publish`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${dswAuth.token}` },
    });

    // Fire 2 simultaneous registrations for 1 available seat
    const [r1, r2] = await Promise.all([
      fetch(`${baseUrl}/api/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${student1Auth.token}` },
        body: JSON.stringify({ competitionId: capCompId }),
      }),
      fetch(`${baseUrl}/api/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${student2Auth.token}` },
        body: JSON.stringify({ competitionId: capCompId }),
      }),
    ]);

    const statuses = [r1.status, r2.status].sort();
    assert(statuses[0] === 201 && statuses[1] === 400, `Expected exactly one 201 and one 400 under concurrency, got ${statuses.join(', ')}`);

    const updatedComp = await Competition.findById(capCompId);
    assert(updatedComp?.currentRegistrationsCount === 1, `Expected count 1, got ${updatedComp?.currentRegistrationsCount}`);
    assert(updatedComp?.status === CompetitionStatus.REGISTRATION_CLOSED, `Expected auto-close REGISTRATION_CLOSED, got ${updatedComp?.status}`);
  });

  // =========================================================================
  // MONITORING & PRIVACY TESTS (1–6)
  // =========================================================================
  console.log('\n--- PART 14C: REGISTRATION MONITORING & ACCESS TESTS ---');

  await assertTest('M1. Faculty, HOD, HOS, DSW all see scoped registration counts & progress', async () => {
    const [facMon, hodMon, hosMon, dswMon] = await Promise.all([
      fetch(`${baseUrl}/api/monitoring/overview`, { headers: { Authorization: `Bearer ${facultyAuth.token}` } }).then((r) => r.json() as any),
      fetch(`${baseUrl}/api/monitoring/overview`, { headers: { Authorization: `Bearer ${hodAuth.token}` } }).then((r) => r.json() as any),
      fetch(`${baseUrl}/api/monitoring/overview`, { headers: { Authorization: `Bearer ${hosAuth.token}` } }).then((r) => r.json() as any),
      fetch(`${baseUrl}/api/monitoring/overview`, { headers: { Authorization: `Bearer ${dswAuth.token}` } }).then((r) => r.json() as any),
    ]);

    for (const mon of [facMon, hodMon, hosMon, dswMon]) {
      const card = mon.data.competitions.find((c: any) => c._id === facCompId);
      assert(Boolean(card), `Missing competition card in ${mon.data.summary.scopeLabel}`);
      assert(card.registrationsReceived === 1, `Expected 1 registration in ${mon.data.summary.scopeLabel}, got ${card.registrationsReceived}`);
      assert(card.remainingSeats === 49, `Expected 49 remaining seats, got ${card.remainingSeats}`);
      assert(card.percentageFilled === 2, `Expected 2% filled, got ${card.percentageFilled}`);
    }

    // DSW sees TEST-CAP-08 too; Faculty does not see DSW's TEST-CAP-08
    assert(!facMon.data.competitions.some((c: any) => c._id === capCompId), 'Faculty monitoring leaked DSW-only event!');
    assert(dswMon.data.competitions.some((c: any) => c._id === capCompId), 'DSW monitoring missing TEST-CAP-08!');
  });

  await assertTest('M2. Registration cancellation decrements count across monitoring dashboards', async () => {
    const cancelRes = await fetch(`${baseUrl}/api/registrations/${student1RegId}/cancel`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${student1Auth.token}` },
      body: JSON.stringify({ reason: 'Schedule conflict' }),
    });
    assert(cancelRes.status === 200, `Cancel failed: ${cancelRes.status}`);

    const hodMon = (await fetch(`${baseUrl}/api/monitoring/overview`, {
      headers: { Authorization: `Bearer ${hodAuth.token}` },
    }).then((r) => r.json())) as any;
    const card = hodMon.data.competitions.find((c: any) => c._id === facCompId);
    assert(card.registrationsReceived === 0, `Expected 0 registrations after cancel, got ${card.registrationsReceived}`);
    assert(card.remainingSeats === 50, `Expected 50 remaining seats after cancel, got ${card.remainingSeats}`);
  });

  await assertTest('M3. Students cannot access monitoring dashboards or other students registration lists (403)', async () => {
    const monRes = await fetch(`${baseUrl}/api/monitoring/overview`, {
      headers: { Authorization: `Bearer ${student1Auth.token}` },
    });
    assert(monRes.status === 403, `Student should get 403 on monitoring overview, got ${monRes.status}`);

    const regListRes = await fetch(`${baseUrl}/api/registrations/competition/${facCompId}`, {
      headers: { Authorization: `Bearer ${student1Auth.token}` },
    });
    assert(regListRes.status === 403, `Student should get 403 on competition registration list, got ${regListRes.status}`);
  });

  // Clean up test records so Atlas remains clean
  const cleanupIds = [facCompId, hodCompId, hosCompId, rejCompId, chgCompId, upcomingCompId, capCompId].filter(Boolean);
  const dlComps = await Competition.find({ code: { $in: testCodes } }).select('_id');
  const allCleanIds = Array.from(new Set([...cleanupIds, ...dlComps.map((c) => c._id.toString())]));
  await Promise.all([
    Registration.deleteMany({ competitionId: { $in: allCleanIds } }),
    Team.deleteMany({ competitionId: { $in: allCleanIds } }),
    ApprovalHistory.deleteMany({ competitionId: { $in: allCleanIds } }),
    CompetitionProposal.deleteMany({ competitionId: { $in: allCleanIds } }),
    Competition.deleteMany({ _id: { $in: allCleanIds } }),
  ]);

  server.close();

  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;
  console.log('\n===================================================================');
  console.log(`🏁 PART 14 WORKFLOW SUITE: ${passed} PASSED | ${failed} FAILED (Total: ${results.length})`);
  console.log('===================================================================');

  await mongoose.disconnect();
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error('Fatal suite error:', err);
  process.exit(1);
});
