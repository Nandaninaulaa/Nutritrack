const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET = require("../config/jwtSecret");

// REGISTER
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body || {};

    if (![name, email, password].every((value) => typeof value === "string" && value.trim())) {
        return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });

    await user.save();
    res.json({ message: "User registered" });
});

// LOGIN
router.post("/login", async (req, res) => {
    const { email, password } = req.body || {};

    if (![email, password].every((value) => typeof value === "string" && value.trim())) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ id: user._id }, SECRET);

    res.json({ token });
});

module.exports = router;
