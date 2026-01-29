require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');


const productRoutes = require('./routes/productRoutes'); // n
const promoRoutes = require('./routes/promoRoutes');     // n
const authRouter = require("./routes/auth");           // s
const errorHandler = require("./middlewares/errorHandler"); // s

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // s

// n
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// n
const uploadDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, uploadDir); },
    filename: (req, file, cb) => { cb(null, Date.now() + '-' + file.originalname); }
});
const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const imageUrl = `http://localhost:8000/uploads/${req.file.filename}`;
    res.status(200).json({ url: imageUrl });
});

app.get("/api/health", (req, res) => { 
    res.status(200).json({ ok: true, message: "backend is running" });
});

app.use('/api/auth', authRouter);   // s
app.use('/api', productRoutes);    // n
app.use('/api/promo', promoRoutes); // n

// s
app.use((req, res, next) => {
    const err = new Error("API route not found");
    err.status = 404;
    next(err);
});

app.use(errorHandler);

module.exports = app;