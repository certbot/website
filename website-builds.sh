#!/bin/bash

set -e

REF="$1"
TAG="website-builds:$REF"

if [ -z "$REF" ]; then
    echo "Usage: $0 ref"
fi

docker build --no-cache -t "$TAG" -<<EOF
FROM nginx:alpine

RUN cd /usr/share/nginx \
 && wget "https://github.com/certbot/website-builds/archive/$REF.zip" \
 && unzip *.zip \
 && mv website-builds-*/* html
EOF

echo
echo "Starting server. You can access the website in your browser at http://localhost:8000. Press Ctrl-C to shut down."

docker run --rm -p 8000:4000 -v "$(pwd)/nginx.conf:/etc/nginx/conf.d/default.conf:ro" -it "$TAG"
