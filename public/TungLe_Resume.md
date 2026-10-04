# TUNG LE
**Full-Stack Software Engineer**

`lethanhtung6803@gmail.com` | `[Your Phone]` | `[Your LinkedIn]` | `[Your GitHub]` | Portfolio: [study-together-vibes.vercel.app](https://study-together-vibes.vercel.app)

---

## SUMMARY
Final-year Computer Science student specializing in production-grade full-stack web applications using Next.js and Node.js. With 3+ years of hands-on experience and a background in pedagogy, I combine technical depth with strong communication skills — especially in EdTech. I have independently shipped multiple live products from architecture to deployment, with real users, managing databases, infrastructure, and operations in production.

---

## CORE COMPETENCIES
- **Frontend:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion, Shadcn UI, Zustand, Recharts
- **Backend:** Node.js, Express.js, Socket.IO, Next.js API Routes / Server Actions, NextAuth.js (v4 & v5 beta), REST API Design
- **Database & ORM:** Prisma ORM, Drizzle ORM, TiDB Serverless / MySQL, PostgreSQL
- **AI & ML:** Cohere API (command-r), Google Gemini API (Flash), TensorFlow.js (COCO-SSD), face-api.js, Google Generative AI SDK
- **DevOps & Tools:** Git, GitHub, Vercel, GitHub Actions (CI/CD), Render.com, Capacitor (PWA → Android APK), Supabase Storage, Vercel Blob, Pusher, Payment APIs (VietQR, Casso/SePay Webhooks)
- **Testing:** Pytest (API routes), Playwright (E2E)

---

## FEATURED PROJECTS (PRODUCTION-READY)

### CogniAssess Platform | Solo Fullstack Developer
*Full-Scale EdTech Platform · AI-Proctored Exams · Cognitive Assessment Engine*
[https://edutech-ai-platform-1.vercel.app](https://edutech-ai-platform-1.vercel.app)

Independently designed, built, and deployed a comprehensive EdTech platform from scratch. Completed **18/18 core features**, covered by **122 automated test cases**.

**Architecture:**
- Implemented a **5-role RBAC** system (Admin, Teacher, Dept. Head, Student, Developer) with hierarchical permissions, Single Active Session enforcement via `currentLoginToken`, in-memory session caching for perf, and a Demo Mode via session cookies (no-account access).
- Designed **26 API route groups** in Next.js covering auth, courses, exams, AI (chat, exam gen), cogniassess, economy, classrooms, community, quests, notifications, and developer tooling.
- **Soft Delete** mechanism across all financial records for 100% data integrity (no cascade data loss on user disable).

**CogniAssess Engine:**
- Built a **Bloom's Taxonomy-based cognitive assessment layer** with per-question behavioral tracking: `timeSpent`, `answerChanges`, `isGuessed` (auto-flagged if `timeSpent < 5s` for high-difficulty questions).
- Exam results store: `integrityScore`, `cognitiveMetrics`, `knowledgeGaps` (Radar Chart data), `behaviorMetrics`, and `aiFeedback` (JSON from Gemini, cached in DB to avoid re-generation cost).
- Post-exam AI feedback generated via **Google Gemini** (`gemini-3.6-flash`) analyzing real behavioral data; result cached in `ExamResult.aiFeedback` field.

**AI Systems:**
- **AI Exam Generator:** Integrates **Cohere** `command-r-08-2024` with automatic retry mechanism. Prompt uses Bloom's taxonomy distribution (2 recall + 3 understanding + 3 applying + 2 analysis). 4-layer JSON safety pipeline: `[SLASH]` restoration, backtick-math fixing, control-char stripping, trailing-comma removal. Auto-retries up to 3 times to ensure generation stability.
- **AI Anti-Cheat Proctoring:** **TensorFlow.js (COCO-SSD)** detects non-person/absent state in real-time webcam; **face-api.js** handles face presence. Tab-switch events tracked separately. Auto-suspends exam after 3 violations (`violationCount`, `isSuspended`, `TIMEOUT_CHEATING` status).
- **4-Persona AI Tutor:** 4 specialist chatbot personas — General (CogniAssess AI), IELTS (Ms. Sarah), Math (Prof. Newton), Code (Dev Senior). Full Markdown + **KaTeX** (LaTeX math rendering) via `react-markdown` + `rehype-katex`. Conversation history persisted per `ChatSession` in DB.

**Economy & Community:**
- **CogniCredit Virtual Wallet:** Full transaction model: `DEPOSIT`, `PAYMENT`, `RECEIVE`, `COMMISSION`, `WITHDRAWAL`. Auto commission splits (configurable `commissionRate` in `SystemConfig`). QR-based PRO upgrade flow. Teacher payout request system.
- **Social Network:** Posts, nested comments, follows/likes, notifications. Hierarchical RBAC for Department/Faculty management.
- **Cross-Platform:** Deployed as PWA and Android APK from single Next.js codebase via **Capacitor**.
- **Tech:** Next.js 16, TypeScript, Prisma ORM, TiDB/MySQL, Cohere API, Google Gemini API, TensorFlow.js, face-api.js, NextAuth.js, Shadcn UI, Recharts, Playwright + Pytest, Vercel + GitHub Actions CI/CD

---

### StudyStream (S2G — Study Together) | Fullstack Developer & Product Owner
*Real-Time Virtual Study Community · Gamified Learning Ecosystem · Live Rooms*
[https://study-together-vibes.vercel.app](https://study-together-vibes.vercel.app)

Built and actively maintain a full-featured virtual study community with **real active users**. 20+ DB tables designed with Drizzle ORM on TiDB (MySQL).

**Real-Time Architecture:**
- Architected a **dedicated Express + Socket.IO server** deployed on Render.com (separate from Next.js frontend on Vercel) handling: user registration/online presence, `timer_start`/`timer_ping` events, `join_room`/`leave_room`, real-time leaderboard updates, DMs with rate-limiting (20 msgs/min), friend requests, and post/comment broadcasting.
- **Heartbeat Buffer Optimization:** Instead of writing to DB on every 90s `timer_ping` (which would be ~96,000 queries/day for 50 users), ping payloads are buffered in-memory (Map) and **batch-flushed to TiDB every 5 minutes** via `setInterval`.
- **User Cache (TTL 5 min):** DB SELECT for user data cached in-memory Map, reducing DB reads per ping.
- **Cross-Ping Keep-Alive:** WS server pings itself and the Vercel frontend every 14 minutes to prevent Render free-tier sleep (15-min timeout).
- **Anti-Multi-Tab:** `activeWsSessionMap` (userId → sessionId + startedAt) blocks duplicate simultaneous WS timer sessions.

**Gamification System (from DB Schema):**
- **Shop:** 17 rarity tiers: `common`, `rare`, `epic`, `legendary`, `event`, `bronze`, `silver`, `gold`, `platinum`, `diamond`, `mythic`, `celestial`, `infernal`, `toxic`, `void`, `cyber`, `frost`. Item types: `frame`, `title`, `streak_freeze`, `pet`, `timer_skin`, `utility`, `profile_effect`. Items have unlock requirements (`requiredStudySeconds`, `requiredSubjectKeyword`).
- **League System:** 9 tiers (Rookie → Bronze → Silver → Gold → Platinum → Emerald → Diamond → Master → Challenger). Weekly `weeklyStudyPoints` reset with trophy awards (`goldTrophies`, `silverTrophies`, `bronzeTrophies`). League group assignments via `leagueGroupId`.
- **Streak Engine:** Dual streaks: daily study streak + KPI streak. `streakRecoveriesLeft` (5/month, tracked by `lastRecoveryMonth`). `purchasedFreezes`. `kpi_daily_records` caches `goalSeconds` vs `achievedSeconds` per day with `isOffDay` support (configurable off-days JSON array).
- **Teams:** Max 4 members, invite code join, `teamDailyRecords` with `bonusMultiplier` scoring.
- **Other:** Quests (daily/weekly/achievement with `conditionType` + `conditionValue`), Todos with checklists and XP rewards, Daily Planners (mood, water, meals, schedule JSON), Event Future Letters (time-capsule feature).

**Active Timer Schema:** `active_timer_sessions` table tracks per-device state (`deviceId`, `deviceName`) for cross-device crash recovery and multi-tab detection.

**Production Operations:**
- Self-maintained with real users: 50+ admin TypeScript & Python scripts for analytics, anti-spam detection, session audits, DB backup/restore, user buff/migration, and streak repairs.
- **Tech:** Next.js 16, TypeScript, Drizzle ORM, TiDB/MySQL, Socket.IO, Express.js, NextAuth v5, Zustand, Tailwind CSS v4, Framer Motion, Supabase Storage, Vercel Blob, Pusher, Capacitor, Vercel + Render.com

---

### OnlyGift.online | Fullstack Developer / Founder
*Niche E-commerce Platform for Personalized Web Interfaces*
[https://onlygift.online](https://onlygift.online)

- Architected and deployed an end-to-end e-commerce platform for customizable web interfaces.
- Integrated **VietQR API** and automated **Webhook systems** (Casso/SePay) for real-time, zero-manual order reconciliation.
- Engineered dynamic routing to instantly generate thousands of independent product links without redeployment.
- Achieved 100% automated workflow from payment processing to source code delivery.
- **Tech:** Next.js, TypeScript, Prisma ORM, TiDB/MySQL, Vercel, VietQR API, Casso/SePay Webhooks

---

## EDUCATION & CERTIFICATIONS
- **B.S. in Computer Science (Ongoing)** — University of Transport and Communications (UTC), Hanoi
  *Final-year student, transitioning from a 3-year College degree in the same field.*
- **Vocational Teaching Certificate** — *Certified in Pedagogy (College/Intermediate Level), demonstrating strong presentation, communication, and mentoring capabilities.*
