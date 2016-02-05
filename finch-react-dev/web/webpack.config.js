'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlPlugin = require('webpack-html-plugin');
var HasteResolverPlugin = require('haste-resolver-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');

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
  devtool: 'eval',
  resolve: {
    alias: {
      'react-native': path.resolve(__dirname, "../../finch-react-web/src/index.js"),
      'finch-react-core': path.resolve(__dirname, "../../finch-react-core/src/index.js"),
      'ReactNativeART': 'react-art'
    },
    extensions: ['', '.web.js', '.js', '.jsx'],
  },
  entry: isProd ?
    [
      config.paths.index
    ]
    :
    [
      'webpack-dev-server/client?http://' + IP + ':' + PORT,
      'webpack/hot/only-dev-server',
      config.paths.index,
    ],
  output: {
    path: path.join(__dirname, 'output'),
    filename: 'bundle.js'
  },
  plugins: [
    new HasteResolverPlugin({
      platform: 'web',
      nodeModules: ['react-web'],
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(isProd ? PROD : DEV),
      }
    }),
    isProd ? new webpack.ProvidePlugin({
      React: "react"
    }) : new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json',
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
              plugins: ['add-module-exports']
            })
          ]
          :
          [
            'react-hot',
            'babel-loader?' + JSON.stringify({
              cacheDirectory: true,
              presets: ['es2015', 'stage-0', 'react'],
              plugins: ['add-module-exports']
            })
          ],
        include: [
          config.paths.src,
          path.resolve(__dirname, "../../finch-react-core/src/"),
          path.resolve(__dirname, "../../finch-react-web/src/")
        ],
        exclude: [
          /node_modules/,
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

