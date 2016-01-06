import path from 'path';

var serverWebpackConfig = null;

try {
    serverWebpackConfig = require(path.join(process.cwd(), "webpack.server.js"));
} catch (_) {
}

console.log(serverWebpackConfig);