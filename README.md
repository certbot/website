# Certbot

Website for EFF's CertBot project. Uses Jekyll for static site generation.

## Getting Started

### Install
1. Install `ruby 2.0+`, `node`, and `npm 2.0+`.
2. `gem install jekyll` (requires v3.0 or higher)
3. `sudo npm install gulp -g`
4. `npm install`

### Run
To *watch* for changes and reload assets as needed via BrowserSync:
`gulp watch`

To *build* the site once:
`gulp build`

## Editing content

### Basic pages
Most pages can be edited as markdown files.

Use `/index.html` to edit the homepage.
Use `/[RELATIVE_URL]/index.html` to edit internal pages.

### FAQ
FAQ entries are a Jekyll collection. Add FAQ entries (question and answer pairs) as markdown files to the `_faq_entries` directory.

FAQ entries require two variables to be set in the [front matter](https://jekyllrb.com/docs/frontmatter/):

* title: the "Question" the FAQ entry answers
* weight: the position of this entry on the page - lighter FAQ entries will float to the top.