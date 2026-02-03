const express = require('express');
const router = express.Router();

// 1. Import the Controller
const productController = require('../controllers/productController');

// 2. Import the Validator
const { validateProduct } = require('../middlewares/productValidator');
const auth = require('../middlewares/auth');

// --- ROUTES ---
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);

router.post('/products', auth, validateProduct, productController.createProduct);
router.delete('/products/:id', auth, productController.deleteProduct);
router.put('/products/:id', auth, validateProduct, productController.updateProduct);


module.exports = router;