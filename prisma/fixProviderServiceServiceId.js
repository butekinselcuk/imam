const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const providerServices = await prisma.providerService.findMany();
  for (const ps of providerServices) {
    if (!ps.serviceId) {
      const service = await prisma.service.findFirst({
        where: {
          title: ps.title,
          description: ps.description,
          providerId: ps.providerId
        }
      });
      if (service) {
        await prisma.providerService.update({
          where: { id: ps.id },
          data: { serviceId: service.id }
        });
        console.log(`Güncellendi: ProviderService ${ps.id} -> Service ${service.id}`);
      } else {
        console.log(`Eşleşen Service bulunamadı: ProviderService ${ps.id}`);
      }
    }
  }
  console.log('Tüm kayıtlar güncellendi.');
  await prisma.$disconnect();
}

main(); 