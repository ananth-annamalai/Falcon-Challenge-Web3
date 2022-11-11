const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const multer = require("multer");

const properties = require('./util/properties')
const addFiletoIPFS = require('../backend/services/infura')
const { getAllMovies, saveMovie } = require("../backend/services/db_service")

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
const upload = multer({ dest: "uploads/" });

app.get('/movies', getAllMovies);

app.post('/movie/upload', upload.single('movie'), async (req, res) => {
    const movie_id = req.body.movie_id
    const cid = await addFiletoIPFS(req.file)
    console.log(cid)
    saveMovie(cid, movie_id)
    fs.unlink(req.file.path, (err) => {
        if (err) {
            console.error(err)
            return
        }
    })
    return res.status(200).json("Sucess")
})

mongoose.connect(properties.mongoDBUrl)
    .then(() => {
        app.listen(3001, () => {
            console.log('listening on port 3001');
        });
    })

