const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    review: {
        type: String,
        maxlength: 1000,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Ensure one user can review a movie only once
reviewSchema.index({ userId: 1, movieId: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);
