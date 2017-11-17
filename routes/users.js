const router = require('express').Router();
const { getUserInfo } = require('../controllers');


router.get('/:username', getUserInfo);



module.exports = router;