import path from 'path';
import webpack from 'webpack';

var serverWebpackConfig = null;

try {
    serverWebpackConfig = require(path.join(process.cwd(), "webpack.server.js"));
} catch (_) {
}

const bundler = webpack(serverWebpackConfig);

bundler.run((err, stats)=> {
    if(err) {
        console.error(err);
        throw err;
    }
    console.log(stats.toString(serverWebpackConfig.stats));
});

