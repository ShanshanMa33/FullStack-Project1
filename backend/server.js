require("dotenv").config();
const mongoose = require('mongoose');
const app = require("./app");

const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
      console.log('Connected to MongoDB Atlas');
      app.listen(PORT, () => {
          console.log(`Server is running on: http://localhost:${PORT}`); //
      });
  })
  .catch(err => {
      console.error('MongoDB connection error:', err.message);
  });