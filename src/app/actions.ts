'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';

export async function submitContactMessage(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !message) {
      return { success: false, error: 'Missing fields' };
    }

    await prisma.contactMessage.create({
      data: {
        name,
        email,
        message,
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error submitting contact message:', error);
    return { success: false, error: 'Internal server error' };
  }
}

export async function deleteContactMessage(id: string) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  await prisma.contactMessage.delete({ where: { id } });

  revalidatePath('/admin/messages');
}
