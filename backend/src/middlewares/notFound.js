module.exports = (req, res, next) => {
    res.status(404).json({
        ok: false,
        error: "Resource not found"
    });
};
