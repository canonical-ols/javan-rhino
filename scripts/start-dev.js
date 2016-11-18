const spawn = require('child_process').spawn;
const basePath = require('path').resolve(__dirname, '..');
const util = require('util');

const webpackServer = spawn('node', [].concat(
  basePath + '/webpack/webpack-dev-server.js',
  process.argv
));

const expressServer = spawn('node', [].concat(
  basePath + '/src/server/index.js',
  process.argv
));

webpackServer.stdout.on('data', log);
webpackServer.stderr.on('data', log);
webpackServer.on('close', shutdown);
expressServer.stdout.on('data', log);
expressServer.stderr.on('data', log);
expressServer.on('close', shutdown);

function log(data) {
  util.log(`${data}`);
}

function shutdown() {
  process.exit();
}
