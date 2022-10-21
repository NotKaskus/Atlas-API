const router = require('express').Router();

router.use('/meme', require('./meme'));

module.exports = router;
