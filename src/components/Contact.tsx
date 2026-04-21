'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, MessageSquareHeart, Star } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { submitContactMessage } from '../app/actions';
import { submitTestimonial } from '../app/actions/testimonial';
import styles from './Contact.module.css';

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className={styles.starRow}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={styles.starBtn}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(star)}
          aria-label={`Rate ${star} stars`}
        >
          <Star
            size={24}
            fill={(hovered || value) >= star ? '#C19A6B' : 'none'}
            stroke={(hovered || value) >= star ? '#C19A6B' : '#ccc'}
            strokeWidth={1.5}
          />
        </button>
      ))}
      <span className={styles.starLabel}>{value}/5</span>
    </div>
  );
}

export default function Contact() {
  const [tab, setTab] = useState<'contact' | 'guestbook'>('contact');
  const [contactStatus, setContactStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [guestStatus, setGuestStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [rating, setRating] = useState(5);
  const contactFormRef = React.useRef<HTMLFormElement>(null);
  const guestFormRef = React.useRef<HTMLFormElement>(null);

  async function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setContactStatus('loading');
    const formData = new FormData(e.currentTarget);
    const res = await submitContactMessage(formData);
    if (res.success) {
      setContactStatus('success');
      contactFormRef.current?.reset();
    } else {
      setContactStatus('error');
    }
  }

  async function handleGuestSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setGuestStatus('loading');
    const formData = new FormData(e.currentTarget);
    formData.set('rating', String(rating));
    const res = await submitTestimonial(formData);
    if (res.success) {
      setGuestStatus('success');
      guestFormRef.current?.reset();
      setRating(5);
    } else {
      setGuestStatus('error');
    }
  }

  return (
    <section id="contact" className={styles.contact}>
      <div className="container">
        <motion.h2
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          Get In Touch
        </motion.h2>

        <div className={styles.contactContent}>
          {/* Left: info */}
          <motion.div
            className={styles.contactInfo}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, type: 'spring', bounce: 0.3 }}
          >
            <h3 style={{ lineHeight: 1.4 }}>Looking for a passionate addition to your team?</h3>
            <p>
              I&apos;m currently open for new opportunities. Whether you have a question, a project in mind, or just want to say hi — I&apos;ll get back to you!
            </p>
            <p className={styles.guestbookHint}>
              💬 If you find my portfolio impressive, feel free to leave a testimonial — I&apos;d love to feature it here!
            </p>
            <div className={styles.links}>
              <a href="mailto:hello@example.com" className={styles.link}>
                <Mail className={styles.icon} /> hello@example.com
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
                <FaLinkedin className={styles.icon} /> LinkedIn
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
                <FaGithub className={styles.icon} /> GitHub
              </a>
            </div>
          </motion.div>

          {/* Right: tabbed form */}
          <motion.div
            className={`${styles.formWrapper} glass`}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, type: 'spring', bounce: 0.3, delay: 0.2 }}
          >
            {/* Tabs */}
            <div className={styles.tabs}>
              <button
                className={`${styles.tabBtn} ${tab === 'contact' ? styles.tabActive : ''}`}
                onClick={() => setTab('contact')}
              >
                <Send size={15} /> Send Message
              </button>
              <button
                className={`${styles.tabBtn} ${tab === 'guestbook' ? styles.tabActive : ''}`}
                onClick={() => setTab('guestbook')}
              >
                <MessageSquareHeart size={15} /> Leave Testimonial
              </button>
            </div>

            <AnimatePresence mode="wait">
              {tab === 'contact' ? (
                <motion.form
                  key="contact"
                  ref={contactFormRef}
                  className={styles.form}
                  onSubmit={handleContactSubmit}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={styles.formGroup}>
                    <label htmlFor="c-name">Name</label>
                    <input type="text" id="c-name" name="name" required placeholder="John Doe" />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="c-email">Email</label>
                    <input type="email" id="c-email" name="email" required placeholder="john@example.com" />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="c-message">Message</label>
                    <textarea id="c-message" name="message" required rows={4} placeholder="Hello Tung, I'd like to discuss..." />
                  </div>
                  <button type="submit" className={styles.submitBtn} disabled={contactStatus === 'loading'}>
                    {contactStatus === 'loading' ? 'Sending...' : (<>Send Message <Send size={16} /></>)}
                  </button>
                  {contactStatus === 'success' && <p className={styles.successMessage}>✅ Message sent! I&apos;ll reply soon.</p>}
                  {contactStatus === 'error' && <p className={styles.errorMessage}>❌ Something went wrong. Please try again.</p>}
                </motion.form>
              ) : (
                <motion.form
                  key="guestbook"
                  ref={guestFormRef}
                  className={styles.form}
                  onSubmit={handleGuestSubmit}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="g-name">Your Name *</label>
                      <input type="text" id="g-name" name="name" required placeholder="Jane Smith" />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="g-role">Role / Title</label>
                      <input type="text" id="g-role" name="role" placeholder="HR Manager" />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="g-company">Company</label>
                    <input type="text" id="g-company" name="company" placeholder="Acme Corp" />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="g-message">Your Testimonial *</label>
                    <textarea
                      id="g-message"
                      name="message"
                      required
                      rows={4}
                      placeholder="Tung is an exceptional developer who..."
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Rating</label>
                    <StarRating value={rating} onChange={setRating} />
                  </div>
                  <button type="submit" className={styles.submitBtn} disabled={guestStatus === 'loading'}>
                    {guestStatus === 'loading' ? 'Submitting...' : (<><MessageSquareHeart size={16} /> Submit Testimonial</>)}
                  </button>
                  {guestStatus === 'success' && (
                    <p className={styles.successMessage}>
                      🎉 Thank you! Your testimonial is pending review and will appear here soon.
                    </p>
                  )}
                  {guestStatus === 'error' && <p className={styles.errorMessage}>❌ Something went wrong. Please try again.</p>}
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
