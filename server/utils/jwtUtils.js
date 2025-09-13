const jwt = require("jsonwebtoken");

// Minimal setUser to generate and return the token
const setUser = (user) => {
    // Create token with user data excluding the password
    const { password, ...userData } = user.toObject(); // Remove the password field if it's present in the user data
    return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: "1d" }); // Token without password
};

// Minimal getUser to decode the token and return user data
const getUser = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded; // Return all user data (without password)
    } catch (error) {
        throw new Error("Invalid or expired token");
    }
};

module.exports = { setUser, getUser };
