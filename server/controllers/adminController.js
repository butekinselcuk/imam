const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.listUsers = async (req, res) => {
  const users = await prisma.user.findMany({ select: { id: true, name: true, email: true, role: true } });
  res.json(users);
};
exports.updateUser = async (req, res) => {
  const { role } = req.body;
  const user = await prisma.user.update({ where: { id: req.params.id }, data: { role } });
  res.json({ message: 'Kullanıcı güncellendi', user });
};
exports.listProviders = async (req, res) => {
  const providers = await prisma.provider.findMany({ include: { user: { select: { id: true, name: true, email: true } } } });
  res.json(providers);
};
exports.updateProvider = async (req, res) => {
  const { isVerified } = req.body;
  const provider = await prisma.provider.update({ where: { id: req.params.id }, data: { isVerified } });
  res.json({ message: 'Sağlayıcı güncellendi', provider });
};
exports.listCategories = async (req, res) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
};
exports.addCategory = async (req, res) => {
  const { name, description } = req.body;
  const category = await prisma.category.create({ data: { name, description } });
  res.status(201).json({ message: 'Kategori eklendi', category });
};
exports.updateCategory = async (req, res) => {
  const { name, description } = req.body;
  const category = await prisma.category.update({ where: { id: req.params.id }, data: { name, description } });
  res.json({ message: 'Kategori güncellendi', category });
};
exports.deleteCategory = async (req, res) => {
  await prisma.category.delete({ where: { id: req.params.id } });
  res.json({ message: 'Kategori silindi' });
};
exports.getReports = async (req, res) => {
  const userCount = await prisma.user.count();
  const providerCount = await prisma.provider.count();
  const bookingCount = await prisma.booking.count();
  const paymentCount = await prisma.payment.count();
  const totalRevenue = await prisma.payment.aggregate({ _sum: { amount: true } });

  // Son 6 ay aylık gelir
  const now = new Date();
  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    return { year: d.getFullYear(), month: d.getMonth() + 1 };
  }).reverse();
  const monthlyRevenue = await Promise.all(months.map(async ({ year, month }) => {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1);
    const sum = await prisma.payment.aggregate({
      _sum: { amount: true },
      where: { createdAt: { gte: start, lt: end } }
    });
    return { year, month, total: sum._sum.amount || 0 };
  }));

  // En popüler hizmet (en çok rezervasyon alan)
  const topService = await prisma.service.findFirst({
    orderBy: { bookings: { _count: 'desc' } },
    include: { provider: { select: { user: { select: { name: true } } } }, category: true },
  });

  // En popüler kategori (en çok hizmete sahip)
  const topCategory = await prisma.category.findFirst({
    orderBy: { services: { _count: 'desc' } },
    include: { services: true },
  });

  res.json({
    userCount,
    providerCount,
    bookingCount,
    paymentCount,
    totalRevenue: totalRevenue._sum.amount || 0,
    monthlyRevenue,
    topService: topService ? {
      title: topService.title,
      provider: topService.provider?.user?.name,
      category: topService.category?.name,
      bookingCount: topService.bookings?.length || 0
    } : null,
    topCategory: topCategory ? {
      name: topCategory.name,
      serviceCount: topCategory.services?.length || 0
    } : null
  });
};
exports.listPayments = async (req, res) => {
  const payments = await prisma.payment.findMany({ include: { booking: true, provider: true } });
  res.json(payments);
};
exports.updatePayment = async (req, res) => {
  const { status } = req.body;
  const payment = await prisma.payment.update({ where: { id: req.params.id }, data: { status } });
  res.json({ message: 'Ödeme güncellendi', payment });
};
exports.getSiteSettings = async (req, res) => {
  try {
    let settings = await prisma.siteSettings.findFirst();
    if (!settings) {
      settings = await prisma.siteSettings.create({ data: {} });
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
};
exports.updateSiteSettings = async (req, res) => {
  try {
    let settings = await prisma.siteSettings.findFirst();
    if (!settings) {
      settings = await prisma.siteSettings.create({ data: {} });
    }
    const updated = await prisma.siteSettings.update({
      where: { id: settings.id },
      data: req.body
    });
    res.json({ message: 'Ayarlar güncellendi', settings: updated });
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
};
exports.listReviews = async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
        provider: { include: { user: { select: { name: true } } } },
        service: { select: { title: true } }
      }
    });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
};
exports.updateReview = async (req, res) => {
  try {
    const { isApproved } = req.body;
    const review = await prisma.review.update({
      where: { id: req.params.id },
      data: { isApproved }
    });
    res.json({ message: 'Yorum güncellendi', review });
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
}; 