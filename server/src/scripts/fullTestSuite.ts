import { createApp, ensureConnected } from '../app.js';
import { User } from '../models/User.js';
import { School } from '../models/School.js';
import { Competition } from '../models/Competition.js';
import { Registration } from '../models/Registration.js';
import { FacultyDuty } from '../models/FacultyDuty.js';
import { Certificate } from '../models/Certificate.js';
import { ENV } from '../config/env.js';
import http from 'http';

interface TestResult {
  name: string;
  passed: boolean;
  details?: string;
  durationMs: number;
}

const results: TestResult[] = [];

async function runTest(name: string, fn: () => Promise<void>) {
  const start = Date.now();
  try {
    await fn();
    results.push({ name, passed: true, durationMs: Date.now() - start });
    console.log(`  ✅ PASS: ${name} (${Date.now() - start}ms)`);
  } catch (err: any) {
    results.push({ name, passed: false, details: err.message, durationMs: Date.now() - start });
    console.error(`  ❌ FAIL: ${name} (${Date.now() - start}ms) -> ${err.message}`);
  }
}

async function main() {
  console.log('===============================================================');
  console.log('🧪 CTU COMPETITION HUB - COMPREHENSIVE END-TO-END TEST SUITE');
  console.log('===============================================================\n');

  // TEST 1: Database Connection to Atlas
  await runTest('1. Connect to MongoDB Atlas', async () => {
    await ensureConnected();
  });

  // TEST 2: Collections and Record Counts
  await runTest('2. Verify Database Master Data & Seeding', async () => {
    const userCount = await User.countDocuments();
    const schoolCount = await School.countDocuments();
    const compCount = await Competition.countDocuments();
    const regCount = await Registration.countDocuments();
    const dutyCount = await FacultyDuty.countDocuments();
    const certCount = await Certificate.countDocuments();

    console.log(`     📊 DB Counts: Users=${userCount}, Schools=${schoolCount}, Comps=${compCount}, Regs=${regCount}, Duties=${dutyCount}, Certs=${certCount}`);

    if (userCount < 10) throw new Error(`Expected at least 10 users, found ${userCount}`);
    if (schoolCount !== 8) throw new Error(`Expected exactly 8 CTU schools, found ${schoolCount}`);
    if (compCount < 3) throw new Error(`Expected at least 3 competitions, found ${compCount}`);
  });

  // TEST 3: Bcrypt Password Verification for All Demo Accounts
  const demoUsers = [
    { email: 'dsw@ctuniversity.in', role: 'DSW_ADMIN' },
    { email: 'superadmin@ctuniversity.in', role: 'SUPER_ADMIN' },
    { email: 'soet.coordinator@ctuniversity.in', role: 'SCHOOL_COORDINATOR' },
    { email: 'cultural.soet@ctuniversity.in', role: 'CULTURAL_COORDINATOR' },
    { email: 'navneet.cse@ctuniversity.in', role: 'FACULTY' },
    { email: 'judge.law@ctuniversity.in', role: 'JUDGE' },
    { email: 'student@ctuniversity.in', role: 'STUDENT' },
  ];

  for (const demo of demoUsers) {
    await runTest(`3. Verify Password & Role for ${demo.email}`, async () => {
      const user = await User.findOne({ email: demo.email });
      if (!user) throw new Error(`User ${demo.email} not found in database!`);
      const isMatch = await user.comparePassword('ctu@12345');
      if (!isMatch) throw new Error(`Password comparison failed for ${demo.email} with ctu@12345!`);
      if (!user.roles.includes(demo.role as any)) {
        throw new Error(`Expected role ${demo.role} on ${demo.email}, but got ${user.roles.join(', ')}`);
      }
    });
  }

  // TEST 4: Express HTTP Server & Endpoints
  const app = createApp();
  const server = http.createServer(app);
  await new Promise<void>((resolve) => server.listen(0, resolve));
  const port = (server.address() as any).port;
  const baseUrl = `http://127.0.0.1:${port}`;
  console.log(`\n🌐 Test server running at ${baseUrl}\n`);

  let dswToken = '';
  let studentToken = '';
  let facultyToken = '';
  let judgeToken = '';

  // TEST 4.1: Health Endpoint
  await runTest('4.1 GET /api/health', async () => {
    const res = await fetch(`${baseUrl}/api/health`);
    if (res.status !== 200) throw new Error(`Expected status 200, got ${res.status}`);
    const data = await res.json();
    if (data.status !== 'UP') throw new Error(`Expected status UP, got ${data.status}`);
  });

  // TEST 4.2: Direct Login with Email & Password
  await runTest('4.2 POST /api/auth/login (DSW Admin)', async () => {
    const res = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'dsw@ctuniversity.in', password: 'ctu@12345' }),
    });
    if (res.status !== 200) throw new Error(`Expected status 200, got ${res.status} ${await res.text()}`);
    const data = await res.json();
    if (!data.success || !data.data?.token) throw new Error(`Login response missing token: ${JSON.stringify(data)}`);
    dswToken = data.data.token;
  });

  // TEST 4.3: Invalid Credentials Login
  await runTest('4.3 POST /api/auth/login with Invalid Password (Expect 401)', async () => {
    const res = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'dsw@ctuniversity.in', password: 'wrongpassword' }),
    });
    if (res.status !== 401) throw new Error(`Expected status 401, got ${res.status}`);
    const data = await res.json();
    if (data.success !== false) throw new Error(`Expected success: false, got: ${JSON.stringify(data)}`);
  });

  // TEST 4.4: 1-Click Role Switcher for All 6 Roles
  const rolesToTest = [
    'DSW_ADMIN',
    'SCHOOL_COORDINATOR',
    'CULTURAL_COORDINATOR',
    'FACULTY',
    'JUDGE',
    'STUDENT',
  ];

  for (const role of rolesToTest) {
    await runTest(`4.4 POST /api/auth/switch-demo-role (${role})`, async () => {
      const res = await fetch(`${baseUrl}/api/auth/switch-demo-role`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      });
      if (res.status !== 200) throw new Error(`Expected status 200, got ${res.status}: ${await res.text()}`);
      const data = await res.json();
      if (!data.success || !data.data?.token) throw new Error(`Switch response missing token: ${JSON.stringify(data)}`);

      if (role === 'STUDENT') studentToken = data.data.token;
      if (role === 'FACULTY') facultyToken = data.data.token;
      if (role === 'JUDGE') judgeToken = data.data.token;
    });
  }

  // TEST 4.5: GET /api/auth/me with Bearer token
  await runTest('4.5 GET /api/auth/me (Protected Route Verification)', async () => {
    const res = await fetch(`${baseUrl}/api/auth/me`, {
      headers: { Authorization: `Bearer ${dswToken}` },
    });
    if (res.status !== 200) throw new Error(`Expected status 200, got ${res.status}`);
    const data = await res.json();
    if (!data.success || data.data?.email !== 'dsw@ctuniversity.in') {
      throw new Error(`Unexpected user returned: ${JSON.stringify(data)}`);
    }
  });

  // TEST 4.6: GET /api/schools
  await runTest('4.6 GET /api/schools (All CTU Schools)', async () => {
    const res = await fetch(`${baseUrl}/api/schools`);
    if (res.status !== 200) throw new Error(`Expected status 200, got ${res.status}`);
    const data = await res.json();
    if (!data.success || data.data?.length !== 8) {
      throw new Error(`Expected 8 schools, got ${data.data?.length}`);
    }
  });

  // TEST 4.7: GET /api/competitions/public
  await runTest('4.7 GET /api/competitions/public (Discovery Portal)', async () => {
    const res = await fetch(`${baseUrl}/api/competitions/public`);
    if (res.status !== 200) throw new Error(`Expected status 200, got ${res.status}`);
    const data = await res.json();
    if (!data.success || !Array.isArray(data.data)) {
      throw new Error(`Expected competition list, got ${JSON.stringify(data)}`);
    }
  });

  // TEST 4.8: GET /api/registrations/my (Student Registrations)
  await runTest('4.8 GET /api/registrations/my (Student Dashboard)', async () => {
    const res = await fetch(`${baseUrl}/api/registrations/my`, {
      headers: { Authorization: `Bearer ${studentToken}` },
    });
    if (res.status !== 200) throw new Error(`Expected status 200, got ${res.status}`);
    const data = await res.json();
    if (!data.success) throw new Error(`Failed to get registrations: ${JSON.stringify(data)}`);
  });

  // TEST 4.9: GET /api/duties/my (Faculty Duties)
  await runTest('4.9 GET /api/duties/my (Faculty Dashboard)', async () => {
    const res = await fetch(`${baseUrl}/api/duties/my`, {
      headers: { Authorization: `Bearer ${facultyToken}` },
    });
    if (res.status !== 200) throw new Error(`Expected status 200, got ${res.status}`);
    const data = await res.json();
    if (!data.success) throw new Error(`Failed to get faculty duties: ${JSON.stringify(data)}`);
  });

  // TEST 4.10: Judging Rubric & Evaluations
  await runTest('4.10 GET /api/judging/rubric/:competitionId (Judge Evaluation)', async () => {
    const comp = await Competition.findOne();
    if (!comp) throw new Error('No competition found for judging test');
    const res = await fetch(`${baseUrl}/api/judging/rubric/${comp._id}`, {
      headers: { Authorization: `Bearer ${judgeToken}` },
    });
    if (res.status !== 200) throw new Error(`Expected status 200, got ${res.status}`);
    const data = await res.json();
    if (!data.success || !data.data) throw new Error(`Failed to get rubric: ${JSON.stringify(data)}`);
  });

  // TEST 4.11: GET /api/reports/dsw-overview (DSW Central Analytics)
  await runTest('4.11 GET /api/reports/dsw-overview (DSW Central Analytics)', async () => {
    const res = await fetch(`${baseUrl}/api/reports/dsw-overview`, {
      headers: { Authorization: `Bearer ${dswToken}` },
    });
    if (res.status !== 200) throw new Error(`Expected status 200, got ${res.status}`);
    const data = await res.json();
    if (!data.success) throw new Error(`Failed to get report overview: ${JSON.stringify(data)}`);
  });

  // TEST 4.12: Public Certificate Verification
  await runTest('4.12 GET /api/certificates/verify/:certNumber (Public Certificate Verification)', async () => {
    const cert = await Certificate.findOne();
    if (!cert) throw new Error('No certificate found for verification test');
    const res = await fetch(`${baseUrl}/api/certificates/verify/${cert.certificateNumber}`);
    if (res.status !== 200) throw new Error(`Expected status 200, got ${res.status}`);
    const data = await res.json();
    if (!data.success || !data.isValid) throw new Error(`Expected valid certificate: ${JSON.stringify(data)}`);
  });

  // TEST 4.13: Universal Routing Without /api Prefix (Vercel Rewrites Compatibility)
  await runTest('4.13 GET /health and /schools (Universal Routing Without /api Prefix)', async () => {
    const resHealth = await fetch(`${baseUrl}/health`);
    if (resHealth.status !== 200) throw new Error(`/health expected status 200, got ${resHealth.status}`);
    const resSchools = await fetch(`${baseUrl}/schools`);
    if (resSchools.status !== 200) throw new Error(`/schools expected status 200, got ${resSchools.status}`);
  });

  // Close server
  server.close();

  // Print Summary
  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;

  console.log('\n===============================================================');
  console.log(`🏁 TEST SUITE COMPLETED: ${passed} PASSED | ${failed} FAILED (Total: ${results.length})`);
  console.log('===============================================================');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

main().catch((err) => {
  console.error('Test suite crashed with unhandled error:', err);
  process.exit(1);
});
