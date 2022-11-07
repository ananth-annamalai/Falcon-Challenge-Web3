const mongoose = require('mongoose')

const Schema = mongoose.Schema

const movieSchema = new Schema({
    title_id: Number,
    title: String,
    genres: [String],
    poster: String,
    release_dt: Date,
    overview: String
})

module.exports = mongoose.model("all_movies", movieSchema);