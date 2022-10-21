const router = require('express').Router();
const { SonicSays, ChangeMyMind, LookAtThisPhotograph, ThisGuy } = require('#controllers/imagegen/meme');

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

router.get('/look-at-this-photograph', async (req, res) => {
	const picture = req.query.image;

	try {
		const image = await LookAtThisPhotograph(picture);
		res.writeHead(200, { 'Content-Type': 'image/jpg' });
		res.end(image);
	} catch (err) {
		// errorResponse(req, res, err.message);
		console.log(err);
	}
});

router.get('/this-guy', async (req, res) => {
	const picture = req.query.image;

	try {
		const image = await ThisGuy(picture);
		res.writeHead(200, { 'Content-Type': 'image/jpg' });
		res.end(image);
	} catch (err) {
		// errorResponse(req, res, err.message);
		console.log(err);
	}
});

module.exports = router;
