const express = require('express');
const router = express.Router();

// 1. Import the Controller (The Brain)
// This will import an object containing all our logic functions
const productController = require('../controllers/productController');

// 2. Import the Validator (The Gatekeeper)
// We use { destructuring } because we used 'exports.validateProduct' in the middleware file
const { validateProduct } = require('../middlewares/productValidator');

// --- ROUTES ---

/**
 * @route   GET /api/products
 * @desc    Fetch all products from the JSON database
 * @access  Public
 */
router.get('/products', productController.getAllProducts);

/**
 * @route   POST /api/products
 * @desc    Validate data and create a new product
 * @access  Admin (Simulated)
 */
router.post('/products', validateProduct, productController.createProduct);

router.delete('/products/:id', productController.deleteProduct);

router.get('/products/:id', productController.getProductById);
router.put('/products/:id', productController.updateProduct);


// 3. Export the router to be used in index.js
module.exports = router;