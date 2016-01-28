#!/bin/sh
set -e

try() {
  set +e
  $($@)
  ERROR=$!
  set -e
}

try rm -r finch-react-*/node_modules/finch-react-*
cd finch-react-styles && npm i && cd -
cd finch-react-web && npm i && cd -
cd finch-react-server && npm i && cd -
cd finch-react-dev && npm i && cd -
