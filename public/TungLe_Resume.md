# TUNG LE
**Full-Stack Software Engineer**

`lethanhtung6803@gmail.com` | `0329 509 223` | Portfolio: [tungledev.id.vn](https://tungledev.id.vn)

---

## SUMMARY
Final-year Computer Science student specializing in production-grade full-stack web applications using Next.js, Node.js, and modern cloud databases. With 3+ years of hands-on experience and a background in pedagogy, I combine engineering depth with real-world product execution. I have independently shipped and scaled live products serving over 1,000+ real users, managing multi-tenant databases, real-time WebSocket infrastructures, and production VPS operations.

---

## CORE COMPETENCIES
- **Frontend:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion, Shadcn UI, Zustand, Recharts
- **Backend:** Node.js, Express.js, Socket.IO, WebRTC, Next.js API Routes / Server Actions, NextAuth.js (v4 & v5), REST APIs
- **Database & ORM:** Drizzle ORM, Prisma ORM, MariaDB, TiDB Serverless, MySQL, PostgreSQL, Redis
- **AI & ML:** Google Gemini API, Cohere API, Python/OpenCV, ONNX (YuNet face detection, YOLOX object detection)
- **DevOps & Infrastructure:** Oracle ARM VPS (24GB), Nginx, systemd, PM2, Cloudflare Edge, Git/GitHub Actions, Docker, Capacitor (PWA → Android APK), Payment APIs (VietQR, Casso/SePay Webhooks)
- **Testing:** Pytest (API routes), Playwright (E2E)

---

## FEATURED PROJECTS (PRODUCTION-READY)

### Carevia (AI Healthcare Assistant) | Lead Infrastructure & Backend Developer
*Enterprise AI · Healthcare Administration · VinUni AI Thực Chiến (Cohort 5 / Project P-033)*
[https://vinas.sunstudy.app](https://vinas.sunstudy.app) · GitHub: [https://github.com/griin-03/P-033](https://github.com/griin-03/P-033)

Architected backend infrastructure and safety pipeline in a 4-engineer team for an enterprise AI assistant helping patients and hospital staff navigate Health Insurance (BHYT) regulations (Dispatch 2275/BHXH-CSYT) and estimate hospital costs.

**Engineering Highlights & Quality Metrics:**
- **Automated Testing & CI/CD:** Built a full test suite with **107+ passing tests** covering FastAPI routes, LangGraph nodes, guardrail safety, and deterministic calculation rules.
- **Grounded Citations & Zero Hallucination:** Designed a retrieval pipeline (FTS5 + LangGraph) that forces exact verbatim excerpt matching with SHA-256 and page verification; rejects hallucinated citations.
- **Deterministic Copay Engine:** Engineered an exact Decimal calculation engine for insurance co-payments based on official hospital tariffs, entirely independent of LLMs.
- **Enterprise Token Accounting:** Implemented atomic daily token reservation in TiDB across key pools (3.5M tokens/day) to safeguard against rate-limit bursts.
- **Team Collaboration:** Operated via strict GitHub PR reviews, branching workflows, and automated GitHub Actions CI runners.
- **Tech:** Python 3.11, FastAPI, LangGraph, Mistral Small 4, TiDB Cloud (TLS), FTS5, Pytest, Docker, Nginx, GitHub Actions.

---

### S2G (StudyStream) | Fullstack Developer & Product Owner
*Virtual Study Community · Real-Time Focus Rooms · Social Gamification*
[https://s2g.io.vn](https://s2g.io.vn) · [https://sunstudy.app](https://sunstudy.app)

Independently architected, deployed, and operate a live virtual study community featuring real-time rooms, synchronised timers, daily goals, and social accountability. Successfully migrated and consolidated data to a dedicated Oracle Cloud ARM VPS (4 OCPU / 24 GB RAM) running Ubuntu 24.04 and local MariaDB.

**Production snapshot — 18 November 2026 (Live VPS MariaDB Audit):**
- **1,053+ registered accounts** (excluding QA/demo test accounts).
- **23,863+ completed study sessions** with recorded focus durations.
- **28,613+ recorded study hours** tracked across **775+ active study participants**.
- **31 active study teams**, **680 catalog shop items**, and **4,637 completed To-Dos** managed over **95 database tables**.
- *Historical SunStudy archive retains an additional 251 accounts and 3,170+ recorded hours.*

**Engineering and operations:**
- **High-Concurrency Real-Time Server:** Built dedicated Express + Socket.IO server handling live room presence, timers, and chat with 60-second database write buffers and server-anchor synchronization.
- **Infrastructure & Migration:** Deployed on Oracle ARM VPS with systemd process supervision and Nginx reverse proxy; executed consolidation of multi-source databases into local MariaDB (`s2g_unified`).
- **Gamification & Automation:** Implemented 10-tier competitive league ranking, cosmetic shop economy, automated Vietnam midnight season settlements with idempotent reward allocation.
- **Tech:** Next.js 16, React 19, TypeScript, Drizzle ORM, MariaDB, Socket.IO, Express.js, WebRTC, Redis, Oracle ARM VPS (24GB), Nginx.

---

### CogniAssess | Solo Fullstack Developer
*Online Assessment · Exam Operations · Cognitive Feedback*
[https://cna.io.vn](https://cna.io.vn)

Independently built and operate an assessment platform for teachers, students, and education institutions to create, assign, supervise, and evaluate exams with AI assistance and proctoring.

**Production snapshot — 18 November 2026 (TiDB Cloud Audit):**
- **105 registered accounts** (excluding 9 demo accounts).
- **47 retained exams** containing **1,075 questions** (excluding soft-deleted exams).
- **32 approved public-directory exams**, with **31 completed exam submissions**.

**Engineering:**
- Built institutional permissions, independent academic review, subject catalogs, and curriculum management.
- Implemented AI-assisted authoring from PDF, images, Word, and Excel.
- Engineered server-side webcam proctoring with dedicated **Python/OpenCV microservice (YuNet + YOLOX-M)** for temporal face and object detection.
- Developed cognitive assessment engine analyzing per-question timing, revisions, and guess indicators with Gemini API feedback.
- **Tech:** Next.js 16, React 19, TypeScript, Prisma, TiDB Serverless, NextAuth, Gemini API, Cohere API, Python/OpenCV/ONNX, VPS/Nginx.

---

### Life of Study (Discord Bot & Web) | Fullstack & Bot Developer
*Discord Study Community · Voice/Camera Tracking · KPI & Web Dashboard*
[https://focus.sunstudy.app](https://focus.sunstudy.app)

Built and operate a synchronized Discord bot and web portal for a study community, tracking voice/camera study sessions, enforcing multi-period KPIs, and managing leave/KPI approvals.

**Production snapshot — 25 November 2026 (Supabase PostgreSQL Audit):**
- **364 active tracked members** (448 total records across 3 Discord guilds).
- **4,704 voice study segments** totaling **2,501+ recorded study hours**, plus **113 web Pomodoro sessions**.
- **171 automated pytest tests** and **43 Discord slash commands** in production.

**Engineering:**
- **Query Optimization:** Refactored dashboard reads from 35 sequential Supabase queries (~24s) down to 3 consolidated PostgreSQL queries (2.0–2.9s).
- **Voice & Audio Reliability:** Implemented 10s checkpoint merging, 300s/120s inactivity grace logic, and fixed FFmpegOpusAudio metadata leaks.
- **Tech:** Python 3.12, discord.py[voice], FastAPI, React 19, Vite 8, Supabase PostgreSQL, asyncpg, Nginx, systemd.

---

### Prelynx (SunStudy Prep) | Lead Fullstack Developer
*Intelligent IELTS & Digital SAT Learning Platform*
[https://pre.sunstudy.app](https://pre.sunstudy.app)

- Designed and engineered a complete test-prep platform with **2,800+ lessons and practice questions** across all 4 IELTS skills (Reading, Listening, Writing, Speaking) and Digital SAT (Math & Verbal).
- Built a **4-step diagnostic entrance flow** identifying skill gaps and recommending tailored daily practice roadmaps.
- Designed an interactive **Analytics Dashboard** tracking user accuracy rates, skill distribution, and target score projections.
- Architected for high performance and security using **Cloudflare Edge runtime** (`@cloudflare/next-on-pages`), **Cloudflare Turnstile** anti-bot verification, and anti-scraping safeguards.
- **Tech:** Next.js 16, React 19, TypeScript, Drizzle ORM, TiDB Serverless, NextAuth v5, Cloudflare Edge / Pages, Tailwind CSS v4

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
- **AI Thực Chiến (3-Month Intensive Program)** — VinUni & Vingroup (Cohort 5), *11/2026 – 01/2027*
- **Information Technology (Ongoing)** — University of Transport and Communications (UTC), Hanoi, *2024 – 2026 (Expected)*
- **Pedagogical Certificate (Chứng chỉ Nghiệp vụ Sư phạm)** — *2024 – 2025*
- **Information Technology (Graduated with Distinction / Loại Giỏi)** — Vietnam Polytechnic College (Cao đẳng Bách khoa), *2021 – 2024*
