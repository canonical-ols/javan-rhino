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

    UNIVERSAL__MU_URL: {
      description: 'Please enter a base URL for site',
      default: 'http://localhost:3000'
    },

    SERVER__WEBPACK_DEV_URL: {
      description: 'Please enter a WebPack dev server URL',
      default: 'http://localhost:3001'
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

    /**
     * Session storage settings
     */
    SESSION_SECRET: {
      description: 'Please enter session secret'
    },

    SERVER__COOKIE__SECURE: {
      description: 'Please enter a setting for secure cookies'
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
      description: 'Please enter a URL for the SSO service',
      default: 'https://login.staging.ubuntu.com'
    },

    SERVER__UBUNTU_SCA_URL: {
      description: 'Please enter a URL for the macaroon service',
      default: 'https://myapps.developer.staging.ubuntu.com'
    },

    SERVER__OPENID__VERIFY_URL: {
      description: 'Please enter a SSO landing URL',
      default: 'http://localhost:3000/login/verify'
    },

    SERVER__OPENID__TEAMS: {
      description: 'Please enter a JSON string of openid teams',
      default: '"[\"ubuntuone-hackers\"]"'
    },

    /**
     * Stripe settings
     */
    UNIVERSAL__STRIPE_PUBLISHABLE_KEY: {
      description: 'Please enter a Stripe publishable key',
      default: 'pk_test_daBepdMharNP0PTQYoyQJPjH'
    },

    /**
     * Sentry settings
     */
    SENTRY_DSN: {
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
