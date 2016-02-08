#!/bin/sh
set -e

try() {
  set +e
  $($@)
  ERROR=$!
  set -e
}

try rm -r packages/finch-react-*/node_modules/finch-react-*
cd packages/finch-react-core && time npm i --no-progress && cd -
cd packages/finch-react-web && time npm i --no-progress && cd -
cd packages/finch-react-server && time npm i --no-progress && cd -
cd packages/finch-react-dev && time npm i --no-progress && cd -
