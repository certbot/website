'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var globbing = require('gulp-css-globbing');
var child = require('child_process');
var gutil = require('gulp-util');
var browserSync = require('browser-sync').create();

var sassFiles = '_sass/**/*.?(s)css';
var siteRoot = '_site';

gulp.task('css', () => {
  gulp.src(sassFiles)
    .pipe(sourcemaps.init())
    .pipe(globbing({
        extensions: ['.scss']
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
       browsers: ['last 2 version']
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(siteRoot + '/css'));
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