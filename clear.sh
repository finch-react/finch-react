#!/bin/sh
set -e

try() {
  set +e
  $($@)
  ERROR=$!
  set -e
}

try rm -r finch-react-dev/node_modules
try rm -r finch-react-server/node_modules
try rm -r finch-react-core/node_modules
try rm -r finch-react-web/node_modules
