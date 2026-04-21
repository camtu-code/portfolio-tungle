'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';

export async function submitTestimonial(formData: FormData) {
  const name = formData.get('name') as string;
  const role = formData.get('role') as string;
  const company = formData.get('company') as string;
  const message = formData.get('message') as string;
  const ratingStr = formData.get('rating') as string;
  const rating = parseInt(ratingStr, 10) || 5;

  if (!name || !message) {
    return { success: false, error: 'Name and message are required.' };
  }

  await prisma.testimonial.create({
    data: {
      name,
      role: role || null,
      company: company || null,
      message,
      rating,
      status: 'PENDING',
    },
  });

  return { success: true };
}

export async function approveTestimonial(id: string) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  await prisma.testimonial.update({
    where: { id },
    data: { status: 'APPROVED' },
  });

  revalidatePath('/');
  revalidatePath('/admin/testimonials');
}

export async function rejectTestimonial(id: string) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  await prisma.testimonial.update({
    where: { id },
    data: { status: 'REJECTED' },
  });

  revalidatePath('/admin/testimonials');
}

export async function deleteTestimonial(id: string) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  await prisma.testimonial.delete({ where: { id } });

  revalidatePath('/');
  revalidatePath('/admin/testimonials');
}
