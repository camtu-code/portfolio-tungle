'use client';

import React from 'react';

const PRINCIPLES = [
  {
    title: 'Pedagogy Meets Engineering',
    description: 'Combining an educational background with strong engineering skills to build EdTech products that genuinely improve how people learn, rather than just writing code.'
  },
  {
    title: 'User-Centric Gamification',
    description: 'I design study goals, streaks, team challenges and rewards around the habits learners want to build, then use recorded study activity to guide improvements.'
  },
  {
    title: 'Resilient & Scalable Systems',
    description: 'I build for the failures that show up in daily use: interrupted timers, stale draft saves and unreliable connections. Server-side state, recovery tools and retained releases help me operate these products.'
  }
];

export default function Philosophy() {
  return (
    <section id="philosophy" className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold tracking-tight">Philosophy</h2>
        <p className="text-zinc-500 dark:text-zinc-400">My approach to building software and products.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PRINCIPLES.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-3">
            <div className="h-0.5 w-12 bg-zinc-900 dark:bg-zinc-100 mb-2"></div>
            <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-100">{item.title}</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
