const router = require('express').Router();
const { getUserInfo } = require('../controllers/users');


router.get('/:username', getUserInfo);



module.exports = router;