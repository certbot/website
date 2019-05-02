var gulp = require('gulp'),
    child = require('child_process'),
    git = require('gulp-git'),
    del = require('del'),
    zip = require('gulp-zip'),
    rename = require('gulp-rename');

var docs_make = function(done) {
  return child.spawn('./_docs.sh', ['install'], {stdio: 'inherit', cwd: '.'})
    .on('close', done);
}

var docs_clean = function(done) {
  return del('./_site/docs', done);
}

var docs_html = function() {
  return gulp.src(['./_docs/docs/_build/html/**'], {base: './_docs/docs/_build/html/'})
    .pipe(gulp.dest('./_site/docs'));
}

var docs_zip = function() {
  return gulp.src('./_docs/docs/_build/html/**')
    .pipe(zip('certbot.zip'))
    .pipe(gulp.dest('./_site/docs'));
}

var docs_epub = function() {
  return gulp.src(['./_docs/docs/_build/epub/Certbot.epub'])
    .pipe(rename('certbot.epub'))
    .pipe(gulp.dest('./_site/docs'));
}

var docs_pdf = function() {
  return gulp.src(['./_docs/docs/_build/latex/Certbot.pdf'])
    .pipe(rename('certbot.pdf'))
    .pipe(gulp.dest('./_site/docs'));
}

gulp.task('docs:install',
  gulp.series(docs_clean, docs_make, docs_html, gulp.parallel(
    docs_zip, docs_epub, docs_pdf
  ))
);
