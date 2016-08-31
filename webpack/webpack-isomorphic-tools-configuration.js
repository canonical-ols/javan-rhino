var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

module.exports = {
  assets:
  {
    stylesheets:
    {
      extensions: ['css']
    },
    svg: {
      extension: 'svg',
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },
  },
  'webpack_assets_file_path': 'webpack-assets.json',
  'webpack_stats_file_path': 'webpack-stats.json'
};
