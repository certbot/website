var gulp = require('gulp'),
    child = require('child_process');

var jekyll_watch = function(done) {
  return child.spawn('jekyll', ['build',
    '--watch',
    '--incremental'],
    {stdio: 'inherit'})
    .on('close', done);
}

var jekyll_build = function(done) {
  return child.spawn('jekyll', ['build'],
    {stdio: 'inherit'})
    .on('close', done);
}

gulp.task('jekyll:watch', jekyll_watch);
gulp.task('jekyll:build', jekyll_build);
