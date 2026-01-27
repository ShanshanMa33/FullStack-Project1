// Define the structure of a Product
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Product name is required'] 
    },
    description: String,
    category: { 
        type: String, 
        required: true,
        enum: ['iPhone', 'Watch', 'Mobile', 'Laptop', 'Accessories', 'All', 'Tablet'], 
        default: 'All' 
    },
    price: { 
        type: Number, 
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true 
    },
    image: String,
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Product', productSchema);