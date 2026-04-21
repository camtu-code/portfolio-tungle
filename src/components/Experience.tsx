'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ShieldCheck, Code, CheckCircle2 } from 'lucide-react';
import styles from './Experience.module.css';

const EXPERIENCES = [
  {
    id: 1,
    title: 'Clean Code is the #1 Priority',
    company: 'Clarity & Maintainability',
    period: 'Principle 01',
    icon: <Code size={14} className={styles.dotIcon} />,
    description: 'I believe code is written for humans to read first. I prioritize clear variable naming, modular components, and an organized directory structure.'
  },
  {
    id: 2,
    title: 'Test Thoroughly Before Commit',
    company: 'Quality Assurance',
    period: 'Principle 02',
    icon: <ShieldCheck size={14} className={styles.dotIcon} />,
    description: 'Proactively test edge cases and anticipate potential errors to mitigate risks before pushing features to the Production environment.'
  },
  {
    id: 3,
    title: 'Dive Deep into Documentation',
    company: 'Understand the Core',
    period: 'Principle 03',
    icon: <BookOpen size={14} className={styles.dotIcon} />,
    description: 'Instead of rushing to copy external solutions, I maintain the habit of reading official documentation to truly understand how tools work under the hood.'
  }
];

export default function Experience() {
  return (
    <section id="experience" className={styles.experience}>
      <div className="container">
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          My Developer Philosophy
        </motion.h2>
        
        <div className={styles.timeline}>
          {EXPERIENCES.map((exp, idx) => (
            <div key={exp.id} className={styles.timelineItem}>
              <motion.div 
                className={styles.timelineDot}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: idx * 0.2 }}
              >
                {exp.icon}
              </motion.div>
              
              <motion.div 
                className={`${styles.timelineContent} glass`}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.2, type: "spring", bounce: 0.3 }}
              >
                <div className={styles.timelineHeader}>
                  <h3 className={styles.title}>{exp.title}</h3>
                  <span className={styles.period}>
                    <CheckCircle2 size={14} /> {exp.period}
                  </span>
                </div>
                <h4 className={styles.company}>{exp.company}</h4>
                <p className={styles.description}>{exp.description}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
