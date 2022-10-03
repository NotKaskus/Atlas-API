const { join } = require('node:path');

const getImage = (type, imageName) => {
	var imagePath;
	switch (type) {
		case 'meme':
			imagePath = join(__dirname, '..', '..', '..', 'assets', 'images', 'imagegen', 'meme', `${imageName}`);
			break;
		default:
			throw new Error(`[Atlas API]: Invalid type`);
	}
	return imagePath;
};

module.exports = getImage;
