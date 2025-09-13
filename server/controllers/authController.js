const User = require("../models/User");
const { setUser, getUser } = require("../utils/jwtUtils"); // Importing the utility functions

// Register new user
exports.register = async (req, res) => {
    try {
        const { username, name, email, password, preferredGenres } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create new user with plain text password and preferred genres
        const newUser = new User({
            username,
            name,
            email,
            password, // Plain text password
            role: "user",
            preferredGenres, // Add preferred genres to the user
        });

        // Save the new user to the database
        await newUser.save();

        // Generate JWT token using the setUser utility function
        const token = setUser(newUser);

        return res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                role: newUser.role,
                email: newUser.email,
                name: newUser.name,
                preferredGenres: newUser.preferredGenres, // Return preferred genres
            },
        });
    } catch (err) {
        return res.status(500).json({ message: "Error registering user", error: err.message });
    }
};

// Login user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT token using the setUser utility function
        const token = setUser(user);

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                role: user.role,
                email: user.email,
                name: user.name,
                preferredGenres: user.preferredGenres, // Return preferred genres
            },
        });
    } catch (err) {
        return res.status(500).json({ message: "Error logging in", error: err.message });
    }
};
