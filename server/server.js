const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes");

const app = express();
app.use(express.json());

// DB connection
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);

app.get("/", (req, res) => {
  res.json({ server: "is running" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
