const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/reviews?providerId=...&serviceId=...&userId=...
router.get('/', async (req, res) => {
  const { providerId, serviceId, userId } = req.query;
  const where = { isApproved: true };
  if (providerId) where.providerId = providerId;
  if (serviceId) where.serviceId = serviceId;
  if (userId) where.userId = userId;
  try {
    const reviews = await prisma.review.findMany({
      where,
      include: {
        user: { select: { name: true } },
        provider: { select: { user: { select: { name: true } } } },
        service: { select: { title: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Yorumlar alınamadı', error: err.message });
  }
});

// POST /api/reviews
router.post('/', async (req, res) => {
  const { userId, providerId, serviceId, rating, comment } = req.body;
  if (!userId || !providerId || !serviceId || !rating || !comment) {
    return res.status(400).json({ message: 'Eksik bilgi' });
  }
  try {
    const review = await prisma.review.create({
      data: {
        userId,
        providerId,
        serviceId,
        rating: Number(rating),
        comment,
        isApproved: false
      }
    });
    res.status(201).json({ message: 'Yorum kaydedildi, admin onayı bekliyor.', review });
  } catch (err) {
    res.status(500).json({ message: 'Yorum eklenemedi', error: err.message });
  }
});

module.exports = router; 