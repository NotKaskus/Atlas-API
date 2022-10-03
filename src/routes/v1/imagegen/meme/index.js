const router = require('express').Router();

router.use('/sonic-says', require('./sonic-says'));

module.exports = router;
