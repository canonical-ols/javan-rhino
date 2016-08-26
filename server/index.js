require('babel-register');

const WebPackIsomorphicTools = require('webpack-isomorphic-tools');
const basePath = require('path').resolve(__dirname, '..');

const webpackIsomorphicTools = new WebPackIsomorphicTools(require('../webpack/webpack-isomorphic-tools-configuration'))
.development(process.env.NODE_ENV !== 'production')
.server(basePath, function() {
  require('./server').default(webpackIsomorphicTools);
});
