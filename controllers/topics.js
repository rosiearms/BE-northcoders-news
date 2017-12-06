const { Topics, Articles } = require('../models');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/northcoders-news-api', { useMongoClient: true });
mongoose.Promise = Promise;

function getTopics(req, res, next) {
  Topics.find({})
    .then((topics) => {
      res.send({ topics });
    })
    .catch((err) => next(err));
}

function getArticlesByTopic(req, res, next) {
  Articles.find({ belongs_to: req.params.topic_id })
    .then((articles) => {
      if(articles.length === 0) return next({status: 400, message: 'TOPIC NOT FOUND'});
      res.status(200).send({articles});
    })
    .catch(err => {
      if (err) next (err);
    });    
}

module.exports = {getTopics, getArticlesByTopic };