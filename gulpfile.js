var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    globbing = require('gulp-css-globbing'),
    child = require('child_process'),
    gutil = require('gulp-util'),
    browserSync = require('browser-sync').create(),
    webpack = require('gulp-webpack'),
    webpackRequire = require('webpack-require'),
    fs = require('fs');

var sassFiles = '_sass/**/*.?(s)css',
    jsFiles = '_scripts/**/*',
    siteRoot = '_site';

// @TODO: read from an environment variable.
var isProduction = false;

// Write all certbot install and get started instruction sets to
// a single json file, to be consumed by Jekyll templates.
gulp.task('json-instructions', (done) => {
  webpackRequire(
    {
      module: {
        loaders: [
          {test: /\.json$/, loader: 'json'},
          {test: /\.html$/, loader: 'mustache?noShortcut'}
        ]
      }
    },
    require.resolve('./_scripts/instruction-widget/build-all.js'),
    function(err, factory, stats, mock_fs) {
      var buildAll = factory();
      var instructions = {
        all: buildAll.build()
      }
      var json = JSON.stringify(instructions, null, 2);
      fs.writeFile('./_data/instructions.json', json, done);
    }
  );
});

gulp.task('css', (done) => {
  return gulp.src(sassFiles)
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

gulp.task('js', (done) => {
  return gulp.src(jsFiles)
    .pipe(webpack({
      entry: {
        main: './_scripts/main',
        "instruction-widget": './_scripts/instruction-widget/main',
      },
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

gulp.task('watch', ['json-instructions', 'css', 'js', 'jekyll:watch', 'serve']);
gulp.task('build', ['json-instructions', 'css', 'js', 'jekyll:build']);