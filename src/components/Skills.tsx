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
          Tech Stack & Tools
        </motion.h2>
        
        <motion.p
          style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem auto', color: 'var(--text-dark)', lineHeight: 1.6 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Utilizing TypeScript and Prisma to ensure Type-Safety from Frontend to Database, focusing on maintainable and scalable systems.
        </motion.p>
        
        <div className={styles.grid}>
          {SKILLS_DATA.map((group, idx) => (
            <motion.div 
              key={group.category} 
              className={`${styles.skillGroup} glass`}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.2, type: "spring", bounce: 0.4 }}
            >
              <h3 className={styles.categoryTitle}>
                <span className={styles.categoryIcon}>{group.icon}</span>
                {group.category}
              </h3>
              <ul className={styles.skillList}>
                {group.items.map((skill, skillIdx) => (
                  <motion.li 
                    key={skill.name} 
                    className={styles.skillItem}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (idx * 0.2) + (skillIdx * 0.1) }}
                  >
                    {skill.logo}
                    {skill.name}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
