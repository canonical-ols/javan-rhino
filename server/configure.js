var nconf = require('nconf');
var base = require('../settings');

// allow these overrides from env
nconf.env([
  'APP:PORT',
  'APP:HOST',
  'DATABASE:URL',
  'DATABASE:SECRET'
]);
nconf.defaults(base);

module.exports = nconf;
