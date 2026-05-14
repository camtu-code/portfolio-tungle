'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ViewCounter.module.css';

interface ViewCounterProps {
  initialCount?: number;
  label?: string;
  icon?: string;
  refreshInterval?: number; // ms
  apiPath?: string; // if set, polls this endpoint for { totalCount }
}

function animateCount(from: number, to: number, duration: number, setter: (v: number) => void) {
  const start = performance.now();
  const diff = to - from;
  function tick(now: number) {
    const elapsed = Math.min((now - start) / duration, 1);
    const eased = 1 - (1 - elapsed) ** 3;
    setter(Math.round(from + diff * eased));
    if (elapsed < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

export default function ViewCounter({
  initialCount = 0,
  label = 'Total Visitors',
  icon = '👁️',
  refreshInterval = 30_000,
  apiPath = '/api/analytics',
}: ViewCounterProps) {
  const [count, setCount] = useState(initialCount);
  const prevCount = useRef(initialCount);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    async function refresh() {
      try {
        const res = await fetch(`${apiPath}?t=${Date.now()}`, { cache: 'no-store' });
        const data = await res.json();
        const newTotal = data.totalVisitors ?? data.uniqueVisitors ?? data.totalViews ?? 0;
        if (newTotal !== prevCount.current) {
          setIsNew(true);
          animateCount(prevCount.current, newTotal, 1500, setCount);
          prevCount.current = newTotal;
          setTimeout(() => setIsNew(false), 2000);
        }
      } catch {}
    }

    refresh();
    const interval = setInterval(refresh, refreshInterval);
    return () => clearInterval(interval);
  }, [apiPath, refreshInterval]);

  return (
    <div className={`${styles.counter} ${isNew ? styles.pulse : ''}`}>
      <span className={styles.icon}>{icon}</span>
      <span className={styles.count}>{count.toLocaleString()}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
