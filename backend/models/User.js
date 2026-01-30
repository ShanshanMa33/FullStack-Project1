const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true 
  },

  password: { 
    type: String, 
    required: true,
    minlength: 6 
  },

  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' 
  },

  cart: [
    {
      productId: { type: String },
      name: { type: String },
      price: { type: Number },
      quantity: { type: Number },
      image: { type: String }
    }
  ],

  createdAt: { type: Date, default: Date.now }
}, { 

  timestamps: true 
});

module.exports = mongoose.model('User', userSchema);