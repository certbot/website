# Certbot Website

Website for [EFF's Certbot](https://certbot.eff.org/) project. Uses Jekyll for static site generation.

[![Build Status](https://travis-ci.com/certbot/website.svg?branch=master)](https://travis-ci.com/certbot/website)

## Development

### With Docker

1. Clone this repo and cd into the project directory.
2. Get the documentation submodule:
  * `git submodule init`
  * `git submodule update`
3. `docker-compose up`

Docker-compose serves the site with nginx to more closely mirror production.

### Without Docker

#### Install
1. Install `ruby 2.0+`, `node 8.0+`, and `npm 2.0+`.
2. `gem install jekyll` (requires v3.0 or higher)
3. `sudo npm install gulp -g`
4. `npm install`

If you want to build a copy of the documentation for your local mirror of the
Cerbot website, also do:

5. `git submodule init`
6. `git submodule update`
7. `./_docs.sh depend`
8. Install `pdflatex` e.g. via `sudo apt install texlive texlive-latex-extra`

#### Run
To *watch* for changes and reload assets as needed via BrowserSync:
`gulp watch`

To *build* the site once:
`gulp build`

To build for production (minified javascript, no source maps):
`gulp build --env production`
The environment can also be set in the NODE_ENV environment variable. See https://github.com/gunpowderlabs/gulp-environments.

## Editing content

### Basic pages
Most pages can be edited as markdown files.

Use `/index.html` to edit the homepage.
Use `/[RELATIVE_URL]/index.html` to edit internal pages.

### Installation instructions

Are generated by JavaScript with
[Mustache](https://mustache.github.io/mustache.5.html), and can be edited in
`_scripts/instruction-widget`.

### FAQ
FAQ entries are a Jekyll collection. Add FAQ entries (question and answer pairs) as markdown files to the `_faq_entries` directory.

FAQ entries require two variables to be set in the [front matter](https://jekyllrb.com/docs/frontmatter/):

* title: the "Question" the FAQ entry answers
* weight: the position of this entry on the page - lighter FAQ entries will float to the top.

## Testing
Certbot/website uses [html-proofer](https://github.com/gjtorikian/html-proofer) to validate the html output of the build.

To install:
```
gem install html-proofer
```

To run the tests:
```
npm test
```
(Files with known issues are ignored.)

## Travis Builds
All branches and pull requests and built and tested by Travis.

For branches, the built assets are pushed to an analagous branch in [certbot/website-builds](https://github.com/certbot/website-builds). Built assets from PRs are not saved because Travis doesn't provide a mechanism to securely push to a Github repo after PRs across forks.

To view the build of any branch, checkout that branch from certbot/website-builds and run some server to serve the files. For example,
```
python -m SimpleHTTPServer 8000
```
