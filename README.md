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
3. `sudo npm install gulp-cli -g`
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

### Hosting providers list

- Make sure to fill out the `name`, `link`, `category`, and `reviewed` fields.
- `reviewed` should be a date in format `2019.7.11`.
- `link` is usually a link to the provider's main page; it's where clicking on the name will go.
- for `category`, see descriptions [here](https://certbot.eff.org/hosting_providers/).
- for `full`/`partial` categories, one of the links provided should have evidence of being in that category.
 - only one of `tutorial`, `announcement`, `plan` will show up, in that order.
  - `partial` should have `tutorial`.
  - `full` providers shouldn't need a tutorial to turn on https. an exception might include instructions of what to do if something goes wrong and the automatic https doesn't work.
- if one provider offers multiple products, either split into two entries or note it in the `note` field.
- the `note` field is good for things like noting which products have https, or that the site is available only in certain languages. it's not meant for advertising.
- all unused fields should be `""`

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

To view the build of any branch, checkout that branch from certbot/website-builds and run nginx to serve the files using the nginx configuration file from this certbot/website repository.

A command to do this executed from the root of your local certbot/website-builds repository is
```
CERTBOT_WEBSITE_PATH=/path/to/your/local/certbot/website/repo
docker run -p 8000:4000 --rm -v "$CERTBOT_WEBSITE_PATH/nginx.conf:/etc/nginx/conf.d/default.conf:ro" -v $(pwd):/usr/share/nginx/html:ro -it nginx
```
After starting that command running, you can access the website in your browser at http://localhost:8000. To shut the server down, just hit ctrl+c in the terminal you ran the docker command.

If you are on linux and your user is not a member of the docker group, you'll need to run the command with `sudo`.
