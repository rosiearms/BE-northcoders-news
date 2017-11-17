
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

function postArticleComment(req, res, next) {
    let articleId = req.params.article_id;
    let comment = req.body
    let newComment = new Comments({
        body: comment.body,
        belongs_to: articleId
    })
        .save()
        .then((newComment) => {
            res.send(newComment)
        })
        .catch((err) => next(err));
}

function putArticleVote(req, res, next) {
    let inc = 0;
    if (req.query.vote === 'up') inc = 1;
    else if (req.query.vote === 'down') inc = -1;
    Articles.findByIdAndUpdate(req.params.article_id, { $inc: { votes: inc } }, { new: true })
        .then((vote) => {
            res.send({ vote })
        })
        .catch((err) => next(err));
}


module.exports = { getArticles, getArticleComments, postArticleComment, putArticleVote };