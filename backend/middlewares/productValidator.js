const productSchema = require('../models/productModel');
/**
 * Middleware to validate product data before processing
 */
exports.validateProduct = (req, res, next) => {
    const { name, price, category, image, quantity } = req.body;
    
    // 1. Check for presence of required fields
    if (!name || !price || !category || !image) {
        return res.status(400).json({ 
            success: false,
            message: "Validation failed: Missing required fields (name, price, category, image)." 
        });
    }

    // 2. Validate price data type and value
    if (typeof price !== 'number' || price < 0) {
        return res.status(400).json({ 
            success: false,
            message: "Validation failed: Price must be a positive number." 
        });
    }

    // 3. Validate category against defined schema enum
    if (!productSchema.category.enum.values.includes(category)) {
        return res.status(400).json({ 
            success: false,
            message: "Validation failed: Invalid category." 
        });
    }

    if (quantity !== undefined && (typeof quantity !== 'number' || quantity < 0)) {
        return res.status(400).json({ success: false, message: "Quantity must be a positive number." });
    }

    // If all checks pass, proceed to the next middleware or controller
    next();
};