# CogniAssess portfolio evidence

Reviewed on **1 November 2026** against the private source checkout at `/Users/lethanhtunggmail.com/Desktop/edutech-ai-platform`. The public `CogniAssess-Public` checkout was last updated on 20 September and describes superseded behavior; prefer the later source and deployment records below.

## Verified production data

Two **read-only aggregate** queries completed against the project's production database using the existing Prisma client and `.env.production` connection in memory. No credentials, personal records, question contents, or photos were exported. Queries used only SELECT/COUNT/SUM/grouping; no existing administrative scripts were executed.

Observed **2026-11-01T12:38:09Z–12:38:47Z** (19:38 in Vietnam). These are snapshots, not live counters or traffic analytics.

| Metric | Count | Exact scope |
| --- | ---: | --- |
| Registered accounts excluding demo accounts | **105** | `User.email NOT LIKE 'demo%'`. All 105 also have `isActive = 1` and `deletedAt IS NULL`; that means enabled accounts, not recent active users. |
| All stored accounts | 114 | Includes 9 demo-prefix accounts. |
| Retained exams | **47** | `Course.isDeleted = 0`; includes drafts and private exams. `Course` is the legacy storage name for an exam. |
| Questions in retained exams | **1,075** | `Question` joined to `Course` where `isDeleted = 0`. |
| Exams in the public directory | **31** | Nondeleted, published, approved, at least one question, access mode PUBLIC/PASSWORD_PROTECTED/null. This matches the actual public directory predicate. |
| Questions in public-directory exams | 1,040 | Same public-directory scope. |
| All stored exam records | 54 | Includes 7 soft-deleted exams. |
| All stored question records | 1,095 | Includes 20 questions in soft-deleted exams. |
| All exam-result records | 49 | Includes 17 unfinished sessions; do not call all of these completed submissions. |
| Completed result records | 31 | `status = 'COMPLETED'`; 13 belong to non-demo accounts. One additional demo record has TIMEOUT_CHEATING status. |
| Non-demo result records | 28 | 13 COMPLETED and 15 IN_PROGRESS, across 6 distinct non-demo examinees. |

**No CogniAssess user growth is established:** 105 non-demo accounts matches the previous portfolio's lower bound, and the current database has no non-demo accounts created since 1 October. Do not increase this number or call registered users DAU/MAU. No authoritative `isTest` flag exists; excluding demo-prefix addresses does not prove every remaining account represents a unique organic learner. The 9 demo addresses are corroborated by `scripts/seed-demo.ts`.

Current adoption limits: the database has three subject-catalog entries, zero configured institutions, and zero `QuestionTeacherSupport` rows after disposable QA cleanup. Institutional governance and teacher support are shipped capabilities, not evidence of schools onboarded or broad user adoption.

Primary sources for interpretation:

- [Schema: account fields, retained exams, questions, and results](/Users/lethanhtunggmail.com/Desktop/edutech-ai-platform/prisma/schema.prisma:84).
- [Public-directory filtering](/Users/lethanhtunggmail.com/Desktop/edutech-ai-platform/src/app/(public)/exams/page.tsx:29).
- [Legacy Course naming retained deliberately](/Users/lethanhtunggmail.com/Desktop/edutech-ai-platform/docs/adr/0001-exam-platform.md:12).
- [Prior 29 October production audit](/Users/lethanhtunggmail.com/Desktop/edutech-ai-platform/docs/operations/subject-catalog-2026-10-29.json) confirms 114 total accounts, 54 stored exams, 1,095 questions, 49 result records, and 31 public-directory exams. Current aggregate reads are consistent with it.

Reproducible core aggregate SQL, using an authorized database connection without logging it:

```sql
SELECT COUNT(*) FROM User WHERE email NOT LIKE 'demo%';
SELECT COUNT(*) FROM Course WHERE isDeleted = 0;
SELECT COUNT(*) FROM Question q JOIN Course c ON c.id = q.courseId
WHERE c.isDeleted = 0;
SELECT COUNT(*) FROM Course c
WHERE c.isDeleted = 0 AND c.isPublished = 1 AND c.approvalStatus = 'APPROVED'
  AND (c.accessMode IN ('PUBLIC', 'PASSWORD_PROTECTED') OR c.accessMode IS NULL)
  AND EXISTS (SELECT 1 FROM Question q WHERE q.courseId = c.id);
```

## Current product and four defensible highlights

**Product framing:** an assessment platform for teachers to author, assign, supervise, and evaluate exams. Students take exams free; teachers use free core tools and optional paid platform services. Exam purchases/commissions are disabled while historical financial data is preserved. [Accepted product decision](/Users/lethanhtunggmail.com/Desktop/edutech-ai-platform/docs/adr/0001-exam-platform.md:10), [teacher-service policy](/Users/lethanhtunggmail.com/Desktop/edutech-ai-platform/docs/adr/0002-teacher-services-and-institution-authority.md:3).

1. **Academic governance:** implemented school/faculty/department authority, independent one/two-level exam review, approved subject/grade curriculum, and teaching assignments. Authors and coauthors cannot approve their own exams, finalized content is protected from stale edits, and scope is based on stable unit identities rather than subject names. These are implemented capabilities; no institution adoption count is supported. [Production release](/Users/lethanhtunggmail.com/Desktop/edutech-ai-platform/docs/operations/subject-catalog-2026-10-29.md:3), [policy implementation](/Users/lethanhtunggmail.com/Desktop/edutech-ai-platform/src/lib/academic-policy.ts:61), [assignment authorization](/Users/lethanhtunggmail.com/Desktop/edutech-ai-platform/src/lib/subject-assignment.ts:12).

2. **AI-assisted exam authoring:** imports from PDF/images, Word/text, and Excel; uses approved subject context for multiple-choice, four-statement true/false, and short-answer questions. AI supplies private teacher hints, worked solutions, and teaching notes, editable in the draft editor and excluded from learner payloads. Gemini handles image/text import and configurable models; generation also has provider fallbacks including Cohere. Avoid presenting one old Cohere retry pipeline as the whole current architecture. [Import controls](/Users/lethanhtunggmail.com/Desktop/edutech-ai-platform/src/app/(dashboard)/teacher/courses/create/page.tsx:1600), [image/PDF validation](/Users/lethanhtunggmail.com/Desktop/edutech-ai-platform/src/app/(dashboard)/teacher/courses/create/actions.ts:860), [teacher support source](/Users/lethanhtunggmail.com/Desktop/edutech-ai-platform/src/lib/question-teacher-support.ts:31), [learner redaction](/Users/lethanhtunggmail.com/Desktop/edutech-ai-platform/src/lib/public-exam-data.ts:1).

3. **Server-side exam supervision:** native Python/OpenCV worker on the VPS runs YuNet for faces and YOLOX-M for people/phones. Browser captures bounded JPEGs; students download no neural model. Temporal evidence distinguishes sustained absence/multiple faces/phones from lighting/transport problems. Teacher review is supported, and confirmed camera/focus episodes share a five-warning budget. This replaces the old TensorFlow.js/COCO-SSD browser pipeline and old three-warning claim. [Architecture and limits](/Users/lethanhtunggmail.com/Desktop/edutech-ai-platform/services/proctoring/README.md:3), [warning policy](/Users/lethanhtunggmail.com/Desktop/edutech-ai-platform/src/lib/proctoring-policy.ts:4), [server compare-and-swap persistence](/Users/lethanhtunggmail.com/Desktop/edutech-ai-platform/src/lib/exam-proctor-service.ts:7).

4. **Cognitive assessment and production engineering:** Bloom-level question data, per-question time/answer changes/guess indicators, knowledge gaps and cached AI feedback; production changes use additive migrations and retained rollback builds. Recent work fixes draft autosave races, preserves later edits during stale acknowledgements, and keeps teacher support private. [Assessment schema](/Users/lethanhtunggmail.com/Desktop/edutech-ai-platform/prisma/schema.prisma:460), [autosave defect and regression](/Users/lethanhtunggmail.com/Desktop/edutech-ai-platform/docs/operations/teacher-question-support-2026-10-29.md:17), [migration/rollback record](/Users/lethanhtunggmail.com/Desktop/edutech-ai-platform/docs/operations/subject-catalog-2026-10-29.md:38).

## Deployment evidence and measured performance

Server proctoring is documented as **deployed**, not just planned. The 29 October subject-catalog release records the unchanged live camera worker, its retained `camera-layout-budget-20261028-01` source release, and successful AI-worker checks. Its machine-readable record reports `proctorReady: true`. This research did not re-run proctoring against student images. [Release evidence](/Users/lethanhtunggmail.com/Desktop/edutech-ai-platform/docs/operations/subject-catalog-2026-10-29.md:40), [deployment JSON](/Users/lethanhtunggmail.com/Desktop/edutech-ai-platform/docs/operations/subject-catalog-2026-10-29.json).

The October 28 benchmark measured student dashboard server render median **823 → 359 ms** across three loopback samples; initial dashboard JavaScript **1,175 → 311 KiB** (student) and **1,356 → 287 KiB** (teacher). PWA precache raw-file manifest changed **74.88 → 1.03 MiB**. These are scoped before/after measurements, not universal speed claims, concurrency capacity, compressed transfer size, or an SLA. Some routes did not improve consistently. [Measured report](/Users/lethanhtunggmail.com/Desktop/edutech-ai-platform/docs/performance/navigation-2026-10-28.md:7).

The subject-catalog deployment records **155/155 tests passed**, including authority and question-type workflows. Repository-wide TypeScript has pre-existing errors; a successful production build does not establish clean type checking. This research did not rerun those project tests. [Validation record](/Users/lethanhtunggmail.com/Desktop/edutech-ai-platform/docs/operations/subject-catalog-2026-10-29.md:30).

Current stack supported by source: Next.js 16.1.4, React 19.2.3, TypeScript, Prisma 6.19, TiDB/MySQL, NextAuth 4, Gemini/Cohere, Python/OpenCV (YuNet, YOLOX-M), VPS/PM2/Nginx, and Capacitor/PWA. Existing dependencies alone do not prove current use. [Package manifest](/Users/lethanhtunggmail.com/Desktop/edutech-ai-platform/package.json), [VPS database/deployment description](/Users/lethanhtunggmail.com/Desktop/edutech-ai-platform/docs/teacher-platform-deployment-2026-10-27.md:27), [proctor service](/Users/lethanhtunggmail.com/Desktop/edutech-ai-platform/services/proctoring/README.md).

## Portfolio corrections

- Use **CogniAssess** and `https://cna.io.vn`; a separately labeled interactive demo link may retain the existing demo URL. The old Vercel URL is stale as the canonical product link.
- Replace browser TensorFlow.js anti-cheat with current server-side OpenCV supervision. Do not promise accuracy, fraud prevention, identity verification, or concurrent-class capacity.
- Replace paid-course/CogniCredit/student-wallet descriptions with teacher tools, exam assignment, and free student access. Do not claim current automated payments are fully operational: the October 27 deployment explicitly says the live SePay token was not configured then.
- Treat 105 as registered non-demo accounts, not an activity measurement. Use 47 retained exams /1,075 questions /31 public exams with the November 1 snapshot date. Do not call the bank entirely AI-generated; import/manual authoring also exist.
- Replace the old 122-test/18-of-18 completion assertions with scoped evidence only if a test count is useful to readers; the latest reported subject release has 155 passing checks, not a guarantee of all-system completeness.
- Academic roles are student, teacher, subject head, department/faculty head, admin, plus a separate developer operations role. The schema contains six enum values; avoid an unexplained “5-role RBAC” claim.
