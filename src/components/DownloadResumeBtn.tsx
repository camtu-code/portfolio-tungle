'use client';

import { Lock } from 'lucide-react';
import styles from './DownloadResumeBtn.module.css';

export default function DownloadResumeBtn() {
  return (
    <button
      className={styles.btn}
      disabled={true}
      title="Tính năng tải CV tạm thời bị khoá để cập nhật."
      style={{ cursor: 'not-allowed', opacity: 0.7 }}
    >
      <span className={styles.icon}>
        <Lock size={16} />
      </span>
      <span className={styles.text}>
        CV Updating...
      </span>
    </button>
  );
}
