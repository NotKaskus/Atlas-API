const { join } = require('node:path');
require('better-module-alias')(join(__dirname, '..'));
const app = require('./app');

app.listen(4000, () => {
	console.log('Test Server Started on http://localhost:' + 4000);
});
