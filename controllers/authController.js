const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); 
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Registration Error:", error);  // Logs actual error
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT,
            { expiresIn: "1d" }
        );

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Login Error:", error);  // Log the actual error
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


const logout = (req, res) => {
    res.status(200).json({ message: "User logged out successfully" });
};


module.exports = {logout , login , register}