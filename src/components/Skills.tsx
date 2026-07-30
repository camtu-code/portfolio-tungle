'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Server, Database } from 'lucide-react';
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiPrisma, SiPostgresql, SiMongodb, SiPostman, SiVercel, SiSocketdotio, SiFramer, SiRender, SiNetlify } from 'react-icons/si';
import { FaReact, FaNodeJs, FaJava, FaGitAlt, FaDocker, FaPython } from 'react-icons/fa';
import { GrOracle } from 'react-icons/gr';
import styles from './Skills.module.css';

const SKILLS_DATA = [
  { 
    category: 'Frontend & UI', 
    icon: <Monitor size={24} />,
    items: [
      { name: 'Next.js', logo: <SiNextdotjs size={16} className={styles.bulletIcon} /> },
      { name: 'React', logo: <FaReact size={16} className={styles.bulletIcon} /> },
      { name: 'TypeScript', logo: <SiTypescript size={16} className={styles.bulletIcon} /> },
      { name: 'Tailwind CSS', logo: <SiTailwindcss size={16} className={styles.bulletIcon} /> },
      { name: 'Framer Motion', logo: <SiFramer size={16} className={styles.bulletIcon} /> }
    ] 
  },
  { 
    category: 'Backend & Database', 
    icon: <Server size={24} />,
    items: [
      { name: 'Node.js', logo: <FaNodeJs size={16} className={styles.bulletIcon} /> },
      { name: 'Python', logo: <FaPython size={16} className={styles.bulletIcon} /> },
      { name: 'Java', logo: <FaJava size={16} className={styles.bulletIcon} /> },
      { name: 'WebSockets', logo: <SiSocketdotio size={16} className={styles.bulletIcon} /> },
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
      { name: 'Vercel', logo: <SiVercel size={16} className={styles.bulletIcon} /> },
      { name: 'Render', logo: <SiRender size={16} className={styles.bulletIcon} /> },
      { name: 'Netlify', logo: <SiNetlify size={16} className={styles.bulletIcon} /> }
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
        
        <div className={styles.gridContainer}>
          {SKILLS_DATA.map((category, idx) => (
            <motion.div 
              key={category.category} 
              className={`${styles.categoryCard} glass`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className={styles.categoryHeader}>
                <div className={styles.categoryIcon}>{category.icon}</div>
                <h3 className={styles.categoryTitle}>{category.category}</h3>
              </div>
              <div className={styles.skillsList}>
                {category.items.map((skill) => (
                  <div key={skill.name} className={styles.skillBadge}>
                    {skill.logo}
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
