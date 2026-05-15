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
          Featured Project
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
              <h3 className={styles.title} style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>EduTech.AI</h3>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-dark)', fontWeight: 500 }}>
                Intelligent Online Testing Platform
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Context</h4>
                  <p style={{ color: 'var(--text-dark)', lineHeight: 1.6 }}>Current testing platforms often lack flexibility and require significant effort to create questions. EduTech.AI was born to automate the question generation process using AI and provide a seamless testing experience for students.</p>
                </div>
                <div>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>My Role</h4>
                  <p style={{ color: 'var(--text-dark)', lineHeight: 1.6 }}><strong>Solo Full Stack Developer</strong> (Handled the entire product lifecycle: Database Schema Design {'->'} API Development {'->'} UI/UX Development).</p>
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
                  <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Technical Challenges & Solutions</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <CheckCircle2 size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                      <span style={{ color: 'var(--text-dark)', lineHeight: 1.6 }}><strong>Real-time State Management:</strong> Ensured data integrity and precise state synchronization between Client and Server, even with unstable network connections.</span>
                    </li>
                    <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <CheckCircle2 size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                      <span style={{ color: 'var(--text-dark)', lineHeight: 1.6 }}><strong>AI Integration for Question Generation:</strong> Effectively handled Prompt Engineering to make the LLM return precise JSON structures, easily mapped into the Database via Prisma.</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Outcomes</h4>
                  <p style={{ color: 'var(--text-dark)', lineHeight: 1.6 }}>Completed the MVP with a clean, maintainable, and decoupled codebase architecture. The system operates stably, fully processing exam data flows without database bottlenecks.</p>
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
      </div>
    </section>
  );
}
