'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Server, Database } from 'lucide-react';
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiPrisma, SiPostgresql, SiMongodb, SiPostman, SiVercel } from 'react-icons/si';
import { FaReact, FaNodeJs, FaJava, FaGitAlt, FaDocker, FaPython } from 'react-icons/fa';
import { GrOracle } from 'react-icons/gr';
import styles from './Skills.module.css';

const SKILLS_DATA = [
  { 
    category: 'Frontend', 
    icon: <Monitor size={24} />,
    items: [
      { name: 'Next.js', logo: <SiNextdotjs size={16} className={styles.bulletIcon} /> },
      { name: 'React', logo: <FaReact size={16} className={styles.bulletIcon} /> },
      { name: 'TypeScript', logo: <SiTypescript size={16} className={styles.bulletIcon} /> },
      { name: 'Tailwind CSS', logo: <SiTailwindcss size={16} className={styles.bulletIcon} /> }
    ] 
  },
  { 
    category: 'Backend & Database', 
    icon: <Server size={24} />,
    items: [
      { name: 'Node.js', logo: <FaNodeJs size={16} className={styles.bulletIcon} /> },
      { name: 'Python', logo: <FaPython size={16} className={styles.bulletIcon} /> },
      { name: 'Java', logo: <FaJava size={16} className={styles.bulletIcon} /> },
      { name: 'Prisma', logo: <SiPrisma size={16} className={styles.bulletIcon} /> },
      { name: 'PostgreSQL', logo: <SiPostgresql size={16} className={styles.bulletIcon} /> },
      { name: 'Oracle', logo: <GrOracle size={16} className={styles.bulletIcon} /> },
      { name: 'MongoDB', logo: <SiMongodb size={16} className={styles.bulletIcon} /> }
    ] 
  },
  { 
    category: 'Tools & Workflow', 
    icon: <Database size={24} />,
    items: [
      { name: 'Git', logo: <FaGitAlt size={16} className={styles.bulletIcon} /> },
      { name: 'Docker', logo: <FaDocker size={16} className={styles.bulletIcon} /> },
      { name: 'Postman', logo: <SiPostman size={16} className={styles.bulletIcon} /> },
      { name: 'Vercel', logo: <SiVercel size={16} className={styles.bulletIcon} /> }
    ] 
  }
];

export default function Skills() {
  return (
    <section id="skills" className={styles.skills}>
      <div className="container">
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          My Toolbox
        </motion.h2>
        
        <motion.p
          style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem auto', color: 'var(--text-dark)', lineHeight: 1.6 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          I really like using TypeScript with Prisma to ensure Type-Safety from the Frontend down to the Database. It helps me sleep better at night knowing things won't randomly break.
        </motion.p>
        
        <div className={styles.marqueeContainer}>
          {/* Row 1: Frontend & Design */}
          <div className={styles.marqueeRow} style={{ '--duration': '35s' } as React.CSSProperties}>
            {[...SKILLS_DATA[0].items, ...SKILLS_DATA[0].items, ...SKILLS_DATA[0].items, ...SKILLS_DATA[0].items].map((skill, idx) => (
              <div key={`${skill.name}-${idx}`} className={styles.skillItem}>
                {skill.logo}
                {skill.name}
              </div>
            ))}
          </div>

          {/* Row 2: Backend & Tools (Reverse) */}
          <div className={`${styles.marqueeRow} ${styles.reverse}`} style={{ '--duration': '45s' } as React.CSSProperties}>
            {[...SKILLS_DATA[1].items, ...SKILLS_DATA[2].items, ...SKILLS_DATA[1].items, ...SKILLS_DATA[2].items, ...SKILLS_DATA[1].items, ...SKILLS_DATA[2].items].map((skill, idx) => (
              <div key={`${skill.name}-${idx}`} className={styles.skillItem}>
                {skill.logo}
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
