var gulp = require('gulp'),
    browserSync = require('browser-sync').create();

var config = require('../config');

gulp.task('serve', () => {
  browserSync.init({
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
  gulp.watch([config.site_root + '/**/*.html', config.site_root + '/**/*.js'],
    browserSync.reload);
});