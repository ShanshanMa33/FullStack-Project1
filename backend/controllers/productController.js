const fs = require('fs');
const path = require('path');

// Locate the path to the JSON database
const productsFilePath = path.join(__dirname, '..', 'data', 'products.json');

/**
 * @desc    Get all products from the JSON file
 * @route   GET /api/products
 */
exports.getAllProducts = (req, res) => {
    fs.readFile(productsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Read Error:", err);
            return res.status(500).json({ 
                success: false, 
                message: "Internal Server Error: Could not read product data." 
            });
        }
        // Send the parsed JSON data back to the client
        res.status(200).json(JSON.parse(data));
    });
};

/**
 * @desc    Create a new product and save it to the JSON file
 * @route   POST /api/products
 */
exports.createProduct = (req, res) => {
    fs.readFile(productsFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ 
                success: false, 
                message: "Internal Server Error: Failed to access database." 
            });
        }

        const products = JSON.parse(data);
        
        // 1. Generate a new product object
        const newProduct = {
            // Auto-increment ID based on the last item
            id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
            ...req.body,
            quantity: Number(req.body.quantity || 0),
            createdAt: new Date().toISOString()
        };

        // 2. Add to the local array
        products.push(newProduct);

        // 3. Write the updated array back to the JSON file
        fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ 
                    success: false, 
                    message: "Internal Server Error: Failed to save data." 
                });
            }
            
            // 201 status code means "Created"
            res.status(201).json({
                success: true,
                message: "Product added successfully!",
                data: newProduct
            });
        });
    });
};

/**
 * @desc    Delete a product
 * @route   DELETE /api/products/:id
 */
exports.deleteProduct = (req, res) => {
    const productId = parseInt(req.params.id); 

    fs.readFile(productsFilePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ success: false, message: "Read error" });

        let products = JSON.parse(data);
        
        const updatedProducts = products.filter(p => p.id !== productId);

        if (products.length === updatedProducts.length) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        fs.writeFile(productsFilePath, JSON.stringify(updatedProducts, null, 2), (err) => {
            if (err) return res.status(500).json({ success: false, message: "Write error" });
            res.status(200).json({ success: true, message: "Product deleted!" });
        });
    });
};

exports.getProductById = (req, res) => {

    fs.readFile(productsFilePath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Cannot read data file" });
      }
      try {
        const products = JSON.parse(data);
        const productId = parseInt(req.params.id);
        const product = products.find(p => p.id === productId);
  
        if (product) {
          res.status(200).json(product);
        } else {
          res.status(404).json({ message: "Product not found" });
        }
      } catch (parseErr) {
        res.status(500).json({ message: "Data format error" });
      }
    });
  };

/* Update an existing product */
exports.updateProduct = (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const updatedInfo = req.body;

        // 1. Read the latest data from file to ensure we're up to date
        fs.readFile(productsFilePath, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ message: "Failed to read database" });
            }

            let products = JSON.parse(data);
            const index = products.findIndex(p => p.id === productId);

            if (index !== -1) {
                // 2. Merge data: Keep original ID and system fields, overwrite others
                products[index] = { 
                    ...products[index], 
                    ...updatedInfo,
                    id: productId // Guarantee the ID stays as a number
                };

                // 3. Write back to JSON file
                fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), (writeErr) => {
                    if (writeErr) {
                        return res.status(500).json({ message: "Failed to save data" });
                    }
    
                    res.status(200).json({ message: "Update Success", product: products[index] });
                });
            } else {
                res.status(404).json({ message: "Product not found" });
            }
        });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

