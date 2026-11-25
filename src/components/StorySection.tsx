import React from 'react';
import { TrendingUp, Compass } from 'lucide-react';

const GROWTH_STATS = [
  {
    label: 'User Growth (Aug → Nov 2026)',
    value: '116 → 1,073',
    sub: '9.2x clean registered users in ~4 months',
  },
  {
    label: 'Activation Rate (S2G)',
    value: '67.4%',
    sub: '723 / 1,073 completed ≥1 study session',
  },
  {
    label: 'Multi-Day Returning Learners',
    value: '486 users',
    sub: '279 learners active on ≥7 distinct days',
  },
  {
    label: 'Monthly Study Hours (Aug → Oct)',
    value: '783 → 13,046h',
    sub: '16.7x growth; avg session 64.6 → 81.6 min',
  },
];

const JOURNEY_STEPS = [
  {
    period: '2021–2024 · Foundation',
    title: 'From IT College (Distinction) to Real Problems',
    description:
      'Graduated with Distinction in IT at Vietnam Polytechnic College (2021–2024), then continued to University of Transport and Communications (UTC, 2024–2026) while completing a Pedagogical Certificate (2024–2025). Started shipping real products instead of stopping at class demos.',
  },
  {
    period: '2024–2025 · Shipping & Iterating',
    title: 'Learning Operations the Hard Way',
    description:
      'Built CogniAssess (105 non-demo accounts, 1,075 questions), OnlyGift.online, and Life of Study (364 active Discord members, 2,501+ voice hours). Real users exposed real bottlenecks—like cutting 35 sequential Supabase reads down to 3 queries and moving webcam proctoring to Python/OpenCV on VPS.',
  },
  {
    period: '2026–01/2027 · Scale & VinUni AI',
    title: '9.2x Community Growth & VinUni AI Program',
    description:
      'S2G grew from 116 clean users in August 2026 to 1,073 by November, pushing me to consolidate 95 tables onto local MariaDB on a 24 GB Oracle ARM VPS. Simultaneously joined VinUni Applied AI Program (11/2026–01/2027) in a 4-engineer team for Carevia (P-033), adopting PR reviews, 107+ pytest checks, and CI/CD.',
  },
];

export default function StorySection() {
  return (
    <section id="story" className="flex flex-col gap-8 scroll-mt-24">
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 text-xs font-medium w-fit">
          <Compass size={13} className="text-emerald-500" />
          <span>About &amp; Growth Story</span>
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          From IT Student to Shipping &amp; Operating Live Products
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
          How self-taught iteration, real user feedback, and production failures shaped the way I build software.
        </p>
      </div>

      {/* Journey 3-column story */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {JOURNEY_STEPS.map((step) => (
          <div
            key={step.period}
            className="flex flex-col gap-3 rounded-2xl border border-zinc-200/80 bg-white/40 p-6 dark:border-zinc-800/80 dark:bg-zinc-900/30"
          >
            <span className="text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400">
              {step.period}
            </span>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              {step.title}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      {/* Growth & Retention Proof Strip */}
      <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-6 dark:border-zinc-800/80 dark:bg-zinc-900/40">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="inline-flex items-center gap-1.5 font-medium uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
            <TrendingUp size={14} className="text-emerald-500" />
            Measured Growth &amp; Retention (S2G Production)
          </span>
          <span>MariaDB Audit · <time dateTime="2026-11-25">25 Nov 2026</time></span>
        </div>

        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {GROWTH_STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1 rounded-xl border border-zinc-200/70 bg-white/70 p-4 dark:border-zinc-800 dark:bg-zinc-950/50">
              <dt className="text-xs text-zinc-500 dark:text-zinc-400">{stat.label}</dt>
              <dd className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 tabular-nums">
                {stat.value}
              </dd>
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug">
                {stat.sub}
              </span>
            </div>
          ))}
        </dl>

        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed pt-1">
          All growth and retention figures are queried directly from <code className="font-mono">s2g_unified</code> MariaDB (excluding test/demo/QA accounts). Activation measures registered accounts that completed ≥1 positive-duration session; multi-day retention counts distinct active calendar days.
        </p>
      </div>
    </section>
  );
}
