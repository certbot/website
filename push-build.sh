#!/bin/bash
set -euo pipefail

BRANCH=$(echo "${GITHUB_REF}" | sed -E 's!refs/(heads|tags)/!!g')
BUILD=$(git rev-parse --short HEAD)

echo "$CERTBOTBOT_SSH_KEY" > build_key
chmod 600 build_key
eval `ssh-agent -s`
ssh-add build_key

cd _site
git init
git config user.name "Certbotbot"
git config user.email "certbot-team@eff.org"
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
