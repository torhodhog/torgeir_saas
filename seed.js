import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Connecting to database...');
    const newUser = await prisma.user.create({
      data: {
        externalId: 'test-id-1',
        email: 'kristin@example.com',
        quotaLimit: 100,
      },
    });
    console.log('User created:', newUser);
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    console.log('Disconnecting from database...');
    await prisma.$disconnect();
  }
}

main();