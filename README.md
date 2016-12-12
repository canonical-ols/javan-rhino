# javan-rhino [![Build Status](https://travis-ci.org/canonical-ols/javan-rhino.svg?branch=travis)](https://travis-ci.org/canonical-ols/javan-rhino) [![Coverage Status](https://coveralls.io/repos/github/canonical-ols/javan-rhino/badge.svg?branch=coverage)](https://coveralls.io/github/canonical-ols/javan-rhino?branch=coverage)

Front-end to Ubuntu Store Payments

# Installing Dependencies

## node, nvm

If you have nvm istalled (https://github.com/creationix/nvm) simple do
`nvm use`
in project root and you'll be switched to the correct version of node
for this project.

## npm packages:

    $ npm install

# Starting Development Environment:

    $ npm start

# About .env files
The My Ubuntu application uses .env files to facilitate environment variable configuration.

## Writing .env files
A utility is bundled for writing your own .env files:

    $ npm run make-env

You will be prompted for config settings for things such as the host and port for the application to run on, and settings for session storage.

Settings will be written to file named `.env`. Renaming this file with a memorable name is recommended.

## Reading .env files
Supply a path for an .env file to use using the ENV environment variable:

	$ npm start -- --env=environments/staging.env

## Sharing .env files
Have you created your own .env file that is useful for a common development situation? Share it on IRC!

## Environment variable definitions
See [Environment Variables](docs/environment-variables.md).


## Acceptance testing


Install chromedriver https://sites.google.com/a/chromium.org/chromedriver/downloads
With a running dev server at http://localhost:3000:

```
TEST_USER_EMAIL=email  TEST_USER_PASSWORD=password npm run test:acceptance
```
