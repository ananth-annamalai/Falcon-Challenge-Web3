const mongoose = require('mongoose')

const Schema = mongoose.Schema

const savedMovieSchema = new Schema({
    infuraUrl: String,
    movie: { type: Schema.Types.ObjectId, ref: 'all_movies' }

})

module.exports = mongoose.model("saved_movies", savedMovieSchema);