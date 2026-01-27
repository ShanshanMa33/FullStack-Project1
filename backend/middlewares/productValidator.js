const Product = require('../models/productModel');

/**
 * Middleware to validate product data before processing
 */
exports.validateProduct = (req, res, next) => {
    const { name, price, category, image, quantity } = req.body;
    
    if (!name || !price || !category || !image) {
        return res.status(400).json({ 
            success: false,
            message: "Validation failed: Missing required fields (name, price, category, image)." 
        });
    }

    if (typeof price !== 'number' || price < 0) {
        return res.status(400).json({ 
            success: false,
            message: "Validation failed: Price must be a positive number." 
        });
    }

    try {
        const validCategories = Product.schema.path('category').options.enum;

        if (validCategories && !validCategories.includes(category)) {
            return res.status(400).json({ 
                success: false, 
                message: `Validation failed: Invalid category. Must be one of: ${validCategories.join(', ')}` 
            });
        }
    } catch (error) {
        console.warn("Validator warning: Category enum not found in model.");
    }

    if (quantity !== undefined && (typeof quantity !== 'number' || quantity < 0)) {
        return res.status(400).json({ success: false, message: "Quantity must be a positive number." });
    }

    next();
};