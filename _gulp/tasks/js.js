var gulp = require('gulp'),
    env = require('gulp-environments'),
    del = require('del'),
    webpack = require('gulp-webpack');

var config = require('../config');

config.webpack = {
  entry: {
    main: './_scripts/main',
    instructions: './_scripts/instruction-widget/main',
  },
  output: {
    filename: '[name].js',
  },
  devtool: env.development() ? "source-map" : "",
  module: {
    loaders: [
      {test: /\.json$/, loader: 'json'},
      {test: /\.html$/, loader: 'mustache?noShortcut'}
    ]
  },
  plugins: env.production() ? [
    new webpack.webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ] : [],
  bail: env.production()
}

var js_clean = function(done) {
  return del([config.js.dest], done);
}

var js = function() {
  return gulp.src(config.js.src)
    .pipe(webpack(config.webpack))
    .pipe(gulp.dest(config.js.dest));
}

gulp.task('js', gulp.series(js_clean, js));
