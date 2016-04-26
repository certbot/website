var gulp = require('gulp'),
    webpack = require('gulp-webpack');

var config = require('../config');

gulp.task('js', (done) => {
  return gulp.src(config.js.src)
    .pipe(webpack({
      entry: {
        main: './_scripts/main',
        instructions: './_scripts/instruction-widget/main',
      },
      output: {
        filename: '[name].js',
      },
      devtool: "source-map",
      module: {
        loaders: [
          {test: /\.json$/, loader: 'json'},
          {test: /\.html$/, loader: 'mustache?noShortcut'}
        ]
      }
    }))
    .pipe(gulp.dest(config.js.dest));
});