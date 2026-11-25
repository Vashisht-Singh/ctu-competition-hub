import { IUser } from '../models/User.js';
import { Competition } from '../models/Competition.js';
import { Registration } from '../models/Registration.js';
import { CompetitionStatus, UserRole } from '../types/enums.js';
import { ENV } from '../config/env.js';

export interface ChatAction {
  label: string;
  path: string;
}

export interface ChatHistoryTurn {
  sender: 'user' | 'bot';
  text: string;
}

export interface ChatResponsePayload {
  reply: string;
  actions: ChatAction[];
  suggestions: string[];
  roleLabel: string;
  mode?: 'ai' | 'smart-engine';
}

interface LiveContext {
  openCompetitionsCount: number;
  upcomingCompetitionsCount: number;
  closedCompetitionsCount: number;
  pendingForRoleCount: number;
  myProposalsCount: number;
  myRegistrationsCount: number;
  publishedList: Array<{
    id: string;
    title: string;
    status: string;
    category: string;
    participationType: string;
    maxRegistrations: number;
    currentRegistrationsCount: number;
    registrationCloseDate?: Date;
    proposedDate?: Date;
  }>;
}

function getPrimaryRoleLabel(user?: IUser): string {
  if (!user || !user.roles?.length) return 'Visitor / Guest';
  if (user.roles.includes(UserRole.SUPER_ADMIN)) return 'Super Admin';
  if (user.roles.includes(UserRole.DSW_ADMIN)) return 'Director Student Welfare (DSW)';
  if (user.roles.includes(UserRole.HOS) || user.roles.includes(UserRole.SCHOOL_COORDINATOR)) return 'Head of School (HOS)';
  if (user.roles.includes(UserRole.HOD)) return 'Head of Department (HOD)';
  if (user.roles.includes(UserRole.CULTURAL_COORDINATOR)) return 'Cultural Coordinator';
  if (user.roles.includes(UserRole.FACULTY)) return 'Faculty Coordinator';
  if (user.roles.includes(UserRole.JUDGE)) return 'Judge';
  return 'Student';
}

function getRoleActions(user?: IUser): ChatAction[] {
  if (!user) {
    return [
      { label: 'Explore Competitions', path: '/discover' },
      { label: 'Sign In', path: '/login' },
    ];
  }
  if (user.roles.includes(UserRole.DSW_ADMIN) || user.roles.includes(UserRole.SUPER_ADMIN)) {
    return [
      { label: 'DSW Dashboard', path: '/dsw/dashboard' },
      { label: 'Approval Queue', path: '/dsw/approval-queue' },
    ];
  }
  if (user.roles.includes(UserRole.HOS) || user.roles.includes(UserRole.SCHOOL_COORDINATOR)) {
    return [
      { label: 'HOS Dashboard', path: '/hos/dashboard' },
      { label: 'New Proposal', path: '/competitions/create' },
    ];
  }
  if (user.roles.includes(UserRole.HOD)) {
    return [
      { label: 'HOD Dashboard', path: '/hod/dashboard' },
      { label: 'New Proposal', path: '/competitions/create' },
    ];
  }
  if (user.roles.includes(UserRole.FACULTY) || user.roles.includes(UserRole.CULTURAL_COORDINATOR)) {
    return [
      { label: 'Faculty Dashboard', path: '/faculty/dashboard' },
      { label: 'Create Proposal', path: '/competitions/create' },
    ];
  }
  if (user.roles.includes(UserRole.JUDGE)) {
    return [{ label: 'Judging Portal', path: '/judging/dashboard' }];
  }
  return [
    { label: 'Student Dashboard', path: '/student/dashboard' },
    { label: 'My Registrations', path: '/student/registrations' },
  ];
}

function getRoleSuggestions(user?: IUser): string[] {
  if (!user) {
    return [
      'What is CTU Competition Hub?',
      'How does the approval hierarchy work?',
      'Suppose registrations are closed, how can we extend them?',
      'How do students register for competitions?',
    ];
  }
  if (user.roles.includes(UserRole.DSW_ADMIN) || user.roles.includes(UserRole.SUPER_ADMIN)) {
    return [
      'How do we extend registration deadline or capacity?',
      'What is my pending DSW queue right now?',
      'How does registration monitoring work?',
      'Explain all competition statuses',
    ];
  }
  if (user.roles.includes(UserRole.HOS) || user.roles.includes(UserRole.SCHOOL_COORDINATOR)) {
    return [
      'How do I review HOS proposals?',
      'Can we extend registration after it closes?',
      'How do I monitor school registrations?',
      'What happens if changes are requested?',
    ];
  }
  if (user.roles.includes(UserRole.HOD)) {
    return [
      'How do I review department faculty proposals?',
      'What happens when I create a proposal as HOD?',
      'Can we extend registration after it closes?',
      'How do I monitor department registrations?',
    ];
  }
  if (user.roles.includes(UserRole.FACULTY) || user.roles.includes(UserRole.CULTURAL_COORDINATOR)) {
    return [
      'How do I submit a competition proposal?',
      'Suppose registrations are closed, how do we extend them?',
      'How do I fix a "Changes Requested" proposal?',
      'How do I track registrations for my event?',
    ];
  }
  if (user.roles.includes(UserRole.JUDGE)) {
    return [
      'How do I score participants as a Judge?',
      'How are results published?',
      'What if there is a tie or score correction?',
    ];
  }
  return [
    'How do I register for a competition?',
    'How many competitions are open right now?',
    'Can I cancel or modify my registration?',
    'Where do I find my QR certificate?',
  ];
}

async function gatherLiveContext(user?: IUser): Promise<LiveContext> {
  const ctx: LiveContext = {
    openCompetitionsCount: 0,
    upcomingCompetitionsCount: 0,
    closedCompetitionsCount: 0,
    pendingForRoleCount: 0,
    myProposalsCount: 0,
    myRegistrationsCount: 0,
    publishedList: [],
  };

  try {
    const [openCount, upcomingCount, closedCount, publishedDocs] = await Promise.all([
      Competition.countDocuments({
        isPublished: true,
        status: CompetitionStatus.REGISTRATION_OPEN,
      }),
      Competition.countDocuments({
        isPublished: true,
        status: { $in: [CompetitionStatus.PUBLISHED, CompetitionStatus.APPROVED_BY_DSW] },
      }),
      Competition.countDocuments({
        isPublished: true,
        status: CompetitionStatus.REGISTRATION_CLOSED,
      }),
      Competition.find({ isPublished: true })
        .select('title status category participationType maxRegistrations currentRegistrationsCount registrationCloseDate proposedDate')
        .sort({ createdAt: -1 })
        .limit(12)
        .lean(),
    ]);

    ctx.openCompetitionsCount = openCount;
    ctx.upcomingCompetitionsCount = upcomingCount;
    ctx.closedCompetitionsCount = closedCount;
    ctx.publishedList = publishedDocs.map((d: any) => ({
      id: d._id.toString(),
      title: d.title,
      status: d.status,
      category: d.category,
      participationType: d.participationType,
      maxRegistrations: d.maxRegistrations || 0,
      currentRegistrationsCount: d.currentRegistrationsCount || 0,
      registrationCloseDate: d.registrationCloseDate,
      proposedDate: d.proposedDate,
    }));

    if (user) {
      const userId = user._id;

      if (user.roles.includes(UserRole.DSW_ADMIN) || user.roles.includes(UserRole.SUPER_ADMIN)) {
        ctx.pendingForRoleCount = await Competition.countDocuments({
          status: CompetitionStatus.PENDING_DSW_APPROVAL,
        });
      } else if (user.roles.includes(UserRole.HOS) || user.roles.includes(UserRole.SCHOOL_COORDINATOR)) {
        const filter: Record<string, any> = {
          status: CompetitionStatus.PENDING_HOS_APPROVAL,
        };
        if (user.school) filter.schoolId = user.school;
        ctx.pendingForRoleCount = await Competition.countDocuments(filter);
      } else if (user.roles.includes(UserRole.HOD)) {
        const filter: Record<string, any> = {
          status: { $in: [CompetitionStatus.PENDING_HOD_APPROVAL, CompetitionStatus.SUBMITTED_TO_HOD] },
        };
        if (user.departmentId) filter.departmentId = user.departmentId;
        ctx.pendingForRoleCount = await Competition.countDocuments(filter);
      }

      if (
        user.roles.includes(UserRole.FACULTY) ||
        user.roles.includes(UserRole.HOD) ||
        user.roles.includes(UserRole.HOS) ||
        user.roles.includes(UserRole.CULTURAL_COORDINATOR)
      ) {
        ctx.myProposalsCount = await Competition.countDocuments({ createdBy: userId });
      }

      if (user.roles.includes(UserRole.STUDENT)) {
        ctx.myRegistrationsCount = await Registration.countDocuments({ studentId: userId });
      }
    }
  } catch {
    // Gracefully ignore DB errors in chat helper
  }

  return ctx;
}

// Levenshtein distance for typo tolerance (e.g. "registraions", "exend", "hierarvhu")
function editDistance(a: string, b: string): number {
  if (Math.abs(a.length - b.length) > 3) return 99;
  const dp: number[][] = Array.from({ length: a.length + 1 }, (_, i) =>
    Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[a.length][b.length];
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 2);
}

function fuzzyMatchScore(tokens: string[], keywords: string[]): number {
  let score = 0;
  for (const kw of keywords) {
    const kwLower = kw.toLowerCase();
    if (kwLower.includes(' ')) {
      if (tokens.join(' ').includes(kwLower)) score += 4;
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

// Optional Gemini AI generator when GEMINI_API_KEY is configured in server/.env
async function tryGeminiAnswer(
  userMessage: string,
  history: ChatHistoryTurn[],
  user: IUser | undefined,
  ctx: LiveContext,
  roleLabel: string
): Promise<ChatResponsePayload | null> {
  if (!ENV.GEMINI_API_KEY) return null;

  const liveCompetitionsSummary = ctx.publishedList
    .slice(0, 8)
    .map(
      (c) =>
        `- "${c.title}" (${c.category}, ${c.participationType}) | Status: ${c.status} | Seats: ${c.currentRegistrationsCount}/${c.maxRegistrations}`
    )
    .join('\n');

  const systemInstruction = `You are the official **CTU Competition Hub Guide** for CT University, Ludhiana (Directorate of Student Welfare - DSW).
Answer the user's question clearly, concisely, and accurately based on the real system architecture below.

USER CONTEXT:
- Role: ${roleLabel}${user?.name ? ` (${user.name})` : ''}
- Open Competitions: ${ctx.openCompetitionsCount}, Upcoming: ${ctx.upcomingCompetitionsCount}, Closed: ${ctx.closedCompetitionsCount}
- Pending Queue for Role: ${ctx.pendingForRoleCount}
${liveCompetitionsSummary ? `\nLIVE PUBLISHED COMPETITIONS:\n${liveCompetitionsSummary}` : ''}

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
6. Monitoring: Role-scoped (/api/monitoring/overview) — Faculty sees own events, HOD sees department, HOS sees school, DSW sees all university.
7. Judging & Certificates: Judges score via /judging/dashboard, DSW/Coordinators publish results via /results/publishing, students download QR-verified PDF certificates (/student/certificates), public verification at /verify-certificate/:certNumber.
8. Excel / Bulk Updates: Exports (.xlsx/.csv) are built-in at /reports and per-competition registration lists. Bulk faculty Excel import can be added via DSW admin upload or CLI script.

FORMATTING RULES:
- Use clean markdown (**bold**, bullet lists, numbered steps).
- Be direct, practical, and tailored to the user's role.`;

  try {
    const contents = [
      ...history.slice(-6).map((h) => ({
        role: h.sender === 'user' ? 'user' : 'model',
        parts: [{ text: h.text }],
      })),
      { role: 'user', parts: [{ text: userMessage }] },
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${ENV.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemInstruction }] },
          contents,
          generationConfig: {
            temperature: 0.35,
            maxOutputTokens: 700,
          },
        }),
      }
    );

    if (!response.ok) return null;
    const json: any = await response.json();
    const replyText = json?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!replyText) return null;

    return {
      reply: replyText.trim(),
      actions: getRoleActions(user),
      suggestions: getRoleSuggestions(user),
      roleLabel,
      mode: 'ai',
    };
  } catch {
    return null;
  }
}

export async function getChatWelcome(user?: IUser): Promise<ChatResponsePayload> {
  const roleLabel = getPrimaryRoleLabel(user);
  const ctx = await gatherLiveContext(user);
  const name = user?.name ? `**${user.name}**` : 'there';

  let roleIntro = '';
  if (!user) {
    roleIntro = `There are currently **${ctx.openCompetitionsCount}** competition(s) open for registration. Ask me anything—even dynamic "what-if" questions about workflows, extending registrations, hierarchy rules, or how to use any feature!`;
  } else if (user.roles.includes(UserRole.DSW_ADMIN) || user.roles.includes(UserRole.SUPER_ADMIN)) {
    roleIntro = `You are logged in as **${roleLabel}**. You currently have **${ctx.pendingForRoleCount}** proposal(s) waiting for final DSW approval, and **${ctx.openCompetitionsCount}** competition(s) open across the university.`;
  } else if (user.roles.includes(UserRole.HOS) || user.roles.includes(UserRole.SCHOOL_COORDINATOR)) {
    roleIntro = `You are logged in as **${roleLabel}**. You currently have **${ctx.pendingForRoleCount}** school proposal(s) pending your HOS review.`;
  } else if (user.roles.includes(UserRole.HOD)) {
    roleIntro = `You are logged in as **${roleLabel}**. You currently have **${ctx.pendingForRoleCount}** department proposal(s) pending your HOD review.`;
  } else if (user.roles.includes(UserRole.FACULTY) || user.roles.includes(UserRole.CULTURAL_COORDINATOR)) {
    roleIntro = `You are logged in as **${roleLabel}**. You have created **${ctx.myProposalsCount}** proposal(s) so far. Ask me how to submit a proposal, extend registrations, or monitor participants!`;
  } else if (user.roles.includes(UserRole.JUDGE)) {
    roleIntro = `You are logged in as **${roleLabel}**. I can guide you through scoring participants, tie-breakers, and publishing results.`;
  } else {
    roleIntro = `You are logged in as a **Student**. There are **${ctx.openCompetitionsCount}** competition(s) open for registration right now, and you have **${ctx.myRegistrationsCount}** active registration(s).`;
  }

  return {
    reply: `Hi ${name}! Welcome to the **CTU Competition Hub Assistant**.\n\n${roleIntro}`,
    actions: getRoleActions(user),
    suggestions: getRoleSuggestions(user),
    roleLabel,
    mode: ENV.GEMINI_API_KEY ? 'ai' : 'smart-engine',
  };
}

export async function generateChatReply(
  rawMessage: string,
  user?: IUser,
  history: ChatHistoryTurn[] = []
): Promise<ChatResponsePayload> {
  const roleLabel = getPrimaryRoleLabel(user);
  const ctx = await gatherLiveContext(user);
  const defaultSuggestions = getRoleSuggestions(user);

  // 1. If Gemini API Key is configured, use full conversational AI grounded with live DB + system rules
  const aiResult = await tryGeminiAnswer(rawMessage, history, user, ctx, roleLabel);
  if (aiResult) return aiResult;

  // 2. Smart Fuzzy NLP + Live DB Search Engine (Zero-config)
  const msg = rawMessage.trim().toLowerCase();
  const tokens = tokenize(rawMessage);

  // Check if user is following up on previous bot topic (e.g., "what if...", "and how...", "who can do that?")
  const lastUserTurn = [...history].reverse().find((h) => h.sender === 'user')?.text || '';
  const combinedTokens =
    tokens.length <= 6 && lastUserTurn ? [...tokens, ...tokenize(lastUserTurn)] : tokens;

  // Check if user is asking about a specific live competition in the database
  const matchedCompetition = ctx.publishedList.find((c) => {
    const titleWords = tokenize(c.title).filter((w) => w.length >= 4);
    const hits = titleWords.filter((tw) => tokens.some((ut) => ut === tw || editDistance(ut, tw) <= 1));
    return hits.length >= 2 || (titleWords.length === 1 && hits.length === 1);
  });

  if (
    matchedCompetition &&
    (msg.includes('about') ||
      msg.includes('when') ||
      msg.includes('seat') ||
      msg.includes('status') ||
      msg.includes('open') ||
      msg.includes('date') ||
      msg.includes('detail'))
  ) {
    const remaining = Math.max(
      0,
      matchedCompetition.maxRegistrations - matchedCompetition.currentRegistrationsCount
    );
    const closeDateStr = matchedCompetition.registrationCloseDate
      ? new Date(matchedCompetition.registrationCloseDate).toLocaleDateString()
      : 'TBA';
    return {
      reply:
        `**${matchedCompetition.title}**\n` +
        `- **Category:** ${matchedCompetition.category} (${matchedCompetition.participationType})\n` +
        `- **Current Status:** \`${matchedCompetition.status}\`\n` +
        `- **Registrations:** ${matchedCompetition.currentRegistrationsCount} / ${matchedCompetition.maxRegistrations} (${remaining} seats remaining)\n` +
        `- **Registration Deadline:** ${closeDateStr}`,
      actions: [
        { label: `Open ${matchedCompetition.title}`, path: `/competitions/${matchedCompetition.id}` },
      ],
      suggestions: defaultSuggestions,
      roleLabel,
      mode: 'smart-engine',
    };
  }

  // Greeting
  if (/^(hi|hello|hey|namaste|help|start|menu)\b/.test(msg) && msg.length < 25) {
    return getChatWelcome(user);
  }

  // Score all intents using typo-tolerant fuzzy matching
  interface IntentDef {
    id: string;
    keywords: string[];
    minScore?: number;
  }

  const intents: IntentDef[] = [
    {
      id: 'extend_registration',
      keywords: [
        'extend', 'extension', 'reopen', 're-open', 'increase', 'deadline', 'date',
        'capacity', 'limit', 'seats', 'full', 'done', 'closed', 'after closing',
        'more students', 'pathway', 'pathways', 'postpone', 'reschedule', 'prolong',
      ],
      minScore: 4.5,
    },
    {
      id: 'cancel_registration',
      keywords: ['cancel', 'withdraw', 'unregister', 'drop', 'remove registration', 'leave competition'],
      minScore: 3,
    },
    {
      id: 'edit_after_approval',
      keywords: ['edit', 'update', 'modify', 'change details', 'after submit', 'after approval', 'published'],
      minScore: 4.5,
    },
    {
      id: 'excel_import',
      keywords: ['excel', 'xlsx', 'csv', 'bulk', 'import', 'upload faculty', 'spreadsheet', 'sheet'],
      minScore: 3,
    },
    {
      id: 'overview',
      keywords: ['what is', 'about this project', 'overview', 'purpose', 'explain project', 'ctu competition hub'],
      minScore: 3,
    },
    {
      id: 'hierarchy',
      keywords: ['hierarchy', 'approval flow', 'workflow', 'who approves', 'bypass', 'chain', 'hod', 'hos', 'dsw'],
      minScore: 4,
    },
    {
      id: 'changes_requested',
      keywords: ['changes requested', 'modification', 'reject', 'resubmit', 'returned', 'revision'],
      minScore: 3,
    },
    {
      id: 'live_queue',
      keywords: ['pending', 'my queue', 'how many', 'open right now', 'live count', 'stats'],
      minScore: 3,
    },
    {
      id: 'create_proposal',
      keywords: ['create', 'submit', 'proposal', 'new competition', 'organize', 'host event'],
      minScore: 3,
    },
    {
      id: 'review_approve',
      keywords: ['review', 'approve', 'publish', 'final approval', 'sign off'],
      minScore: 3,
    },
    {
      id: 'team_registration',
      keywords: ['team', 'group', 'leader', 'members', 'team size'],
      minScore: 3,
    },
    {
      id: 'student_registration',
      keywords: ['register', 'registration', 'join', 'participate', 'apply', 'enroll', 'eligibility', 'eligible'],
      minScore: 3,
    },
    {
      id: 'certificates',
      keywords: ['certificate', 'qr', 'verify', 'download certificate'],
      minScore: 3,
    },
    {
      id: 'monitoring',
      keywords: ['monitor', 'monitoring', 'progress bar', 'remaining seats', 'fill rate', 'dashboard'],
      minScore: 3,
    },
    {
      id: 'judging_results',
      keywords: ['judge', 'judging', 'score', 'rubric', 'result', 'winner', 'tie', 'correction'],
      minScore: 3,
    },
    {
      id: 'statuses',
      keywords: ['status', 'statuses', 'state', 'draft', 'lifecycle'],
      minScore: 3,
    },
    {
      id: 'reports_audit',
      keywords: ['report', 'export', 'audit', 'logs', 'history'],
      minScore: 3,
    },
  ];

  // Evaluate intents
  const scored = intents
    .map((intent) => ({
      id: intent.id,
      score: fuzzyMatchScore(combinedTokens, intent.keywords),
      minScore: intent.minScore ?? 3,
    }))
    .sort((a, b) => b.score - a.score);

  // Special boost: if user mentions "extend" / "reopen" / "done" + "registration", prioritize extend_registration!
  const hasExtendIntent =
    fuzzyMatchScore(tokens, ['extend', 'reopen', 'increase', 'postpone', 'done', 'closed', 'pathway', 'full']) >= 2.2 &&
    fuzzyMatchScore(tokens, ['registration', 'registrations', 'deadline', 'capacity', 'seats']) >= 2.2;

  const topIntent = hasExtendIntent
    ? 'extend_registration'
    : scored[0] && scored[0].score >= scored[0].minScore
    ? scored[0].id
    : 'fallback';

  switch (topIntent) {
    case 'extend_registration':
      return {
        reply:
          `**Pathways to Extend Registrations After Closing / Completion:**\n\n` +
          `Because registration rules are enforced strictly on the backend, **only DSW (\`DSW_ADMIN\` / \`SUPER_ADMIN\`)** can modify a competition once it is approved/published:\n\n` +
          `1. **Pathway 1 — Extend the Registration Deadline:**\n` +
          `   - If the closing date passed (\`REGISTRATION_CLOSED\`), **DSW** updates \`registrationCloseDate\` to a new future date (via \`PUT /api/competitions/:id\` or DSW management) and sets the status back to \`REGISTRATION_OPEN\`.\n` +
          `2. **Pathway 2 — Increase Participant / Team Capacity:**\n` +
          `   - If registrations stopped because **maximum seats filled up**, increasing \`registrationCloseDate\` alone is not enough—**DSW** must also increase \`maxRegistrations\` (or \`maxTeams\`) above the current count and reopen registration.\n` +
          `3. **Pathway 3 — Faculty / HOD / HOS Request:**\n` +
          `   - Faculty, HOD, and HOS cannot directly edit a published competition. They must contact **DSW** to extend the window, **or** submit a fresh **Round 2 / Wildcard Entry** proposal through \`Faculty → HOD → HOS → DSW\`.`,
        actions:
          user && (user.roles.includes(UserRole.DSW_ADMIN) || user.roles.includes(UserRole.SUPER_ADMIN))
            ? [{ label: 'DSW Dashboard', path: '/dsw/dashboard' }]
            : getRoleActions(user),
        suggestions: [
          'Who can edit a competition after approval?',
          'How does registration monitoring work?',
          'Explain all competition statuses',
        ],
        roleLabel,
        mode: 'smart-engine',
      };

    case 'cancel_registration':
      return {
        reply:
          `**Cancelling / Modifying a Student Registration:**\n\n` +
          `- Open **My Registrations** (\`/student/registrations\`) to view your active entries and unique Registration IDs.\n` +
          `- If a student cancels a valid registration before the event locks, the competition's \`currentRegistrationsCount\` automatically decrements and frees up a seat for other students.\n` +
          `- Unauthorized modifications by other users are blocked on the backend.`,
        actions: [{ label: 'My Registrations', path: '/student/registrations' }],
        suggestions: defaultSuggestions,
        roleLabel,
        mode: 'smart-engine',
      };

    case 'edit_after_approval':
      return {
        reply:
          `**Who Can Edit a Competition & When:**\n\n` +
          `- **Creator (Faculty / HOD / HOS):** Can edit freely while status is \`DRAFT\`, \`CHANGES_REQUESTED\`, or \`REVISION_REQUIRED\`.\n` +
          `- **While Pending Approval:** Locked for creator edits so reviewers see an immutable proposal.\n` +
          `- **After Approval / Publication:** Only **DSW** can edit fields (such as dates, venue, capacity, or registration window) to preserve university governance and audit integrity.`,
        actions: getRoleActions(user),
        suggestions: [
          'Suppose registrations are closed, how can we extend them?',
          'What happens if changes are requested?',
        ],
        roleLabel,
        mode: 'smart-engine',
      };

    case 'excel_import':
      return {
        reply:
          `**Excel (\`.xlsx\` / \`.csv\`) Support in CTU Competition Hub:**\n\n` +
          `- **Built-in Exports:** You can currently export **Registrations** per competition and **University Reports** as \`.xlsx\` or \`.csv\` from **Reports & Exports** (\`/reports\`).\n` +
          `- **Bulk Faculty / User Import via Excel:** The server already includes \`xlsx\` and \`multer\`. An admin upload panel or import script can parse an Excel sheet (\`Name, Email, Role, School, Department, Phone\`) to create/update faculty accounts and map them automatically into the \`Faculty → HOD → HOS → DSW\` hierarchy.`,
        actions: [{ label: 'Reports & Exports', path: '/reports' }],
        suggestions: defaultSuggestions,
        roleLabel,
        mode: 'smart-engine',
      };

    case 'overview':
      return {
        reply:
          `**CTU Competition Hub** is CT University's official, centralized competition management platform built for the **Directorate of Student Welfare (DSW)**.\n\n` +
          `- **Hierarchical Proposal Approvals:** \`Faculty → HOD → HOS → DSW\` workflow.\n` +
          `- **Schedule-Aware Publication:** Automatic \`PUBLISHED\` (upcoming) vs \`REGISTRATION_OPEN\` / \`REGISTRATION_CLOSED\` transitions.\n` +
          `- **Atomic Student Registration:** Individual & Team registration with database-level anti-overbooking locks.\n` +
          `- **Live Monitoring, Judging & QR Certificates:** Role-scoped analytics, rubric scoring, and verifiable PDF certificates.`,
        actions: getRoleActions(user),
        suggestions: defaultSuggestions,
        roleLabel,
        mode: 'smart-engine',
      };

    case 'hierarchy':
      return {
        reply:
          `**CT University Organizational Approval Hierarchy:**\n` +
          `\`Faculty / Coordinator → Head of Department (HOD) → Head of School (HOS) → Director Student Welfare (DSW)\`\n\n` +
          `1. **Faculty initiates:** Goes to **HOD** → **HOS** → **DSW**.\n` +
          `2. **HOD initiates:** Goes directly to **HOS** → **DSW** *(HOD cannot self-approve)*.\n` +
          `3. **HOS initiates:** Goes directly to **DSW**.\n` +
          `4. **DSW initiates:** Approves and publishes directly with full audit logging.\n\n` +
          `**Business Rule:** No competition becomes visible to students until **DSW** grants final approval and publishes it.`,
        actions: getRoleActions(user),
        suggestions: [
          'What happens if changes are requested?',
          'Suppose registrations are closed, how can we extend them?',
        ],
        roleLabel,
        mode: 'smart-engine',
      };

    case 'changes_requested':
      return {
        reply:
          `**How "Changes Requested" & Smart Resubmission Works:**\n\n` +
          `- Any reviewer (**HOD**, **HOS**, or **DSW**) can request modifications with comments.\n` +
          `- The proposal returns to the creator with status \`CHANGES_REQUESTED\`.\n` +
          `- When the creator edits and clicks **Resubmit**, it **resumes at the exact level that requested the changes** (e.g., if HOS requested changes, it returns directly to HOS—not back to HOD).`,
        actions: getRoleActions(user),
        suggestions: defaultSuggestions,
        roleLabel,
        mode: 'smart-engine',
      };

    case 'live_queue':
      return {
        reply:
          `**Live Platform Counts:**\n` +
          `- **Open for Registration:** ${ctx.openCompetitionsCount} competition(s)\n` +
          `- **Upcoming Published:** ${ctx.upcomingCompetitionsCount} competition(s)\n` +
          `- **Registration Closed:** ${ctx.closedCompetitionsCount} competition(s)\n` +
          (user ? `- **Pending for Your Role (${roleLabel}):** ${ctx.pendingForRoleCount} item(s)\n` : '') +
          (user?.roles.includes(UserRole.STUDENT) ? `- **Your Registrations:** ${ctx.myRegistrationsCount}` : ''),
        actions: getRoleActions(user),
        suggestions: defaultSuggestions,
        roleLabel,
        mode: 'smart-engine',
      };

    case 'create_proposal':
      return {
        reply:
          `**How to Create & Submit a Competition Proposal:**\n\n` +
          `1. Open **Create Proposal** (\`/competitions/create\`).\n` +
          `2. Fill in title, category, individual/team format, proposed date/time, registration open/close dates, capacity, rules, and budget.\n` +
          `3. Your **School & Department** are auto-mapped from your account.\n` +
          `4. Save as **Draft** or click **Submit for Approval** to route it up the hierarchy.`,
        actions:
          user && !user.roles.includes(UserRole.STUDENT)
            ? [{ label: 'Create Proposal', path: '/competitions/create' }]
            : [{ label: 'Sign In as Staff', path: '/login' }],
        suggestions: defaultSuggestions,
        roleLabel,
        mode: 'smart-engine',
      };

    case 'review_approve':
      return {
        reply:
          `**How Approvals & Publication Work:**\n\n` +
          `- **HOD** reviews department proposals in **HOD Dashboard** and forwards to HOS.\n` +
          `- **HOS** reviews school proposals in **HOS Dashboard** and forwards to DSW.\n` +
          `- **DSW** performs final approval in **Approval Queue** and clicks **Publish**, making it visible to students based on the registration open/close schedule.`,
        actions: getRoleActions(user),
        suggestions: defaultSuggestions,
        roleLabel,
        mode: 'smart-engine',
      };

    case 'team_registration':
      return {
        reply:
          `**Team Registration Pathway:**\n\n` +
          `1. Open any team-based competition and click **Register**.\n` +
          `2. Enter your **Team Name** and add **Team Members** within the allowed \`minTeamSize\`–\`maxTeamSize\`.\n` +
          `3. You are recorded as the **Team Leader**, a unique Registration ID is issued, and capacity is updated atomically.`,
        actions: getRoleActions(user),
        suggestions: defaultSuggestions,
        roleLabel,
        mode: 'smart-engine',
      };

    case 'student_registration':
      return {
        reply:
          `**Student Registration & Eligibility:**\n\n` +
          `1. Browse all DSW-published events on **Student Dashboard** or **Discover** (you don't need to belong to the organizing school for university-wide events).\n` +
          `2. Open the competition details page and click **Register Now**.\n` +
          `3. The backend checks eligibility, opening/closing dates, duplicate entries, and remaining seats atomically before issuing your Registration ID.`,
        actions: [
          { label: 'Browse Competitions', path: user?.roles.includes(UserRole.STUDENT) ? '/student/dashboard' : '/discover' },
        ],
        suggestions: defaultSuggestions,
        roleLabel,
        mode: 'smart-engine',
      };

    case 'certificates':
      return {
        reply:
          `**Certificates & QR Verification:**\n\n` +
          `- Students download PDF certificates from **My Certificates** (\`/student/certificates\`) once results are published.\n` +
          `- Every certificate carries a QR code and unique number verifiable at \`/verify-certificate/:certNumber\`.`,
        actions: user?.roles.includes(UserRole.STUDENT)
          ? [{ label: 'My Certificates', path: '/student/certificates' }]
          : [{ label: 'Results Publishing', path: '/results/publishing' }],
        suggestions: defaultSuggestions,
        roleLabel,
        mode: 'smart-engine',
      };

    case 'monitoring':
      return {
        reply:
          `**Role-Scoped Registration Monitoring:**\n\n` +
          `- **Faculty:** Sees competitions they proposed/coordinate.\n` +
          `- **HOD:** Sees all competitions in their **Department**.\n` +
          `- **HOS:** Sees all competitions in their **School**.\n` +
          `- **DSW:** Sees **all university** competitions.\n\n` +
          `Each card displays live capacity, registrations received, remaining seats, and fill percentage.`,
        actions: getRoleActions(user),
        suggestions: defaultSuggestions,
        roleLabel,
        mode: 'smart-engine',
      };

    case 'judging_results':
      return {
        reply:
          `**Judging, Scoring & Results Publishing:**\n\n` +
          `1. Judges score participants using competition rubrics in **Judging Portal** (\`/judging/dashboard\`).\n` +
          `2. DSW / Coordinators generate & publish official results in **Results Publishing** (\`/results/publishing\`).\n` +
          `3. Official score corrections (if needed) are logged with audit trails.`,
        actions: [
          { label: 'Judging Portal', path: '/judging/dashboard' },
          { label: 'Results Publishing', path: '/results/publishing' },
        ],
        suggestions: defaultSuggestions,
        roleLabel,
        mode: 'smart-engine',
      };

    case 'statuses':
      return {
        reply:
          `**Competition Lifecycle Statuses:**\n` +
          `\`DRAFT\` → \`PENDING_HOD_APPROVAL\` → \`PENDING_HOS_APPROVAL\` → \`PENDING_DSW_APPROVAL\` → \`APPROVED_BY_DSW\` → \`PUBLISHED\` (Upcoming) → \`REGISTRATION_OPEN\` → \`REGISTRATION_CLOSED\` → \`COMPLETED\`.\n\n` +
          `Branch states: \`CHANGES_REQUESTED\`, \`REJECTED\`, \`CANCELLED\`.`,
        actions: getRoleActions(user),
        suggestions: defaultSuggestions,
        roleLabel,
        mode: 'smart-engine',
      };

    case 'reports_audit':
      return {
        reply:
          `**Reports & Audit Logs:**\n` +
          `- **Reports & Exports (\`/reports\`):** Export Excel/CSV participation and registration data.\n` +
          `- **Audit Logs (\`/audit-logs\`):** Immutable record of every approval decision, rejection reason, publication, and administrative action.`,
        actions: [
          { label: 'Reports & Exports', path: '/reports' },
          { label: 'Audit Logs', path: '/audit-logs' },
        ],
        suggestions: defaultSuggestions,
        roleLabel,
        mode: 'smart-engine',
      };

    default:
      return {
        reply:
          `I'm your **CTU Competition Hub Guide** (${roleLabel}). I can answer questions about **workflows, extending closed registrations, approval hierarchy, proposal edits, student/team registration, judging, certificates, and live event stats**.\n\n` +
          `Could you rephrase or pick one of the topics below? *(Tip: Adding a \`GEMINI_API_KEY\` in \`server/.env\` also enables full conversational AI responses for any open-ended question.)*`,
        actions: getRoleActions(user),
        suggestions: defaultSuggestions,
        roleLabel,
        mode: 'smart-engine',
      };
  }
}
