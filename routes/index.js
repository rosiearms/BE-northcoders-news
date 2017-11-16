const router = require('express').Router();
const articlesRouter = require('./articles');


router.use('/', articlesRouter);



module.exports = router;