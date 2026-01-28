const express = require('express');
const router = express.Router();

const promoController = require('../controllers/promoController');

router.post('/validate', promoController.validateCode);
router.post('/add', promoController.createPromoCode);
router.get('/seed', promoController.seedPromos);

module.exports = router;