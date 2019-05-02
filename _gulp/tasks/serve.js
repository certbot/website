var gulp = require('gulp'),
    browserSync = require('browser-sync');

var config = require('../config');
var server = browserSync.create('Server');

var reload = function(done) {
  server.reload();
  done();
}

gulp.task('serve', (done) => {
  server.init({
    port: 4000,
    server: {
      baseDir: config.site_root,
      serveStaticOptions: {
        extensions: ['html']
      }
    },
    middleware: function(req, res, next) {
      req.url = req.url.replace(/\?server=(.*)&os=(.*)/, "/$2-$1")
      return next();
    },
    ghostMode: false,
    notify: false,
    open: false
  });

  gulp.watch(config.css.src, gulp.series('css'));
  gulp.watch(config.js.src, gulp.series('js'));
  gulp.watch([config.site_root + '/**/*.html',
              config.site_root + '/**/*.js',
              '!' + config.site_root + '/docs/**/*'],
    reload);
  done();
});
