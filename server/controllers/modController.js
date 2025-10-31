const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getProfile = async (req, res) => {
  try {
    const provider = await prisma.provider.findUnique({
      where: { userId: req.user.userId },
      include: { user: { select: { id: true, name: true, email: true } }, services: true }
    });
    if (!provider) return res.status(404).json({ message: 'Sağlayıcı profili bulunamadı.' });
    res.json(provider);
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { bio, expertise } = req.body;
    const provider = await prisma.provider.update({
      where: { userId: req.user.userId },
      data: { bio, expertise }
    });
    res.json({ message: 'Profil güncellendi', provider });
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
};

exports.addService = async (req, res) => {
  try {
    const { title, description, price, categoryId } = req.body;
    const provider = await prisma.provider.findUnique({ where: { userId: req.user.userId } });
    if (!provider) return res.status(404).json({ message: 'Sağlayıcı profili bulunamadı.' });
    const service = await prisma.service.create({
      data: {
        providerId: provider.id,
        title,
        description,
        price: parseFloat(price),
        categoryId
      }
    });
    res.status(201).json({ message: 'Hizmet eklendi', service });
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
};

exports.listServices = async (req, res) => {
  try {
    const provider = await prisma.provider.findUnique({ where: { userId: req.user.userId } });
    if (!provider) return res.status(404).json({ message: 'Sağlayıcı profili bulunamadı.' });
    const services = await prisma.service.findMany({ where: { providerId: provider.id } });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
};

exports.listBookings = async (req, res) => {
  try {
    const provider = await prisma.provider.findUnique({ where: { userId: req.user.userId } });
    if (!provider) return res.status(404).json({ message: 'Sağlayıcı profili bulunamadı.' });
    const bookings = await prisma.booking.findMany({
      where: { providerId: provider.id },
      include: { user: { select: { id: true, name: true, email: true } }, service: true }
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await prisma.booking.update({
      where: { id: req.params.id },
      data: { status }
    });
    res.json({ message: 'Randevu güncellendi', booking });
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
}; 