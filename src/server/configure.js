const nconf = require('nconf');

let envFile = 'env/development.env';
if (nconf.get('env')) {
  envFile = nconf.get('env');
}

nconf.argv();

require('dotenv').config({ path: envFile });

nconf.env({
  separator: '__'
});

module.exports = nconf;
