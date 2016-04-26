var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    globbing = require('gulp-css-globbing'),
    env = require('gulp-environments'),
    browserSync = require('browser-sync').create();

var config = require('../config');

gulp.task('css', (done) => {
  return gulp.src(config.css.src)
    .pipe(env.development(sourcemaps.init()))
    .pipe(globbing({
        extensions: ['.scss']
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 version']
    }))
    .pipe(env.development(sourcemaps.write('.')))
    .pipe(gulp.dest(config.css.dest))
    .pipe(browserSync.stream({match: '**/*.css'}));
});