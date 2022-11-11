const movies = require('../../backend/models/movies')
const savedMovie = require('../../backend/models/saved_movies')

exports.getAllMovies = (req, res) => {
    movies.find()
        .then(result => {
            return res.status(200).json(result)
        })
}

exports.saveMovie = (cid, movie_id) => {
    saved_movie = savedMovie()
    saved_movie.cid = cid
    saved_movie.movie_id = movie_id
    saved_movie.save()
}