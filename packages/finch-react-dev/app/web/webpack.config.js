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
    index: path.join(ROOT_PATH, 'src/index'),
  },
};
var pages = collectEntry(PAGES_PATH, config.paths.index);

module.exports = {
  ip: IP,
  port: PORT,
  devtool: 'eval',
  target: 'web',
  resolve: {
    alias: {
      'finch-react-core': path.resolve(__dirname, "../../../finch-react-core/src/index.js")
    },
    extensions: ['', '.web.js', '.js', '.jsx'],
  },
  entry: isProd ?
    [config.paths.index]
    :
    [
      'webpack-dev-server/client?http://' + IP + ':' + PORT,
      'webpack/hot/only-dev-server',
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
          path.resolve(__dirname, "../../../finch-react-core/src/"),
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

function collectEntry(path, root) {
  let pages = {};
  let files = fs.readdirSync(path);
  files.map(file => {
    let fileArray = file.split(".");
    if (fileArray[1] === "js") {
      pages[fileArray[0]] = `${path}/${file}`
    }
  });
  pages['app'] = root;
  return pages
}
