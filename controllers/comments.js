const { Comments } = require('../models');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/northcoders-news-api', { useMongoClient: true });
mongoose.Promise = Promise;


  function deleteComment(req, res, next) {
    Comments.findByIdAndRemove(req.params.comment_id)
        .then(() => {
            res.send({ message: 'deleted' })
        })
        .catch((err) => next(err));
}

function putCommentVote(req, res, next) {
  let inc = 0;
  if (req.query.vote === 'up') inc = 1;
  else if (req.query.vote === 'down') inc = -1;
  Comments.findByIdAndUpdate(req.params.comment_id, { $inc: { votes: inc } }, { new: true })
      .then((vote) => {
          res.send({ vote })
      })
      .catch((err) => next(err));
}

module.exports = { deleteComment, putCommentVote }