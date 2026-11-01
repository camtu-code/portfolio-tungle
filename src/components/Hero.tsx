'use client';

import React from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import DownloadResumeBtn from './DownloadResumeBtn';

export default function Hero() {
  return (
    <section className="flex flex-col items-start gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Full-Stack Software Engineer
        </h1>
        <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
          I build and operate education products, from online assessment to real-time
          study communities. I work across product design, full-stack development and
          production operations, using learner activity to guide what I improve next.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-4">
        <a 
          href="#projects" 
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 font-medium text-sm rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
        >
          View Projects <ArrowRight size={16} />
        </a>
        <a 
          href="#contact" 
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium text-sm rounded-full hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
        >
          Contact Me <Mail size={16} />
        </a>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-4 mt-8 pt-8 border-t-2 border-zinc-300 dark:border-zinc-700 w-full text-sm text-zinc-500 dark:text-zinc-400">
        <div className="flex items-center gap-2">
           <strong className="text-zinc-900 dark:text-zinc-100 font-semibold text-base">3+</strong>
           <span>Years Coding</span>
        </div>
        <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800"></div>
        <div className="flex items-center gap-2">
           <strong className="text-zinc-900 dark:text-zinc-100 font-semibold text-base">4</strong>
           <span>Live Products</span>
        </div>
        <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800"></div>
        <div className="flex items-center gap-2">
           <DownloadResumeBtn />
        </div>
      </div>
    </section>
  );
}
