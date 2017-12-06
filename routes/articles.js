const router = require('express').Router();
const { getArticles, getArticleComments, postArticleComment, putArticleVote, getSingleArticle } = require('../controllers/articles');

router.get('/', getArticles);
router.get('/:article_id/comments', getArticleComments);
router.get('/:article_id', getSingleArticle);
router.post('/:article_id/comments', postArticleComment);
router.put('/:article_id', putArticleVote);

module.exports = router;