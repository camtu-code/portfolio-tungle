import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { auth } from '@/auth';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file received.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    // On Vercel, write to /tmp (writable). Locally we keep writing to /public.
    const filePath = process.env.VERCEL
      ? path.join('/tmp', 'avatar.jpg')
      : path.join(process.cwd(), 'public', 'avatar.jpg');
    
    await writeFile(filePath, buffer);
    console.log('Saved avatar to', filePath);

    return NextResponse.json({ success: true, message: 'Avatar updated successfully.' });
  } catch (error) {
    console.error('Error uploading avatar:', error);
    return NextResponse.json({ error: 'Failed to update avatar.' }, { status: 500 });
  }
}
