#!/usr/bin/env node

var prompt = require('prompt');
var fs = require('fs');
var util = require('util');
var path = require('path');

var schema = {
  properties: {
    /**
     * Application settings
     */
    SERVER__HOST: {
      description: 'Please enter a host for server to listen on',
      default: '127.0.0.1'
    },

    SERVER__PORT: {
      description: 'Please enter a port for server to listen on',
      default: '3000'
    },

    SERVER__LOGS_PATH: {
      description: 'Please enter a path for log location',
    },

    /**
     * Environment settings
     */
    NODE_ENV: {
      description: 'Please enter a NODE_ENV setting (development/production)',
      pattern: /development|production/,
      message: 'NODE_ENV must be "development" or "production"',
      default: 'development',
    },

    DEPLOY_ENV: {
      description: 'Please enter a DEPLOY_ENV setting (development/staging/production)',
      pattern: /development|staging|production/,
      message: 'NODE_ENV must be "development", "staging" or "production"',
      default: 'development',
    },

    /**
     * Session storage settings
     */
    SESSION_SECRET: {
      description: 'Please enter session secret',
      default: 'dont-use-me-in-prod'
    },

    SESSION_MEMCACHED_HOST: {
      description: 'Please enter a hostname for memcached service'
    },

    SESSION_MEMCACHED_SECRET: {
      description: 'Please enter a secret for memcached service'
    },

    /**
     * SSO settings
     */
    SERVER__UBUNTU_SSO_URL: {
      description: 'Please enter a URL for the SSO service'
    },

    SERVER__UBUNTU_SCA_URL: {
      description: 'Please enter a URL for the macaroon service'
    },

    SERVER__OPENID__VERIFY_URL: {
      description: 'Please enter a SSO landing URL'
    },

    /**
     * Sentry settings
     */
    SERVER__SENTRY_DSN: {
      description: 'Please enter a Sentry DSN (containing public key and secret)'
    }
  }
};

prompt.start();

prompt.get(schema, function (err, result) {
  var output = [];

  Object.keys(result).forEach(function (value) {
    if (result[value] === '') return;

    output.push(toEnvironmentVariable(value, result[value]));
  });

  fs.writeFileSync(path.resolve(__dirname, '../.env'), output.join(require('os').EOL));

  util.log('Settings written to .env');
});

function toEnvironmentVariable(name, value) {
  return name + '=' + value;
}
