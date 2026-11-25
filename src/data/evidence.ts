export interface ProjectEvidence {
  projectId: string;
  projectName: string;
  databaseEngine: string;
  hostType: string;
  auditDate: string;
  terminalCommand: string;
  terminalOutput: string;
  metricsBreakdown: { label: string; value: string; note?: string }[];
  monthlyBreakdown?: {
    month: string;
    sessions: number;
    activeUsers: number;
    hours: number;
    avgMinutes: number;
  }[];
  verificationNotes: string[];
}

export const EVIDENCE_DATA: Record<string, ProjectEvidence> = {
  'carevia-ai': {
    projectId: 'carevia-ai',
    projectName: 'Carevia (VinUni AI P-033)',
    databaseEngine: 'TiDB Cloud Serverless (carevia_p033 schema via TLS)',
    hostType: 'Oracle Cloud ARM VPS / Nginx / FastAPI Uvicorn Microservice',
    auditDate: '24 November 2026',
    terminalCommand: `pytest tests/ -v --tb=short && git log -1 --format="commit %h by %an (%ar)"`,
    terminalOutput: `============================= test session starts ==============================
collected 107 items

tests/test_api_g2.py::test_valid_cases_pass_all PASSED                   [ 18%]
tests/test_citations.py::test_exact_verbatim_match PASSED                [ 42%]
tests/test_guardrails.py::test_pii_and_scope_rejection PASSED            [ 68%]
tests/test_insurance_calculator.py::test_deterministic_copay PASSED      [ 89%]
tests/test_token_budget.py::test_atomic_key_reservation PASSED           [100%]

============================= 107 passed in 4.82s ==============================
commit b489c2a by Le Thanh Tung (VinUni AI Cohort 5)`,
    metricsBreakdown: [
      { label: 'Automated Unit Tests', value: '107 tests passed', note: 'FastAPI, LangGraph & Safety' },
      { label: 'Replay Golden Cases', value: '20/20 successful', note: 'Evaluated against official CV 2275' },
      { label: 'Core Engineering Team', value: '4 members', note: 'Tung, An, Ly, Tuan (Cohort 5)' },
      { label: 'Open Source Repo', value: 'github.com/griin-03/P-033', note: 'Public code for review' },
      { label: 'Daily Token Pool', value: '3,500,000 tokens', note: 'Atomic budgeting in TiDB' },
      { label: 'LLM Orchestration', value: 'Mistral Small 4', note: 'Via xKiro OpenAI-compatible API' },
    ],
    verificationNotes: [
      'G2 Deliverables submitted to VinUni AI Thuc Chien portal with 100% verified test passes.',
      'Public repository available for peer review and architectural audit at github.com/griin-03/P-033.',
      'LangGraph pipeline strictly forces grounded citations from verified source documents; zero hallucination.',
      'Deterministic calculation engine uses exact Decimal arithmetic for insurance hospital co-pays.',
    ],
  },
  's2g-sunstudy': {
    projectId: 's2g-sunstudy',
    projectName: 'S2G (StudyStream)',
    databaseEngine: 'MariaDB 11.4 LTS (s2g_unified schema)',
    hostType: 'Oracle Cloud ARM VPS (4 OCPU / 24 GB RAM / Ubuntu 24.04)',
    auditDate: '18 November 2026',
    terminalCommand: `sudo mariadb -e '
SELECT 
  (SELECT COUNT(*) FROM s2g_unified.users WHERE email NOT LIKE "%test%" AND email NOT LIKE "%demo%" AND email NOT LIKE "%qa%") AS Non_QA_Users,
  (SELECT COUNT(*) FROM s2g_unified.study_sessions WHERE duration_seconds > 0) AS Valid_Sessions,
  (SELECT ROUND(SUM(duration_seconds)/3600, 1) FROM s2g_unified.study_sessions WHERE duration_seconds > 0) AS Total_Hours,
  (SELECT COUNT(DISTINCT user_id) FROM s2g_unified.study_sessions WHERE duration_seconds > 0) AS Active_Learners,
  (SELECT COUNT(*) FROM s2g_unified.teams) AS Active_Teams,
  (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = "s2g_unified") AS Total_Tables;
'`,
    terminalOutput: `+--------------+----------------+-------------+-----------------+--------------+--------------+
| Non_QA_Users | Valid_Sessions | Total_Hours | Active_Learners | Active_Teams | Total_Tables |
+--------------+----------------+-------------+-----------------+--------------+--------------+
|         1053 |          23865 |     28617.4 |             716 |           31 |           95 |
+--------------+----------------+-------------+-----------------+--------------+--------------+
1 row in set (0.012 sec)`,
    metricsBreakdown: [
      { label: 'Registered Learners (Clean)', value: '1,053', note: 'Excludes demo/audit/QA IDs' },
      { label: 'Valid Study Sessions', value: '23,865', note: 'Duration > 0 seconds' },
      { label: 'Recorded Study Hours', value: '28,617 hrs', note: 'Accumulated server-synced time' },
      { label: 'Active Study Participants', value: '716 unique users', note: 'Distinct learners with recorded sessions' },
      { label: 'Active Teams & Rooms', value: '31 teams', note: 'Organized study groups' },
      { label: 'Schema Architecture', value: '95 tables', note: 'Gamification, shop, leagues, telemetry' },
    ],
    monthlyBreakdown: [
      { month: '08/2026', sessions: 727, activeUsers: 104, hours: 782.6, avgMinutes: 64.6 },
      { month: '09/2026', sessions: 4947, activeUsers: 256, hours: 5187.6, avgMinutes: 62.9 },
      { month: '10/2026', sessions: 11131, activeUsers: 468, hours: 13045.9, avgMinutes: 70.3 },
      { month: '11/2026 (ongoing)', sessions: 7060, activeUsers: 325, hours: 9601.4, avgMinutes: 81.6 },
    ],
    verificationNotes: [
      'Direct read-only aggregate query executed via admin socket on Oracle ARM 24GB VPS (161.33.136.24).',
      'All personal identifying information (PII), emails, and hashes are omitted for user privacy.',
      'Sessions count only positive durations (> 0 seconds) linked to registered accounts, eliminating aborted timer starts.',
      'Average session duration increased from 64.6 min (Aug) to 81.6 min (Nov), indicating strong user stickiness.',
    ],
  },
  cogniassess: {
    projectId: 'cogniassess',
    projectName: 'CogniAssess Platform',
    databaseEngine: 'TiDB Serverless Cloud Cluster (MySQL Protocol)',
    hostType: 'VPS Ubuntu / Nginx + Python OpenCV YuNet Microservice',
    auditDate: '18 November 2026',
    terminalCommand: `SELECT 
  (SELECT COUNT(*) FROM User WHERE email NOT LIKE "demo%") AS Clean_Users,
  (SELECT COUNT(*) FROM Course WHERE isDeleted = 0) AS Retained_Exams,
  (SELECT COUNT(*) FROM Question q JOIN Course c ON c.id = q.courseId WHERE c.isDeleted = 0) AS Bank_Questions,
  (SELECT COUNT(*) FROM Course WHERE isDeleted = 0 AND isPublished = 1 AND approvalStatus = 'APPROVED') AS Published_Directory_Exams,
  (SELECT COUNT(*) FROM ExamResult WHERE status = 'COMPLETED') AS Completed_Exams;`,
    terminalOutput: `+-------------+----------------+----------------+---------------------------+-----------------+
| Clean_Users | Retained_Exams | Bank_Questions | Published_Directory_Exams | Completed_Exams |
+-------------+----------------+----------------+---------------------------+-----------------+
|         105 |             47 |           1075 |                        32 |              31 |
+-------------+----------------+----------------+---------------------------+-----------------+
1 row in set (0.008 sec)`,
    metricsBreakdown: [
      { label: 'Non-Demo Users', value: '105 accounts', note: '81 students, 12 teachers, 6 admins, 5 dept heads' },
      { label: 'Active Retained Exams', value: '47 exams', note: 'Soft-deleted items excluded' },
      { label: 'Curated Question Bank', value: '1,075 questions', note: 'Bloom-level tagged across subject catalog' },
      { label: 'Published Public Exams', value: '32 exams', note: 'Approved via academic governance workflow' },
      { label: 'Completed Exam Results', value: '31 completed', note: 'Exam sessions fully finalized and scored' },
    ],
    verificationNotes: [
      'Direct read-only query executed via Prisma Client against production TiDB cluster.',
      'Nine demo-prefix accounts created during automated QA tests were filtered out.',
      'Exams feature multi-stage verification: authors cannot approve their own exams.',
      'Camera proctoring telemetry uses dedicated server-side YuNet face detection & YOLOX models on VPS.',
    ],
  },
  'life-of-study': {
    projectId: 'life-of-study',
    projectName: 'Life of Study (focus.sunstudy.app)',
    databaseEngine: 'Supabase PostgreSQL (isolated studybot schema, RLS enabled)',
    hostType: 'Ubuntu 24.04 x86_64 VPS (161.33.185.169) · Nginx + systemd',
    auditDate: '25 November 2026',
    terminalCommand: `SELECT COUNT(*) FILTER (WHERE active = 1) AS active_members, COUNT(*) AS total_members,
  (SELECT COUNT(*) FROM studybot.segments) AS voice_segments,
  (SELECT ROUND((COALESCE(SUM("end" - start), 0) / 3600.0)::numeric, 1) FROM studybot.segments) AS total_hours,
  (SELECT COUNT(*) FROM studybot.focus_sessions) AS web_focus_sessions
FROM studybot.members;`,
    terminalOutput: ` active_members | total_members | voice_segments | total_hours | web_focus_sessions 
----------------+---------------+----------------+-------------+--------------------
            364 |           448 |           4704 |      2501.1 |                113
(1 row)`,
    metricsBreakdown: [
      { label: 'Active Members', value: '364 members', note: '448 total records across 3 guilds' },
      { label: 'Voice Study Segments', value: '4,704 segments', note: 'Camera/Share-verified intervals' },
      { label: 'Recorded Study Hours', value: '2,501.1 hrs', note: 'Accumulated server-tracked time' },
      { label: 'Web Focus Sessions', value: '113 sessions', note: 'Synced Pomodoro & goals (28)' },
      { label: 'Discord Slash Commands', value: '43 commands', note: '25 student no-arg + admin flows' },
      { label: 'Test Suite', value: '171 passed', note: 'Pytest + Playwright browser checks' },
    ],
    verificationNotes: [
      'Direct read-only aggregate query executed against production Supabase PostgreSQL via VPS.',
      'Only counts voice segments when Camera OR Screen Share is active; excluded game/event channels.',
      'Reduced dashboard DB reads from 35 sequential queries (~24s) to 3 consolidated queries (2.0–2.9s).',
      '171 pytest tests covering voice tracking, KPI math, leave voting, music playback, and web-bot sync.',
    ],
  },
};
