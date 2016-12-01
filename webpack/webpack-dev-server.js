require('babel-register');
const Express = require('express');
const webpack = require('webpack');
const url = require('url');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware  = require('webpack-hot-middleware');

const webpackConfig = require('./dev-config');
const conf = require('../src/server/configure');
const logging = require('../src/server/logging').default;

const logger = logging.getLogger('webpack');
const webpackDevUrl = url.parse(conf.get('SERVER:WEBPACK_DEV_URL'));
const app = Express();
const compiler = webpack(webpackConfig);

const webpackMiddleware = webpackDevMiddleware(compiler, {
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
});

// run dev express server once bundle is ready
webpackMiddleware.waitUntilValid(() => {
  require('../src/server/dev-server');
});

app.use(webpackMiddleware);
app.use(webpackHotMiddleware(compiler));
app.use(Express.static('public'));

const port = webpackDevUrl.port;
const address = webpackDevUrl.hostname;

const webpackServer = app.listen(port, address, () => {
  const host = webpackServer.address().address;
  const port = webpackServer.address().port;

  logger.info('WebPack development server listening on http://%s:%s', host, port);
});
