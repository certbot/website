#!/bin/bash

REF="$1"
TAG="website-builds:$REF"

if [ -z "$REF" ]; then
    echo >&2 "Usage: $0 ref"
    exit 1
fi

if ! which docker >/dev/null 2>&1; then
   echo >&2 "Docker is required to run this script."
   echo >&2 "https://docs.docker.com/get-docker/"
   exit 1
fi
set -e

docker build --no-cache -t "$TAG" -<<EOF
FROM nginx:alpine

ENV NGINX_ENTRYPOINT_QUIET_LOGS 0

RUN cd /usr/share/nginx \
 && wget "https://github.com/certbot/website-builds/archive/$REF.zip" \
 && unzip *.zip \
 && mv website-builds-*/* html
EOF

echo
echo "Starting server. You can access the website in your browser at http://localhost:8000."
echo -e "\033[1;33mPress Ctrl-C to shut down.\033[0m"

docker run --rm -p 8000:4000 -v "$(pwd)/nginx.conf:/etc/nginx/conf.d/default.conf:ro" -it "$TAG"
