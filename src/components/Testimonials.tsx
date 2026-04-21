import { prisma } from '@/lib/prisma';
import TestimonialsClient from './TestimonialsClient';

export default async function Testimonials() {
  const testimonials = await prisma.testimonial.findMany({
    where: { status: 'APPROVED' },
    orderBy: { createdAt: 'desc' },
  });

  if (testimonials.length === 0) return null;

  return <TestimonialsClient testimonials={testimonials} />;
}
