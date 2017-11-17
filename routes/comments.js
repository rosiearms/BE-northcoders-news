const router = require('express').Router();
const { deleteComment } = require('../controllers');


router.delete('/:comment_id', deleteComment);


module.exports = router;