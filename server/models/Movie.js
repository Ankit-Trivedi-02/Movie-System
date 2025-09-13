const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true, // fast search
    },
    genres: [
        {
            type: String,
            required: true,
        },
    ],
    keywords: [
        {
            type: String,
            index: true,
        },
    ],
    director: {
        type: String,
    },
    cast: [
        {
            name: String,
            role: String,
        },
    ],
    description: {
        type: String,
    },
    releaseDate: {
        type: Date,
    },
    posterUrl: {
        type: String,
    },
    cardUrl: {
        type: String,
    },
    trailerUrl: {
        type: String,
    },
    avgRating: {
        type: Number,
        default: 0,
    },
    popularityScore: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Pre-save hook to round avgRating
movieSchema.pre("save", function (next) {
    if (this.avgRating) {
        this.avgRating = Math.round(this.avgRating * 10) / 10; // 4.36 → 4.4
    }
    next();
});

module.exports = mongoose.model("Movie", movieSchema);
