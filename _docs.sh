#!/usr/bin/env bash

case "$1" in
  "depend" )
    cd _docs
    ./letsencrypt-auto-source/letsencrypt-auto --os-packages-only
    ./tools/venv.sh
    ;;
  "install" )
    cd _docs
    source ./venv/bin/activate
    make -C docs clean html
    ;;
esac
