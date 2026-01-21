const CustomAPIError = require("../errors");

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({
            ok: false,
            error: err.message
        });
    }

    return res
        .status(err.statusCode || 500)
        .json({
            ok: false,
            error: err.message || "Something went wrong, please try again later."
        })
};

module.exports = errorHandlerMiddleware;

