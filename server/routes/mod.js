const express = require('express');
const router = express.Router();
const modController = require('../controllers/modController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/profile', authMiddleware, modController.getProfile);
router.put('/profile', authMiddleware, modController.updateProfile);
router.post('/services', authMiddleware, modController.addService);
router.get('/services', authMiddleware, modController.listServices);
router.get('/bookings', authMiddleware, modController.listBookings);
router.put('/bookings/:id', authMiddleware, modController.updateBooking);

module.exports = router; 