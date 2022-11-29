const movies = require('../models/movies')
const savedMovie = require('../models/saved_movies')

exports.getAllMovies = async (req, res) => {
    const result = await movies.find()
    return res.status(200).json(result)
}

exports.saveMovie = (cid, title_id) => {
    saved_movie = savedMovie()
    saved_movie.infuraUrl = 'https://web3-streaming.infura-ipfs.io/ipfs/' + cid
    saved_movie.movie = title_id
    saved_movie.save()
}

exports.getSavedMovies = async (req, res) => {
    const result = await savedMovie.find().populate('movie')
    return res.status(200).json(result)
}