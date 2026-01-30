const express = require('express');
const router = express.Router();

const promoController = require('../controllers/promoController');
const auth = require('../middlewares/auth'); 
const promoValidator = require('../middlewares/promoValidator'); 

router.post('/validate', auth, promoValidator, promoController.validateCode);

router.post('/add', auth, promoController.createPromoCode);

module.exports = router;