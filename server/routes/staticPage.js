const express = require('express');
const router = express.Router();
const staticPageController = require('../controllers/staticPageController');

// Public erişim
router.get('/:key', staticPageController.getPage);

module.exports = router; 