const jwt = require("jsonwebtoken");
const { getUser } = require("../utils/jwtUtils"); // Importing getUser utility function

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        // Use the getUser utility to decode and validate the token
        const decoded = getUser(token); // Returns the user data decoded from the token

        // Attach the decoded user data to the request object for future use (e.g., in controllers)
        req.user = decoded; // { id, role, username, email, etc. }

        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = authMiddleware;
