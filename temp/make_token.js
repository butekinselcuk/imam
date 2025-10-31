const dotenv = require('dotenv');
dotenv.config();
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

(async () => {
  const prisma = new PrismaClient();
  try {
    const user = await prisma.user.findFirst({ where: { email: 'admin@demo.com' } });
    if (!user) {
      console.error('Admin kullanıcı bulunamadı');
      process.exit(1);
    }
    console.log('ADMIN_ID:', user.id);
    console.log('ROLE:', user.role);
    const secret = process.env.JWT_SECRET || 'gizliAnahtar';
    console.log('USING_SECRET:', secret ? '[set]' : '[empty]');
    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '2h' });
    console.log('TOKEN:\n' + token);
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();