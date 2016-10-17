require('babel-register');
require('css-modules-require-hook/preset');

const conf = require('./configure.js');

const WEBPACK_DEV_URL = conf.get('SERVER:WEBPACK_DEV_URL');

require('images-require-hook')('.svg', `${WEBPACK_DEV_URL}/static/icons`);
require('./server');
