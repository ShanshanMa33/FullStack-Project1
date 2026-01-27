const express = require('express');
const cors = require('cors');
const path = require('path');
const productRoutes = require('./routes/productRoutes');
const multer = require('multer');
const fs = require('fs');

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json()); // Essential for parsing POST request bodies

// Serve static images
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// This allows to access images via http://localhost:8000/uploads/filename.jpg
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// API Routes
app.use('/api', productRoutes);

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
    
    // Return the full URL of the uploaded image
    const imageUrl = `http://localhost:8000/uploads/${req.file.filename}`;
    res.status(200).json({ url: imageUrl });
  });

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`backend is running on: http://localhost:${PORT}/api/products`);
});