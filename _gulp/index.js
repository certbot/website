var gulp = require('gulp');
var fs = require('fs');
var tasks = fs.readdirSync('./_gulp/tasks/');

tasks.forEach(function(task) {
  require('./tasks/' + task);
});

gulp.task('watch', ['clean', 'instructions', 'css', 'js', 'jekyll:watch', 'docs:install', 'serve']);
gulp.task('build', ['clean', 'instructions', 'css', 'js', 'jekyll:build', 'docs:install']);
