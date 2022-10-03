const router = require('express').Router();

router.get('/', (req, res) => {});

router.get('/api', (req, res) => {
	res.redirect('/api/v1');
});

router.use('/api/v1', require('#routes/v1/index'));

module.exports = router;
