const movies = require('../../backend/models/movies')
const savedMovie = require('../../backend/models/saved_movies')

exports.getAllMovies = (req, res) => {
    movies.find()
        .then(result => {
            return res.status(200).json(result)
        })
}

exports.saveMovie = (cid, title_id) => {
    saved_movie = savedMovie()
    saved_movie.infuraUrl = 'https://web3-streaming.infura-ipfs.io/ipfs/' + cid
    saved_movie.movie = title_id
    saved_movie.save()
}