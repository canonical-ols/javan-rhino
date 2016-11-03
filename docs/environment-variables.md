# Environment Variables

## Application settings
### SERVER__HOST
- **Example**: `127.0.0.1`

The HTTP host that the express server will listen to for request.

### SERVER__PORT
- **Example**: `3000`

The HTTP port that the express server will listen to for request.

### SERVER__LOGS_PATH
- **Example**: `./logs`

The directory in which the application will look for log files.

## Environment settings
### NODE_ENV
- **Examples**: `development` `production`

The role of the environment. This switches the mode of the application and its dependencies (e.g. [Express](http://expressjs.com/en/api.html#app.settings.table)) between fast "production" settings and developer-friendly "development" settings.

### DEPLOY_ENV
- **Deprecated**
- **Examples**: `development` `staging` `production`

Supplements NODE_ENV setting by allowing production builds of the application to be run with staging configuration.

*This setting has been deprecated and is subject to removal in the future.*

## Session settings
### SESSION_SECRET
- **Required**
- **Example**: `MEI5ODg3QjgtQ0RFRS00MjQ2LUE4NzMtMTNDODdCMzA5RTY4`

Used by [express-session](https://github.com/expressjs/session) to [sign the session id cookie](https://github.com/expressjs/session#secret).

This is used in production to make session tampering harder.

### SESSION_MEMCACHED_HOST
- **Example**: `127.0.0.1:7000`

The host on which the [Memcached](https://en.wikipedia.org/wiki/Memcached) caching service is listening on.

This is used in production as a session storage service.

### SESSION_MEMCACHED_SECRET
- **Example**: `MTk5QzgzQTctRjUwNy00Q0Q2LUE1NEQtRUVFRDdCQzgwRTg0`

This is used in production by `connect-memcached` to [encrypt session contents in Memcached](https://github.com/balor/connect-memcached#options).

## SSO settings
### SERVER__UBUNTU_SSO_URL
- **Example**: `https://login.staging.ubuntu.com`

The URL of the authentication service used to log users in.


### SERVER__UBUNTU_SCA_URL
- **Example**: `https://myapps.developer.staging.ubuntu.com`

The URL of the service used to obtain [macaroon authorisation credentials](http://research.google.com/pubs/pub41892.html).

### SERVER\__OPENID__VERIFY_URL
- **Example**: `http://127.0.0.1:3000/login/verify`

The landing page to which users will be redirected to complete logging in to the application.
