import { prisma } from '@/lib/prisma';
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
  try {
    const body = await request.json();
    const path = body.path as string;

    if (!path) return NextResponse.json({ error: 'Missing path' }, { status: 400 });

    // Skip admin routes and API routes
    if (path.startsWith('/admin') || path.startsWith('/api') || path.startsWith('/login')) {
      return NextResponse.json({ ok: true, skipped: true });
    }

    const ip = getClientIP(request);
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
  } catch (error) {
    console.error('[track] error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
