const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const properties = require('./util/properties')
const movies = require('../backend/models/movies')
const app = express();

app.use(bodyParser.json());

app.use(cors())

app.get('/movies', (req, res) => {
    movies.find()
        .then(result => {
            return res.status(200).json(result)
        })
});

mongoose.connect(properties.mongoDBUrl)
    .then(() => {
        app.listen(3001, () => {
            console.log('listening on port 3001');
        });
    })

