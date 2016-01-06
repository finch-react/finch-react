import path from 'path';

export default {
    cache: DEBUG,
    debug: DEBUG,

    stats: {
        colors: true,
        reasons: DEBUG,
        hash: VERBOSE,
        version: VERBOSE,
        timings: true,
        chunks: VERBOSE,
        chunkModules: VERBOSE,
        cached: VERBOSE,
        cachedAssets: VERBOSE
    },

    resolve: {
        alias: {
            "finch-react": path.join(__dirname, "..")
        },
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, '..'),
                    path.resolve(__dirname, '../finch-react-core'),
                    path.resolve(__dirname, './src')
                ],
                exclude: /node_modules/,
                loader: "babel",
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'stage-0', 'react'],
                    plugins: ['add-module-exports']
                }
            }
        ]
    }
};