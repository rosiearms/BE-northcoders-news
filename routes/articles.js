const router = require('express').Router();
const { getArticles, getArticleComments } = require('../controllers');

router.get('/', getArticles);
router.get('/:article_id/comments', getArticleComments);

module.exports = router;