import crypto from 'crypto';
import net from 'net';
import type { NextRequest } from 'next/server';

const IP_HEADERS = [
  'x-forwarded-for',
  'x-vercel-forwarded-for',
  'cf-connecting-ip',
  'fly-client-ip',
  'fastly-client-ip',
  'true-client-ip',
  'x-real-ip',
  'x-client-ip',
];

function normalizeIp(candidate: string): string | null {
  let value = candidate.trim();
  if (!value) return null;

  if (value.startsWith('::ffff:')) {
    value = value.slice('::ffff:'.length);
  }

  if (value.includes('.') && value.includes(':')) {
    const [host] = value.split(':');
    value = host;
  }

  return net.isIP(value) ? value : null;
}

function getForwardedIp(headerValue: string | null): string | null {
  if (!headerValue) return null;
  const parts = headerValue.split(',').map((v) => v.trim()).filter(Boolean);
  for (const part of parts) {
    const ip = normalizeIp(part);
    if (ip) return ip;
  }
  return null;
}

export function getClientIdentity(request: NextRequest): {
  visitorKey: string;
  ip: string;
  newVisitorCookie?: string;
} {
  for (const header of IP_HEADERS) {
    const ip = getForwardedIp(request.headers.get(header));
    if (ip) {
      return { visitorKey: `ip:${ip}`, ip };
    }
  }

  const cookieValue = request.cookies.get('visitor_id')?.value;
  if (cookieValue) {
    return { visitorKey: `vid:${cookieValue}`, ip: `vid:${cookieValue}` };
  }

  const visitorId = crypto.randomUUID();
  return {
    visitorKey: `vid:${visitorId}`,
    ip: `vid:${visitorId}`,
    newVisitorCookie: visitorId,
  };
}
