var gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleancss = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    base64 = require('gulp-base64'),
    plumber = require('gulp-plumber'),
    data = require('gulp-data'),
    gutil = require('gulp-util'),
    glob = require('gulp-sass-glob');

var onErr = function (err) {
  gutil.beep();
  console.log(err);
};


var path = {

  'scripts': {
    'main': 'src/scripts/**/*.js',
    'components': 'src/components/**/*.js',
  },

  'images': {
    'main': 'src/images/**/*.{png,jpg,jpeg,gif,svg}',
    'components': 'src/images/**/*.{png,jpg,jpeg,gif,svg}'
  },

  'styles': {
    'main':  'src/styles/**/*.{scss,sass,css}',
    'components': 'src/components/**/*.{scss,sass,css}'
  },

  'templates': {
    'main': 'src/templates/**/*.pug',
    'components': 'src/components/**/*.pug',
  },

  'fonts': 'src/fonts'

};

console.log(path.scripts.components);
gulp.task('templates', function() {

  gulp.src(path.templates.main)
    .pipe(plumber({ errorHandler: onErr }))
    .pipe(data(


    // this is not for production, just to demonstrate the use of json in pug!

    function() {
        return require('./src/data/variables.json');
    }

    ))

    .pipe(pug({pretty:true}))
    .pipe(gulp.dest('dist/www/'))
    .pipe(browserSync.reload({stream: true}));

});

gulp.task('styles', function() {

  gulp.src(path.styles.main)
    
    .pipe(plumber({ errorHandler: onErr }))
    .pipe(glob({ extensions: ['.scss', '.sass', '.css']}))
    .pipe(sass({ style: 'compressed' }))
    .pipe(autoprefixer({ browsers: ['last 2 versions', '>2%'] }))
    .pipe(cleancss())
    .pipe(base64({
      extensions: ['woff'],
      baseDir: 'src/fonts/',
      maxImageSize: 200*1024 // bytes = 200k
    }))
    .pipe(concat('main.css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/www/static/css/'))
    .pipe(browserSync.reload({stream: true}));

});

gulp.task('scripts', function() {

  return gulp.src([path.scripts.main,path.scripts.components])
    .pipe(plumber({ errorHandler: onErr }))
    .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/www/static/js/'))
    .pipe(browserSync.reload({stream: true}));

});

gulp.task('images', function(){

  gulp.src([path.images.main,path.images.components]  )
    .pipe(gulp.dest('dist/www/static/img/'))
    .pipe(browserSync.reload({stream: true}));

});

gulp.task('watch', function() {

  gulp.watch(path.styles.main, ['styles']);
  gulp.watch(path.styles.components, ['styles']);
  gulp.watch(path.scripts.main, ['scripts']);
  gulp.watch(path.scripts.components, ['scripts']);
  gulp.watch(path.templates.main, ['templates']);
  gulp.watch(path.templates.components, ['templates']);
  gulp.watch(path.images.main, ['images']);
  gulp.watch(path.images.components, ['images']);
  gulp.watch(path.fonts, ['styles']);

});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "dist/www/"
        }
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload({stream: true});
});


gulp.task('default', ['watch', 'images', 'styles', 'scripts', 'templates', 'browser-sync']);
