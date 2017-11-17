const router = require('express').Router();
const { getArticles, getArticleComments, postArticleComment, putArticleVote } = require('../controllers');

router.get('/', getArticles);
router.get('/:article_id/comments', getArticleComments);
router.post('/:article_id/comments', postArticleComment);
router.put('/:article_id', putArticleVote);

module.exports = router;