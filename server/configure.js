const nconf = require('nconf');
const base = require('../settings');

nconf.env('__');
nconf.env([
  'UNIVERSAL:APP_URL', // env variable UNIVERSAL__APP_URL
  'SESSION_SECRET'
]);
nconf.defaults(base);

module.exports = nconf;
