import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// A simple in-memory rate limiter (Note: In a serverless/edge environment this will reset frequently,
// but it is sufficient for basic protection on a small portfolio site without Redis).
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 100; // 100 requests per minute

export async function proxy(request: NextRequest) {
  // 1. Rate Limiting Logic
  const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? '127.0.0.1';
  const now = Date.now();
  
  const rateLimitInfo = rateLimitMap.get(ip);
  if (!rateLimitInfo || now - rateLimitInfo.lastReset > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
  } else {
    rateLimitInfo.count++;
    if (rateLimitInfo.count > MAX_REQUESTS) {
      return new NextResponse(
        JSON.stringify({ error: 'Too many requests, please try again later.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }

  // 2. Route Protection Logic
  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith('/admin')) {
    // Check if the user is authenticated
    const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });
    
    // Allow access to /admin/login even if not authenticated
    if (!token && !pathname.startsWith('/admin/login') && !pathname.startsWith('/admin/api')) {
      const url = new URL('/login', request.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
