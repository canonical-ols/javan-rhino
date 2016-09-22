var nconf = require('nconf');
var base = require('../settings');

// allow these overrides from env
nconf.env([
  'APP_URL',
  'SESSION_SECRET'
]);
nconf.defaults(base);

module.exports = nconf;
