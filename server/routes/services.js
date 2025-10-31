const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// Tüm hizmetleri getir
router.get('/', async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      include: {
        category: true
      }
    });
    res.json(services);
  } catch (error) {
    console.error('Hizmetler getirilirken hata:', error);
    res.status(500).json({ error: 'Hizmetler getirilirken bir hata oluştu' });
  }
});

// ID'ye göre hizmet getir
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        category: true,
        providerService: {
          include: {
            provider: true
          }
        }
      }
    });
    
    if (!service) {
      return res.status(404).json({ error: 'Hizmet bulunamadı' });
    }
    
    res.json(service);
  } catch (error) {
    console.error('Hizmet getirilirken hata:', error);
    res.status(500).json({ error: 'Hizmet getirilirken bir hata oluştu' });
  }
});

// Kategoriye göre hizmetleri getir
router.get('/category/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params;
    const services = await prisma.service.findMany({
      where: { categoryId },
      include: {
        category: true
      }
    });
    res.json(services);
  } catch (error) {
    console.error('Kategoriye göre hizmetler getirilirken hata:', error);
    res.status(500).json({ error: 'Hizmetler getirilirken bir hata oluştu' });
  }
});

module.exports = router;