const router = require('express').Router();
const { deleteComment, putCommentVote } = require('../controllers');


router.delete('/:comment_id', deleteComment);
router.put('/:comment_id', putCommentVote);


module.exports = router;