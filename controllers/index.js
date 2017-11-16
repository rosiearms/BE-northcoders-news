
const { Articles } = require('../models/models');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/northcoders-news-api', { useMongoClient: true });
mongoose.Promise = Promise;


function getArticles(req, res, next) {
    Articles.find({})
        .then((articles) => {
            res.send({ articles })
        })
        .catch((err) => next(err));

}


module.exports = { getArticles };