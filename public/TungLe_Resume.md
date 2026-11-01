# TUNG LE
**Full-Stack Software Engineer**

`lethanhtung6803@gmail.com` | `0848 290 617` | Portfolio: [study-together-vibes.vercel.app](https://study-together-vibes.vercel.app)

---

## SUMMARY
Final-year Computer Science student specializing in production-grade full-stack web applications using Next.js and Node.js. With 3+ years of hands-on experience and a background in pedagogy, I combine technical depth with strong communication skills — especially in EdTech. I have independently shipped multiple live products from architecture to deployment, with real users, managing databases, infrastructure, and operations in production.

---

## CORE COMPETENCIES
- **Frontend:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion, Shadcn UI, Zustand, Recharts
- **Backend:** Node.js, Express.js, Socket.IO, Next.js API Routes / Server Actions, NextAuth.js (v4 & v5 beta), REST API Design
- **Database & ORM:** Prisma ORM, Drizzle ORM, TiDB Serverless / MySQL, PostgreSQL
- **AI & ML:** Google Gemini API, Cohere API, Python/OpenCV, ONNX (YuNet face detection, YOLOX object detection)
- **DevOps & Tools:** Git, GitHub, Vercel, GitHub Actions (CI/CD), VPS / Nginx / PM2, Capacitor (PWA → Android APK), Supabase Storage, Vercel Blob, Pusher, Payment APIs (VietQR, Casso/SePay Webhooks)
- **Testing:** Pytest (API routes), Playwright (E2E)

---

## FEATURED PROJECTS (PRODUCTION-READY)

### CogniAssess | Solo Fullstack Developer
*Online Assessment · Exam Operations · Cognitive Feedback*
[https://cna.io.vn](https://cna.io.vn)

Independently build and operate an assessment platform for teachers, students and education institutions. The current product centers on creating, assigning, supervising and evaluating exams. Students use the platform free; optional service plans provide teacher tools.

**Production snapshot — 1 November 2026:**
- **105 registered accounts excluding 9 demo accounts.** This is a registration count, not a recent-activity metric.
- **47 retained exams** containing **1,075 questions**, excluding soft-deleted exams.
- **31 approved public-directory exams**, a subset of retained exams.

**Engineering:**
- Built institutional permissions, independent academic review, subject catalogs, approved subject/grade curriculum and teaching assignments. Authors cannot approve their own exams.
- Implemented AI-assisted authoring from PDF, images, Word and Excel, with multiple-choice, true/false and short-answer questions. Private teacher hints, worked solutions and teaching notes are excluded from learner exam responses.
- Moved webcam analysis to a dedicated **Python/OpenCV service on VPS**, using **YuNet and YOLOX-M** with temporal evidence and server-persisted warnings for teacher review.
- Track per-question timing, answer revisions and guess indicators alongside Bloom-level question data to produce knowledge-gap reports and cached AI feedback.
- Maintain draft autosave, additive migrations and retained rollback releases as the product evolves.
- **Tech:** Next.js 16, React 19, TypeScript, Prisma, TiDB/MySQL, NextAuth, Gemini/Cohere, Python/OpenCV/ONNX, VPS/Nginx/PM2, Capacitor/PWA.

---

### S2G / SunStudy | Fullstack Developer & Product Owner
*Study Community · Real-Time Focus Rooms · Social Accountability*
[https://s2g.io.vn](https://s2g.io.vn) · [https://sunstudy.app](https://sunstudy.app)

Build and operate a study community with subject timers, shared focus rooms, daily goals, streak recovery, teams, study couples and social features. **S2G and SunStudy run as separate deployments with separate databases.**

**Production snapshot — 1 November 2026:**

| Metric | S2G | SunStudy |
| --- | ---: | ---: |
| Registered accounts | **655** | **251** |
| Study sessions with recorded time | **12,287** | **2,446** |
| Recorded study hours | **13,227.97** | **3,170.20** |
| Teams with members | **25** | **8** |

Three known QA accounts are excluded. Sessions must reference an existing account and have positive recorded duration. Account totals across deployments are not deduplicated; registered accounts are not MAU.

**Engineering and operations:**
- Build the Next.js client and a dedicated Express + Socket.IO runtime for presence, room events, direct messages and timer synchronization.
- Buffer timer heartbeats and flush database writes every **60 seconds**; use server-time reconciliation, cross-tab/device safeguards and session recovery to handle reconnects and mobile sleep.
- Maintain study-session audits, moderation and recovery tooling, along with daily goals, streaks, community posts and a rewards shop.
- Support real-time room experiences and media workflows using Socket.IO and WebRTC integrations.
- **In development on a test VPS:** Workspace tools with private mistake notebooks and exam roadmaps, shared room timers/music, Pass Live rooms and a revised competitive ranking system. These are separate from the production metrics above.
- **Tech:** Next.js 16, React 19, TypeScript, Drizzle ORM, TiDB/MySQL, Express.js, Socket.IO, WebRTC (P2P), Zustand, Redis, NextAuth v5, Capacitor, VPS/Nginx/PM2, Supabase Storage.

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
- **B.S. in Computer Science (Ongoing)** — University of Transport and Communications (UTC), Hanoi
  *Final-year student, transitioning from a 3-year College degree in the same field.*
- **Vocational Teaching Certificate** — *Certified in Pedagogy (College/Intermediate Level), demonstrating strong presentation, communication, and mentoring capabilities.*
