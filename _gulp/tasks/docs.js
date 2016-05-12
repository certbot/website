var gulp = require('gulp'),
    child = require('child_process'),
    git = require('gulp-git'),
    del = require('del'),
    zip = require('gulp-zip'),
    rename = require('gulp-rename');

gulp.task('docs:install', ['docs:zip', 'docs:epub', 'docs:pdf']);

gulp.task('docs:make', (done) => {
  return child.spawn('./_docs.sh', ['install'], {stdio: 'inherit', cwd: '.'})
    .on('close', done);
});

gulp.task('docs:clean', (done) => {
  return del('./_site/docs', done);
});

gulp.task('docs:html', ['docs:clean', 'docs:make'], (done) => {
  return gulp.src(['./_docs/docs/_build/html/**'], {base: './_docs/docs/_build/html/'})
    .pipe(gulp.dest('./_site/docs'));
});

gulp.task('docs:zip', ['docs:html'], (done) => {
  return gulp.src('./_docs/docs/_build/html/**')
    .pipe(zip('certbot.zip'))
    .pipe(gulp.dest('./_site/docs'));
});

gulp.task('docs:epub', ['docs:html'], (done) => {
  return gulp.src(['./_docs/docs/_build/epub/Certbot.epub'])
    .pipe(rename('certbot.epub'))
    .pipe(gulp.dest('./_site/docs'));
});

gulp.task('docs:pdf', ['docs:html'], (done) => {
  return gulp.src(['./_docs/docs/_build/latex/Certbot.pdf'])
    .pipe(rename('certbot.pdf'))
    .pipe(gulp.dest('./_site/docs'));
});
