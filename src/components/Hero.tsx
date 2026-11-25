'use client';

import React from 'react';
import { ArrowRight, Mail, Sparkles } from 'lucide-react';
import DownloadResumeBtn from './DownloadResumeBtn';

export default function Hero() {
  return (
    <section className="flex flex-col items-start gap-8 relative">
      {/* Decorative ambient background blur */}
      <div className="absolute -top-16 -left-16 w-72 h-72 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-16 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Available badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-medium tracking-wide">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span>Available for Fullstack & AI Engineering roles</span>
      </div>

      <div className="flex flex-col gap-4 relative z-10">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
          Full-Stack Software Engineer{' '}
          <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-indigo-600 bg-clip-text text-transparent">
            &amp; EdTech Builder
          </span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
          I design, engineer, and operate resilient digital products with real users. 
          Specialized in high-concurrency real-time WebSocket systems, AI microservices, 
          and production cloud architectures.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-2 relative z-10">
        <a 
          href="#projects" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 font-medium text-sm rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
        >
          Explore Work <ArrowRight size={16} />
        </a>
        <a 
          href="#contact" 
          className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-300 dark:border-zinc-700 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm text-zinc-900 dark:text-zinc-100 font-medium text-sm rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Get In Touch <Mail size={16} />
        </a>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-4 mt-6 pt-6 border-t-2 border-zinc-200 dark:border-zinc-800 w-full text-sm text-zinc-500 dark:text-zinc-400">
        <div className="flex items-center gap-2">
           <strong className="text-zinc-900 dark:text-zinc-100 font-semibold text-base">3+</strong>
           <span>Years Coding</span>
        </div>
        <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800"></div>
        <div className="flex items-center gap-2">
           <strong className="text-zinc-900 dark:text-zinc-100 font-semibold text-base">6</strong>
           <span>Live Products</span>
        </div>
        <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800"></div>
        <div className="flex items-center gap-2">
           <strong className="text-zinc-900 dark:text-zinc-100 font-semibold text-base">1,000+</strong>
           <span>Real Users</span>
        </div>
        <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800"></div>
        <div className="flex items-center gap-2">
           <DownloadResumeBtn />
        </div>
      </div>
    </section>
  );
}
