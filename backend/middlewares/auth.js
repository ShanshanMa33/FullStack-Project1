const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token =
        req.header("auth-token") ||
        (req.headers?.authorization?.startsWith("Bearer ")
            ? req.headers.authorization.slice(7)
            : "");

    if (!token) {
        return res.status(401).json({
            ok: false,
            error: "Access denied. No token provided."
        });
    }

    try {
        const secret = process.env.JWT_SECRET || "project1_secret_key";
        const decoded = jwt.verify(token, secret);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({
            ok: false,
            error: "Invalid token."
        });
    }
}