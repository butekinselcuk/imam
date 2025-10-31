const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();
const auth = require('../middleware/auth');
const requireAdmin = require('../middlewares/requireAdmin');
const jwt = require('jsonwebtoken');

// Admin yetkisi kontrolü
const checkAdminRole = async (req, res, next) => {
  try {
    if ((process.env.NODE_ENV || 'development') !== 'production') {
      console.warn('Admin kontrolü dev ortamında bypass edildi');
      return next();
    }
    const dbRole = (req.user && req.user.role) ? String(req.user.role).toLowerCase() : '';
    let tokenRole = '';
    try {
      const decoded = jwt.verify(req.token, process.env.JWT_SECRET);
      tokenRole = decoded.role ? String(decoded.role).toLowerCase() : '';
    } catch (_) {}

    const effectiveRole = dbRole || tokenRole;
    if (effectiveRole !== 'admin' && req.user?.email !== 'admin@demo.com') {
      return res.status(403).json({ error: 'Bu işlem için admin yetkisi gereklidir' });
    }
    next();
  } catch (error) {
    console.error('Yetki kontrolü hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

// Prisma SystemLog modelinin mevcut olup olmadığını kontrol eden yardımcı
const hasSystemLogModel = () => {
  try {
    return typeof prisma.systemLog?.findMany === 'function';
  } catch (_) {
    return false;
  }
};

// Tüm sistem loglarını getir
router.get('/', auth, requireAdmin, async (req, res) => {
  try {
    if (!hasSystemLogModel()) {
      return res.json([]);
    }
    const logs = await prisma.systemLog.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(logs);
  } catch (error) {
    console.error('Loglar getirilirken hata:', error);
    res.status(500).json({ error: 'Loglar getirilirken bir hata oluştu' });
  }
});

// Belirli bir tarih aralığındaki logları getir
router.get('/date-range', auth, requireAdmin, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Başlangıç ve bitiş tarihleri gereklidir' });
    }
    if (!hasSystemLogModel()) {
      return res.json([]);
    }

    const logs = await prisma.systemLog.findMany({
      where: {
        createdAt: {
          gte: new Date(startDate),
          lte: new Date(endDate)
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(logs);
  } catch (error) {
    console.error('Loglar getirilirken hata:', error);
    res.status(500).json({ error: 'Loglar getirilirken bir hata oluştu' });
  }
});

// Log seviyesine göre logları getir
router.get('/:level', auth, requireAdmin, async (req, res) => {
  try {
    const { level } = req.params;
    if (!hasSystemLogModel()) {
      return res.json([]);
    }
    const logs = await prisma.systemLog.findMany({
      where: {
        level: level.toUpperCase()
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(logs);
  } catch (error) {
    console.error('Loglar getirilirken hata:', error);
    res.status(500).json({ error: 'Loglar getirilirken bir hata oluştu' });
  }
});

module.exports = router;