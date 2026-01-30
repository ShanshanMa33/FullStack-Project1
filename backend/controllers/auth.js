const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const { v4: uuidv4 } = require("uuid");
const User = require("../models/User");
const CustomAPIError = require("../errors");
// const { readUsers, writeUsers } = require("../utils/fileDb");


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

        // const users = await readUsers();
        // const existingUser = users.find(user => user.email === email.trim().toLowerCase());
        const existingUser = await User.findOne({ email: email.trim().toLowerCase() });

        if (existingUser) {
            throw new CustomAPIError("Email is already registered.", 400);
        }

        const role = email.toLowerCase().endsWith("@admin.com") ? "admin" : "user";
        const hashedPassword = await bcrypt.hash(password, 10);
        // const newUser = {
        //     id: uuidv4(),
        //     email: email.trim().toLowerCase(),
        //     password: hashedPassword,
        //     role,
        //     createdAt: new Date().toISOString()
        // };

        // users.push(newUser);
        // writeUsers(users);
        await User.create({
            email: email.trim().toLowerCase(),
            password: hashedPassword,
            role
        });

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
        if (!email || !password) throw new CustomAPIError("Email and password are required.", 400);
        if (!isvalidEmail(email)) throw new CustomAPIError("Invalid email format.", 400);

        // const users = await readUsers();
        // const user = users.find(user => user.email === email.trim().toLowerCase());
        const user = await User.findOne({ email: email.trim().toLowerCase() });

        if (!user) {
            throw new CustomAPIError("Invalid email or password.", 401);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new CustomAPIError("Invalid email or password.", 401);
        }

        const tokenPayload = {
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                cart: user.cart || []
            }
        };

        const secret = process.env.JWT_SECRET || "project1_secret_key";
        const token = jwt.sign(tokenPayload, secret, { expiresIn: '60d' });

        res.status(200).json({
            ok: true,
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                cart: user.cart || []
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
            if (typeof password !== "string" || password.length === 0) {
                throw new CustomAPIError("Password is required.", 400);
            }
        }

        res.status(200).json({
            ok: true,
            message: "If this email is registered, a password reset link has been sent."
        });
    } catch (err) {
        next(err);
    }
};

const currentUser = async (req, res, next) => {
    try {
        return res.status(200).json({
            ok: true,
            user: req.user
        });
    } catch (err) {
        next(err);
    }
};

const updateCart = async (req, res) => {
    try {
        const { cart } = req.body;
        const userId = req.user.id;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { cart: cart },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Cart updated successfully",
            cart: updatedUser.cart
        });
    } catch (error) {
        console.error("Update Cart Error:", error);
        res.status(500).json({ message: "Failed to sync cart to database" });
    }
};

module.exports = {
    signup,
    login,
    logout,
    forgotPassword,
    currentUser,
    updateCart
};