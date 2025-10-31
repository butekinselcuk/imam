const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, userController.updateProfile);
router.put('/password', authMiddleware, userController.changePassword);

// GET /api/user/profile (JWT ile kimlik doğrulama)
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.userId } });
    if (!user) return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Profil yüklenemedi.' });
  }
});

// GET /api/user/bookings (JWT ile kimlik doğrulama)
router.get('/bookings', authMiddleware, async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: req.user.userId },
      include: {
        providerService: true,
        provider: { include: { user: true } }
      }
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Randevular yüklenemedi.' });
  }
});

module.exports = router; 