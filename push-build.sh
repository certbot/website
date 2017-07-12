#!/bin/bash

BRANCH=$TRAVIS_BRANCH
BUILD=$(git rev-parse --short HEAD)

chmod 600 build_key
eval `ssh-agent -s`
ssh-add build_key

cd _site
git init
git config user.name "Travis CI"
git config user.email "builds@travis-ci.com"
git remote add upstream "git@github.com:certbot/website-builds.git"

# Branch from master to more easily compare across branches.
git fetch upstream master
git branch $BRANCH upstream/master
# Manually set which branch HEAD points to to avoid changes to the
# working tree caused by "git checkout".
git symbolic-ref HEAD refs/heads/$BRANCH
git reset

# If this branch already exists upstream, use that instead.
git fetch upstream $BRANCH
git reset upstream/$BRANCH

touch .

git add -A
git commit -m "Build website at ${BUILD}"
git push -q upstream $BRANCH
