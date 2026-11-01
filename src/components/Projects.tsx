import React from 'react';
import { ExternalLink, LockKeyhole } from 'lucide-react';
import FeaturedProject from './FeaturedProject';
import { FEATURED_PROJECTS } from '@/data/featuredProjects';

export default function Projects() {
  return (
    <section id="projects" className="flex flex-col gap-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold tracking-tight">Selected Work</h2>
        <p className="text-zinc-500 dark:text-zinc-400">Products I build, operate and improve with real usage data.</p>
      </div>

      <div className="flex flex-col gap-16">
        {FEATURED_PROJECTS.map(project => (
          <FeaturedProject key={project.id} project={project} />
        ))}

        {/* ─── PROJECT 3: Prelynx (pre.sunstudy.app) ─── */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b-2 border-zinc-300 dark:border-zinc-700 pb-4">
            <h3 className="text-xl font-medium text-zinc-900 dark:text-zinc-100">Prelynx (SunStudy Prep)</h3>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">Intelligent IELTS &amp; Digital SAT Learning Ecosystem</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="flex flex-col gap-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <p>
                An intelligent test-prep platform built for IELTS (Reading, Listening, Writing, Speaking) and Digital SAT (Math &amp; Verbal). Features step-by-step diagnostic entry testing, custom practice roadmaps, vocabulary decks, and real-time learning analytics. <strong>Lead Fullstack Developer</strong>.
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {[
                  'Next.js 16', 'React 19', 'Drizzle ORM', 'TiDB Serverless',
                  'Cloudflare Edge', 'NextAuth v5', 'Turnstile', 'Tailwind CSS v4'
                ].map(tech => (
                  <span key={tech} className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 rounded text-xs font-medium border border-zinc-200 dark:border-zinc-700/50">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <ul className="list-disc pl-4 space-y-2 marker:text-zinc-400 dark:marker:text-zinc-600">
                <li><strong>Comprehensive Curriculum:</strong> 2,800+ lessons and exercises across IELTS 4.0–8.5 and Digital SAT with diagnostic entrance tests.</li>
                <li><strong>Real-Time Learning Analytics:</strong> Detailed analytics dashboard tracking accuracy rate, weak skill diagnostics, and target score projections.</li>
                <li><strong>Cloudflare Edge Architecture:</strong> Edge runtime deployment (@cloudflare/next-on-pages) combined with Cloudflare Turnstile anti-bot protection and anti-scraping safeguards.</li>
              </ul>
              <div className="flex items-center gap-4 mt-auto pt-4">
                <a href="https://pre.sunstudy.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-zinc-900 dark:text-zinc-100 hover:underline underline-offset-4">
                  Live Demo (pre.sunstudy.app) <ExternalLink size={14} />
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
