var gulp = require('gulp'),
    child = require('child_process'),
    git = require('gulp-git'),
    del = require('del');

gulp.task('docs:make', [], function (cb) {
  return child.spawn('./_docs.sh', ['install'], {stdio: 'inherit', cwd: '.'})
    .on('close', function(err) {
      cb(err);
    });
});

gulp.task('docs:install', ['docs:make'], function (cb) {
  gulp.src(['./_docs/docs/_build/html/**'], {base: './_docs/docs/_build/html/'})
    .pipe(gulp.dest('./_site/docs'))
    .on('end', function(err) {
      cb(err);
    });
});
