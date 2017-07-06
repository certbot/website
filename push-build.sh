#!/bin/bash

rev=$(git rev-parse --short HEAD)
chmod 600 deploy_key
eval `ssh-agent -s`
ssh-add deploy_key

cd _site
git init
git config user.name "Travis CI"
git config user.email "builds@travis-ci.com"
git remote add upstream "git@github.com:certbot/website-builds.git"

# Branch from master to more easily compare across branches.
git fetch upstream master
git checkout -B $TRAVIS_BRANCH upstream/master

# If this branch already exists upstream, use that instead.
git fetch upstream $TRAVIS_BRANCH
git reset upstream/$TRAVIS_BRANCH

touch .

git add -A
git commit -m "Build website at ${rev}"
git push -q upstream $TRAVIS_BRANCH
