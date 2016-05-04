var gulp    = require('gulp');
var del   = require('del');

var config = require('../config');

gulp.task('clean', function(done) {
  del([config.site_root + '/**', config.instructions.dest],
    done);
});