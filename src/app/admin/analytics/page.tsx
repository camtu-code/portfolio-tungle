'use client';

import { useEffect, useState, useCallback } from 'react';
import styles from '../Admin.module.css';
import analyticsStyles from './Analytics.module.css';

interface AnalyticsData {
  totalViews: number;
  uniqueVisitors: number;
  last7DaysViews: number;
  last24hViews: number;
  topPages: { path: string; views: number }[];
  viewsPerDay: { day: string; count: number }[];
}

function animateCount(from: number, to: number, setter: (v: number) => void) {
  const start = performance.now();
  const diff = to - from;
  const duration = 1200;
  function tick(now: number) {
    const elapsed = Math.min((now - start) / duration, 1);
    const eased = 1 - (1 - elapsed) ** 3;
    setter(Math.round(from + diff * eased));
    if (elapsed < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function StatCard({ label, value, icon, color }: { label: string; value: number; icon: string; color: string }) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    animateCount(0, value, setDisplayed);
  }, [value]);

  return (
    <div className={analyticsStyles.statCard} style={{ borderTopColor: color }}>
      <span className={analyticsStyles.statIcon}>{icon}</span>
      <p className={analyticsStyles.statValue} style={{ color }}>{displayed.toLocaleString()}</p>
      <p className={analyticsStyles.statLabel}>{label}</p>
    </div>
  );
}

function BarChart({ data }: { data: { day: string; count: number }[] }) {
  if (!data || data.length === 0) return (
    <div className={analyticsStyles.emptyChart}>No data yet — views will appear here as visitors arrive.</div>
  );

  const maxCount = Math.max(...data.map(d => d.count), 1);

  return (
    <div className={analyticsStyles.chart}>
      {data.map((d) => (
        <div key={d.day} className={analyticsStyles.barGroup}>
          <div className={analyticsStyles.barWrapper}>
            <div
              className={analyticsStyles.bar}
              style={{ height: `${(d.count / maxCount) * 100}%` }}
              title={`${d.count} views`}
            >
              <span className={analyticsStyles.barTooltip}>{d.count}</span>
            </div>
          </div>
          <span className={analyticsStyles.barLabel}>{d.day.slice(5)}</span>
        </div>
      ))}
    </div>
  );
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/analytics');
      const json = await res.json();
      setData(json);
      setLastUpdated(new Date());
    } catch {
      console.error('Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const runFetch = () => {
      void fetchData();
    };
    const startup = setTimeout(runFetch, 0);
    const interval = setInterval(runFetch, 15_000);
    return () => {
      clearTimeout(startup);
      clearInterval(interval);
    };
  }, [fetchData]);

  if (loading) {
    return (
      <div>
        <h1 className={styles.title}>Analytics</h1>
        <div className={analyticsStyles.loading}>Loading analytics data...</div>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Analytics</h1>
        <div className={analyticsStyles.liveIndicator}>
          <span className={analyticsStyles.liveDot}></span>
          Live · Updates every 15s
          {lastUpdated && <span className={analyticsStyles.lastUpdated}>· Last: {lastUpdated.toLocaleTimeString()}</span>}
        </div>
      </div>

      {/* Stats Grid */}
      <div className={analyticsStyles.statsGrid}>
        <StatCard label="Total Views" value={data?.totalViews ?? 0} icon="👁️" color="#0066cc" />
        <StatCard label="Unique Visitors" value={data?.uniqueVisitors ?? 0} icon="👤" color="#7c3aed" />
        <StatCard label="Last 24 Hours" value={data?.last24hViews ?? 0} icon="⏰" color="#059669" />
        <StatCard label="Last 7 Days" value={data?.last7DaysViews ?? 0} icon="📅" color="#d97706" />
      </div>

      {/* Views Per Day Chart */}
      <div className={analyticsStyles.section}>
        <h2 className={analyticsStyles.sectionTitle}>Views Per Day (Last 30 Days)</h2>
        <div className={analyticsStyles.chartContainer}>
          <BarChart data={data?.viewsPerDay ?? []} />
        </div>
      </div>

      {/* Top Pages */}
      <div className={analyticsStyles.section}>
        <h2 className={analyticsStyles.sectionTitle}>Top Pages</h2>
        <div className={analyticsStyles.tableContainer}>
          {(data?.topPages ?? []).length === 0 ? (
            <div className={analyticsStyles.emptyChart}>No page data yet.</div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Path</th>
                  <th>Views</th>
                  <th>Share</th>
                </tr>
              </thead>
              <tbody>
                {data?.topPages.map((page, i) => {
                  const pct = data.totalViews > 0 ? Math.round((page.views / data.totalViews) * 100) : 0;
                  return (
                    <tr key={page.path}>
                      <td style={{ color: '#999', fontWeight: 600 }}>{i + 1}</td>
                      <td style={{ fontFamily: 'monospace', fontWeight: 500 }}>{page.path}</td>
                      <td style={{ fontWeight: 700, color: '#0066cc' }}>{page.views.toLocaleString()}</td>
                      <td>
                        <div className={analyticsStyles.progressBar}>
                          <div className={analyticsStyles.progressFill} style={{ width: `${pct}%` }}></div>
                          <span className={analyticsStyles.progressLabel}>{pct}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
