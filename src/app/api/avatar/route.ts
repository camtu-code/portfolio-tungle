import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const LOCAL_AVATAR = path.join(process.cwd(), 'public', 'avatar.jpg');
const TMP_AVATAR = path.join('/tmp', 'avatar.jpg');

async function readAvatarBuffer() {
  try {
    return await fs.readFile(TMP_AVATAR);
  } catch {
    return await fs.readFile(LOCAL_AVATAR);
  }
}

export async function GET() {
  try {
    const buffer = await readAvatarBuffer();
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Error reading avatar:', error);
    return NextResponse.json({ error: 'Avatar not found.' }, { status: 404 });
  }
}
