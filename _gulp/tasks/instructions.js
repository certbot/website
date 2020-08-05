var gulp = require('gulp'),
    webpackRequire = require('webpack-require'),
    del = require('del'),
    fs = require('fs');

var config = require('../config');

gulp.task('instructions:clean', function(done) {
  return del([config.instructions.dest],
    done);
});

// Write all certbot install and get started instruction sets to
// a single json file, to be consumed by Jekyll templates.
gulp.task('instructions', gulp.series('instructions:clean', (done) => {
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

      var dir = './_instructions'
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }

      var instructions = factory().build()
      instructions.forEach(function(el) {
        var path = dir + '/' + el.os.id + '-' + el.server.id + '.md';
        var body = '---\n---\n' + el.instructions;
        fs.writeFile(path, body, function() {});
      });
      done();
    }
  );
}));
