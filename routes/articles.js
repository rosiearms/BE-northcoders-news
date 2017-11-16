const router = require('express').Router();
const { getArticles, getArticleComments, postArticleComment } = require('../controllers');

router.get('/', getArticles);
router.get('/:article_id/comments', getArticleComments);
router.post('/:article_id/comments', postArticleComment);

module.exports = router;