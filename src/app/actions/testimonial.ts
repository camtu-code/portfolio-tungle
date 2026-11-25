'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';

const VALID_INVITE_CODE = (process.env.TESTIMONIAL_INVITE_CODE || 'TUNGLE-2026').trim().toUpperCase();

export async function submitTestimonial(formData: FormData) {
  const honeypot = (formData.get('website') as string) || '';
  if (honeypot.trim() !== '') {
    return { success: false, error: 'Spam detected.' };
  }

  const inviteCode = ((formData.get('inviteCode') as string) || '').trim().toUpperCase();
  if (!inviteCode || inviteCode !== VALID_INVITE_CODE) {
    return {
      success: false,
      error: 'Mã mời không hợp lệ. Vui lòng dùng mã Tùng gửi riêng (hoặc liên hệ qua Send Message).',
    };
  }

  const name = ((formData.get('name') as string) || '').trim();
  const role = ((formData.get('role') as string) || '').trim();
  const product = ((formData.get('product') as string) || '').trim();
  const company = ((formData.get('company') as string) || '').trim();
  const message = ((formData.get('message') as string) || '').trim();
  const ratingStr = formData.get('rating') as string;
  const rating = Math.min(5, Math.max(1, parseInt(ratingStr, 10) || 5));

  if (!name || !message) {
    return { success: false, error: 'Vui lòng nhập tên và nội dung nhận xét.' };
  }

  if (message.length < 20) {
    return { success: false, error: 'Nhận xét hơi ngắn, vui lòng chia sẻ cụ thể hơn (tối thiểu 20 ký tự).' };
  }

  const verifiedContext = [product, company].filter(Boolean).join(' · ');

  await prisma.testimonial.create({
    data: {
      name,
      role: role || null,
      company: verifiedContext || null,
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
