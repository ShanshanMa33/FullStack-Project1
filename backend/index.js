require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const productRoutes = require('./routes/productRoutes');
const multer = require('multer');
const fs = require('fs');
const mongoose = require('mongoose');
const app = express();
const promoRoutes = require('./routes/promoRoutes');

// Global Middlewares
app.use(cors());
app.use(express.json());

// Serve static images
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// API Routes
app.use('/api', productRoutes);
app.use('/api/promo', promoRoutes);

const uploadDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure how files are stored
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir); // Save files in this folder
    },
    filename: (req, file, cb) => {
      // Generate a unique name: timestamp + original name
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });
  
  // API Endpoint for image upload
  app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const imageUrl = `http://localhost:8000/uploads/${req.file.filename}`;
    res.status(200).json({ url: imageUrl });
  });

  const PORT = process.env.PORT || 8000;
  const MONGO_URI = process.env.MONGO_URI;
  mongoose.connect(MONGO_URI)
  .then(() => {
      console.log('Connected to MongoDB Atlas');
      app.listen(PORT, () => {
          console.log(`Server is running on: http://localhost:${PORT}`);
      });
  })
  .catch(err => {
      console.error('MongoDB connection error:', err.message);
  });