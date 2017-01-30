'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlPlugin = require('webpack-html-plugin');
var HasteResolverPlugin = require('haste-resolver-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');
var fs = require('fs');

var IP = '0.0.0.0';
var PORT = 3000;
var NODE_ENV = process.env.NODE_ENV;
var ROOT_PATH = path.resolve(__dirname, '..');
var PAGES_PATH = path.resolve(__dirname, '../src/pages');
var PROD = 'production';
var DEV = 'development';
var isProd = NODE_ENV === 'production';

var config = {
  paths: {
    src: path.join(ROOT_PATH, '.'),
    index: path.join(ROOT_PATH, 'src/index.web.js'),
  },
};

module.exports = {
  ip: IP,
  port: PORT,
  devtool: 'eval',
  target: 'web',
  resolve: {
    extensions: ['', '.web.js', '.js', '.jsx'],
  },
  entry: isProd ?
    ['babel-polyfill', config.paths.index]
    :
    [
      'webpack-dev-server/client?http://' + IP + ':' + PORT,
      'webpack/hot/only-dev-server',
      'babel-polyfill',
      config.paths.index,
    ],
  output: {
    publicPath: isProd ? "/public/" : "/",
    path: path.join(__dirname, '../../output/web'),
    filename: 'bundle.js',
    libraryTarget: "jsonp"
  },
  plugins: [
    new HasteResolverPlugin({
      platform: 'web',
      nodeModules: ['react-web'],
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(isProd ? PROD : DEV),
        'TIMESTAMP': JSON.stringify(Date.now()),
      }
    }),
    new webpack.ProvidePlugin({
      React: "react",
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    !isProd ? new webpack.HotModuleReplacementPlugin() : new webpack.optimize.DedupePlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.css$/,
        loader: 'style/useable!css?minimize&modules&localIdentName=[name]_[local]_[hash:base64:5]'
      },
      {
        test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
        loader: 'url?name=[path][name].[ext]&limit=4096'
      },
      {
        test: /\.jsx?$/,
        loaders: isProd ?
          [
            'babel-loader?' + JSON.stringify({
              cacheDirectory: true,
              presets: ['es2015', 'stage-0', 'react'],
              plugins: [
                'add-module-exports',
                'transform-decorators-legacy'
              ]
            })
          ]
          :
          [
            'react-hot',
            'babel-loader?' + JSON.stringify({
              cacheDirectory: true,
              presets: ['es2015', 'stage-0', 'react'],
              plugins: [
                'add-module-exports',
                'transform-decorators-legacy'
              ]
            })
          ],
        include: [
          config.paths.src,
          path.resolve(__dirname, "../node_modules/finch-react-core/src/"),
        ],
        exclude: [
          /node_modules\/(?!finch\-react)/,
          /output/
        ]
      }
    ]
  }
};

if (isProd) {
  module.exports.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
    new CompressionPlugin({
      asset: "{file}.gz",
      algorithm: "gzip",
      regExp: /\.js$|\.html$/
    })
  );
}

