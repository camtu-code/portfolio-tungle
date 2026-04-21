'use client';

import React, { useState, useEffect } from 'react';
import styles from './Hero.module.css';

export default function TypewriterText({ words }: { words: string[] }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState(words[0] || '');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (isDeleting) {
      timeout = setTimeout(() => {
        setCurrentText(words[currentWordIndex].substring(0, currentText.length - 1));
        if (currentText.length <= 1) {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }, 50);
    } else {
      if (currentText === words[currentWordIndex]) {
        timeout = setTimeout(() => setIsDeleting(true), 2500); // Wait before deleting
      } else {
        timeout = setTimeout(() => {
          setCurrentText(words[currentWordIndex].substring(0, currentText.length + 1));
        }, 100);
      }
    }
    
    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <span className={styles.typewriter}>
      {currentText || '\u00A0'}
      <span className={styles.cursor}>|</span>
    </span>
  );
}
