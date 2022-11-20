const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const multer = require("multer");
const fs = require('fs')

const properties = require('./util/properties')
const addFiletoIPFS = require('../backend/services/infura')
const { getAllMovies, saveMovie, getSavedMovies } = require("../backend/services/db_service")

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
const upload = multer({ dest: "uploads/" });

app.get('/movies', getAllMovies);

app.get('/saved_movies', getSavedMovies);

app.post('/movie/upload', upload.single('movie'), async (req, res) => {
    const title_id = req.body.title_id
    const ipfs_res = await addFiletoIPFS(req.file)
    saveMovie(ipfs_res.cid, title_id)
    fs.unlink(req.file.path, (err) => {
        if (err) {
            console.error(err)
            return
        }
    })
    return res.status(200).json({ ipfs_hash: ipfs_res.cid + '' })
})

mongoose.connect(properties.mongoDBUrl)
    .then(() => {
        app.listen(3001, () => {
            console.log('listening on port 3001');
        });
    })

