'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';

import { z } from 'zod';
import DOMPurify from 'isomorphic-dompurify';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  message: z.string().min(1, 'Message is required').max(5000),
});

export async function submitContactMessage(formData: FormData) {
  try {
    const rawData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    const validatedData = contactSchema.safeParse(rawData);

    if (!validatedData.success) {
      return { success: false, error: validatedData.error.issues[0].message };
    }

    const { name, email, message } = validatedData.data;
    
    // Sanitize user input to prevent XSS if rendered later
    const sanitizedName = DOMPurify.sanitize(name);
    const sanitizedMessage = DOMPurify.sanitize(message);

    await prisma.contactMessage.create({
      data: {
        name: sanitizedName,
        email, // Email is already validated by zod, no need to sanitize HTML
        message: sanitizedMessage,
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
