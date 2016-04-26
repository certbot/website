var gulp = require('gulp'),
    webpackRequire = require('webpack-require'),
    fs = require('fs');

// Write all certbot install and get started instruction sets to
// a single json file, to be consumed by Jekyll templates.
gulp.task('json-instructions', (done) => {
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
      var json = JSON.stringify(instructions, null, 2);
      fs.writeFile('./_data/instructions.json', json, done);
    }
  );
});