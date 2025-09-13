require('dotenv').config(); // Load environment variables
const express = require('express');


const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests

// MongoDB Connection


// JWT Middleware (simple example)


// Protected route (requires JWT)
app.get('/', (req, res) => {
    res.json({sever: "is running"});
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
