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

Acceptance tests run on browserstack, to run locally you will need to set some
secrets in `~/.config/my-ubuntu/secrets.json` (secrets available from project
owner):

DO NOT USE YOUR OWN EMAIL, USE THE TEST_USER ACCOUNT SET UP FOR THIS PURPOSE.
REMEMBER, DATA IS SENT TO A 3RD PARTY, BE CAREFUL.

```
{
  "BROWSERSTACK_KEY": "string",
  "BROWSERSTACK_USERNAME": "string",
  "TEST_USER_EMAIL": "string",
  "TEST_USER_PASSWORD": "string"
}
```

DO NOT USE YOUR OWN EMAIL, USE THE TEST_USER ACCOUNT SET UP FOR THIS PURPOSE.
REMEMBER, DATA IS SENT TO A 3RD PARTY, BE CAREFUL.

Run tests (output will appear https://www.browserstack.com/automate/builds):

```
npm run test:acceptance
```

The default reporter is junit, which will not report anything to the cli but to
a local file `test.results.xml`, hence the above overrides the default with a
cli reporter.

## Deploying / working on the charm

This projects includes a Juju charm layer under charm/. You can do local modifications to both the
layer and the project itself, and then test building the final charm and deploying via Juju.

Install some prerequisites:

```
sudo add-apt-repository ppa:mojo-maintainers/ppa
sudo apt-get update
apt-get install npm nodejs-legacy python-codetree charm-tools
```

Get Juju working and bootstrapped. For example:
```
sudo apt-get install juju-local juju
juju init
juju bootstrap
```

Once Juju is ready to have charms deployed into it:

```
make build  # will build a charm with a javan-rhino payload based on the local branch
make deploy  # will deploy in whichever environment Juju has bootstrapped
```

Note the memcached charm is unhappy with ipv6, if you see it failing to configure try:

```
juju set memcached allow-ufw-ip6-softfail=true
juju resolved --retry memcached
```
