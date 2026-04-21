import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import ThemeToggle from '@/components/ThemeToggle';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <>
      <header style={{ padding: '1.5rem', position: 'fixed', top: 0, width: '100%', zIndex: 20 }}>
        <div className="container">
          <div className="glass" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '999px', padding: '0.9rem 1.2rem' }}>
            <div style={{ fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.05em' }}>
              <span style={{ color: 'var(--primary)' }}>Tung</span>.dev
            </div>
            <nav style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
              <a href="#projects" style={{ fontWeight: 500 }}>Projects</a>
              <a href="#skills" style={{ fontWeight: 500 }}>Skills</a>
              <a href="#experience" style={{ fontWeight: 500 }}>Philosophy</a>
              <a href="#testimonials" style={{ fontWeight: 500 }}>What People Say</a>
              <a href="#contact" style={{ fontWeight: 500 }}>Contact</a>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      <Hero />
      <Projects />
      <Skills />
      <Experience />
      <Testimonials />
      <Contact />

      <footer style={{ padding: '3rem 0', textAlign: 'center', color: 'var(--text-dark)', borderTop: '1px solid var(--surface-border)' }}>
        <div className="container">
          <p>© {new Date().getFullYear()} Tung Le. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
