const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
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
          [
            'modules',
            'importLoaders=1',
            'localIdentName=[name]__[local]___[hash:base64:5]'
          ]
        ),
        'postcss-loader'
      ].join('!')
    )
  },
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
  }
];

function loader(name, options) {
  if (options.length > 0) {
    return name + '?' + options.join('&');
  }

  return name;
}
