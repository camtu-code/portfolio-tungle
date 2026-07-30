'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle2, LockKeyhole } from 'lucide-react';
import styles from './Projects.module.css';

export default function Projects() {
  return (
    <section id="projects" className={styles.projects}>
      <div className="container">
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          Featured Projects
        </motion.h2>
        
        <motion.div 
          className="glowing-border"
          style={{ maxWidth: '1000px', margin: '0 auto' }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
        >
          <div className={`${styles.card} glass`} style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ borderBottom: '1px solid var(--surface-border)', paddingBottom: '1.5rem' }}>
              <h3 className={styles.title} style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>MyStudyVibes</h3>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-dark)', fontWeight: 500 }}>
                Next-gen Learning Management System with AI
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Context</h4>
                  <p style={{ color: 'var(--text-dark)', lineHeight: 1.6 }}>I wanted to create a smart educational platform that goes beyond simple grading. MyStudyVibes analyzes student weaknesses, provides detailed feedback like a real tutor, and recommends personalized learning paths.</p>
                </div>
                <div>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>My Role</h4>
                  <p style={{ color: 'var(--text-dark)', lineHeight: 1.6 }}><strong>Solo Developer</strong> (Did everything from designing the database, building the APIs, to the UI/UX).</p>
                </div>
                <div>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Tech Stack</h4>
                  <div className={styles.tags} style={{ marginTop: '0.5rem' }}>
                    {['Next.js App Router', 'Server Actions', 'Prisma', 'PostgreSQL', 'OpenAI API'].map(tech => (
                      <span key={tech} className={styles.tag}>{tech}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Challenges & Solutions</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <CheckCircle2 size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                      <span style={{ color: 'var(--text-dark)', lineHeight: 1.6 }}><strong>AI Integration for Smart Grading:</strong> Implemented AI to not just mark answers correct or incorrect, but to explain the logic and act as a virtual tutor.</span>
                    </li>
                    <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <CheckCircle2 size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                      <span style={{ color: 'var(--text-dark)', lineHeight: 1.6 }}><strong>Personalized Learning Paths:</strong> Built a system to track student history, identify knowledge gaps, and dynamically suggest targeted exercises to overcome them.</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Result</h4>
                  <p style={{ color: 'var(--text-dark)', lineHeight: 1.6 }}>Successfully launched a robust AI-driven LMS that personalizes learning, saves teachers time, and provides students with 24/7 intelligent support.</p>
                </div>
                <div className={styles.links} style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                  <a href="https://edutech-ai-platform-1.vercel.app/" className={styles.link} target="_blank" rel="noopener noreferrer" style={{ padding: '0.5rem 1rem', background: 'var(--primary)', color: '#fff', borderRadius: '8px' }}>
                    <ExternalLink size={16} /> Live Demo
                  </a>
                  <span className={`${styles.link} ${styles.privateLink}`} aria-label="Repository is private">
                    <LockKeyhole size={16} /> Private Repo
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="glowing-border"
          style={{ maxWidth: '1000px', margin: '4rem auto 0' }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
        >
          <div className={`${styles.card} glass`} style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ borderBottom: '1px solid var(--surface-border)', paddingBottom: '1.5rem' }}>
              <h3 className={styles.title} style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>StudyTogether</h3>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-dark)', fontWeight: 500 }}>
                Next-Gen Virtual Study Room & Pomodoro Timer
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Context</h4>
                  <p style={{ color: 'var(--text-dark)', lineHeight: 1.6 }}>I wanted to create a distraction-free, engaging virtual space for students to study together using the Pomodoro technique, complete with real-time rooms and progress tracking.</p>
                </div>
                <div>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>My Role</h4>
                  <p style={{ color: 'var(--text-dark)', lineHeight: 1.6 }}><strong>Solo Developer</strong> (Designed the UI/UX, implemented real-time features, state management, and responsive layouts).</p>
                </div>
                <div>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Tech Stack</h4>
                  <div className={styles.tags} style={{ marginTop: '0.5rem' }}>
                    {['Next.js', 'Tailwind CSS', 'WebSockets', 'Framer Motion'].map(tech => (
                      <span key={tech} className={styles.tag}>{tech}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Challenges & Solutions</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <CheckCircle2 size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                      <span style={{ color: 'var(--text-dark)', lineHeight: 1.6 }}><strong>Real-time Synchronization:</strong> Kept study timers and user presence synced across multiple clients in real-time rooms.</span>
                    </li>
                    <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <CheckCircle2 size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                      <span style={{ color: 'var(--text-dark)', lineHeight: 1.6 }}><strong>Engaging UI/UX:</strong> Built a dynamic and interactive interface with smooth animations and a custom design system to keep users motivated.</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Result</h4>
                  <p style={{ color: 'var(--text-dark)', lineHeight: 1.6 }}>Launched a fully functional MVP with real-time capabilities. Students can easily join rooms, track their focus time, and compete on leaderboards.</p>
                </div>
                <div className={styles.links} style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                  <a href="https://study-together-vibes.vercel.app/" className={styles.link} target="_blank" rel="noopener noreferrer" style={{ padding: '0.5rem 1rem', background: 'var(--primary)', color: '#fff', borderRadius: '8px' }}>
                    <ExternalLink size={16} /> Live Demo
                  </a>
                  <span className={`${styles.link} ${styles.privateLink}`} aria-label="Repository is private">
                    <LockKeyhole size={16} /> Private Repo
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
