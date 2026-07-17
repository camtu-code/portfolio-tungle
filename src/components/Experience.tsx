'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ShieldCheck, Code, CheckCircle2 } from 'lucide-react';
import styles from './Experience.module.css';

const EXPERIENCES = [
  {
    id: 1,
    title: 'Clean, readable code',
    company: 'Rule #1',
    period: 'Principle 01',
    icon: <Code size={14} className={styles.dotIcon} />,
    description: 'I always remind myself that code is read by humans first (especially future me) and executed by machines second. Naming variables clearly and splitting components neatly is a must for me.'
  },
  {
    id: 2,
    title: 'Test thoroughly before pushing',
    company: 'Rule #2',
    period: 'Principle 02',
    icon: <ShieldCheck size={14} className={styles.dotIcon} />,
    description: 'I try my best to test the main flows and catch edge cases early so I don\'t make life harder for the reviewers or testers.'
  },
  {
    id: 3,
    title: 'Read the Docs',
    company: 'Rule #3',
    period: 'Principle 03',
    icon: <BookOpen size={14} className={styles.dotIcon} />,
    description: 'Instead of just copy-pasting from StackOverflow, I actually enjoy reading official docs to figure out how libraries work under the hood.'
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
          My Working Style
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
