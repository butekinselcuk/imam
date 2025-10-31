const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const staticPageController = require('../controllers/staticPageController');

// Kullanıcı ve sağlayıcı yönetimi
router.get('/users', authMiddleware, adminController.listUsers);
router.put('/users/:id', authMiddleware, adminController.updateUser);
router.get('/providers', authMiddleware, adminController.listProviders);
router.put('/providers/:id', authMiddleware, adminController.updateProvider);

// Kategori yönetimi
router.get('/categories', authMiddleware, adminController.listCategories);
router.post('/categories', authMiddleware, adminController.addCategory);
router.put('/categories/:id', authMiddleware, adminController.updateCategory);
router.delete('/categories/:id', authMiddleware, adminController.deleteCategory);

// Rapor ve ödeme yönetimi
router.get('/reports', authMiddleware, adminController.getReports);
router.get('/payments', authMiddleware, adminController.listPayments);
router.put('/payments/:id', authMiddleware, adminController.updatePayment);

// Static page yönetimi
router.get('/static-pages/:key', authMiddleware, staticPageController.getPage);
router.put('/static-pages/:key', authMiddleware, staticPageController.updatePage);

// Site ayarları
router.get('/site-settings', authMiddleware, adminController.getSiteSettings);
router.put('/site-settings', authMiddleware, adminController.updateSiteSettings);

// Yorumları listeleyen ve onaylayan endpointleri ekle
router.get('/reviews', authMiddleware, adminController.listReviews);
router.put('/reviews/:id', authMiddleware, adminController.updateReview);

module.exports = router; 