const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer');
const path = require('path');
const upload = multer({ dest: path.join(__dirname, '../../uploads/') });

// GET /api/providers
router.get('/', async (req, res) => {
  try {
    const providers = await prisma.provider.findMany({
      include: {
        user: true,
        providerServices: true // Sağlayıcıya özel hizmetler de gelsin
      }
    });
    res.json(providers);
  } catch (err) {
    res.status(500).json({ error: 'Sağlayıcılar yüklenemedi.' });
  }
});

// Sağlayıcı başvurusu (dosya destekli)
router.post('/apply', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    const { bio, expertise } = req.body;
    const userId = req.user.userId;
    const existing = await prisma.provider.findUnique({ where: { userId } });
    if (existing) return res.status(400).json({ message: 'Zaten başvuru yapmışsınız.' });
    let fileUrl = '';
    if (req.file) {
      fileUrl = `/uploads/${req.file.filename}`;
    }
    const provider = await prisma.provider.create({
      data: {
        userId,
        bio,
        expertise,
        isVerified: false,
        image: fileUrl,
        price: 0,
        location: ''
      }
    });
    res.status(201).json({ message: 'Başvuru alındı, admin onayından sonra aktifleşecek.', provider });
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Sağlayıcıya özel hizmet ekle
router.post('/services', authMiddleware, async (req, res) => {
  try {
    const { categoryId, price, description, method, target, title } = req.body;
    const userId = req.user.userId;
    // Sağlayıcı id'sini bul
    const provider = await prisma.provider.findUnique({ where: { userId } });
    if (!provider) return res.status(400).json({ message: 'Sağlayıcı bulunamadı.' });
    // Önce Service tablosuna kayıt aç
    const service = await prisma.service.create({
      data: {
        providerId: provider.id,
        title: title || 'Hizmet',
        description,
        price: parseFloat(price),
        categoryId
      }
    });
    // Sonra ProviderService kaydı aç (serviceId ekle)
    const ps = await prisma.providerService.create({
      data: {
        providerId: provider.id,
        categoryId,
        title: title || 'Hizmet',
        price: parseInt(price),
        description,
        method,
        target,
        serviceId: service.id
      }
    });
    res.status(201).json({ message: 'Hizmet eklendi', service: ps });
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Sağlayıcıya ait eklediği hizmetleri listele
router.get('/my-services', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const provider = await prisma.provider.findUnique({ where: { userId } });
    if (!provider) return res.json([]);
    const services = await prisma.providerService.findMany({ where: { providerId: provider.id } });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Filtreli sağlayıcı hizmetleri listele
router.get('/services', async (req, res) => {
  try {
    const { categoryId, minPrice, maxPrice, method, target } = req.query;
    const where = {};
    if (categoryId) where.categoryId = categoryId;
    if (minPrice) where.price = { gte: parseInt(minPrice) };
    if (maxPrice) where.price = { ...(where.price || {}), lte: parseInt(maxPrice) };
    if (method) where.method = method;
    if (target) where.target = target;
    const services = await prisma.providerService.findMany({
      where,
      include: {
        provider: { include: { user: true } },
        category: true
      }
    });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Bildirimleri listele
router.get('/notifications', async (req, res) => {
  try {
    const { userId, providerId } = req.query;
    const where = {};
    if (userId) where.userId = userId;
    if (providerId) where.providerId = providerId;
    const notifications = await prisma.notification.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Rezervasyonları listele (kullanıcı veya sağlayıcıya göre)
router.get('/bookings', async (req, res) => {
  try {
    const { providerId } = req.query;
    if (!providerId) return res.json([]);
    const bookings = await prisma.booking.findMany({
      where: { providerId },
      include: {
        user: true,
        providerService: true
      }
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// GET /api/providers/:id
router.get('/:id', async (req, res) => {
  try {
    const provider = await prisma.provider.findUnique({
      where: { id: req.params.id },
      include: {
        user: true,
        providerServices: true // Sağlayıcıya özel hizmetler de gelsin
      }
    });
    if (!provider) return res.status(404).json({ error: 'Sağlayıcı bulunamadı.' });
    res.json(provider);
  } catch (err) {
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Rezervasyon oluştur
router.post('/bookings', async (req, res) => {
  try {
    const { userId, providerId, providerServiceId, date } = req.body;
    if (!userId || !providerId || !providerServiceId || !date) {
      return res.status(400).json({ message: 'Eksik bilgi.' });
    }
    // ProviderService kontrolü
    const providerService = await prisma.providerService.findUnique({ where: { id: providerServiceId } });
    if (!providerService) {
      return res.status(400).json({ message: 'Hizmet bulunamadı.' });
    }
    const booking = await prisma.booking.create({
      data: {
        userId,
        providerId,
        providerServiceId,
        date: new Date(date),
        status: 'pending'
      }
    });
    // İsimleri oku
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { name: true } });
    const provider = await prisma.provider.findUnique({ where: { id: providerId }, include: { user: { select: { name: true } } } });
    const whenText = new Date(date).toLocaleString('tr-TR');
    // Sağlayıcıya bildirim (kimden ve hangi hizmet için)
    await prisma.notification.create({
      data: {
        providerId,
        userId, // bağlam için kullanıcıyı da ekle
        message: `Yeni rezervasyon talebi: ${providerService.title} — ${user?.name || 'Kullanıcı'} (${whenText}).`,
        isRead: false
      }
    });
    // Kullanıcıya bildirim (hangi sağlayıcı/hizmet)
    await prisma.notification.create({
      data: {
        userId,
        providerId, // bağlam için sağlayıcıyı da ekle
        message: `Rezervasyon talebiniz iletildi: ${provider?.user?.name || 'Sağlayıcı'} — ${providerService.title} (${whenText}).`,
        isRead: false
      }
    });
    res.status(201).json({ message: 'Rezervasyon oluşturuldu, onay bekliyor.', booking });
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Rezervasyon onay/ret
router.put('/bookings/:id', async (req, res) => {
  try {
    const { status } = req.body; // 'approved' veya 'declined'
    const booking = await prisma.booking.update({
      where: { id: req.params.id },
      data: { status }
    });
    const provider = await prisma.provider.findUnique({ where: { id: booking.providerId }, include: { user: { select: { name: true } } } });
    const providerService = booking.providerServiceId ? await prisma.providerService.findUnique({ where: { id: booking.providerServiceId } }) : null;
    const whenText = new Date(booking.date).toLocaleString('tr-TR');
    // Kullanıcıya bildirim
    await prisma.notification.create({
      data: {
        userId: booking.userId,
        providerId: booking.providerId,
        message: `Rezervasyonunuz ${status === 'approved' ? 'onaylandı' : 'reddedildi'}: ${provider?.user?.name || 'Sağlayıcı'} — ${providerService?.title || 'Hizmet'} (${whenText}).`,
        isRead: false
      }
    });
    res.json({ message: 'Rezervasyon güncellendi.', booking });
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Bildirim oluştur (isteğe bağlı, frontend test için)
router.post('/notifications', async (req, res) => {
  try {
    const { userId, providerId, message } = req.body;
    const notification = await prisma.notification.create({
      data: { userId, providerId, message, isRead: false }
    });
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Bildirim okundu olarak işaretle
router.put('/notifications/:id/read', async (req, res) => {
  try {
    const notification = await prisma.notification.update({
      where: { id: req.params.id },
      data: { isRead: true }
    });
    res.json(notification);
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Sağlayıcı kendi profilini görsün
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    let provider = await prisma.provider.findUnique({
      where: { userId },
      include: { user: true }
    });
    // Ekstra: Bulamazsa findFirst ile dene
    if (!provider) {
      provider = await prisma.provider.findFirst({
        where: { userId },
        include: { user: true }
      });
    }
    // Son çare: Tüm providerları çek ve userId ile eşleşeni bul
    if (!provider) {
      const allProviders = await prisma.provider.findMany({ include: { user: true } });
      provider = allProviders.find(p => p.userId === userId);
    }
    if (!provider) return res.status(404).json({ message: 'Sağlayıcı bulunamadı.' });
    if (!provider.isVerified) return res.status(403).json({ message: 'Sağlayıcı henüz admin tarafından onaylanmadı.' });
    res.json(provider);
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

module.exports = router;