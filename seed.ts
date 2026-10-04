import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding data...');

  // Create a contact message
  const message = await prisma.contactMessage.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      message: 'Hello, this is a test message from the seeding script! Your minimalist portfolio looks amazing.',
    },
  });
  console.log('✅ Created contact message:', message);

  // Create a testimonial
  const testimonial = await prisma.testimonial.create({
    data: {
      name: 'Jane Smith',
      role: 'Senior Recruiter',
      company: 'Tech Innovators Inc.',
      message: 'Tung is an exceptional developer with a great eye for detail and strong engineering skills. Would highly recommend!',
      rating: 5,
      status: 'APPROVED',
    },
  });
  console.log('✅ Created testimonial:', testimonial);

  console.log('Data seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
