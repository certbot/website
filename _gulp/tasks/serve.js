var gulp = require('gulp'),
    browserSync = require('browser-sync');

var config = require('../config');
var server = browserSync.create('Server');

gulp.task('serve', () => {
  server.init({
    port: 4000,
    server: {
      baseDir: config.site_root
    },
    ghostMode: false,
    notify: false,
    open: false
  });

  gulp.watch(config.css.src, ['css']);
  gulp.watch(config.js.src, ['js']);
  gulp.watch([config.site_root + '/**/*.html',
              '!' + config.site_root + '_docs/**/*',
              config.site_root + '/**/*.js'],
    server.reload);
});