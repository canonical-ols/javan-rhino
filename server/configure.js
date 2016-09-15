var nconf = require('nconf');
var base = require('../settings');

// allow these overrides from env
nconf.env([
  'APP_URL',
  'DATABASE:URL',
  'DATABASE:SECRET'
]);
nconf.defaults(base);

module.exports = nconf;
