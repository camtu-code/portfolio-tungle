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

function getState(): VisitorFallbackState {
  if (!globalThis.__visitorFallbackState) {
    globalThis.__visitorFallbackState = { events: [] };
  }
  return globalThis.__visitorFallbackState;
}

export function trackFallbackVisit(path: string, ip: string) {
  const state = getState();
  const now = new Date();

  const exists = state.events.find((e) => e.path === path && e.ip === ip);

  if (!exists) {
    state.events.push({ path, ip, createdAt: now });
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
