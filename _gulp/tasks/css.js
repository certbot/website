var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    globbing = require('gulp-css-globbing')
    browserSync = require('browser-sync').create();

var config = require('../config');

var isProduction = false;

gulp.task('css', (done) => {
  return gulp.src(config.css.src)
    .pipe(gulpif(!isProduction, sourcemaps.init()))
    .pipe(globbing({
        extensions: ['.scss']
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 version']
    }))
    .pipe(gulpif(!isProduction, sourcemaps.write('.')))
    .pipe(gulp.dest(config.css.dest))
    .pipe(browserSync.stream({match: '**/*.css'}));
});