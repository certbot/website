var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    globbing = require('gulp-css-globbing'),
    child = require('child_process'),
    gutil = require('gulp-util'),
    browserSync = require('browser-sync').create(),
    webpack = require('gulp-webpack');

var sassFiles = '_sass/**/*.?(s)css',
    jsFiles = '_scripts/**/*',
    siteRoot = '_site';

// @TODO: read from an environment variable.
var isProduction = false;

gulp.task('css', () => {
  gulp.src(sassFiles)
    .pipe(gulpif(!isProduction, sourcemaps.init()))
    .pipe(globbing({
        extensions: ['.scss']
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 version']
    }))
    .pipe(gulpif(!isProduction, sourcemaps.write('.')))
    .pipe(gulp.dest(siteRoot + '/css'))
    .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('js', (callback) => {
  return gulp.src(jsFiles)
    .pipe(webpack({
      entry: {
        main: './_scripts/main',
        "instruction-widget": './_scripts/instruction-widget/main'},
      output: {
        filename: '[name].js',
      },
      devtool: 'source-map',
      module: {
        loaders: [
          {test: /\.json$/, loader: 'json'},
          {test: /\.html$/, loader: 'mustache?noShortcut'}
        ]
      }
    }))
    .pipe(gulp.dest(siteRoot+'/js'));
});

gulp.task('jekyll:watch', (done) => {
  return child.spawn('jekyll', ['build',
    '--watch',
    '--incremental'],
    {stdio: 'inherit'})
    .on('close', done);
});

gulp.task('jekyll:build', () => {
  return child.spawn('jekyll', ['build'],
    {stdio: 'inherit'});
});

gulp.task('serve', () => {
  browserSync.init({
    port: 4000,
    server: {
      baseDir: siteRoot
    },
    ghostMode: false,
    notify: false,
    open: false
  });

  gulp.watch(sassFiles, ['css']);
  gulp.watch(jsFiles, ['js']);
  gulp.watch(['_site/**/*.html', '_site/**/*.js'], browserSync.reload);
});

gulp.task('watch', ['css', 'js', 'jekyll:watch', 'serve']);
gulp.task('build', ['css', 'js', 'jekyll:build']);