export interface CaseStudy {
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  tags: string[];
  searchKeywords: string[];
  summary: string;
  architecture: {
    problem: string;
    decision: string;
    tradeOff: string;
    result: string;
  };
  keyTakeaways: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'oracle-vps-24gb-mariadb-production-architecture',
    title: 'Consolidating S2G onto Local MariaDB on an Oracle ARM 24GB VPS',
    excerpt: 'Migrating 95 relational tables from separate cloud databases to local MariaDB (s2g_unified) on a 4 OCPU / 24 GB Oracle ARM VPS serving 1,073+ clean accounts.',
    readTime: '6 min read',
    date: '2026-11-20',
    tags: ['DevOps', 'Oracle Cloud VPS', 'MariaDB', 'Nginx', 'systemd'],
    searchKeywords: [
      'oracle arm 24gb vps mariadb',
      'nextjs mariadb production ubuntu 24.04',
      'database consolidation migration',
      'self-hosted production operations'
    ],
    summary: 'Consolidated multi-source study platform schemas into s2g_unified running on local MariaDB 11.4 LTS on an Oracle ARM VPS (4 OCPU / 24 GB RAM, Ubuntu 24.04, Nginx, systemd).',
    architecture: {
      problem: 'Prior to 12 Nov 2026, S2G and SunStudy ran on separate TiDB Cloud databases. As S2G grew from 116 clean accounts (Aug 2026) to over 1,000 accounts, relying solely on external databases complicated cross-deployment consolidation and monthly season settlements.',
      decision: 'Provisioned local MariaDB (s2g_unified, DATABASE_MODE=local-mariadb) on the Oracle ARM 24 GB VPS, retained full snapshot schemas (archive_s2g_20261112 and archive_sunstudy_20261112) for reconciliation, and served Next.js + Express via Nginx and systemd.',
      tradeOff: 'Accepted single-node VPS database operations and manual backup/rollback responsibility instead of managed multi-region serverless scaling; in return, eliminated external TiDB fallback dependencies and gained full control over migrations.',
      result: 'Stable operation across 95 tables with 1,073 clean registered accounts, 23,865+ positive-duration study sessions (28,617+ recorded hours), and 0.012s aggregate audit queries.'
    },
    keyTakeaways: [
      'Always retain pre-cutover archive schemas (archive_s2g_20261112) to verify data integrity and enable safe reconciliation.',
      'Keep test environments isolated and apply only reviewed, additive migrations in production.',
      'Verify production growth and engagement with read-only aggregate SQL rather than landing-page estimates.'
    ]
  },
  {
    slug: 'socket-io-realtime-buffer-study-rooms',
    title: '60s Write Buffering & Server-Anchored Timers for Real-Time Study Rooms',
    excerpt: 'Separating the Express + Socket.IO server, buffering timer heartbeats into 60-second DB flushes with Redis caching, and handling mobile sleep & reconnects.',
    readTime: '5 min read',
    date: '2026-11-15',
    tags: ['WebSocket', 'Socket.IO', 'Node.js', 'Redis', 'Real-time'],
    searchKeywords: [
      'socket.io heartbeat write buffer',
      'realtime study room architecture',
      'server time reconciliation nodejs',
      'redis leaderboard caching'
    ],
    summary: 'Built a dedicated Express + Socket.IO runtime using 60-second heartbeat write buffering, server-time reconciliation, and Redis caching to keep live timers smooth without overloading MariaDB.',
    architecture: {
      problem: 'In real-time study rooms, hundreds of learners run Pomodoro and Stopwatch timers concurrently. Writing every heartbeat directly to the database or trusting client device clocks causes continuous write pressure and drift when mobile screens sleep or connections drop.',
      decision: 'Isolated a dedicated Express + Socket.IO server that buffers timer heartbeats in memory and flushes database writes every 60 seconds, paired with Redis caches for user/team/leaderboard lookups and server-anchored time reconciliation.',
      tradeOff: 'If the Node.js process crashes unexpectedly mid-cycle, up to 60 seconds of un-flushed heartbeat delta may require session recovery; accepted this bounded window to avoid continuous row writes to study_sessions.',
      result: 'Sustained 723 activated learners (67.4% activation from clean registrations), peaking at 468 active learners and 11,131 sessions (13,045.9 recorded hours) in Oct 2026.'
    },
    keyTakeaways: [
      'Buffer timer heartbeats into 60s flushes and pair with Redis caches to reduce repeated relational DB work.',
      'Use server-time reconciliation instead of trusting client clocks across mobile sleep and tab switches.',
      'Filter out zero-duration timer starts (duration_seconds = 0) when reporting completed study sessions.'
    ]
  },
  {
    slug: 'supabase-query-latency-optimization-life-of-study',
    title: 'Cutting Dashboard Latency from 24s (35 Queries) to ~2.5s on Supabase',
    excerpt: 'Real optimization case study on Life of Study (focus.sunstudy.app): diagnosing 35 sequential Session Pooler reads, consolidating to 3 SQL queries, and fixing voice race conditions.',
    readTime: '6 min read',
    date: '2026-11-24',
    tags: ['PostgreSQL', 'Supabase', 'FastAPI', 'Performance', 'discord.py'],
    searchKeywords: [
      'supabase session pooler latency',
      'postgresql query consolidation python',
      'discord.py voice tracking',
      'fastapi performance optimization'
    ],
    summary: 'Resolved 23.7–24.1s dashboard load times and Discord voice/music race conditions for Life of Study (364 active members, 2,501+ voice hours) running on a 1 GB RAM VPS.',
    architecture: {
      problem: 'The initial dashboard issued ~35 sequential Supabase reads; each round-trip from the VPS to the eu-west-1 Session Pooler took ~0.7s, totaling 23.7–24.1s. Token refreshes also triggered overlapping requests that canceled each other.',
      decision: 'Consolidated all 4 KPI periods, charts, and personal summaries into a single repeatable-read PostgreSQL snapshot, reducing dashboard API reads to 3 queries total. Added request sequence + AbortController on the client and moved voice idle_cleanup checks inside per-member locks.',
      tradeOff: 'Consolidated SQL CTEs are harder to maintain and require Web and Discord Bot to share identical KPI/rank calculation logic (verified 100% consistent across 149 members in the same snapshot).',
      result: 'Dashboard API latency dropped from 23.7–24.1s to 2.0–2.9s (2.7–3.1s measured on VPS with 3 DB reads), weekly bot leaderboard reads dropped to 0.733s, and all 171 pytest tests plus Chrome checks pass.'
    },
    keyTakeaways: [
      'Cross-region round-trips (~0.7s/query) compound into 24s+ stalls under sequential query patterns.',
      'Web portals and bots must share one source of truth for KPI calculations and repeatable-read snapshots.',
      'Async voice tasks need per-member locks and playback IDs so stale callbacks never cancel new tracks.'
    ]
  },
  {
    slug: 'ai-medical-rag-langgraph-fastapi-vinuni',
    title: 'Zero-Hallucination Medical AI (Carevia) with LangGraph & Deterministic Pricing',
    excerpt: 'Engineering architecture from VinUni Applied AI Program (P-033): constraining Mistral Small 4 to FTS5 passage IDs, pure Python Decimal co-pay math, and atomic TiDB token budgets.',
    readTime: '7 min read',
    date: '2026-11-22',
    tags: ['AI Engineering', 'LangGraph', 'FastAPI', 'RAG', 'VinUni AI'],
    searchKeywords: [
      'langgraph fastapi grounded rag',
      'deterministic calculator llm guardrail',
      'vinuni ai cohort 5 p-033',
      'atomic token budgeting tidb'
    ],
    summary: 'Two-layer architecture built in a 4-engineer team: LLM selects verified passage IDs from official Health Insurance regulations while pure Decimal logic computes co-pay estimates.',
    architecture: {
      problem: 'Health Insurance regulation queries (Dispatch 2275/BHXH-CSYT) and co-pay calculations (379,500 VND threshold from 01/07/2026) cannot tolerate LLM-invented quotes, arithmetic errors, or unguarded token exhaustion on shared API key pools.',
      decision: 'Built an in-memory SQLite FTS5 retriever; Mistral Small 4 via LangGraph only selects passage IDs (with at most 1 format retry) and the backend returns verbatim text with page/SHA-256 metadata. Built a separate Python Decimal pricing engine (zero LLM calls) and atomic daily UTC token reservations in TiDB (3.5M/day).',
      tradeOff: 'The assistant refuses to answer from parametric LLM memory and hands off to human staff whenever queries fall outside the 2-page source corpus—trading open-ended "always-answer" fluency for strict source accuracy.',
      result: 'G2 release passed 107 unit tests, 20/20 API test cases, 7/7 Vietnamese/missing-source edge cases, and 7/7 live replay cases through PR reviews and GitHub Actions CI across a 4-engineer team.'
    },
    keyTakeaways: [
      'Never delegate financial or insurance arithmetic to an LLM; isolate it in a deterministic Decimal engine.',
      'Prevent citation hallucinations by having the model output passage IDs while the server fetches verbatim text.',
      'Run PII/scope guardrails and atomic token budget reservations before invoking external model endpoints.'
    ]
  }
];
