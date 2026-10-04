'use client';

import React from 'react';
import { ExternalLink, LockKeyhole } from 'lucide-react';

export default function Projects() {
  return (
    <section id="projects" className="flex flex-col gap-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold tracking-tight">Selected Work</h2>
        <p className="text-zinc-500 dark:text-zinc-400">A collection of projects I&apos;ve built and shipped to production.</p>
      </div>
      
      <div className="flex flex-col gap-16">
        {/* ─── PROJECT 1: CogniAssess ─── */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b-2 border-zinc-300 dark:border-zinc-700 pb-4">
            <h3 className="text-xl font-medium text-zinc-900 dark:text-zinc-100">CogniAssess Platform</h3>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">AI-Proctored Exams & Cognitive Engine</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="flex flex-col gap-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <p>
                Independently built a comprehensive EdTech platform with 5-role RBAC, live online exam rooms, AI-driven learning paths, a social learning community, and an in-app virtual currency (CogniCredit). <strong>Solo Fullstack Developer</strong>.
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {[
                  'Next.js', 'Prisma', 'TiDB', 'Cohere API', 'Gemini API',
                  'TensorFlow.js', 'Playwright', 'Capacitor'
                ].map(tech => (
                  <span key={tech} className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 rounded text-xs font-medium border border-zinc-200 dark:border-zinc-700/50">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <ul className="list-disc pl-4 space-y-2 marker:text-zinc-400 dark:marker:text-zinc-600">
                <li><strong>CogniAssess Engine:</strong> Tracks per-question behavioral data (time spent, answer changes) and generates AI-powered analysis reports via Gemini API.</li>
                <li><strong>AI Anti-Cheat:</strong> Integrated TensorFlow.js (COCO-SSD) to detect face absence and tab-switching in real-time.</li>
                <li><strong>AI Exam Generator:</strong> Integrates Cohere command-r with automatic retry and a 4-layer JSON safety pipeline to ensure generation stability.</li>
                <li><strong>Economy:</strong> Built a complete virtual wallet with auto commission splits and QR-based PRO upgrades.</li>
              </ul>
              <div className="flex items-center gap-4 mt-auto pt-4">
                <a href="https://cna.io.vn" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-zinc-900 dark:text-zinc-100 hover:underline underline-offset-4">
                  Live Demo <ExternalLink size={14} />
                </a>
                <span className="inline-flex items-center gap-1.5 text-zinc-400 dark:text-zinc-500 cursor-not-allowed">
                  Private Repo <LockKeyhole size={14} />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── PROJECT 2: StudyStream ─── */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b-2 border-zinc-300 dark:border-zinc-700 pb-4">
            <h3 className="text-xl font-medium text-zinc-900 dark:text-zinc-100">StudyStream (S2G)</h3>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">Virtual Study Community & Live Rooms</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="flex flex-col gap-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <p>
                A full-featured virtual study community with live study rooms, per-subject timers, a deep gamification ecosystem (shop, 9-tier league, teams), daily KPI tracking, and a social feed. <strong>Fullstack Developer & Product Owner</strong>.
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {[
                  'Next.js', 'Drizzle ORM', 'Socket.IO', 'Express.js',
                  'Zustand', 'Supabase', 'Pusher'
                ].map(tech => (
                  <span key={tech} className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 rounded text-xs font-medium border border-zinc-200 dark:border-zinc-700/50">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <ul className="list-disc pl-4 space-y-2 marker:text-zinc-400 dark:marker:text-zinc-600">
                <li><strong>Real-Time WS Server:</strong> Separate Express + Socket.IO server handling live presence, timers, and chat with a 5-min heartbeat DB write buffer.</li>
                <li><strong>Deep Gamification:</strong> 20+ DB tables managing 17 rarity tiers of shop items, quests, team competitions, and historical KPI tracking.</li>
                <li><strong>Production Ops:</strong> Self-maintained with real active users, custom anti-spam detection, and cross-ping mechanisms to keep servers awake.</li>
              </ul>
              <div className="flex items-center gap-4 mt-auto pt-4">
                <a href="https://s2g.io.vn" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-zinc-900 dark:text-zinc-100 hover:underline underline-offset-4">
                  Live Demo <ExternalLink size={14} />
                </a>
                <span className="inline-flex items-center gap-1.5 text-zinc-400 dark:text-zinc-500 cursor-not-allowed">
                  Private Repo <LockKeyhole size={14} />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── PROJECT 3: OnlyGift.online ─── */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b-2 border-zinc-300 dark:border-zinc-700 pb-4">
            <h3 className="text-xl font-medium text-zinc-900 dark:text-zinc-100">OnlyGift.online</h3>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">Niche E-commerce Platform</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="flex flex-col gap-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <p>
                Developed a specialized e-commerce platform allowing users to customize and purchase personalized web interfaces, demonstrating business acumen and end-to-end technical execution. <strong>Fullstack Developer / Founder</strong>.
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {['Next.js', 'Prisma', 'TiDB', 'VietQR API', 'Webhook (Casso)'].map(tech => (
                  <span key={tech} className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 rounded text-xs font-medium border border-zinc-200 dark:border-zinc-700/50">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <ul className="list-disc pl-4 space-y-2 marker:text-zinc-400 dark:marker:text-zinc-600">
                <li><strong>Automated Payment Integration:</strong> Successfully integrated VietQR API and Webhook system for seamless, automated order reconciliation.</li>
                <li><strong>Dynamic Routing:</strong> Engineered dynamic routes to generate thousands of independent product links instantly without redeployment.</li>
              </ul>
              <div className="flex items-center gap-4 mt-auto pt-4">
                <a href="https://onlygift.online/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-zinc-900 dark:text-zinc-100 hover:underline underline-offset-4">
                  Live Demo <ExternalLink size={14} />
                </a>
                <span className="inline-flex items-center gap-1.5 text-zinc-400 dark:text-zinc-500 cursor-not-allowed">
                  Private Repo <LockKeyhole size={14} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
