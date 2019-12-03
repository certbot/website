#!/usr/bin/env bash

case "$1" in
  "depend" )
    cd _docs
    export CERTBOT_WEBSITE='True'
    ./letsencrypt-auto-source/letsencrypt-auto --os-packages-only
    python ./tools/venv.py
    ;;
  "install" )
    cd _docs
    source ./venv/bin/activate
    pip install --upgrade git+https://github.com/bmw/sphinx_rtd_theme.git
    make -C docs clean html epub latex latexpdf > /dev/null
    ;;
esac
