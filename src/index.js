const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const favicon = require('serve-favicon');
const xss = require('xss-clean');
const path = require('node:path');
const cors = require('cors');

const app = express();

app.disable('x-powered-by');
app.use(xss());
app.use(cors());
app.use(helmet({ frameguard: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(path.join(__dirname, 'assets/images/atlas-logo.png')));
app.set('trust proxy', 1);
app.set('json spaces', 2);

app.use('/', require('#routes/index'));

module.exports = app;
