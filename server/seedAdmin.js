const mongoose = require("mongoose");
require("dotenv").config();  // Load environment variables
const connectDB = require("./config/db");  // Import the DB connection function
const User = require("./models/User");  // Import the User model

async function seedAdmin() {
    try {
        console.log("🔄 Connecting to MongoDB...");

        // Use the existing DB connection from connectDB
        await connectDB();

        console.log("✅ Connected to MongoDB");

        // Check if an admin user already exists
        const existingAdmin = await User.findOne({ role: "admin" });
        if (existingAdmin) {
            console.log("ℹ️  Admin already exists:", existingAdmin.email);
            return process.exit(0);
        }

        // Create a new admin user
        const adminUser = new User({
            username: "admin",
            name: "Super Admin",
            role: "admin",
            email: "admin@example.com",
            password: "Admin@123",  // Plaintext for testing
            profileImage: "",
        });

        await adminUser.save();
        console.log("🎉 Admin user created:", adminUser.email);

        process.exit(0);
    } catch (err) {
        console.error("❌ Error seeding admin:", err.message);
        process.exit(1);
    }
}

seedAdmin();
