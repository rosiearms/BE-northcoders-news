const router = require('express').Router();
const articlesRouter = require('./articles');
const topicsRouter = require('./topics');
const usersRouter = require('./users');
const commentsRouter = require('./comments');


router.use('/articles', articlesRouter);
router.use('/topics', topicsRouter);  
router.use('/users', usersRouter); 
router.use('/comments', commentsRouter); 



module.exports = router;