import fs from 'fs';
import path from 'path';

type VisitorEvent = {
  path: string;
  ip: string;
  createdAt: Date;
};

type VisitorFallbackState = {
  events: VisitorEvent[];
};

declare global {
  var __visitorFallbackState: VisitorFallbackState | undefined;
}

const FALLBACK_DIR = path.join(process.cwd(), '.data');
const FALLBACK_FILE = path.join(FALLBACK_DIR, 'visitor-fallback.json');

function loadStateFromDisk(): VisitorFallbackState {
  try {
    if (!fs.existsSync(FALLBACK_FILE)) return { events: [] };
    const raw = fs.readFileSync(FALLBACK_FILE, 'utf8');
    const parsed = JSON.parse(raw) as { events?: Array<{ path: string; ip: string; createdAt: string }> };
    if (!Array.isArray(parsed.events)) return { events: [] };
    return {
      events: parsed.events
        .filter((e) => typeof e?.path === 'string' && typeof e?.ip === 'string' && typeof e?.createdAt === 'string')
        .map((e) => ({ path: e.path, ip: e.ip, createdAt: new Date(e.createdAt) }))
        .filter((e) => !Number.isNaN(e.createdAt.getTime())),
    };
  } catch {
    return { events: [] };
  }
}

function persistStateToDisk(state: VisitorFallbackState) {
  try {
    if (!fs.existsSync(FALLBACK_DIR)) fs.mkdirSync(FALLBACK_DIR, { recursive: true });
    fs.writeFileSync(
      FALLBACK_FILE,
      JSON.stringify(
        {
          events: state.events.map((e) => ({
            path: e.path,
            ip: e.ip,
            createdAt: e.createdAt.toISOString(),
          })),
        },
        null,
        2
      ),
      'utf8'
    );
  } catch {
    // best-effort persistence
  }
}

function getState(): VisitorFallbackState {
  if (!globalThis.__visitorFallbackState) {
    globalThis.__visitorFallbackState = loadStateFromDisk();
  }
  return globalThis.__visitorFallbackState;
}

export function trackFallbackVisit(path: string, ip: string) {
  const state = getState();
  const now = new Date();

  const exists = state.events.find((e) => e.path === path && e.ip === ip);

  if (!exists) {
    state.events.push({ path, ip, createdAt: now });
    persistStateToDisk(state);
  }

  const uniqueVisitors = new Set(state.events.map((e) => e.ip)).size;
  const count = new Set(state.events.filter((e) => e.path === path).map((e) => e.ip)).size;

  return {
    count,
    totalCount: uniqueVisitors,
    totalVisitors: uniqueVisitors,
  };
}

export function getFallbackAnalytics() {
  const state = getState();
  const now = new Date();
  const last7Days = new Date(now);
  last7Days.setDate(last7Days.getDate() - 7);
  const last30Days = new Date(now);
  last30Days.setDate(last30Days.getDate() - 30);
  const last24h = new Date(now);
  last24h.setHours(last24h.getHours() - 24);

  const totalViews = state.events.length;
  const uniqueVisitors = new Set(state.events.map((e) => e.ip)).size;
  const totalVisitors = uniqueVisitors;
  const last7DaysViews = state.events.filter((e) => e.createdAt >= last7Days).length;
  const last24hViews = state.events.filter((e) => e.createdAt >= last24h).length;

  const pageCounts: Record<string, number> = {};
  for (const e of state.events) {
    pageCounts[e.path] = (pageCounts[e.path] ?? 0) + 1;
  }
  const topPages = Object.entries(pageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([path, views]) => ({ path, views }));

  const dayCounts: Record<string, number> = {};
  for (const e of state.events) {
    if (e.createdAt < last30Days) continue;
    const day = e.createdAt.toISOString().slice(0, 10);
    dayCounts[day] = (dayCounts[day] ?? 0) + 1;
  }
  const viewsPerDay = Object.entries(dayCounts).map(([day, count]) => ({ day, count }));

  return { totalViews, uniqueVisitors, totalVisitors, last7DaysViews, last24hViews, topPages, viewsPerDay };
}
