const express = require('express');
const router = express.Router();

// 1. Import the Controller
const productController = require('../controllers/productController');

// 2. Import the Validator
const { validateProduct } = require('../middlewares/productValidator');

// --- ROUTES ---
router.get('/products', productController.getAllProducts);

router.post('/products', validateProduct, productController.createProduct);

router.delete('/products/:id', productController.deleteProduct);

router.get('/products/:id', productController.getProductById);
router.put('/products/:id', productController.updateProduct);


module.exports = router;