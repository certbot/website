var gulp = require('gulp');
var fs = require('fs');
var tasks = fs.readdirSync('./_gulp/tasks/');

tasks.forEach(function(task) {
  require('./tasks/' + task);
});

gulp.task('watch', ['jekyll:watch', 'serve']);

gulp.task('build', ['docs:install', 'jekyll:build']);
