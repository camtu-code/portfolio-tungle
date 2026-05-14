import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const DEFAULT_USERS = [
  { email: 'admin@example.com', name: 'Admin', password: 'admin123' },
  { email: 'editor@example.com', name: 'Editor', password: 'editor123' },
  { email: 'manager@example.com', name: 'Manager', password: 'manager123' },
];

async function main() {
  for (const user of DEFAULT_USERS) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        password: hashedPassword,
      },
      create: {
        email: user.email,
        name: user.name,
        password: hashedPassword,
      },
    });
  }

  console.log('Seeded local admin users:');
  for (const user of DEFAULT_USERS) {
    console.log(`- ${user.email} / ${user.password}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
