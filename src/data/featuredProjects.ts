// Read-only production aggregates. Definitions and source evidence live in
// docs/research/{cogniassess,s2g-sunstudy}.md. These are dated snapshots, not live counters.
export const PROJECT_SNAPSHOT = { date: '2026-11-18', label: '18 Nov 2026' };

export const PROJECT_METRICS = {
  cogniassess: {
    nonDemoAccounts: 105,
    retainedExams: 47,
    retainedQuestions: 1075,
    publicExams: 32,
    completedResults: 31,
  },
  s2g: {
    registeredAccounts: 1053,
    totalAccountsRaw: 1058,
    positiveDurationSessions: 23863,
    recordedHours: 28613.9,
    activeStudyUsers: 775,
    teamsWithMembers: 31,
    shopItems: 680,
    todos: 4637,
  },
  sunstudy: {
    registeredAccounts: 251,
    positiveDurationSessions: 2446,
    recordedHours: 3170.20,
    teamsWithMembers: 8,
  },
};

const number = (value: number) => new Intl.NumberFormat('en-US').format(value);

export interface FeaturedProjectData {
  id: string;
  name: string;
  category: string;
  role: string;
  summary: string;
  metricsTitle: string;
  metrics: { label: string; value: string }[];
  metricsNote: string;
  secondaryMetrics?: string;
  tech: string[];
  highlights: { title: string; description: string }[];
  inDevelopment?: string;
  links: { label: string; href: string }[];
  experienceDescription: string;
  resumeDescription: string;
}

const cogni = PROJECT_METRICS.cogniassess;
const s2g = PROJECT_METRICS.s2g;

export const COGNIASSESS: FeaturedProjectData = {
  id: 'cogniassess',
  name: 'CogniAssess',
  category: 'Online Assessment & Exam Operations',
  role: 'Solo Fullstack Developer',
  summary: 'An online assessment platform for teachers, students and education institutions. I own exam authoring, assignment, supervised exam sessions and cognitive feedback, alongside the infrastructure and operational tools that support the product.',
  metricsTitle: 'Assessment platform',
  metrics: [
    { label: 'Registered accounts · demo excluded', value: number(cogni.nonDemoAccounts) },
    { label: 'Retained exams', value: number(cogni.retainedExams) },
    { label: 'Questions in retained exams', value: number(cogni.retainedQuestions) },
    { label: 'Approved public exams', value: number(cogni.publicExams) },
  ],
  metricsNote: 'Nine demo accounts excluded. Exam and question totals exclude soft-deleted exams; public exams are an approved directory subset of the retained exams.',
  tech: ['Next.js 16', 'Prisma', 'TiDB / MySQL', 'Python', 'OpenCV / ONNX', 'Gemini API', 'Cohere API', 'VPS / Nginx'],
  highlights: [
    { title: 'Teacher workflows', description: 'Built exam authoring with PDF, image, Word and Excel imports, subject catalogs, teaching assignments and independent academic review before publication.' },
    { title: 'Server-side proctoring', description: 'Moved camera analysis to a dedicated Python service using YuNet face detection and YOLOX object detection, with server-recorded exam violations.' },
    { title: 'Cognitive assessment', description: 'Combines question-level timing, answer changes and exam results with AI feedback to help learners understand knowledge gaps.' },
    { title: 'Scoped access', description: 'Separates institutional roles and teacher service plans from the free student workspace, with teacher-only AI question guidance kept out of student exam responses.' },
  ],
  links: [{ label: 'cna.io.vn', href: 'https://cna.io.vn' }],
  experienceDescription: `Build and maintain an assessment platform with ${number(cogni.nonDemoAccounts)} non-demo registered accounts, ${number(cogni.retainedExams)} retained exams and ${number(cogni.retainedQuestions)} questions. Recent work includes institutional review, teacher authoring workflows and server-side AI proctoring.`,
  resumeDescription: `${number(cogni.nonDemoAccounts)} non-demo registered accounts; ${number(cogni.retainedExams)} retained exams; ${number(cogni.retainedQuestions)} questions; ${number(cogni.publicExams)} public exams. Built exam authoring, Word/Excel imports, institution-scoped review, cognitive feedback and Python/OpenCV proctoring.`,
};

export const S2G: FeaturedProjectData = {
  id: 's2g-sunstudy',
  name: 'S2G (StudyStream)',
  category: 'Study Community & Real-Time Focus Rooms',
  role: 'Fullstack Developer & Product Owner',
  summary: 'A virtual study community built around shared focus rooms, subject timers, daily goals and social accountability. Migrated and consolidated onto a dedicated 4 OCPU / 24 GB Oracle ARM VPS with local MariaDB to support high-concurrency real-time sessions and data consolidation.',
  metricsTitle: 'Production metrics (s2g_unified MariaDB on 24GB VPS)',
  metrics: [
    { label: 'Registered accounts · QA excluded', value: `${number(s2g.registeredAccounts)}+` },
    { label: 'Completed study sessions', value: `${number(s2g.positiveDurationSessions)}+` },
    { label: 'Recorded focused study hours', value: `${number(Math.floor(s2g.recordedHours))}+ hrs` },
    { label: 'Active study participants', value: `${number(s2g.activeStudyUsers)}+ users` },
  ],
  metricsNote: 'Live verified snapshot from MariaDB on production VPS. Excludes QA/test accounts. Sessions count positive-duration records linked to existing accounts; study hours reflect actual server-recorded durations across 31 active teams.',
  secondaryMetrics: `95 database tables · 31 active teams · 680 catalog items · 4,637 completed To-Dos. SunStudy archive retains an additional 251 historical accounts and 3,170+ recorded hours.`,
  tech: ['Next.js 16', 'Drizzle ORM', 'MariaDB', 'Socket.IO', 'Express.js', 'WebRTC', 'Redis', 'Oracle ARM VPS (24GB)'],
  highlights: [
    { title: 'High-Concurrency Real-Time Server', description: 'A dedicated Express + Socket.IO server handling live room presence, timers, and chat with 60-second database write buffers and server-anchor synchronization to prevent database bottlenecks.' },
    { title: 'VPS Architecture & MariaDB Migration', description: 'Deployed on an Oracle ARM VPS (4 OCPU / 24 GB RAM) running Ubuntu 24.04, Node.js 22, Nginx, and systemd, consolidating over 90 relational tables and 28,000+ study hours into local MariaDB.' },
    { title: 'Social Accountability & Gamification', description: 'Engineered study rooms, daily goals, streak recovery, 31 active teams, study couples, and an in-app cosmetic shop with 680+ items across tiered rarity.' },
    { title: 'Product Operations & Reliability', description: 'Engineered automatic Vietnam midnight season closings, idempotency-backed settlement, session audit tooling, and zero-downtime rollback releases.' },
  ],
  inDevelopment: 'Testing workspace tools with mistake notebooks and exam roadmaps, server-anchored shared timers/music, host-approved Pass Live rooms and independent competitive ranking on the VPS environment.',
  links: [
    { label: 's2g.io.vn', href: 'https://s2g.io.vn' },
    { label: 'sunstudy.app', href: 'https://sunstudy.app' },
  ],
  experienceDescription: `Develop and operate S2G on a dedicated 24GB VPS with ${number(s2g.registeredAccounts)}+ registered accounts, ${number(s2g.positiveDurationSessions)}+ recorded study sessions, and ${number(Math.floor(s2g.recordedHours))}+ study hours. Architected the real-time Socket.IO server, consolidated MariaDB storage (95 tables), and automated competition seasons.`,
  resumeDescription: `S2G: ${number(s2g.registeredAccounts)}+ registered accounts, ${number(s2g.positiveDurationSessions)}+ study sessions, ${number(Math.floor(s2g.recordedHours))}+ recorded hours, 775+ active study users and 31 active teams on a 24GB VPS with local MariaDB. Built Next.js client, dedicated Socket.IO server, 60s buffer flushes, and community gamification.`,
};

export const CAREVIA: FeaturedProjectData = {
  id: 'carevia-ai',
  name: 'Carevia (AI Healthcare Assistant)',
  category: 'Enterprise AI & Medical Administration (VinUni AI Cohort 5)',
  role: 'Lead Infrastructure & Backend Developer (Team of 4)',
  summary: 'An intelligent medical administration assistant built for VinUni AI Thuc Chien (Project P-033, Cohort 5). Enables patients and medical staff to query Health Insurance regulations (Dispatch 2275/BHXH-CSYT) with verbatim grounded citations and transparent medical price estimations.',
  metricsTitle: 'VinUni AI Evaluation & System Metrics',
  metrics: [
    { label: 'Test Suite Coverage', value: '107+ tests' },
    { label: 'API & Golden Case Accuracy', value: '100% (20/20)' },
    { label: 'Active Team Collaborators', value: '4 Engineers' },
    { label: 'Enterprise Token Budgeting', value: '3.5M / day' },
  ],
  metricsNote: 'Live deployment on dedicated ARM VPS. 100% of tested valid queries cite source CV 2275/BHXH-CSYT verbatim with page/SHA-256 validation. Team code reviewed via Pull Requests and GitHub Actions CI.',
  secondaryMetrics: `FastAPI & LangGraph workflow · TiDB Cloud TLS · FTS5 retrieval · Mistral Small 4 LLM · Automated CI/CD runner.`,
  tech: ['FastAPI', 'Python 3.11', 'LangGraph', 'Mistral Small 4', 'TiDB Cloud (TLS)', 'FTS5 Retrieval', 'GitHub Actions CI', 'VPS Ubuntu / Nginx'],
  highlights: [
    { title: 'Grounded Citation & Safety Guardrails', description: 'Engineered a LangGraph pipeline that extracts verbatim excerpts from official Ministry regulations, rejecting hallucinated IDs and executing PII/medical safety checks before contacting LLMs.' },
    { title: 'Deterministic Pricing & Insurance Logic', description: 'Built an exact-math calculation engine for hospital co-pays based on official medical tariffs, completely independent of LLMs to guarantee zero calculation error.' },
    { title: 'Team Collaboration & Engineering Rigor', description: 'Lead infrastructure, deployment, and testing across a 4-person team (Tung, An, Ly, Tuan). Maintained strict Git workflows, code reviews, and automated CI pipelines.' },
    { title: 'Token Accounting & Daily Quota Guard', description: 'Architected atomic daily token budgeting in TiDB across API key pools to ensure predictable inference cost and prevent rate-limit exhaustion.' },
  ],
  links: [
    { label: 'Live Demo (vinas.sunstudy.app)', href: 'https://vinas.sunstudy.app/' },
    { label: 'Public Repo (P-033)', href: 'https://github.com/griin-03/P-033' },
  ],
  experienceDescription: `Lead infrastructure and backend for Carevia (VinUni AI Thuc Chien Cohort 5, Project P-033). Developed FastAPI & LangGraph RAG pipeline, TiDB TLS persistence, and automated CI/CD for a 4-engineer team.`,
  resumeDescription: `Carevia (vinas.sunstudy.app): Enterprise AI medical assistant (VinUni AI Cohort 5, Team P-033). Built FastAPI, LangGraph workflow, TiDB storage, and strict CI/CD with 107+ automated tests. Public repo at github.com/griin-03/P-033.`,
};

export const FEATURED_PROJECTS = [CAREVIA, S2G, COGNIASSESS];
