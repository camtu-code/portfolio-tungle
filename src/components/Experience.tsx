import React from 'react';
import { COGNIASSESS, S2G, PROJECT_SNAPSHOT } from '@/data/featuredProjects';

const TIMELINE = [
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
          <h2 className="text-2xl font-semibold tracking-tight">Education</h2>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-8 group">
          <span className="text-sm text-zinc-400 dark:text-zinc-500 min-w-[120px] pt-1">
            Expected 2026
          </span>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-100">
              Information Technology <span className="text-zinc-400 dark:text-zinc-500 font-normal">· University of Transport and Communications</span>
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl">
              Final-year IT student (Graduation: 2026). Also graduated as an IT Engineer from Vietnam Polytechnic College. Hold a professional Pedagogical Certificate, enabling a unique combination of technical engineering and effective educational product design.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
