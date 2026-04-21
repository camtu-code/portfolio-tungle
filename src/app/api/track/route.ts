import { prisma } from '@/lib/prisma';
import { getClientIdentity } from '@/lib/clientIdentity';
import { trackFallbackVisit } from '@/lib/visitorFallbackStore';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({} as { path?: string }));
  const path = body.path as string;

  if (!path) return NextResponse.json({ error: 'Missing path' }, { status: 400 });

  // Skip admin routes and API routes
  if (path.startsWith('/admin') || path.startsWith('/api') || path.startsWith('/login')) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const identity = getClientIdentity(request);

  try {
    const userAgent = request.headers.get('user-agent') ?? undefined;

    // Deduplicate by visitor and path, persisted in DB.
    const existing = await prisma.pageView.findFirst({
      where: {
        ip: identity.visitorKey,
        path,
      },
    });

    if (!existing) {
      await prisma.pageView.create({
        data: { path, ip: identity.visitorKey, userAgent },
      });
    }

    // Unique visitors per path and globally.
    const pathVisitors = await prisma.pageView.findMany({
      where: { path },
      select: { ip: true },
      distinct: ['ip'],
    });
    const allVisitors = await prisma.pageView.findMany({
      select: { ip: true },
      distinct: ['ip'],
    });

    const count = pathVisitors.length;
    const totalVisitors = allVisitors.length;

    const response = NextResponse.json({
      ok: true,
      count,
      totalCount: totalVisitors,
      totalVisitors,
    });
    if (identity.newVisitorCookie) {
      response.cookies.set('visitor_id', identity.newVisitorCookie, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 365,
        path: '/',
      });
    }
    return response;

  } catch {
    const fallback = trackFallbackVisit(path, identity.visitorKey);
    console.error('[track] fallback mode due to DB error');
    const response = NextResponse.json({ ok: true, ...fallback, fallback: true });
    if (identity.newVisitorCookie) {
      response.cookies.set('visitor_id', identity.newVisitorCookie, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 365,
        path: '/',
      });
    }
    return response;
  }
}
