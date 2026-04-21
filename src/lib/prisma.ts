import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

function resolveSqlitePath(databaseUrl: string): string | null {
  if (!databaseUrl.startsWith('file:')) return null;
  const rawPath = databaseUrl.slice('file:'.length);
  if (!rawPath) return null;
  return path.isAbsolute(rawPath)
    ? rawPath
    : path.resolve(/*turbopackIgnore: true*/ process.cwd(), rawPath);
}

function ensureSqliteDatabaseFile() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) return;
  const dbPath = resolveSqlitePath(dbUrl);
  if (!dbPath || fs.existsSync(dbPath)) return;

  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  const seedCandidates = [
    path.join(/*turbopackIgnore: true*/ process.cwd(), 'prisma', 'dev.db'),
  ];
  const seedPath = seedCandidates.find((candidate) => fs.existsSync(candidate));
  if (seedPath && seedPath !== dbPath) {
    fs.copyFileSync(seedPath, dbPath);
  }
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

ensureSqliteDatabaseFile();

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ log: ['error'] });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
