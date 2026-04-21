import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import ThemeToggle from '@/components/ThemeToggle';
import styles from './HomeHeader.module.css';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <div className={`glass ${styles.bar}`}>
            <div className={styles.brand}>
              <span className={styles.brandAccent}>Tung</span>.dev
            </div>
            <nav className={styles.nav}>
              <a href="#projects" className={styles.link}>Projects</a>
              <a href="#skills" className={styles.link}>Skills</a>
              <a href="#experience" className={styles.link}>Philosophy</a>
              <a href="#testimonials" className={styles.link}>What People Say</a>
              <a href="#contact" className={styles.link}>Contact</a>
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
