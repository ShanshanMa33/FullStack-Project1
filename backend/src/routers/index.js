const express = require("express");

const authRoutes = require("./auth");
const productRoutes = require("./product");

const router = express.Router();

// Health check
router.get("/health", (req, res) => {
    res.status(200).json({ ok: true, message: "API is healthy" });
});

// Domain routes (placeholders for now)
router.use("/auth", authRoutes);
router.use("/products", productRoutes);

module.exports = router;
