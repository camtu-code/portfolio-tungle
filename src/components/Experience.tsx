import React from 'react';
import { COGNIASSESS, S2G, LIFE_OF_STUDY, PROJECT_SNAPSHOT } from '@/data/featuredProjects';

const TIMELINE = [
  {
    year: '2026 - Present',
    title: 'Lead Infrastructure & Backend Developer',
    company: 'Carevia · VinUni AI Thực Chiến (P-033)',
    description: 'Lead backend and infrastructure for an enterprise AI medical assistant in a 4-engineer team. Built FastAPI & LangGraph RAG pipeline, TiDB TLS persistence, and automated CI/CD with 107+ tests. Public repo at github.com/griin-03/P-033.'
  },
  {
    year: '2025 - Present',
    title: 'Fullstack & Bot Developer',
    company: 'Life of Study (focus.sunstudy.app)',
    description: LIFE_OF_STUDY.experienceDescription
  },
  {
    year: '2024 - Present',
    title: 'Lead Fullstack Developer',
    company: 'Prelynx (pre.sunstudy.app)',
    description: 'Developed an intelligent test-prep platform for IELTS & Digital SAT with 2,800+ learning modules, diagnostic entrance tests, Edge deployment, and real-time learning analytics.'
  },
  {
    year: '2024 - Present',
    title: 'Fullstack Developer / Founder',
    company: 'OnlyGift.online',
    description: 'Architected an automated e-commerce platform integrating VietQR and Casso Webhooks for zero-manual order reconciliation.'
  },
  {
    year: '2023 - Present',
    title: 'Solo Fullstack Developer',
    company: COGNIASSESS.name,
    description: COGNIASSESS.experienceDescription
  },
  {
    year: '2022 - Present',
    title: 'Fullstack Developer & Product Owner',
    company: S2G.name,
    description: S2G.experienceDescription
  }
];

export default function Experience() {
  return (
    <section id="experience" className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold tracking-tight">Experience</h2>
        <p className="text-zinc-500 dark:text-zinc-400">Ongoing product development and ownership.</p>
      </div>

      <div className="flex flex-col gap-8">
        {TIMELINE.map((item, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-8 group">
            <span className="text-sm text-zinc-400 dark:text-zinc-500 min-w-[120px] pt-1">
              {item.year}
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                {item.title} <span className="text-zinc-400 dark:text-zinc-500 font-normal">· {item.company}</span>
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">Project metrics as of <time dateTime={PROJECT_SNAPSHOT.date}>{PROJECT_SNAPSHOT.label}</time>.</p>

      <div className="flex flex-col gap-8 mt-8 pt-8 border-t-2 border-zinc-300 dark:border-zinc-700">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold tracking-tight">Education &amp; Training</h2>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-8 group">
          <span className="text-sm text-zinc-400 dark:text-zinc-500 min-w-[140px] pt-1">
            11/2026 – 01/2027
          </span>
          <div className="flex flex-col gap-1.5">
            <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-100">
              AI Thực Chiến (3-Month Intensive) <span className="text-zinc-400 dark:text-zinc-500 font-normal">· VinUni &amp; Vingroup (Cohort 5)</span>
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl">
              Intensive 3-month applied AI engineering program following SFIA standards, building and deploying enterprise AI systems in a 4-engineer team (Project P-033 Carevia).
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-8 group">
          <span className="text-sm text-zinc-400 dark:text-zinc-500 min-w-[140px] pt-1">
            2024 – 2026
          </span>
          <div className="flex flex-col gap-1.5">
            <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-100">
              Information Technology <span className="text-zinc-400 dark:text-zinc-500 font-normal">· University of Transport and Communications (UTC)</span>
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl">
              Final-year IT student (Expected graduation: 2026). Transitioned directly from college degree to pursue deeper software engineering and systems architecture.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-8 group">
          <span className="text-sm text-zinc-400 dark:text-zinc-500 min-w-[140px] pt-1">
            2024 – 2025
          </span>
          <div className="flex flex-col gap-1.5">
            <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-100">
              Pedagogical Certificate <span className="text-zinc-400 dark:text-zinc-500 font-normal">· Nghiệp vụ Sư phạm</span>
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl">
              Completed formal pedagogical training, combining technical engineering with instructional design, clear communication, and mentoring.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-8 group">
          <span className="text-sm text-zinc-400 dark:text-zinc-500 min-w-[140px] pt-1">
            2021 – 2024
          </span>
          <div className="flex flex-col gap-1.5">
            <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-100">
              Information Technology <span className="text-zinc-400 dark:text-zinc-500 font-normal">· Vietnam Polytechnic College (Cao đẳng Bách khoa)</span>
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl">
              Graduated with Distinction (Loại Giỏi). Built strong foundations in programming, databases, and full-stack web development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
