var gulp = require('gulp'),
    webpackRequire = require('webpack-require'),
    del = require('del'),
    fs = require('fs');

var config = require('../config');

// Write all certbot install and get started instruction sets to
// a single json file, to be consumed by Jekyll templates.
gulp.task('instructions', ['instructions:clean'], (done) => {
  // We need to run the instruction widget modules with webpack loaders
  // in order to properly require mustache templates.
  webpackRequire(
    {
      module: {
        loaders: [
          {test: /\.json$/, loader: 'json'},
          {test: /\.html$/, loader: 'mustache?noShortcut'}
        ]
      }
    },
    require.resolve('./../../_scripts/instruction-widget/build-all.js'),
    function(err, factory, stats, mock_fs) {
      var buildAll = factory();
      var instructions = {
        all: buildAll.build()
      }
      instructions.all.forEach(function(el) {
        var path = "_instructions/" + el.os.id + "-" + el.server.id + ".md";
        var body = "---\n---\n" + el.instructions;
        fs.writeFile(path, body);
      });
      var json = JSON.stringify(instructions, null, 2);
      fs.writeFile(config.instructions.dest, json, done);
    }
  );
});

gulp.task('instructions:clean', function(done) {
  return del([config.instructions.dest],
    done);
});