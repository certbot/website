var gulp = require('gulp'),
    env = require('gulp-environments'),
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
  ] : []
}

gulp.task('js', (done) => {
  return gulp.src(config.js.src)
    .pipe(webpack(config.webpack))
    .pipe(gulp.dest(config.js.dest));
});