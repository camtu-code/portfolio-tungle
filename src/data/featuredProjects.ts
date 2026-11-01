// Read-only production aggregates. Definitions and source evidence live in
// docs/research/{cogniassess,s2g-sunstudy}.md. These are dated snapshots, not live counters.
export const PROJECT_SNAPSHOT = { date: '2026-11-01', label: '1 Nov 2026' };

export const PROJECT_METRICS = {
  cogniassess: {
    nonDemoAccounts: 105,
    retainedExams: 47,
    retainedQuestions: 1075,
    publicExams: 31,
  },
  s2g: {
    registeredAccounts: 655,
    positiveDurationSessions: 12287,
    recordedHours: 13227.97,
    teamsWithMembers: 25,
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
    { label: 'Published public exams', value: number(cogni.publicExams) },
  ],
  metricsNote: 'Nine demo accounts excluded. Exam and question totals exclude soft-deleted exams; public exams are an approved subset of the retained exams.',
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
  name: 'S2G / SunStudy',
  category: 'Study Community & Real-Time Learning',
  role: 'Fullstack Developer & Product Owner',
  summary: 'A study community built around shared focus rooms, subject timers, daily goals and social accountability. I develop the Next.js application, its dedicated real-time server and the recovery and moderation tools used to operate the community. S2G and SunStudy run as separate deployments.',
  metricsTitle: 'S2G deployment',
  metrics: [
    { label: 'Registered accounts · known QA excluded', value: number(s2g.registeredAccounts) },
    { label: 'Study sessions with recorded time', value: number(s2g.positiveDurationSessions) },
    { label: 'Recorded study hours', value: `${number(Math.floor(s2g.recordedHours))}+` },
    { label: 'Teams with members', value: number(s2g.teamsWithMembers) },
  ],
  metricsNote: 'Three known QA accounts excluded. Session totals include only positive recorded durations linked to existing accounts. Hours are rounded down.',
  secondaryMetrics: `${number(PROJECT_METRICS.sunstudy.registeredAccounts)} registered accounts · ${number(PROJECT_METRICS.sunstudy.positiveDurationSessions)} study sessions · ${number(Math.floor(PROJECT_METRICS.sunstudy.recordedHours))}+ recorded hours · ${PROJECT_METRICS.sunstudy.teamsWithMembers} teams with members. Same session filters; separate database, with no deduplication across deployments.`,
  tech: ['Next.js 16', 'Drizzle ORM', 'TiDB / MySQL', 'Socket.IO', 'Express.js', 'WebRTC', 'Redis', 'Zustand'],
  highlights: [
    { title: 'Reliable study timers', description: 'A dedicated Express + Socket.IO server handles presence, chat and timer synchronization, with server-time reconciliation and cross-device safeguards for reconnects and mobile sleep.' },
    { title: 'Social accountability', description: 'Built study rooms, daily goals, streak recovery, teams and study couples, with community posts and a gamified rewards shop.' },
    { title: 'Database efficiency', description: 'Buffer timer heartbeats into 60-second writes and use user, team and leaderboard caches, including Redis, to reduce repeated database work.' },
    { title: 'Product operations', description: 'Maintain study-session audits, account moderation and recovery workflows as the community grows, alongside the application and real-time infrastructure.' },
  ],
  inDevelopment: 'Testing a study workspace with a private mistake notebook and exam roadmaps, server-anchored shared timers/music, host-approved Pass Live rooms and an independent competitive ranking system on a separate VPS environment.',
  links: [
    { label: 's2g.io.vn', href: 'https://s2g.io.vn' },
    { label: 'sunstudy.app', href: 'https://sunstudy.app' },
  ],
  experienceDescription: `Develop and operate S2G with ${number(s2g.registeredAccounts)} registered accounts, ${number(s2g.positiveDurationSessions)} study sessions and ${number(Math.floor(s2g.recordedHours))}+ recorded study hours, excluding known QA accounts. Maintain a separate SunStudy deployment and build real-time timers, community features and operational recovery tools.`,
  resumeDescription: `S2G: ${number(s2g.registeredAccounts)} registered accounts, ${number(s2g.positiveDurationSessions)} positive-duration sessions, ${number(Math.floor(s2g.recordedHours))}+ recorded study hours and ${number(s2g.teamsWithMembers)} teams with members, excluding known QA accounts. Built the Next.js client, dedicated Socket.IO server, study timers, social features and recovery tools. SunStudy is a separate deployment with ${number(PROJECT_METRICS.sunstudy.registeredAccounts)} registered accounts.`,
};

export const FEATURED_PROJECTS = [COGNIASSESS, S2G];
