const nconf = require('nconf');
const development = require('../settings/development');
const staging = require('../settings/staging');
const production = require('../settings/production');

nconf.env('__');
nconf.env([
  'UNIVERSAL:APP_URL', // env variable UNIVERSAL__APP_URL
  'SESSION_SECRET',
  'SESSION_MEMCACHED_HOST',
  'SESSION_MEMCACHED_SECRET'
]);

if (process.env.NODE_ENV === 'production') {
  if (process.env.DEPLOY_ENV === 'production') {
    nconf.defaults(production);
  } else {
    nconf.defaults(staging);
  }
} else {
  nconf.defaults(development);
}

module.exports = nconf;
