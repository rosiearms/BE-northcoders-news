const { Users } = require('../models');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/northcoders-news-api', { useMongoClient: true });
mongoose.Promise = Promise;

function getUserInfo(req, res, next) {
  Users.find({ username: req.params.username })
    .then((profileData) => {
      if(profileData.length === 0) return next({status: 404, message: 'USERNAME NOT FOUND'});
      res.status(200).send({profileData});
    })
    .catch(err => {
      if (err) return next(err);
    });
}

module.exports = {getUserInfo};