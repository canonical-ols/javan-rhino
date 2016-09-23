# javan-rhino [![Build Status](https://travis-ci.org/canonical-ols/javan-rhino.svg?branch=travis)](https://travis-ci.org/canonical-ols/javan-rhino) [![Coverage Status](https://coveralls.io/repos/github/canonical-ols/javan-rhino/badge.svg?branch=coverage)](https://coveralls.io/github/canonical-ols/javan-rhino?branch=coverage)

Front-end to Ubuntu Store Payments

# Installing Dependencies

## node, nvm

If you have nvm istalled (https://github.com/creationix/nvm) simple do
`nvm use`
in project root and you'll be switched to the correct version of node
for this project.

## Session Secret
Required by [express-session](https://github.com/expressjs/session#secret).

To set this up temporarily, run the following on your command-line:
```
export SESSION_SECRET="its a secret"
```
To set it up permanently, add the same line to your `.bashrc` file in your home directory.

## npm packages:

    $ npm install

# Starting Development Environment:

    $ npm start

    > javan-rhino@1.0.0 start /Users/cprov/Canonical/ols/javan-rhino
    > NODE_ENV=development concurrently --kill-others "npm run watch-client" "node server/"

    [0]
    [0] > javan-rhino@1.0.0 watch-client /Users/cprov/Canonical/ols/javan-rhino
    [0] > node webpack/webpack-dev-server.js
    [0]
    [0] 31 Aug 16:56:25 - 🚧  WebPack development server listening on http://127.0.0.1:3001 🚧
    [1] 31 Aug 16:56:25 - 🚂  Express server listening on http://127.0.0.1:3000 🚂
    ...

# (Provisional) Deployment process

Build the confined *snap*:

    $ snapcraft

It embeds a MongoDB server which will launch upon installation:

    $ snap install javan-rhino_1_amd64.snap --force-dangerous
    ...
    javan-rhino 1 installed

However still not launching the service automatically, it has to be done manually:

    $ javan-rhino.devel
    ...
    [1] 10 Sep 08:29:41 - 🚂  Express server listening on http://127.0.0.1:3000 🚂

Similarly, a *production* service can be launchpad manually:

    $ javan-rhino.production
    ...


# Why javan-rhino?

Win a prize if you figure it out!
