const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const atImport = require('postcss-import');
const variables = require("postcss-simple-vars");

const cssLoaderConfig = [
  'css-loader',
  [
    'modules',
    'importLoaders=1',
    'localIdentName=[name]__[local]___[hash:base64:5]'
  ].join('&')
].join('?');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    'webpack/hot/only-dev-server',
    './src',
  ],
  output: {
    path: path.join(__dirname, '../public/static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('style.css', { allChunks: true })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel'],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          [
            'style-loader',
            'postcss-loader'
          ].join('!'),
          [
            loader(
              'css-loader',
              'modules',
              'importLoaders=1',
              'localIdentName=[name]__[local]___[hash:base64:5]'
            ),
            'postcss-loader'
          ].join('!')
        )
      }
    ]
  },
  postcss: function () {
    return [atImport, variables];
  }
};

function loader(name, ...options) {
  if (options.length > 0) {
    return name + '?' + options.join('&');
  }

  return name;
}
