# javan-rhino [![Build Status](https://travis-ci.org/canonical-ols/javan-rhino.svg?branch=travis)](https://travis-ci.org/canonical-ols/javan-rhino) [![Coverage Status](https://coveralls.io/repos/github/canonical-ols/javan-rhino/badge.svg?branch=coverage)](https://coveralls.io/github/canonical-ols/javan-rhino?branch=coverage)

Front-end to Ubuntu Store Payments

# node, nvm

If you have nvm istalled (https://github.com/creationix/nvm) simple do
`nvm use`
in project root and you'll be switched to the correct version of node
for this project.

# mongodb

Ubuntu:
```
apt install mongodb
```

[OS X](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/):
```
brew install mongodb
mkdir -p ~/.mongodb/data
mongod --dbpath ~/.mongodb/data
```

# Running

Install dependencies:

    $ npm install

and run it:

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

# Why javan-rhino?

Win a prize if you figure it out!
