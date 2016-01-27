'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlPlugin = require('webpack-html-plugin');
var HasteResolverPlugin = require('haste-resolver-webpack-plugin');

var IP = '0.0.0.0';
var PORT = 3000;
var NODE_ENV = process.env.NODE_ENV;
var ROOT_PATH = path.resolve(__dirname, '..');
var PROD = 'production';
var DEV = 'development';
let isProd = NODE_ENV === 'production';

var config = {
  paths: {
    src: path.join(ROOT_PATH, '.'),
    index: path.join(ROOT_PATH, 'src/index'),
  },
};

module.exports = {
  ip: IP,
  port: PORT,
  devtool: 'cheap-inline-source-map',
  target: 'node',
  resolve: {
    alias: {
      'react-native': path.resolve(__dirname, "../../finch-react-server/src/index.js"),
      'finch-react-web': path.resolve(__dirname, "../../finch-react-web/src/index.js"),
      'finch-react-styles': path.resolve(__dirname, "../../finch-react-styles/src/index.js"),
      'ReactNativeART': 'react-art',
    },
    extensions: ['', '.js', '.jsx'],
  },
  entry: [
    config.paths.index
  ],
  output: {
    path: path.join(__dirname, 'output'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new HasteResolverPlugin({
      platform: 'web',
      nodeModules: ['react-web']
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(isProd ? PROD : DEV),
      }
    }),
    new webpack.ProvidePlugin({
      React: "react"
    }),
    new webpack.NoErrorsPlugin(),
    new HtmlPlugin()
  ],
  module: {
    loaders: [{
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel-loader?' + JSON.stringify({
        cacheDirectory: true,
        presets: ['es2015', 'stage-0', 'react'],
        plugins: ['add-module-exports']
      })],
      include: [
        config.paths.src,
        path.resolve(__dirname, "../../finch-react-styles/src/"),
        path.resolve(__dirname, "../../finch-react-web/src/"),
        path.resolve(__dirname, "../../finch-react-server/src/")
      ],
      exclude: [
        /node_modules/,
        /output/
      ]
    }]
  }
};
