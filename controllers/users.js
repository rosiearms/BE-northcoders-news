const { Users } = require('../models');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/northcoders-news-api', { useMongoClient: true });
mongoose.Promise = Promise;

function getUserInfo(req, res, next) {
  Users.findOne({ username: req.params.username })
      .then((profileData) => {
          res.send(profileData)
      })
      .catch((err) => next(err));
}

module.exports = {getUserInfo};