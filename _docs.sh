#!/usr/bin/env bash

case "$1" in
  "depend" )
    cd _docs
    export CERTBOT_WEBSITE='True'
    sudo apt update
    sudo apt install python3-dev python3-venv gcc libaugeas0 libssl-dev \
                     libffi-dev ca-certificates openssl -y
    ./tools/venv3.py
    ;;
  "install" )
    cd _docs
    source ./venv3/bin/activate
    pip install --upgrade git+https://github.com/EFForg/sphinx_rtd_theme.git
    cd certbot
    make -C docs clean html epub latex latexpdf > /dev/null
    ;;
esac
