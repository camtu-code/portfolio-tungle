# S2G / SunStudy portfolio evidence

Reviewed 18 November 2026 (Asia/Ho_Chi_Minh). 
Aggregate queries were collected on **18 November 2026** directly from the production MariaDB database (`s2g_unified`) on Oracle Cloud ARM VPS (161.33.136.24) using local MariaDB admin socket.

## Live database aggregates (18 November 2026 Audit)

| Metric | S2G (MariaDB Unified on 24GB VPS) | SunStudy (Historical Archive) | Definition |
| --- | ---: | ---: | --- |
| Registered accounts, raw | 1,058 | 251 | `COUNT(*) FROM users`; includes admin/test accounts. |
| Registered accounts excluding known QA | **1,053** | **251** | Excludes known test/demo/audit accounts (`email NOT LIKE '%test%' AND email NOT LIKE '%demo%' AND email NOT LIKE '%qa%'`). |
| Session rows, raw | 26,631 | 2,845 | Every `study_sessions` record. |
| **Positive-duration sessions** | **23,863** | **2,446** | `duration_seconds > 0`. Recommended public session metric. |
| **Recorded session hours** | **28,613.9** | **3,170.20** | Sum positive session durations / 3,600. |
| **Active study participants** | **775** | **141** | Distinct `user_id` having completed study sessions. |
| Teams with members | **31** | **8** | Teams with active members. |
| Shop items in catalog | **680** | **633** | All `shop_items` rows. |
| Completed To-Do records | **4,637** | **794** | All `todos` rows. |
| Community posts | **124** | **25** | All `community_posts` rows. |
| Database table count | **95** | **36** | Tables in `s2g_unified` schema. |

Schema sources: [users](</Users/lethanhtunggmail.com/Study Stream/src/lib/db/schema.ts:9>), [study sessions](</Users/lethanhtunggmail.com/Study Stream/src/lib/db/schema.ts:143>), [teams/members](</Users/lethanhtunggmail.com/Study Stream/src/lib/db/schema.ts:448>), [shop items](</Users/lethanhtunggmail.com/Study Stream/src/lib/db/schema.ts:231>), [community posts](</Users/lethanhtunggmail.com/Study Stream/src/lib/db/schema.ts:347>), [To-Dos](</Users/lethanhtunggmail.com/Study Stream/src/lib/db/schema.ts:505>), [study couples](</Users/lethanhtunggmail.com/Study Stream/src/lib/db/schema.ts:581>). SunStudy has corresponding tables in its own `src/lib/db/schema.ts`.

### Reproducible metric definitions

`known_qa_ids` is supplied as a query parameter assembled from the existing private QA configuration and the known audit-account identifier; do not copy credentials or IDs into portfolio data.

```sql
SELECT COUNT(*) AS registered_accounts
FROM users
WHERE id NOT IN (?);

SELECT COUNT(*) AS study_sessions,
       COUNT(DISTINCT s.user_id) AS participating_accounts,
       ROUND(SUM(s.duration_seconds) / 3600, 2) AS recorded_hours
FROM study_sessions s
JOIN users u ON u.id = s.user_id
WHERE u.id NOT IN (?) AND s.duration_seconds > 0;

SELECT COUNT(*) AS teams_with_members
FROM teams t
WHERE EXISTS (SELECT 1 FROM team_members m WHERE m.team_id = t.id);
```

The same exclusion list was applied to both databases. SunStudy's raw session count differs from its positive-duration count, but joining users/excluding these QA identifiers does not further reduce its positive-duration count or hours. S2G raw session totals include sessions whose user no longer exists, so the explicit join is necessary for consistent public metrics.

Do not derive current MAU/DAU from registrations. Auxiliary `last_active_at` query returned S2G 374 accounts within 30 days / 128 within 7 days and SunStudy 235 / 64, but those are timestamp-window aggregates with incomplete QA/session-definition filtering and are not recommended for the portfolio.

## Strong source-supported engineering points

1. **Realtime study engine:** dedicated Express/Socket.IO backend records personal study sessions, presence and room membership, with WebSocket pings and HTTP fallbacks. Cross-device start emits a force-stop event to the earlier timer, and active-session ownership/rate limits guard overlapping pings. Sources: [backend initialization](</Users/lethanhtunggmail.com/Study Stream/websocket-server/index.js:55>), [timer start/device takeover](</Users/lethanhtunggmail.com/Study Stream/websocket-server/api/routes/timer.js:64>), [ping ownership/rate limits](</Users/lethanhtunggmail.com/Study Stream/websocket-server/index.js:911>).
2. **Timer integrity and recovery:** `active_timer_sessions` stores per-device state/heartbeat for recovery. Deep Focus uses visibility/activity detection and BroadcastChannel coordination so moving between S2G tabs does not immediately count as leaving the app. Sources: [active timers schema](</Users/lethanhtunggmail.com/Study Stream/src/lib/db/schema.ts:169>), [Deep Focus behavior](</Users/lethanhtunggmail.com/Study Stream/src/hooks/useStudyTimer.ts:84>), [cross-tab coordinator](</Users/lethanhtunggmail.com/Study Stream/src/lib/s2gTabCoordinator.ts:29>).
3. **Database work and caching:** in-memory heartbeat buffering/requeue on failures, a current **60-second flush interval**, throttled last-active writes, per-user/per-team caches, Redis cache with configured direct-client/Upstash fallback, and SQL aggregates for quest statistics. These are implemented techniques; source comments estimating query/bandwidth savings are not production benchmarks. Sources: [heartbeat buffer](</Users/lethanhtunggmail.com/Study Stream/websocket-server/index.js:248>), [Redis implementation](</Users/lethanhtunggmail.com/Study Stream/websocket-server/lib/redis.js:21>), [leaderboard Redis](</Users/lethanhtunggmail.com/Study Stream/websocket-server/api/routes/stats.js:151>), [quest SQL aggregation](</Users/lethanhtunggmail.com/Study Stream/websocket-server/api/routes/quests.js:48>), [team cache](</Users/lethanhtunggmail.com/Study Stream/websocket-server/api/routes/teams.js:30>).
4. **Product depth:** personal Pomodoro/stopwatch sessions, custom daily/subject KPI schedules, daily historical KPI snapshots, streaks, To-Dos/checklists/one-time XP flags, study teams, community posts/nested comments, cosmetics/inventory and supporter benefits. Sources: [session schema](</Users/lethanhtunggmail.com/Study Stream/src/lib/db/schema.ts:143>), [KPI data](</Users/lethanhtunggmail.com/Study Stream/src/lib/db/schema.ts:413>), [To-Dos](</Users/lethanhtunggmail.com/Study Stream/src/lib/db/schema.ts:505>), [community](</Users/lethanhtunggmail.com/Study Stream/src/lib/db/schema.ts:347>).
5. **WebRTC rooms in current code:** `RTCPeerConnection` media with Socket.IO signaling; current code includes mic/camera and additional screen-share support for Pass rooms. Do not describe this architecture simply as LiveKit because those dependencies remain installed while the current room implementation is P2P. Source: [peer connections](</Users/lethanhtunggmail.com/Study Stream/src/components/room/P2PRoomProvider.tsx:235>), [Socket.IO signaling](</Users/lethanhtunggmail.com/Study Stream/websocket-server/index.js:655>). Pass-specific capabilities are test releases below.

## Newer implemented work: label as tested preview

The operational memory and module READMEs explicitly state these features were deployed to the **test VPS**, while the existing production server stayed unchanged. Shared TiDB data does not mean all new application code is production deployed. Real Pass checkout remains disabled. Sources: [preview scope and flags](</Users/lethanhtunggmail.com/Study Stream/deploy/oracle-24gb/README.md:103>), [module runtime flags](</Users/lethanhtunggmail.com/Study Stream/websocket-server/workspace/README.md:9>), [Rank release status](</Users/lethanhtunggmail.com/Study Stream/docs/product/ranking-v2-rules.md:3>).

- **Workspace and exam preparation:** task/project context, confirmed scheduling proposals, saved weekly summaries/export, private mistake notebook with hidden-answer review and review scheduling, exam roadmaps linking topics to existing tasks and notebook entries. Self-reported topic confidence is not a predicted exam score. Sources: [workspace description](</Users/lethanhtunggmail.com/Study Stream/websocket-server/workspace/README.md:1>), [exam roadmap](</Users/lethanhtunggmail.com/Study Stream/websocket-server/workspace/README.md:79>).
- **Shared timer/music:** four-member capacity, host timer/music control, durable server anchors and accumulated time instead of per-room tick jobs; personal playlist ownership validated server-side; each listener's consent/volume/mute remains local. Source: [timer domain](</Users/lethanhtunggmail.com/Study Stream/websocket-server/workspace/shared-timer-domain.js:3>), [operational notes](</Users/lethanhtunggmail.com/Study Stream/AGENTS.md:59>).
- **Competitive Rank v2:** independent persistent 0–400 RP, ten tiers, weekly opt-in matching, server-verified focus leases, bounded daily/weekly points, promotion/demotion and idempotent/atomic settlement. Separate from legacy seasonal SP and its rewards. Source: [canonical Rank rules](</Users/lethanhtunggmail.com/Study Stream/docs/product/ranking-v2-rules.md:36>).
- **Private Pass Live rooms:** host approval with browser-to-browser mic/camera/screen sharing; server stores signaling and an exclusive screen-presenter lock. Source: [Live-room scope](</Users/lethanhtunggmail.com/Study Stream/websocket-server/workspace/README.md:55>).
- **Constellation partnerships/referrals/season management:** newer modules have their own rules and additive migrations. The season close is preview-only on test; avoid claims that live seasons have been automatically settled or that referral work has increased retention/revenue. Sources: [constellation](</Users/lethanhtunggmail.com/Study Stream/websocket-server/workspace/README.md:103>), [referrals](</Users/lethanhtunggmail.com/Study Stream/websocket-server/workspace/README.md:123>), [season transaction/preview](</Users/lethanhtunggmail.com/Study Stream/docs/product/season-management.md:46>).

Operational notes record 78 isolated Rank checks and browser validation in October. These are historical project checks; they were not rerun during this portfolio task. There are 13 test files across current workspace/season test directories, but file count is not a test-case count.

## Corrections to old portfolio/resume copy

- Replace the combined “440+ real active users” claim with separately scoped registered-account snapshots for S2G and SunStudy. Neither schema proves every registration is human, and registrations are not active users.
- Prefer positive-duration session counts. `timer/start` creates zero-duration database records before a session is saved, so unfiltered counts overstate completed study sessions. Source: [initial insertion](</Users/lethanhtunggmail.com/Study Stream/websocket-server/api/routes/timer.js:64>).
- Replace “nearly 7,000 focused hours” with the new filtered **recorded study hours**; do not equate stored timer durations to independently validated attention.
- Remove “dual mirror domains distribute traffic / ensure zero downtime.” The databases differ, and no measured uptime/load-balancer evidence was found.
- Replace the stale “5-minute heartbeat flush” with current 60-second buffering, or omit the exact interval. Actual constant overrides the older comments above it. Source: [interval](</Users/lethanhtunggmail.com/Study Stream/websocket-server/index.js:253>).
- Remove “9-tier league” unless referring to a specific old release. Current legacy enum/rules have ten tiers; new preview RP also has ten and is independent. Source: [legacy enum](</Users/lethanhtunggmail.com/Study Stream/src/lib/db/schema.ts:37>), [legacy server rules](</Users/lethanhtunggmail.com/Study Stream/websocket-server/lib/league-utils.js:13>).
- Remove “teams max four” from old resume. Current `teams.max_members` defaults to six; four is the new shared-timer room limit. Source: [team schema](</Users/lethanhtunggmail.com/Study Stream/src/lib/db/schema.ts:448>).
- Do not reuse public landing totals as raw data. Both frontend/backend add **1,450 hours** and **15 subjects**, set floors, and have fallback values. Sources: [frontend calculations](</Users/lethanhtunggmail.com/Study Stream/src/lib/landing-stats.ts:28>), [backend calculations](</Users/lethanhtunggmail.com/Study Stream/websocket-server/api/routes/stats.js:42>), [server fallback](</Users/lethanhtunggmail.com/Study Stream/src/app/page.tsx:14>).
- Do not publish retention/revenue improvements, concurrency capacity, availability percentages or test-case totals without matching measurement evidence.

## Suggested concise portfolio framing

**S2G / SunStudy — Real-time study communities.** Fullstack Developer & Product Owner. Built and operated personal study timers, live rooms, KPI/streak tracking, teams, tasks, community features and a cosmetic economy. Owns application code, realtime synchronization, relational data and deployment operations. Show S2G and SunStudy metrics separately with a 1 November 2026 snapshot date. Include a short “Latest tested preview” note for Workspace, shared timer/music and independent competitive ranking rather than implying those are already used by the entire community.
