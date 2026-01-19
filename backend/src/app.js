/*
creating the express app
registering global middlewares
mounting the routers
registering error handlers
*/


require("dotenv").config();

const express = require("express");
const cors = require("cors");

const apiRoutes = require("./routes");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api", apiRoutes);

// 404 handler, if request reaches here, no route matched
app.use(notFound);

// Error-handling middleware
app.use(errorHandler);

module.exports = app;
