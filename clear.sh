#!/bin/sh
set -e

try() {
  set +e
  $($@)
  ERROR=$!
  set -e
}

try rm -r packages/finch-react-dev/node_modules
try rm -r packages/finch-react-server/node_modules
try rm -r packages/finch-react-core/node_modules
try rm -r packages/finch-react-web/node_modules
