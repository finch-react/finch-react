import webpack from 'webpack';
import path from 'path';

global.DEBUG = process.env.DEBUG == 'true';
global.VERBOSE = process.env.VERBOSE == 'true';
global.ENV = "server";

const GLOBALS = {
    'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
    __DEV__: DEBUG,
};

const config = Object.assign({}, require('./webpack.common.js'), {
    entry: "./src/main.server.js",
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "main.server.js",
        libraryTarget: 'commonjs2'
    },
    target: 'node',

});

export default config;