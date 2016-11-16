const nconf = require('nconf');
const development = require('../../settings/development');
const staging = require('../../settings/staging');
const production = require('../../settings/production');

nconf.argv();

if (nconf.get('env')) {
  require('dotenv').config({ path: nconf.get('ENV') });
}

nconf.env({
  separator: '__',
  whitelist: [
    'SESSION_SECRET',
    'SESSION_MEMCACHED_HOST',
    'SESSION_MEMCACHED_SECRET',
    'UNIVERSAL__MU_URL', // UNIVERSAL:MU_URL
    'SERVER__HOST', // SERVER:HOST
    'SERVER__PORT', // SERVER:PORT
    'SERVER__LOGS_PATH', // SERVER:LOGS_PATH
    'SERVER__SENTRY_DSN' // SERVER:SENTRY_DSN
  ]
});

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
