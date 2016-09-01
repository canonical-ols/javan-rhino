var Express = require('express');
var util = require('util');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware  = require('webpack-hot-middleware');
var webpackConfig = require('./dev-config');

var app = Express();
var compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  contentBase: 'http://' + webpackConfig.address + ':' + webpackConfig.port,
  hot: true,
  noInfo: true,
  headers: { 'Access-Control-Allow-Origin': '*' },
  publicPath: webpackConfig.output.publicPath })
);

app.use(webpackHotMiddleware(compiler));

app.use(Express.static('public'));

var server = app.listen(webpackConfig.port, webpackConfig.address, () => {
  var host = server.address().address;
  var port = server.address().port;

  util.log('🚧  WebPack development server listening on http://%s:%s 🚧', host, port);
});
