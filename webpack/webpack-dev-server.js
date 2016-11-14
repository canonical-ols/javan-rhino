require('babel-register');
const Express = require('express');
const webpack = require('webpack');
const url = require('url');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware  = require('webpack-hot-middleware');

const winston = require('winston');
require('../src/server/talisker'); // TODO rename to talisker
const webpackConfig = require('./dev-config');
const conf = require('../src/server/configure');

const webpackDevUrl = url.parse(conf.get('SERVER:WEBPACK_DEV_URL'));

const webpackApp = Express();
const compiler = webpack(webpackConfig);

webpackApp.use(webpackDevMiddleware(compiler, {
  contentBase: webpackDevUrl.href,
  quiet: false,
  hot: true,
  noInfo: false,
  stats: {
    colors: true,
    chunks: false,
    children: false
  },
  headers: { 'Access-Control-Allow-Origin': '*' },
  publicPath: webpackConfig.output.publicPath
}));

webpackApp.use(webpackHotMiddleware(compiler));

webpackApp.use(Express.static('public'));

const port = webpackDevUrl.port;
const address = webpackDevUrl.hostname;

const webpackServer = webpackApp.listen(port, address, () => {
  const host = webpackServer.address().address;
  const port = webpackServer.address().port;

  winston.info('WebPack development server listening on http://%s:%s', host, port);
  require('../src/server');
});
