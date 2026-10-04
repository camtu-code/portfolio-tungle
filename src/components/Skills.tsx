'use client';

import React from 'react';

const SKILLS = [
  { category: 'Frontend', items: ['Next.js 16 (App Router)', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Framer Motion', 'Zustand', 'Shadcn UI'] },
  { category: 'Backend', items: ['Node.js', 'Express.js', 'Socket.IO', 'NextAuth', 'REST APIs', 'Webhooks (Casso/SePay)'] },
  { category: 'Database & ORM', items: ['Prisma ORM', 'Drizzle ORM', 'TiDB Serverless', 'MySQL', 'PostgreSQL'] },
  { category: 'AI & ML', items: ['Cohere API (command-r)', 'Google Gemini (Flash)', 'TensorFlow.js (COCO-SSD)', 'face-api.js'] },
  { category: 'DevOps & Tools', items: ['Git/GitHub', 'Vercel', 'Render', 'GitHub Actions', 'Capacitor', 'Supabase Storage'] },
  { category: 'Testing', items: ['Pytest', 'Playwright (E2E)'] },
];

export default function Skills() {
  return (
    <section id="skills" className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold tracking-tight">Technical Skills</h2>
        <p className="text-zinc-500 dark:text-zinc-400">Technologies I use to build and deploy applications.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
        {SKILLS.map((skillGroup, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{skillGroup.category}</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {skillGroup.items.join(', ')}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
