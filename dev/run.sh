#!/bin/bash
set -e

npm install
git submodule init
git submodule update
./_docs.sh depend

gulp watch &
GULP_PID=$!
function cleanup() {
    echo "Exiting gulp ..."
    kill -9 $GULP_PID
}
trap cleanup INT
wait $GULP_PID
