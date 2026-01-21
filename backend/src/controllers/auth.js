const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const CustomAPIError = require("../errors");
const { readUsers, writeUsers } = require("../utils/fileDb");


function isvalidEmail(email) {
    return typeof email === "string" && /^\S+@\S+\.\S+$/.test(email.trim());
}

const signup = async (req, res, next) => {
    try {
        const { email, password } = req.body || {};

        if (!isvalidEmail(email)) {
            throw new CustomAPIError("Invalid email format.", 400);
        }

        if (typeof password !== "string" || password.length < 6) {
            throw new CustomAPIError("Password must be at least 6 characters long.", 400);
        }

        const users = await readUsers();
        const existingUser = users.find(user => user.email === email.trim().toLowerCase());

        if (existingUser) {
            throw new CustomAPIError("Email is already registered.", 400);
        }

        const role = email.toLowerCase().endsWith("@admin.com") ? "admin" : "user";
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            id: uuidv4(),
            email: email.trim().toLowerCase(),
            password: hashedPassword,
            role,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        writeUsers(users);

        res.status(201).json({
            ok: true,
            message: "User registered successfully."
        });
    } catch (err) {
        next(err);
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body || {};

        if (!isvalidEmail(email)) throw new CustomAPIError("Invalid email format.", 400);
        if (typeof password !== "string" || password.length === 0) {
            throw new CustomAPIError("Password is required.", 400);
        }

        const users = await readUsers();
        const user = users.find(user => user.email === email.trim().toLowerCase());

        if (!user) {
            throw new CustomAPIError("Invalid email or password.", 401);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new CustomAPIError("Invalid email or password.", 401);
        }

        const tokenPayload = {
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        };

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "60d" });

        res.status(200).json({
            ok: true,
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        next(err);
    }
};

const logout = async (req, res, next) => {
    try {
        // Since JWT is stateless, logout can be handled on the client side by deleting the token.
        res.status(200).json({
            ok: true,
            message: "User logged out successfully."
        });
    } catch (err) {
        next(err);
    }
};

const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body || {};

        if (!isvalidEmail(email)) {
            throw new CustomAPIError("Invalid email format.", 400);
        }

        res.status(200).json({
            ok: true,
            message: "If this email is registered, a password reset link has been sent."
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    signup,
    login,
    logout,
    forgotPassword
};