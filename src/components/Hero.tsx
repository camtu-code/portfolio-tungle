'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { SiNextdotjs, SiTypescript, SiPrisma, SiPostgresql, SiMongodb } from 'react-icons/si';
import { FaReact, FaNodeJs, FaDocker, FaGitAlt } from 'react-icons/fa';
import styles from './Hero.module.css';
import ViewCounter from './ViewCounter';
import DownloadResumeBtn from './DownloadResumeBtn';
import dynamic from 'next/dynamic';

const TypewriterText = dynamic(() => import('./TypewriterText'), {
  ssr: false, 
  loading: () => <span style={{ color: 'var(--primary)' }}>Designer</span>
});

const getCoordinates = (angleInDegrees: number) => {
  const rad = (angleInDegrees * Math.PI) / 180;
  return {
    left: `calc(50% + ${Math.cos(rad) * 50}%)`,
    top: `calc(50% + ${Math.sin(rad) * 50}%)`
  };
};

const ring1Planets = [
  { icon: <SiNextdotjs size={24} color="#000" />, angle: 0 },
  { icon: <FaReact size={24} color="#61DAFB" />, angle: 90 },
  { icon: <FaNodeJs size={24} color="#339933" />, angle: 180 },
  { icon: <SiTypescript size={24} color="#3178C6" />, angle: 270 },
];

const ring2Planets = [
  { icon: <SiPrisma size={24} color="#2D3748" />, angle: -90 },
  { icon: <SiPostgresql size={24} color="#336791" />, angle: -18 },
  { icon: <FaDocker size={24} color="#2496ED" />, angle: 54 },
  { icon: <FaGitAlt size={24} color="#F05032" />, angle: 126 },
  { icon: <SiMongodb size={24} color="#47A248" />, angle: 198 },
];

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.content} suppressHydrationWarning>
          <motion.div 
            className={styles.textContent}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            suppressHydrationWarning
          >
            <div className={styles.statusBadge}>
              <span className={styles.statusDot}></span> Available for new opportunities
            </div>

            <h2 className={styles.greeting}>Hi there, I&apos;m Tung Le 👋</h2>
            <h1 className={styles.name}>
              A CS student who loves coding.<br/>
              <span className={styles.highlight}>Building things from scratch.</span>
            </h1>
            
            <h3 className={styles.typewriterSubtitle} suppressHydrationWarning>
              Also a <TypewriterText words={['Curious Learner', 'Problem Solver', 'Tech Enthusiast', 'Trainee']} />
            </h3>
            
            <p className={styles.description}>
              I enjoy playing around with Next.js and Node.js to build actual working web apps. My goal is to become a solid Software Engineer with good system design skills, not just someone who writes code.
            </p>

            <div className={styles.statsRow}>
              <div className={styles.statItem}>
                <strong>3+</strong>
                <span>Years Exp.</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <strong>10+</strong>
                <span>Projects</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <strong>100%</strong>
                <span>Dedication</span>
              </div>
            </div>

            <div className={styles.ctaGroup}>
              <a href="#projects" className={styles.primaryBtn}>
                View Projects <ArrowRight size={18} />
              </a>
              <a href="#contact" className={styles.secondaryBtn}>
                Contact Me <Mail size={18} />
              </a>
            </div>
            <div className={styles.utilsGroup}>
              <DownloadResumeBtn />
              <ViewCounter label="Total Visitors" icon="👁️" refreshInterval={30000} />
            </div>
          </motion.div>
          
          <motion.div 
            className={styles.imageWrapper}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, type: "spring", bounce: 0.4, delay: 0.2 }}
          >
            {/* Ambient Light Orbs */}
            <div className={styles.lightOrb1}></div>
            <div className={styles.lightOrb2}></div>

            {/* Orbit System */}
            <div className={styles.orbitSystem}>
              <div className={styles.orbitRing2}>
                {ring2Planets.map((p, i) => (
                  <div key={i} className={`${styles.planet} ${styles.planetReverse}`} style={getCoordinates(p.angle)}>
                    {p.icon}
                  </div>
                ))}
              </div>

              <div className={styles.orbitRing1}>
                {ring1Planets.map((p, i) => (
                  <div key={i} className={`${styles.planet} ${styles.planetForward}`} style={getCoordinates(p.angle)}>
                    {p.icon}
                  </div>
                ))}
              </div>

              {/* Sun (Avatar) */}
              <div className={styles.photoContainer}>
                <img src="/api/avatar" alt="Avatar" className={styles.avatarImg} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
