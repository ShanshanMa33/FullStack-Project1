const mongoose = require('mongoose');

const promoSchema = new mongoose.Schema({

    code: { 
        type: String, 
        required: true, 
        unique: true, 
        uppercase: true,
        trim: true 
    },

    discountType: { 
      type: String, 
      required: true,
    },

    discountValue: { 
        type: Number, 
        required: true 
    },

    isActive: { 
        type: Boolean, 
        default: true 
    },

    expiryDate: { 
        type: Date 
    }
}, { timestamps: true });

module.exports = mongoose.model('Promo', promoSchema);