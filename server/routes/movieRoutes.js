const express = require("express");
const { createMovie, getMovies, getMovieById } = require("../controllers/movieController");
const authMiddleware = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");

const router = express.Router();

// Public routes
router.get("/", getMovies); // Get all movies
router.get("/:id", getMovieById); // Get movie by ID

// Protected admin-only route
router.post("/", authMiddleware, isAdmin, createMovie);

module.exports = router;
