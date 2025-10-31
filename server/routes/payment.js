const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, paymentController.createPayment);
router.get('/history', authMiddleware, paymentController.getPayments);

module.exports = router; 