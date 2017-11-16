
const { Articles, Comments } = require('../models/models');
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

function getArticleComments(req, res, next) {
    Comments.find({ belongs_to: req.params.article_id })
        .then((comments) => {
            res.send({ comments })
        })
        .catch(err => {
            if(err.name === 'CastError') next({status: 404, message: 'ARTICLE_ID NOT FOUND'});
            else next(err);
          });    
}


module.exports = { getArticles, getArticleComments };