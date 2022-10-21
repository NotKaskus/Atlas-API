const router = require('express').Router();
const { SonicSays, ChangeMyMind } = require('#controllers/imagegen/meme');

router.get('/sonic-says', async (req, res) => {
	const text = req.query.text;

	try {
		const image = await SonicSays(text);
		res.writeHead(200, { 'Content-Type': 'image/jpg' });
		res.end(image);
	} catch (err) {
		// errorResponse(req, res, err.message);
		console.log(err);
	}
});

router.get('/change-my-mind', async (req, res) => {
	const text = req.query.text;

	try {
		const image = await ChangeMyMind(text);
		res.writeHead(200, { 'Content-Type': 'image/jpg' });
		res.end(image);
	} catch (err) {
		// errorResponse(req, res, err.message);
		console.log(err);
	}
});

module.exports = router;
