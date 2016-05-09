var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    globbing = require('gulp-css-globbing'),
    env = require('gulp-environments'),
    del = require('del'),
    gutil = require('gulp-util'),
    browserSync = require('browser-sync');

var config = require('../config');

gulp.task('css', ['css:clean'], (done) => {
  try {
    var server = browserSync.get('Server');
  } catch(err) {
    var server = null;
  }

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
    .pipe(server ? server.stream({match: '**/*.css'}) : gutil.noop());
});

gulp.task('css:clean', function(done) {
  return del([config.css.dest],
    done);
});