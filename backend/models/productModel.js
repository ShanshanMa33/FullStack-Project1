// Define the structure of a Product
const productSchema = {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { 
        type: String, 
        required: true,
        enum: {
            values: ["Mobile", "Laptop", "Watch", "Accessories", "Tablet", "Desktop"]
        }
    },
    image: { type: String, required: true },
    quantity: { 
        type: Number, 
        required: [true, "Please enter product quantity"],
        default: 0
    }
};

module.exports = productSchema;