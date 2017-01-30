#!/bin/sh
set -e

try() {
  set +e
  $($@)
  ERROR=$!
  set -e
}

try rm -r packages/finch-react-*/node_modules/finch-react-*
cd packages/finch-react-core && time yarn && cd -
cd packages/finch-react-dev/app && time yarn && cd -
