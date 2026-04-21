'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import styles from './Testimonials.module.css';

interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  message: string;
  rating: number;
  createdAt: Date;
}

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className={styles.stars}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={14}
          fill={s <= rating ? '#C19A6B' : 'none'}
          stroke={s <= rating ? '#C19A6B' : '#ddd'}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function TestimonialsClient({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section id="testimonials" className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.sectionTitle}>What People Say</h2>
          <p className={styles.subtitle}>Testimonials from colleagues and collaborators</p>
        </motion.div>

        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              className={`${styles.card} glass`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <Quote size={24} className={styles.quoteIcon} />
              <p className={styles.message}>&ldquo;{t.message}&rdquo;</p>
              <div className={styles.footer}>
                <div className={styles.avatar}>{getInitials(t.name)}</div>
                <div className={styles.authorInfo}>
                  <p className={styles.authorName}>{t.name}</p>
                  {(t.role || t.company) && (
                    <p className={styles.authorMeta}>
                      {[t.role, t.company].filter(Boolean).join(' @ ')}
                    </p>
                  )}
                  <StarDisplay rating={t.rating} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
