'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

interface PageViewTrackerProps {
  onCount?: (count: number, total: number) => void;
}

function animateCount(
  from: number,
  to: number,
  duration: number,
  setter: (v: number) => void
) {
  const start = performance.now();
  const diff = to - from;

  function tick(now: number) {
    const elapsed = Math.min((now - start) / duration, 1);
    // Ease-out quad
    const eased = 1 - (1 - elapsed) ** 3;
    setter(Math.round(from + diff * eased));
    if (elapsed < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

export default function PageViewTracker({ onCount }: PageViewTrackerProps) {
  const pathname = usePathname();
  const lastPath = useRef('');
  const prevTotal = useRef(0);
  const [, setDisplayTotal] = useState<number | null>(null);

  useEffect(() => {
    if (pathname === lastPath.current) return;
    lastPath.current = pathname;

    async function track() {
      try {
        const res = await fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ path: pathname }),
        });
        const data = await res.json();
        if (typeof data.totalCount === 'number') {
          const from = prevTotal.current;
          prevTotal.current = data.totalCount;
          animateCount(from, data.totalCount, 1200, setDisplayTotal);
          onCount?.(data.count, data.totalCount);
        }
      } catch {}
    }

    track();

    // Poll every 30 seconds to keep count fresh
    const interval = setInterval(track, 30_000);
    return () => clearInterval(interval);
  }, [pathname, onCount]);

  // This component is invisible – it just tracks
  return null;
}

export { animateCount };
