#!/usr/bin/env node

require("babel-register")({
    //only: /finch-react-cli/,
    ignore: function (filename) {
        return filename.indexOf("node_modules") > 0 && filename.indexOf("finch-react-cli/src") < 0;
    },
    presets: ['es2015', 'stage-0', 'react'],
    plugins: ['add-module-exports']
});
require("./src/build.js");