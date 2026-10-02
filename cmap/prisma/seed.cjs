const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();
async function main() {
  const hash = await bcrypt.hash('Admin123!', 10);
  await prisma.user.upsert({
    where: { email: 'ned.uz07@gmail.com' },
    update: {},
    create: { email: 'ned.uz07@gmail.com', name: 'Chizzywizzy', password: hash, role: 'Super Admin' },
  });
  console.log('Seeded Super Admin: ned.uz07@gmail.com / Admin123!');
}
main().finally(() => prisma.$disconnect());