const { join } = require('node:path');
const { createCanvas, loadImage } = require('canvas');
const getImage = require('#util/imagegen/getImage');
const request = require('node-superfetch');
const { wrapText, centerImagePart, silhouetteImage, drawImageWithTint, greyscale } = require('#util/imagegen/functions');
const isImageUrl = require('is-image-url');

const SonicSays = async text => {
	const base = await loadImage(getImage('meme', 'sonic-says.png'));
	const canvas = createCanvas(base.width, base.height);
	const ctx = canvas.getContext('2d');
	ctx.textBaseline = 'top';
	ctx.drawImage(base, 0, 0);
	ctx.font = '24px Noto Regular';
	let fontSize = 24;
	while (ctx.measureText(text).width > 648) {
		fontSize--;
		ctx.font = `${fontSize}px Noto Regular`;
	}
	const lines = await wrapText(ctx, text, 185);
	ctx.fillStyle = 'white';
	ctx.fillText(lines.join('\n'), 92, 67, 185);
	return canvas.toBuffer();
};

const ChangeMyMind = async text => {
	const base = await loadImage(join(__dirname, '..', 'resources', 'assets', 'images', 'change-my-mind.png'));
	const canvas = createCanvas(base.width, base.height);
	const ctx = canvas.getContext('2d');
	ctx.textBaseline = 'top';
	ctx.drawImage(base, 0, 0);
	ctx.rotate(-24 * (Math.PI / 180));
	ctx.font = '35px Noto Regular';
	let fontSize = 35;
	while (ctx.measureText(text).width > 843) {
		fontSize--;
		ctx.font = `${fontSize}px Noto Regular`;
	}
	const lines = await wrapText(ctx, text, 337);
	ctx.fillText(lines.join('\n'), 142, 430, 337);
	ctx.rotate(24 * (Math.PI / 180));
	return canvas.toBuffer();
};

const DistractedBF = async (otherGirlAvatarURL, boyfriendAvatarURL, girlfriendAvatarURL) => {
	if (!isImageUrl(otherGirlAvatarURL) || !isImageUrl(boyfriendAvatarURL) || !isImageUrl(girlfriendAvatarURL)) return 0;
	const base = await loadImage(join(__dirname, '..', 'resources', 'assets', 'images', 'distracted-boyfriend.png'));
	const boyfriendAvatarData = await request.get(boyfriendAvatarURL);
	const boyfriendAvatar = await loadImage(boyfriendAvatarData.body);
	const girlfriendAvatarData = await request.get(girlfriendAvatarURL);
	const girlfriendAvatar = await loadImage(girlfriendAvatarData.body);
	const otherGirlAvatarData = await request.get(otherGirlAvatarURL);
	const otherGirlAvatar = await loadImage(otherGirlAvatarData.body);
	const canvas = createCanvas(base.width, base.height);
	const ctx = canvas.getContext('2d');
	ctx.drawImage(base, 0, 0);
	ctx.rotate(-18.06 * (Math.PI / 180));
	ctx.drawImage(boyfriendAvatar, 290, 165, 125, 125);
	ctx.rotate(18.06 * (Math.PI / 180));
	ctx.rotate(3.11 * (Math.PI / 180));
	ctx.drawImage(girlfriendAvatar, 539, 67, 100, 125);
	ctx.rotate(-3.11 * (Math.PI / 180));
	ctx.drawImage(otherGirlAvatar, 120, 96, 175, 175);
	return canvas.toBuffer();
};

const LookAtThisPhotograph = async image => {
	if (!isImageUrl(image)) return 0;
	const base = await loadImage(join(__dirname, '..', 'resources', 'assets', 'images', 'look-at-this-photograph.png'));
	const { body } = await request.get(image);
	const data = await loadImage(body);
	const canvas = createCanvas(base.width, base.height);
	const ctx = canvas.getContext('2d');
	ctx.drawImage(base, 0, 0);
	ctx.rotate(-13.5 * (Math.PI / 180));
	ctx.drawImage(data, 280, 218, 175, 125);
	ctx.rotate(13.5 * (Math.PI / 180));
	return canvas.toBuffer();
};

const NikeAd = async (image, something, sacrifice) => {
	if (!isImageUrl(image)) return 0;
	const base = await loadImage(join(__dirname, '..', 'resources', 'assets', 'images', 'nike-ad.png'));
	const { body } = await request.get(image);
	const data = await loadImage(body);
	const canvas = createCanvas(data.width, data.height);
	const ctx = canvas.getContext('2d');
	drawImageWithTint(ctx, data, 'black', 0, 0, data.width, data.height);
	greyscale(ctx, 0, 0, data.width, data.height);
	const ratio = base.width / base.height;
	const width = data.width / 3;
	const height = Math.round(width / ratio);
	ctx.drawImage(base, data.width / 2 - width / 2, data.height - height, width, height);
	const fontSize = Math.round(data.height / 25);
	ctx.font = `${fontSize}px Noto Regular`;
	ctx.fillStyle = 'white';
	ctx.textAlign = 'center';
	const lines = await wrapText(ctx, `Believe in ${something}. Even if it means ${sacrifice}.`, data.width - 20);
	if (!lines) return 406;
	const initial = data.height / 2;
	for (let i = 0; i < lines.length; i++) {
		const textHeight = initial + i * fontSize + i * 10;
		ctx.fillText(lines[i], data.width / 2, textHeight);
	}
	return canvas.toBuffer();
};

const ThisGuy = async image => {
	if (!isImageUrl(image)) return 0;
	const base = await loadImage(join(__dirname, '..', 'resources', 'assets', 'images', 'this-guy.png'));
	const { body } = await request.get(image);
	const data = await loadImage(body);
	const canvas = createCanvas(base.width, base.height);
	const ctx = canvas.getContext('2d');
	ctx.drawImage(base, 0, 0);
	const { x, y, width, height } = centerImagePart(data, 361, 361, 76, 62);
	ctx.drawImage(data, x, y, width, height);
	return canvas.toBuffer();
};

const Enslaved = async (name, image) => {
	if (isImageUrl(image)) return 0;
	const base = await loadImage(join(__dirname, '..', 'resources', 'assets', 'images', 'enslaved.png'));
	const { body } = await request.get(image);
	const data = await loadImage(body);
	const canvas = createCanvas(base.width, base.height);
	const ctx = canvas.getContext('2d');
	ctx.drawImage(base, 0, 0);
	const { x, y, width, height } = centerImagePart(data, 200, 200, 254, 145);
	ctx.drawImage(data, x, y, width, height);
	ctx.textBaseline = 'top';
	ctx.textAlign = 'center';
	ctx.fillStyle = 'white';
	ctx.font = '50px Noto Regular';
	ctx.fillText(name.toLowerCase(), 365, 400, 240);
	return canvas.toBuffer();
};

const Pills = async text => {
	const base = await loadImage(join(__dirname, '..', 'resources', 'assets', 'images', 'pills.png'));
	const canvas = createCanvas(base.width, base.height);
	const ctx = canvas.getContext('2d');
	ctx.drawImage(base, 0, 0);
	ctx.textAlign = 'center';
	ctx.textBaseline = 'top';
	ctx.font = '32px Noto Regular';
	let fontSize = 32;
	while (ctx.measureText(text).width > 1260) {
		fontSize--;
		ctx.font = `${fontSize}px Noto Regular`;
	}
	const lines = await wrapText(ctx, text, 280);
	const topMost = 455 - ((fontSize * lines.length) / 2 + (10 * (lines.length - 1)) / 2);
	for (let i = 0; i < lines.length; i++) {
		ctx.strokeStyle = 'white';
		ctx.lineWidth = 5;
		const height = topMost + (fontSize + 10) * i;
		ctx.strokeText(lines[i], 183, height);
		ctx.fillText(lines[i], 183, height);
	}
};

const Pogchamp = async amount => {
	const pog = await loadImage(join(__dirname, '..', 'resources', 'assets', 'images', 'pogchamp.png'));
	const rows = Math.ceil(amount / 10);
	const canvas = createCanvas(pog.width * (rows > 1 ? 10 : amount), pog.height * rows);
	const ctx = canvas.getContext('2d');
	let width = 0;
	for (let i = 0; i < amount; i++) {
		const row = Math.ceil((i + 1) / 10);
		ctx.drawImage(pog, width, pog.height * (row - 1));
		if (width + pog.width === pog.width * (rows > 1 ? 10 : amount)) width = 0;
		else width += pog.width;
	}
	return canvas.toBuffer();
};

const TwoButtons = async (first, second) => {
	const base = await loadImage(join(__dirname, '..', 'resources', 'assets', 'images', 'two-buttons.png'));
	const canvas = createCanvas(base.width, base.height);
	const ctx = canvas.getContext('2d');
	ctx.textBaseline = 'top';
	ctx.drawImage(base, 0, 0);
	ctx.rotate(-12 * (Math.PI / 180));
	ctx.font = '34px Noto Regular';
	let fontSize = 34;
	while (ctx.measureText(first).width > 366) {
		fontSize--;
		ctx.font = `${fontSize}px Noto Regular`;
	}
	const firstLines = await wrapText(ctx, first, 183);
	let lineOffset = 0;
	for (let i = 0; i < firstLines.length; i++) {
		ctx.fillText(firstLines[i], 25 + lineOffset, 116 + fontSize * i + 10 * i, 183);
		lineOffset += 5;
	}
	ctx.font = '34px Noto Regular';
	fontSize = 34;
	while (ctx.measureText(second).width > 244) {
		fontSize--;
		ctx.font = `${fontSize}px Noto Regular`;
	}
	const secondLines = await wrapText(ctx, second, 118);
	lineOffset = 0;
	for (let i = 0; i < secondLines.length; i++) {
		ctx.fillText(secondLines[i], 254 + lineOffset, 130 + fontSize * i + 10 * i, 118);
		lineOffset += 5;
	}
	ctx.rotate(12 * (Math.PI / 180));
	return canvas.toBuffer();
};

const BoardroomMeeting = async (question, suggestion1, suggestion2, final) => {
	const base = await loadImage(join(__dirname, '..', 'resources', 'assets', 'images', 'boardroom-meeting.png'));
	const canvas = createCanvas(base.width, base.height);
	const ctx = canvas.getContext('2d');
	ctx.drawImage(base, 0, 0);
	ctx.textBaseline = 'top';
	ctx.font = '25px Noto Regular';
	ctx.fillText(question, 153, 8, 300);
	ctx.font = '15px Noto Regular';
	ctx.fillText(suggestion1, 30, 251, 90);
	ctx.fillText(suggestion2, 167, 258, 75);
	ctx.fillText(final, 310, 269, 130);
	return canvas.toBuffer();
};

const Alert = async message => {
	const base = await loadImage(join(__dirname, '..', 'resources', 'assets', 'images', 'alert.png'));
	const canvas = createCanvas(base.width, base.height);
	const ctx = canvas.getContext('2d');
	ctx.drawImage(base, 0, 0);
	ctx.font = '30px SF Pro Display Medium';
	ctx.fillStyle = '#1f1f1f';
	ctx.textBaseline = 'top';
	let text = await wrapText(ctx, message, 540);
	text = text.length > 3 ? `${text.slice(0, 3).join('\n')}...` : text.join('\n');
	ctx.fillText(text, 48, 178);
	return canvas.toBuffer();
};

const WorseThanHitler = async image => {
	if (!isImageUrl(image)) return 0;
	const base = await loadImage(join(__dirname, '..', 'resources', 'assets', 'images', 'worse-than-hitler.png'));
	const { body } = await request.get(image);
	const avatar = await loadImage(body);
	const canvas = createCanvas(base.width, base.height);
	const ctx = canvas.getContext('2d');
	ctx.drawImage(base, 0, 0);
	ctx.drawImage(avatar, 47, 42, 140, 140);
	return canvas.toBuffer();
};

const ToBeContinued = async image => {
	if (!isImageUrl(image)) return 0;
	const base = await loadImage(join(__dirname, '..', 'resources', 'assets', 'images', 'to-be-continued.png'));
	const { body } = await request.get(image);
	const data = await loadImage(body);
	const canvas = createCanvas(data.width, data.height);
	const ctx = canvas.getContext('2d');
	drawImageWithTint(ctx, data, '#704214', 0, 0, data.width, data.height);
	const ratio = base.width / base.height;
	const width = canvas.width / 2;
	const height = Math.round(width / ratio);
	ctx.drawImage(base, 0, canvas.height - height, width, height);
	return canvas.toBuffer();
};

const VietnamFlashbacks = async image => {
	if (!isImageUrl(image)) return 0;
	const base = await loadImage(join(__dirname, '..', 'resources', 'assets', 'images', 'vietnam-flashbacks.png'));
	const { body } = await request.get(image);
	const data = await loadImage(body);
	const canvas = createCanvas(data.width, data.height);
	const ctx = canvas.getContext('2d');
	const ratio = base.width / base.height;
	const width = Math.round(data.height * ratio);
	ctx.drawImage(base, data.width / 2 - width / 2, 0, width, data.height);
	ctx.globalAlpha = 0.675;
	ctx.drawImage(data, 0, 0);
	return canvas.toBuffer();
};

const Challenger = async (image, silhouetted) => {
	if (!isImageUrl(image)) return 0;
	const truthy = new Set(['true', 't', 'yes', 'y', 'on', 'enable', 'enabled', '1', '+']);
	const falsy = new Set(['false', 'f', 'no', 'n', 'off', 'disable', 'disabled', '0', '-']);
	if (truthy.has(silhouetted)) silhouetted = true;
	if (falsy.has(silhouetted)) silhouetted = false;
	const base = await loadImage(join(__dirname, '..', 'resources', 'assets', 'images', 'challenger.png'));
	const { body } = await request.get(image);
	const data = await loadImage(body);
	const canvas = createCanvas(base.width, base.height);
	const ctx = canvas.getContext('2d');
	ctx.drawImage(base, 0, 0);
	const { x, y, width, height } = centerImagePart(data, 256, 256, 484, 98);
	ctx.drawImage(silhouetted ? silhouetteImage(data) : data, x, y, width, height);
	return canvas.toBuffer();
};

const Beautiful = async avatarURL => {
	if (!isImageUrl(avatarURL)) return 0;
	const base = await loadImage(join(__dirname, '..', 'resources', 'assets', 'images', 'beautiful.png'));
	const { body } = await request.get(avatarURL);
	const avatar = await loadImage(body);
	const canvas = createCanvas(base.width, base.height);
	const ctx = canvas.getContext('2d');
	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, base.width, base.height);
	ctx.drawImage(avatar, 249, 24, 105, 105);
	ctx.drawImage(avatar, 249, 223, 105, 105);
	ctx.drawImage(base, 0, 0);
	return canvas.toBuffer();
};

module.exports = {
	Beautiful,
	Challenger,
	VietnamFlashbacks,
	ToBeContinued,
	WorseThanHitler,
	Alert,
	BoardroomMeeting,
	TwoButtons,
	Pogchamp,
	Pills,
	Enslaved,
	ThisGuy,
	NikeAd,
	LookAtThisPhotograph,
	DistractedBF,
	ChangeMyMind,
	SonicSays,
};
