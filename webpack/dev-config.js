const path = require('path');
const webpack = require('webpack');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const vars = require('postcss-simple-vars');
const autoprefixer = require('autoprefixer');

const conf = require('../server/configure.js');
const webpackDevUrl = conf.get('WEBPACK_DEV_URL');

const webpackIsomorphicToolsPlugin =
  new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools-configuration'))
  .development();

const sharedVars = require('../src/style/variables');

module.exports = {
  context: path.resolve(__dirname, '..'),
  entry: [
    'babel-polyfill',
    `webpack-hot-middleware/client?path=${webpackDevUrl}/__webpack_hmr`,
    'webpack/hot/only-dev-server',
    './src',
  ],
  output: {
    path: path.join(__dirname, '../public/static'),
    filename: 'bundle.js',
    sourceMapFilename: '[file].map',
    publicPath: `${webpackDevUrl}/static/`
  },
  plugins: [
    new webpack.DefinePlugin({
      APP_URL: JSON.stringify(conf.get('APP_URL'))
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('style.css', { allChunks: true }),
    webpackIsomorphicToolsPlugin
  ],
  module: {
    loaders: require('./loaders-config.js')
  },
  devtool: '#cheap-module-eval-source-map',
  postcss: function () {
    return [ vars({ variables: () => sharedVars }), autoprefixer ];
  }
};
