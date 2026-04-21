import { prisma } from '@/lib/prisma';
import { trackFallbackVisit } from '@/lib/visitorFallbackStore';
import { NextRequest, NextResponse } from 'next/server';

// Deduplicate: 1 IP per path per hour
function getStartOfHour() {
  const d = new Date();
  d.setMinutes(0, 0, 0);
  return d;
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({} as { path?: string }));
  const path = body.path as string;

  if (!path) return NextResponse.json({ error: 'Missing path' }, { status: 400 });

  // Skip admin routes and API routes
  if (path.startsWith('/admin') || path.startsWith('/api') || path.startsWith('/login')) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const ip = getClientIP(request);

  try {
    const userAgent = request.headers.get('user-agent') ?? undefined;
    const hourStart = getStartOfHour();

    // Dedup: has this IP visited this path in the last hour?
    const existing = await prisma.pageView.findFirst({
      where: {
        ip,
        path,
        createdAt: { gte: hourStart },
      },
    });

    if (!existing) {
      await prisma.pageView.create({
        data: { path, ip, userAgent },
      });
    }

    // Return current count for the path
    const count = await prisma.pageView.count({ where: { path } });
    const totalCount = await prisma.pageView.count();

    return NextResponse.json({ ok: true, count, totalCount });
  } catch {
    const fallback = trackFallbackVisit(path, ip);
    console.error('[track] fallback mode due to DB error');
    return NextResponse.json({ ok: true, ...fallback, fallback: true });
  }
}
