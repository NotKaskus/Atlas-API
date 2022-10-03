const router = require('express').Router();

router.use('/imagegen', require('./imagegen/index'));

module.exports = router;
