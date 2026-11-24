import { createApp, ensureConnected } from '../app.js';
import { User } from '../models/User.js';
import { School } from '../models/School.js';
import { Competition } from '../models/Competition.js';
import http from 'http';

async function testProposalFlow() {
  console.log('========================================================================');
  console.log('🚀 CTU COMPETITION HUB: CSE HOD PROPOSAL -> DSW ADMIN QUEUE LIVE TEST');
  console.log('========================================================================\n');

  // Step 1: Connect to Atlas DB
  await ensureConnected();
  console.log('✅ Connected to MongoDB Atlas.');

  // Clean up any prior test proposal with same code
  await Competition.deleteMany({ code: 'CTU-CSE-AI-2026' });

  // Start temporary local HTTP test instance
  const app = createApp();
  const server = http.createServer(app);
  await new Promise<void>((resolve) => server.listen(0, resolve));
  const port = (server.address() as any).port;
  const baseUrl = `http://127.0.0.1:${port}`;

  // Step 2: Login as SOET / CSE Coordinator (Er. Vikram Sharma)
  console.log('🔑 Step 1: Logging in as CSE / SOET School Coordinator...');
  const soetLoginRes = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'soet.coordinator@ctuniversity.in',
      password: 'ctu@12345',
    }),
  });
  const soetLoginData = (await soetLoginRes.json()) as any;
  if (!soetLoginData.success) {
    throw new Error('SOET Coordinator login failed: ' + JSON.stringify(soetLoginData));
  }
  const soetToken = soetLoginData.data.token;
  const soetUser = soetLoginData.data.user;
  console.log(`   👤 Signed in as: ${soetUser.name} (${soetUser.designation})`);

  // Get SOET School
  const soetSchool = await School.findOne({ code: 'SOET' });
  if (!soetSchool) throw new Error('SOET school not found');
  console.log(`   🏫 Organizing School: ${soetSchool.name} [Code: ${soetSchool.code}]`);

  // Step 3: CSE Coordinator Submits New Competition Proposal
  console.log('\n📝 Step 2: Submitting New Proposal: "National CSE AI & Cloud Hackathon 2026"...');
  const proposalPayload = {
    title: 'National CSE AI & Cloud Hackathon 2026',
    code: 'CTU-CSE-AI-2026',
    description: 'Premier 36-hour national level hackathon organized by CTU School of Engineering & Technology focusing on Agentic AI, Generative Models, and Cloud Architectures.',
    category: 'TECHNICAL',
    scope: 'UNIVERSITY_LEVEL',
    organizingSchool: soetSchool._id,
    proposedDate: new Date('2026-12-15T09:00:00Z').toISOString(),
    startDate: new Date('2026-12-15T09:00:00Z').toISOString(),
    endDate: new Date('2026-12-16T21:00:00Z').toISOString(),
    registrationOpenDate: new Date('2026-11-25T00:00:00Z').toISOString(),
    registrationCloseDate: new Date('2026-12-10T23:59:59Z').toISOString(),
    venue: 'CTU Computing Centre & Cyber Block Labs',
    participationType: 'TEAM',
    minTeamSize: 2,
    maxTeamSize: 4,
    maxTeams: 50,
    registrationFee: 0,
    requiredFacultyCount: 4,
    requiredVolunteersCount: 10,
    budgetProposal: {
      items: [
        { description: 'Cloud Infrastructure & API Credits', estimatedCost: 25000, category: 'Technical' },
        { description: 'Trophies, Medals & Certificates', estimatedCost: 20000, category: 'Logistics' },
        { description: 'Participant Meals & Refreshments', estimatedCost: 35000, category: 'Food & Beverage' },
      ],
      totalEstimatedBudget: 80000,
    },
    prizeDetails: {
      firstPrizeAmount: 30000,
      secondPrizeAmount: 15000,
      thirdPrizeAmount: 10000,
    },
    submitForReview: true, // Direct submission into SUBMITTED status
  };

  const createRes = await fetch(`${baseUrl}/api/competitions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${soetToken}`,
    },
    body: JSON.stringify(proposalPayload),
  });

  const createData = (await createRes.json()) as any;
  if (!createData.success) {
    throw new Error('Proposal creation failed: ' + JSON.stringify(createData));
  }
  const createdComp = createData.data;
  console.log(`   ✨ Proposal Created! ID: ${createdComp._id}`);
  console.log(`   📌 Proposal Code: ${createdComp.code}`);
  console.log(`   📊 Status: ${createdComp.status}`);

  // Step 4: Login as DSW Admin (Dr. Gurpreet Singh)
  console.log('\n👑 Step 3: Logging in as DSW Admin (Dr. Gurpreet Singh)...');
  const dswLoginRes = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'dsw@ctuniversity.in',
      password: 'ctu@12345',
    }),
  });
  const dswLoginData = (await dswLoginRes.json()) as any;
  if (!dswLoginData.success) {
    throw new Error('DSW Admin login failed: ' + JSON.stringify(dswLoginData));
  }
  const dswToken = dswLoginData.data.token;
  const dswUser = dswLoginData.data.user;
  console.log(`   👤 Signed in as: ${dswUser.name} (${dswUser.designation})`);

  // Step 5: DSW Admin Fetches Proposal Approval Queue
  console.log('\n📥 Step 4: DSW Admin querying Approval Queue (GET /api/competitions)...');
  const queueRes = await fetch(`${baseUrl}/api/competitions`, {
    headers: { Authorization: `Bearer ${dswToken}` },
  });
  const queueData = (await queueRes.json()) as any;
  if (!queueData.success) {
    throw new Error('Failed to fetch approval queue: ' + JSON.stringify(queueData));
  }

  const matchingProposal = queueData.data.find((c: any) => c.code === 'CTU-CSE-AI-2026');
  if (!matchingProposal) {
    throw new Error('Proposal CTU-CSE-AI-2026 NOT found in DSW Approval Queue!');
  }
  console.log(`   🎯 FOUND IN DSW QUEUE! Title: "${matchingProposal.title}"`);
  console.log(`   🏷️ Status: ${matchingProposal.status}`);
  console.log(`   🏫 School: ${matchingProposal.organizingSchool?.name || 'SOET'}`);
  console.log(`   💰 Requested Budget: ₹${matchingProposal.budgetProposal?.totalEstimatedBudget}`);

  // Step 6: DSW Admin Approves the Proposal
  console.log('\n✅ Step 5: DSW Admin Reviewing & Approving Proposal...');
  const approveRes = await fetch(`${baseUrl}/api/competitions/${createdComp._id}/review`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${dswToken}`,
    },
    body: JSON.stringify({
      action: 'APPROVE',
      remarks: 'Approved by Directorate of Student Welfare. Outstanding initiative for engineering students.',
    }),
  });
  const approveData = (await approveRes.json()) as any;
  if (!approveData.success) {
    throw new Error('Approval failed: ' + JSON.stringify(approveData));
  }
  console.log(`   🎉 Review result: ${approveData.message}`);
  console.log(`   📊 New Status: ${approveData.data.status}`);

  // Step 7: DSW Admin Publishes the Approved Competition
  console.log('\n📢 Step 6: Publishing Competition for University-wide Registrations...');
  const publishRes = await fetch(`${baseUrl}/api/competitions/${createdComp._id}/publish`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${dswToken}`,
    },
  });
  const publishData = (await publishRes.json()) as any;
  if (!publishData.success) {
    throw new Error('Publishing failed: ' + JSON.stringify(publishData));
  }
  console.log(`   🌐 Live Status: ${publishData.data.status}`);
  console.log(`   🔓 Registrations Open: ${publishData.data.isPublished ? 'YES' : 'NO'}`);

  server.close();
  console.log('\n========================================================================');
  console.log('🏆 CSE HOD PROPOSAL LIFECYCLE TEST COMPLETED WITH 100% SUCCESS!');
  console.log('========================================================================');
}

testProposalFlow().catch((err) => {
  console.error('Test crashed:', err);
  process.exit(1);
});
