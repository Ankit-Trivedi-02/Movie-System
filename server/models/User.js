const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    profileImage: {
        type: String,
        default: "",
    },
    phoneNumber: {
        type: String,
        unique: true,
        sparse: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    preferredGenres: [
        {
            type: String,
        },
    ],
    ratedMovies: [
        {
            movieId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Movie",
            },
            rating: {
                type: Number,
                min: 1,
                max: 5,
            },
            reviewedAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],

    watchList: [ {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Movie",
        },
    ],
    favorites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Movie",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("User", userSchema);
