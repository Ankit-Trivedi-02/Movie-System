const Movie = require("../models/Movie");

// @desc    Create a new movie (admin only)
exports.createMovie = async (req, res) => {
    try {
        const {
            title,
            genres,
            keywords,
            director,
            cast,
            description,
            releaseDate,
            posterUrl,
            cardUrl,
            trailerUrl,
        } = req.body;

        // Check if movie already exists
        const existingMovie = await Movie.findOne({ title });
        if (existingMovie) {
            return res.status(400).json({ message: "Movie already exists" });
        }

        const newMovie = new Movie({
            title,
            genres,
            keywords,
            director,
            cast,
            description,
            releaseDate,
            posterUrl,
            cardUrl,
            trailerUrl,
        });

        await newMovie.save();

        return res.status(201).json({
            message: "🎬 Movie created successfully",
            movie: newMovie,
        });
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Error creating movie", error: err.message });
    }
};

// @desc    Get all movies
exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find().sort({ createdAt: -1 });
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({ message: "Error fetching movies", error: err.message });
    }
};

// @desc    Get a single movie by ID
exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json({ message: "Error fetching movie", error: err.message });
    }
};
