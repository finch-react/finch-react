#!/bin/sh
set -e

try() {
  set +e
  $($@)
  ERROR=$!
  set -e
}

try rm -r packages/finch-react-dev/app/node_modules
try rm -r packages/finch-react-dev/output
try rm -r packages/finch-react-core/node_modules
