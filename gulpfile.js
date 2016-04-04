'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const child = require('child_process');
const gutil = require('gulp-util');
const browserSync = require('browser-sync').create();

const sassFiles = '_sass/**/*.?(s)css';
const siteRoot = '_site';

gulp.task('css', () => {
  gulp.src(sassFiles)
    .pipe(sass())
    .pipe(gulp.dest('_site/css'));
});

gulp.task('jekyll', (done) => {
  return child.spawn('jekyll', ['build',
    '--watch',
    '--incremental',
    '--drafts'],
    {stdio: 'inherit'})
    .on('close', done);
});

gulp.task('serve', () => {
  browserSync.init({
    files: [siteRoot + '/**'],
    port: 4000,
    server: {
      baseDir: siteRoot
    },
    ghostMode: false,
    notify: false,
    open: false
  });

  gulp.watch(sassFiles, ['css']);
});

gulp.task('default', ['css', 'jekyll', 'serve']);