// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Use environment variable for the database URI
        const dbURI = process.env.DB_URI;

        // Connect to MongoDB using mongoose
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit the process with a failure code
    }
};

module.exports = connectDB;
