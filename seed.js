import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const newUser = await prisma.user.create({
      data: {
        externalId: 'test-id',
        email: 'test@example.com',
        quotaLimit: 100,
      },
    });
    console.log('User created:', newUser);
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
