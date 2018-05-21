#!/bin/bash -e

BRANCH=$TRAVIS_BRANCH
BUILD=$(git rev-parse --short HEAD)

if [ $TRAVIS == "true" ]
then
  openssl aes-256-cbc -K $encrypted_e5009b71da55_key -iv $encrypted_e5009b71da55_iv -in build_key.enc -out build_key -d
fi
chmod 600 build_key
eval `ssh-agent -s`
ssh-add build_key

cd _site
git init
git config user.name "Travis CI"
git config user.email "builds@travis-ci.com"
git remote add upstream "git@github.com:certbot/website-builds.git"

if git fetch upstream "$BRANCH"
then
  # Manually set which branch HEAD points to to avoid changes to the
  # working tree caused by "git checkout".
  git symbolic-ref HEAD refs/heads/$BRANCH
  git reset upstream/$BRANCH
else
  # Branch from master to more easily compare across branches.
  git fetch upstream master
  git branch $BRANCH upstream/master
  git symbolic-ref HEAD refs/heads/$BRANCH
  git reset
fi

touch .

git add -A
git commit -m "Build website at ${BUILD}"
git push -q upstream $BRANCH
