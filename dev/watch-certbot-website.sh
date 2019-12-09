#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

pushd "${DIR}"
npm install
./_docs.sh depend
popd

if [ "${NODE_ENV}" = 'development']; then
    exec gulp --cwd "${DIR}" watch
else
    gulp build
    exec nginx -g 'daemon off;'
fi
