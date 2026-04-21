import { prisma } from '@/lib/prisma';
import TestimonialsClient from './TestimonialsClient';

export default async function Testimonials() {
  let testimonials: Awaited<ReturnType<typeof prisma.testimonial.findMany>> = [];

  try {
    testimonials = await prisma.testimonial.findMany({
      where: { status: 'APPROVED' },
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    // Keep homepage stable even when DB credentials are invalid/unavailable.
    void error;
  }

  if (testimonials.length === 0) return null;

  return <TestimonialsClient testimonials={testimonials} />;
}
