const router = require('express').Router();
const { getArticles } = require('../controllers');

router.get('/articles', getArticles);


module.exports = router;