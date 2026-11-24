import { ExternalLink, LockKeyhole } from 'lucide-react';
import { PROJECT_SNAPSHOT } from '@/data/featuredProjects';
import type { FeaturedProjectData } from '@/data/featuredProjects';
import EvidenceModal from './EvidenceModal';

export default function FeaturedProject({ project }: { project: FeaturedProjectData }) {
  return (
    <article 
      id={project.id} 
      aria-labelledby={`${project.id}-title`} 
      className="group relative flex scroll-mt-24 flex-col gap-6 rounded-2xl border border-zinc-200/80 bg-white/40 p-6 md:p-8 backdrop-blur-sm transition-all duration-300 hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-900/5 dark:border-zinc-800/80 dark:bg-zinc-900/30 dark:hover:border-zinc-700 dark:hover:shadow-zinc-950/40"
    >
      <div className="flex flex-col justify-between gap-3 border-b border-zinc-200 pb-4 sm:flex-row sm:items-baseline dark:border-zinc-800">
        <div className="flex flex-wrap items-center gap-3">
          <h3 id={`${project.id}-title`} className="text-xl md:text-2xl font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {project.name}
          </h3>
          <EvidenceModal projectId={project.id} projectName={project.name} />
        </div>
        <span className="text-xs md:text-sm font-medium text-zinc-500 dark:text-zinc-400">{project.category}</span>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="font-medium uppercase tracking-wider">{project.metricsTitle}</span>
          <span>Snapshot · <time dateTime={PROJECT_SNAPSHOT.date}>{PROJECT_SNAPSHOT.label}</time></span>
        </div>
        <dl className="grid grid-cols-2 overflow-hidden rounded-xl border border-zinc-200/80 bg-zinc-50/80 sm:grid-cols-4 dark:border-zinc-800/80 dark:bg-zinc-900/60 shadow-inner">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="flex min-w-0 flex-col gap-1.5 p-4 md:p-5 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/40 transition-colors">
              <dt className="order-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{metric.label}</dt>
              <dd className="text-2xl font-bold tracking-tight text-zinc-900 tabular-nums md:text-3xl dark:text-zinc-100">
                {metric.value}
              </dd>
            </div>
          ))}
        </dl>
        <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{project.metricsNote}</p>
        {project.secondaryMetrics && (
          <p className="rounded-xl border border-zinc-200/80 bg-zinc-50/50 px-4 py-3 text-xs leading-relaxed text-zinc-600 dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:text-zinc-400">
            <strong className="font-medium text-zinc-900 dark:text-zinc-200">System detail: </strong>
            {project.secondaryMetrics}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
        <div className="flex flex-col gap-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          <p className="text-zinc-700 dark:text-zinc-300 font-normal leading-relaxed">{project.summary}</p>
          <p className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            {project.role}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span key={tech} className="rounded-md border border-zinc-200/80 bg-zinc-100/70 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700/60 dark:bg-zinc-800/70 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors">
                {tech}
              </span>
            ))}
          </div>
          {project.inDevelopment && (
            <div className="mt-1 rounded-xl border border-dashed border-zinc-300/80 bg-zinc-50/40 p-4 dark:border-zinc-700/80 dark:bg-zinc-900/30">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-200">In development</p>
              <p className="text-xs leading-relaxed">{project.inDevelopment}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          <ul className="space-y-3">
            {project.highlights.map((highlight) => (
              <li key={highlight.title} className="text-xs md:text-sm leading-relaxed">
                <strong className="font-semibold text-zinc-900 dark:text-zinc-200">{highlight.title}: </strong>
                {highlight.description}
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-4 border-t border-zinc-200/60 dark:border-zinc-800/60">
            {project.links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-zinc-900 font-medium underline-offset-4 hover:underline hover:text-emerald-600 dark:text-zinc-100 dark:hover:text-emerald-400 transition-colors">
                {link.label} <ExternalLink size={14} aria-hidden="true" />
              </a>
            ))}
            <span className="inline-flex items-center gap-1.5 text-zinc-400 dark:text-zinc-500 text-xs" title="Private source code due to active production & proprietary operations. Available upon request during technical interview.">
              Private Source <LockKeyhole size={13} aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
