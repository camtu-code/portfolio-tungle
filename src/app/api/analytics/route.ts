import { prisma } from '@/lib/prisma';
import { getFallbackAnalytics } from '@/lib/visitorFallbackStore';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const now = new Date();
    const last7Days = new Date(now);
    last7Days.setDate(last7Days.getDate() - 7);
    const last30Days = new Date(now);
    last30Days.setDate(last30Days.getDate() - 30);
    const yesterday = new Date(now);
    yesterday.setHours(yesterday.getHours() - 24);

    // Total views
    const totalViews = await prisma.pageView.count();

    // Unique visitors (unique IPs)
    const allIPs = await prisma.pageView.findMany({ select: { ip: true }, distinct: ['ip'] });
    const uniqueVisitors = allIPs.length;
    const totalVisitors = uniqueVisitors;

    // Views in last 7 days
    const last7DaysViews = await prisma.pageView.count({
      where: { createdAt: { gte: last7Days } },
    });

    // Views in last 24 hours
    const last24hViews = await prisma.pageView.count({
      where: { createdAt: { gte: yesterday } },
    });

    // Top pages
    const allViews = await prisma.pageView.findMany({ select: { path: true } });
    const pageCounts: Record<string, number> = {};
    for (const v of allViews) {
      pageCounts[v.path] = (pageCounts[v.path] ?? 0) + 1;
    }
    const topPages = Object.entries(pageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([path, views]) => ({ path, views }));

    // Views per day for last 30 days
    const recentViews = await prisma.pageView.findMany({
      where: { createdAt: { gte: last30Days } },
      select: { createdAt: true },
      orderBy: { createdAt: 'asc' },
    });

    const dayCounts: Record<string, number> = {};
    for (const v of recentViews) {
      const day = v.createdAt.toISOString().slice(0, 10);
      dayCounts[day] = (dayCounts[day] ?? 0) + 1;
    }
    const viewsPerDay = Object.entries(dayCounts).map(([day, count]) => ({ day, count }));

    return NextResponse.json(
      {
        totalViews,
        uniqueVisitors,
        totalVisitors,
        last7DaysViews,
        last24hViews,
        topPages,
        viewsPerDay,
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
        },
      }
    );
  } catch {
    const fallback = getFallbackAnalytics();
    console.error('[analytics] fallback mode due to DB error');
    return NextResponse.json(
      { ...fallback, fallback: true },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
        },
      }
    );
  }
}
