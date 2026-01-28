const Product = require('../models/productModel');

/**
 * @desc    Get all products (Supports Search and Category filtering)
 * @route   GET /api/products
 */
const getAllProducts = async (req, res) => {
    try {
        const { search, category } = req.query;
        let dbQuery = {};
        //Logic: If search keyword exists, match name
        if (search) {
            dbQuery.name = { $regex: search, $options: 'i' };
        }
        //Logic: If category is NOT 'All', add it to the query
        if (category && category !== 'All') {
            dbQuery.category = category;
        }
        //Fetch from Atlas and sort by newest first
        const products = await Product.find(dbQuery).sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

/**
 * @desc    Create a new product
 * @route   POST /api/products
 */
const createProduct = async (req, res) => {
    try {
        // Ensure price and quantity are stored as numbers
        const newProduct = new Product({
            ...req.body,
            price: Number(req.body.price),
            quantity: Number(req.body.quantity),
            // The frontend should send the image URL after uploading via /api/upload
            image: req.body.image 
        });

        const savedProduct = await newProduct.save();
        res.status(201).json({ success: true, data: savedProduct });
    } catch (err) {
        res.status(400).json({ success: false, message: "Validation failed: " + err.message });
    }
};

/**
 * @desc    Get a single product by ID
 * @route   GET /api/products/:id
 */
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Invalid ID format or Server Error" });
    }
};

/**
 * @desc    Update an existing product
 * @route   PUT /api/products/:id
 */
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            { ...req.body }, 
            { new: true, runValidators: true }
        );

        if (updatedProduct) {
            res.status(200).json({ message: "Update Success", product: updatedProduct });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * @desc    Delete a product
 * @route   DELETE /api/products/:id
 */
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (deletedProduct) {
            res.status(200).json({ success: true, message: "Product deleted!" });
        } else {
            res.status(404).json({ success: false, message: "Product not found" });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
};

