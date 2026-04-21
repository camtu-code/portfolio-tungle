'use client';

import { useState } from 'react';
import { Download, CheckCircle, Loader2 } from 'lucide-react';
import styles from './DownloadResumeBtn.module.css';

export default function DownloadResumeBtn() {
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle');

  async function handleDownload() {
    if (state === 'loading') return;
    setState('loading');

    try {
      const res = await fetch('/api/resume');
      if (!res.ok) throw new Error('Failed');

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'TungLe-Resume.pdf';
      a.click();
      URL.revokeObjectURL(url);

      setState('done');
      setTimeout(() => setState('idle'), 3000);
    } catch {
      setState('idle');
    }
  }

  return (
    <button
      className={`${styles.btn} ${state === 'done' ? styles.done : ''}`}
      onClick={handleDownload}
      disabled={state === 'loading'}
      aria-label="Download Resume PDF"
    >
      <span className={styles.icon}>
        {state === 'idle' && <Download size={16} />}
        {state === 'loading' && <Loader2 size={16} className={styles.spin} />}
        {state === 'done' && <CheckCircle size={16} />}
      </span>
      <span className={styles.text}>
        {state === 'idle' && 'Download Resume'}
        {state === 'loading' && 'Generating PDF...'}
        {state === 'done' && 'Downloaded!'}
      </span>
      {state === 'idle' && <span className={styles.ripple} />}
    </button>
  );
}
