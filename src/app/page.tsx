import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';

import Philosophy from '@/components/Philosophy';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <>


      <div className="flex flex-col gap-24 md:gap-32 mt-12 md:mt-24">
        <Hero />
        <Projects />
        <Skills />
        <Philosophy />
        <Experience />
        <Contact />
      </div>

      <footer className="mt-24 pt-8 border-t-2 border-zinc-300 dark:border-zinc-700 text-sm text-zinc-500 dark:text-zinc-400 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} Tung Le. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">LinkedIn</a>
        </div>
      </footer>
    </>
  );
}
