var gulp = require('gulp'),
    child = require('child_process');

gulp.task('jekyll:watch', (done) => {
  return child.spawn('jekyll', ['build',
    '--watch',
    '--incremental'],
    {stdio: 'inherit'})
    .on('close', done);
});

gulp.task('jekyll:build', (done) => {
  return child.spawn('jekyll', ['build'],
    {stdio: 'inherit'})
    .on('close', done);
});