var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

//added 5/20/17
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var wrap   = require('gulp-wrap');
var nib    = require('nib');
var stylus = require('gulp-stylus');

var builder = require('gulp-build')


// watch files for changes and reload
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: './'
    }
  });

  gulp.watch(['*.html', 'css/*.css', 'js/*.js', 'views/*.html', 'template/*.html', './*.html'], {cwd: 'app'}, reload);
});

gulp.task('heroku', function() {
  // browserSync({
  //   server: {
  //     baseDir: './'
  //   }
  // });
  gulp.watch(['*.html', 'css/*.css', 'js/*.js', 'views/*.html', 'template/*.html', './*.html'], {cwd: 'app'}, reload);
});

// heroku test
///////////////////////////////////////////////////////////////
// var gulp = require('gulp')
// var runSeq = require('run-sequence')

//NOT Working
gulp.task('heroku:production', function(){
  browserSync({
    server: {
      baseDir: './'
    }
  });
  // gulp.watch(['*.html', 'css/*.css', 'js/*.js', 'views/*.html', 'template/*.html', './*.html'], {cwd: 'app'}, reload);
})
///////////////////////////////////////////////////////////

gulp.task('javascript', function() {
  return gulp.src('js/*.js')
    .pipe(wrap('(function($, window){<%= contents %>}(jQuery, window));'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('public/javascripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('css', function() {
  return gulp.src('css/*.styl')
    .pipe(stylus({
      use: nib(),
      compress: true
    }))
    .pipe(gulp.dest('public/stylesheets'))
    .pipe(notify({ message: 'CSS task complete' }));
});

gulp.task('default', function() {
  gulp.start('javascript');
  gulp.start('css');
});



/////////////////////////////////////////////


gulp.task('serveprod', function() {
  connect.server({
    root: '/',
    port: process.env.PORT || 5000, // localhost:5000
    livereload: false
  });
});

// gulp.task('serveprod', function() {
//   connect.server({
//     root: './',
//     port: process.env.PORT || 5000, // localhost:5000
//     livereload: false
//   });
// });


// https://github.com/gulpjs/gulp/blob/master/docs/recipes/minified-and-non-minified.md
// var DEST = './';
// gulp.task('default', function() {
//   return gulp.src(['template/**.html', 'template/**/**.html'])
//     // This will output the non-minified version
//     .pipe(gulp.dest(DEST))
//     // This will minify and rename to foo.min.js
//     .pipe(uglify())
//     .pipe(rename({ extname: 'js/templates.js' }))
//     .pipe(gulp.dest(DEST));
// });

 // src: ['template/**.html', 'template/**/**.html']
 // dest: 'js/templates.js',