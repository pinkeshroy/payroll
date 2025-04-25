import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  const pass = await bcrypt.hash('admin@123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@corp.io' },
    update: {},
    create: { email: 'admin@corp.io', password: pass, role: 'ADMIN' }
  });
}

main().catch(console.error).finally(() => prisma.$disconnect());
