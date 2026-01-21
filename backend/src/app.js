/*
creating the express app
registering global middlewares
mounting the routers
registering error handlers
*/


require("dotenv").config();

const express = require("express");
const cors = require("cors");

const apiRoutes = require("./routers");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const authRouter = require("./routers/auth");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/health", (req, res) => {
    res.status(200).json({ ok: true, message: "backend is running" });
});

app.use("/api/auth", authRouter);

// 404 handler, if request reaches here, no route matched
app.use((req, res, next) => {
    const err = new Error("API route not found");
    err.status = 404;
    next(err);
});

// Error-handling middleware
app.use(errorHandler);

module.exports = app;
