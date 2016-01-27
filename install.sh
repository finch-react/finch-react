#!/bin/sh
set -e
cd finch-react-styles && npm i && cd -
cd finch-react-web && npm i && cd -
cd finch-react-server && npm i && cd -
cd finch-react-example && npm i && cd -
