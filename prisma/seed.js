const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Kategoriler
  async function findOrCreateCategory(name, description) {
    let cat = await prisma.category.findFirst({ where: { name } });
    if (!cat) cat = await prisma.category.create({ data: { name, description } });
    return cat;
  }
  const cat1 = await findOrCreateCategory('Aile Danışmanlığı', 'Aile ve evlilik konularında destek.');
  const cat2 = await findOrCreateCategory('Psikolojik Destek', 'Psikolojik ve sosyal danışmanlık.');
  const cat3 = await findOrCreateCategory('Eğitim', 'Eğitim ve gelişim hizmetleri.');
  const cat4 = await findOrCreateCategory('Sosyal Hizmetler', 'Sosyal destek ve danışmanlık.');
  const cat5 = await findOrCreateCategory('Hukuk Danışmanlığı', 'Hukuki konularda danışmanlık.');

  // Kullanıcılar
  async function findOrCreateUser(email, name, password, role) {
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) user = await prisma.user.create({ data: { name, email, password, role } });
    return user;
  }
  const admin = await findOrCreateUser('admin@demo.com', 'Admin Kullanıcı', 'admin123', 'admin');
  const modUser = await findOrCreateUser('mod@demo.com', 'Mehmet Sağlayıcı', 'mod123', 'mod');
  const user = await findOrCreateUser('user@demo.com', 'Ayşe Kullanıcı', 'user123', 'user');

  // Provider
  let provider = await prisma.provider.findUnique({ where: { userId: modUser.id } });
  if (!provider) {
    provider = await prisma.provider.create({
      data: {
        userId: modUser.id,
        bio: '10 yıllık aile danışmanı.',
        expertise: 'Aile Danışmanlığı',
        isVerified: true,
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        price: 500,
        location: 'İstanbul, Türkiye',
      }
    });
  }

  // Hizmetler
  async function findOrCreateService(title, providerId, description, price, categoryId, image, color) {
    let service = await prisma.service.findFirst({ where: { title } });
    if (!service) service = await prisma.service.create({ data: { providerId, title, description, price, categoryId, image, color } });
    return service;
  }
  const service1 = await findOrCreateService('Aile Terapisi', provider.id, 'Aile içi iletişim ve çözüm odaklı terapi.', 500, cat1.id, 'https://cdn-icons-png.flaticon.com/512/2922/2922510.png', '#fde2e4');
  const service2 = await findOrCreateService('Bireysel Danışmanlık', provider.id, 'Kişisel gelişim ve psikolojik destek.', 400, cat2.id, 'https://cdn-icons-png.flaticon.com/512/2922/2922561.png', '#e0f7fa');

  // Booking
  let booking = await prisma.booking.findFirst({ where: { userId: user.id, providerId: provider.id, serviceId: service1.id } });
  if (!booking) {
    booking = await prisma.booking.create({
      data: {
        userId: user.id,
        providerId: provider.id,
        serviceId: service1.id,
        date: new Date(),
        status: 'onaylandı',
      }
    });
  }

  // Review (örnek yorumlar)
  async function findOrCreateReview(userId, providerId, serviceId, rating, comment, isApproved) {
    let review = await prisma.review.findFirst({ where: { userId, providerId, serviceId, comment } });
    if (!review) review = await prisma.review.create({ data: { userId, providerId, serviceId, rating, comment, isApproved } });
    return review;
  }
  await findOrCreateReview(user.id, provider.id, service1.id, 5, 'Çok memnun kaldım, tavsiye ederim.', true);
  await findOrCreateReview(user.id, provider.id, service2.id, 4, 'Faydalı bir görüşmeydi.', false);

  // Site Ayarları (örnek)
  let settings = await prisma.siteSettings.findUnique({ where: { id: "1" } });
  if (!settings) {
    await prisma.siteSettings.create({
      data: {
        id: "1",
        seoTitle: 'Hizmet Platformu',
        seoDescription: 'Türkiye için çok katmanlı hizmet platformu',
        seoKeywords: 'hizmet, danışmanlık, aile, psikoloji, sosyal',
        logoUrl: 'https://cdn-icons-png.flaticon.com/512/2922/2922510.png',
        faviconUrl: 'https://cdn-icons-png.flaticon.com/512/2922/2922510.png',
        contactEmail: 'info@hizmetplatformu.com'
      }
    });
  }
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect()); 