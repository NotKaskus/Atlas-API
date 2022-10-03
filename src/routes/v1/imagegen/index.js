const router = require('express').Router();

router.use('/meme', require('./meme/index'));

module.exports = router;
