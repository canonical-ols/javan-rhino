require('babel-register');

const WebPackIsomorphicTools = require('webpack-isomorphic-tools');
const basePath = require('path').resolve(__dirname, '../..');

const webpackIsomorphicTools = new WebPackIsomorphicTools(require('../../webpack/webpack-isomorphic-tools-configuration'))
  .server(basePath, function() {
    require('./server').default(webpackIsomorphicTools);
  });
