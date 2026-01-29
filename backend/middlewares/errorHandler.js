const CustomAPIError = require("../errors");

const errorHandlerMiddleware = (err, req, res, next) => {
    const status = err.statusCode || err.status || 500;

    return res.status(status).json({
        ok: false,
        message: err.message || "Something went wrong, please try again later.",
        error: err.message || "Something went wrong, please try again later."
    });
};

module.exports = errorHandlerMiddleware;

