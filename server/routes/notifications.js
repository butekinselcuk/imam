const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();
const auth = require('../middleware/auth');

// Kullanıcının bildirimlerini getir
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const notifications = await prisma.notification.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(notifications);
  } catch (error) {
    console.error('Bildirimler getirilirken hata:', error);
    res.status(500).json({ error: 'Bildirimler getirilirken bir hata oluştu' });
  }
});

// Bildirimi okundu olarak işaretle
router.put('/:id/read', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    // Önce bildirimin kullanıcıya ait olduğunu kontrol et
    const notification = await prisma.notification.findFirst({
      where: { 
        id: id,
        userId: userId
      }
    });
    
    if (!notification) {
      return res.status(404).json({ error: 'Bildirim bulunamadı' });
    }
    
    // Bildirimi güncelle
    const updatedNotification = await prisma.notification.update({
      where: { id: id },
      data: { read: true }
    });
    
    res.json(updatedNotification);
  } catch (error) {
    console.error('Bildirim güncellenirken hata:', error);
    res.status(500).json({ error: 'Bildirim güncellenirken bir hata oluştu' });
  }
});

// Bildirimi sil
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    // Önce bildirimin kullanıcıya ait olduğunu kontrol et
    const notification = await prisma.notification.findFirst({
      where: { 
        id: id,
        userId: userId
      }
    });
    
    if (!notification) {
      return res.status(404).json({ error: 'Bildirim bulunamadı' });
    }
    
    // Bildirimi sil
    await prisma.notification.delete({
      where: { id: id }
    });
    
    res.json({ message: 'Bildirim başarıyla silindi' });
  } catch (error) {
    console.error('Bildirim silinirken hata:', error);
    res.status(500).json({ error: 'Bildirim silinirken bir hata oluştu' });
  }
});

// Bildirim detayını getir
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const notification = await prisma.notification.findFirst({
      where: { 
        id: id,
        userId: userId
      }
    });
    
    if (!notification) {
      return res.status(404).json({ error: 'Bildirim bulunamadı' });
    }
    
    res.json(notification);
  } catch (error) {
    console.error('Bildirim detayı getirilirken hata:', error);
    res.status(500).json({ error: 'Bildirim detayı getirilirken bir hata oluştu' });
  }
});

module.exports = router;