require('babel-register');
const Express = require('express');
const webpack = require('webpack');
const url = require('url');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware  = require('webpack-hot-middleware');
const prettyBytes = require('pretty-bytes');

const webpackConfig = require('./dev-config');
const conf = require('../src/server/configure');
const logging = require('../src/server/logging').default;

const logger = logging.getLogger('webpack');
const webpackDevUrl = url.parse(conf.get('SERVER:WEBPACK_DEV_URL'));
const webpackApp = Express();
const compiler = webpack(webpackConfig);

webpackApp.use(webpackDevMiddleware(compiler, {
  contentBase: webpackDevUrl.href,
  quiet: false,
  hot: true,
  noInfo: false,
  stats: {
    colors: false,
    chunks: false,
    children: false
  },
  headers: { 'Access-Control-Allow-Origin': '*' },
  publicPath: webpackConfig.output.publicPath,
  log: logger.info.bind(logger),
  reporter: (reporterOptions) => {
    const { state, stats, options } = reporterOptions;

    const obj = stats.toJson({
      chunks: false,
      colors: false,
      children: false,
      modules: false,
      chunkModules: false,
      source: false
    });

    if (state) {
      let displayStats = (!options.quiet && options.stats !== false);

      if (displayStats && !(stats.hasErrors() || stats.hasWarnings()) &&
        options.noInfo)
      {
        displayStats = false;
      }

      if (displayStats) {

        if (obj.hash) {
          options.log('stats', {
            hash: obj.hash,
            version: obj.version,
            time: obj.time + 'ms'
          });
        }

        if (obj.assets && obj.assets.length > 0) {

          obj.assets.forEach((asset) => {
            options.log('stats', {
              asset: asset.name,
              size: prettyBytes(asset.size)
            });
          });
        }
      }

      if (!options.noInfo && !options.quiet) {
        options.log('bundle is now VALID.');
      }
    } else {
      options.log('bundle is now INVALID.');
    }
  }
}));

webpackApp.use(webpackHotMiddleware(compiler, {
  log: logger.info.bind(logger)
}));

webpackApp.use(Express.static('public'));

const port = webpackDevUrl.port;
const address = webpackDevUrl.hostname;

const webpackServer = webpackApp.listen(port, address, () => {
  const host = webpackServer.address().address;
  const port = webpackServer.address().port;

  logger.info('WebPack development server listening on http://%s:%s', host, port);
  require('../src/server');
});
