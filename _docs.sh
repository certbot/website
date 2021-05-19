#!/usr/bin/env bash

case "$1" in
  "depend" )
    cd _docs
    export CERTBOT_WEBSITE='True'
    sudo apt-get update
    sudo apt-get install python3-dev python3-venv gcc libaugeas0 libssl-dev \
                         libffi-dev ca-certificates openssl -y
    ./tools/venv.py
    ;;
  "install" )
    cd _docs
    source ./venv/bin/activate
    cd certbot
    make -C docs clean html epub latex latexpdf > /dev/null
    ;;
esac
