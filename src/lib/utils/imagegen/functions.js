const { createCanvas } = require('canvas');

function contrast(ctx, x, y, width, height) {
	const data = ctx.getImageData(x, y, width, height);
	const factor = 259 / 100 + 1;
	const intercept = 128 * (1 - factor);
	for (let i = 0; i < data.data.length; i += 4) {
		data.data[i] = data.data[i] * factor + intercept;
		data.data[i + 1] = data.data[i + 1] * factor + intercept;
		data.data[i + 2] = data.data[i + 2] * factor + intercept;
	}
	ctx.putImageData(data, x, y);
	return ctx;
}

function desaturate(ctx, level, x, y, width, height) {
	const data = ctx.getImageData(x, y, width, height);
	for (let i = 0; i < height; i++) {
		for (let j = 0; j < width; j++) {
			const dest = (i * width + j) * 4;
			const grey = Number.parseInt(0.2125 * data.data[dest] + 0.7154 * data.data[dest + 1] + 0.0721 * data.data[dest + 2], 10);
			data.data[dest] += level * (grey - data.data[dest]);
			data.data[dest + 1] += level * (grey - data.data[dest + 1]);
			data.data[dest + 2] += level * (grey - data.data[dest + 2]);
		}
	}
	ctx.putImageData(data, x, y);
	return ctx;
}

function drawImageWithTint(ctx, image, color, x, y, width, height) {
	const { fillStyle, globalAlpha } = ctx;
	ctx.fillStyle = color;
	ctx.drawImage(image, x, y, width, height);
	ctx.globalAlpha = 0.5;
	ctx.fillRect(x, y, width, height);
	ctx.fillStyle = fillStyle;
	ctx.globalAlpha = globalAlpha;
	return ctx;
}

function greyscale(ctx, x, y, width, height) {
	const data = ctx.getImageData(x, y, width, height);
	for (let i = 0; i < data.data.length; i += 4) {
		const brightness = 0.34 * data.data[i] + 0.5 * data.data[i + 1] + 0.16 * data.data[i + 2];
		data.data[i] = brightness;
		data.data[i + 1] = brightness;
		data.data[i + 2] = brightness;
	}
	ctx.putImageData(data, x, y);
	return ctx;
}

function silhouetteImage(image) {
	if (!hasAlpha(image)) return image;
	const canvas = createCanvas(image.width, image.height);
	const ctx = canvas.getContext('2d');
	ctx.drawImage(image, 0, 0);
	silhouette(ctx, 0, 0, image.width, image.height);
	return canvas;
}

function silhouette(ctx, x, y, width, height) {
	const data = ctx.getImageData(x, y, width, height);
	for (let i = 0; i < data.data.length; i += 4) {
		data.data[i] = 0;
		data.data[i + 1] = 0;
		data.data[i + 2] = 0;
	}
	ctx.putImageData(data, x, y);
	return ctx;
}

function hasAlpha(image) {
	const canvas = createCanvas(image.width, image.height);
	const ctx = canvas.getContext('2d');
	ctx.drawImage(image, 0, 0);
	const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
	let hasAlphaPixels = false;
	for (let i = 3; i < data.data.length; i += 4) {
		if (data.data[i] < 255) {
			hasAlphaPixels = true;
			break;
		}
	}
	return hasAlphaPixels;
}

function centerImagePart(data, maxWidth, maxHeight, widthOffset, heightOffest) {
	let { width, height } = data;
	if (width > maxWidth) {
		const ratio = maxWidth / width;
		width = maxWidth;
		height *= ratio;
	}
	if (height > maxHeight) {
		const ratio = maxHeight / height;
		height = maxHeight;
		width *= ratio;
	}
	const x = widthOffset + (maxWidth / 2 - width / 2);
	const y = heightOffest + (maxHeight / 2 - height / 2);
	return { x, y, width, height };
}

function wrapText(ctx, text, maxWidth) {
	return new Promise(resolve => {
		if (ctx.measureText(text).width < maxWidth) return resolve([text]);
		if (ctx.measureText('W').width > maxWidth) return resolve(null);
		const words = text.split(' ');
		const lines = [];
		let line = '';
		while (words.length > 0) {
			let split = false;
			while (ctx.measureText(words[0]).width >= maxWidth) {
				const temp = words[0];
				words[0] = temp.slice(0, -1);
				if (split) {
					words[1] = `${temp.slice(-1)}${words[1]}`;
				} else {
					split = true;
					words.splice(1, 0, temp.slice(-1));
				}
			}
			if (ctx.measureText(`${line}${words[0]}`).width < maxWidth) {
				line += `${words.shift()} `;
			} else {
				lines.push(line.trim());
				line = '';
			}
			if (words.length === 0) lines.push(line.trim());
		}
		return resolve(lines);
	});
}

function shortenText(ctx, text, maxWidth) {
	let shorten = false;
	while (ctx.measureText(`${text}...`).width > maxWidth) {
		if (!shorten) shorten = true;
		text = text.substr(0, text.length - 1);
	}
	return shorten ? `${text}...` : text;
}

module.exports = {
	shortenText,
	wrapText,
	centerImagePart,
	hasAlpha,
	silhouette,
	silhouetteImage,
	greyscale,
	drawImageWithTint,
	desaturate,
	contrast,
};
