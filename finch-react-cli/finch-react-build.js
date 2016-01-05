#!/usr/bin/env node

require("babel-register")({
    only: /finch-react-cli/,
    presets: ['es2015', 'stage-0', 'react']
});
require("./src/build.js");