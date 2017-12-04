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

function getArticlesByTopic(req, res) {
  Articles.find({ belongs_to: req.params.topic_id })
    .then((articles) => {
      res.send({ articles });
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = {getTopics, getArticlesByTopic };