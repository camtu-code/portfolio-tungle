'use client';

import { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';

interface ViewCounterProps {
  label?: string;
  icon?: React.ReactNode;
  refreshInterval?: number;
}

export default function ViewCounter({ label = 'Views', icon, refreshInterval = 30000 }: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const res = await fetch('/api/analytics/views');
        if (!res.ok) return;
        const data = await res.json();
        setViews(data.views);
      } catch (e) {
        // Silently fail
      }
    };

    fetchViews();
    const interval = setInterval(fetchViews, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  if (views === null) return null;

  return (
    <div className="flex items-center gap-2">
      {icon ? <span className="text-zinc-400 dark:text-zinc-500">{icon}</span> : <Eye size={16} className="text-zinc-400 dark:text-zinc-500" />}
      <span>{views.toLocaleString()}</span>
    </div>
  );
}
