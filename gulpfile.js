var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var rename = require('gulp-rename');
var uglify = require('gulp-uglify');



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
// var gulp = require('gulp')
// var runSeq = require('run-sequence')

gulp.task('heroku:production', function(){
  browserSync({
    server: {
      baseDir: './'
    }
  });

  // gulp.watch(['*.html', 'css/*.css', 'js/*.js', 'views/*.html', 'template/*.html', './*.html'], {cwd: 'app'}, reload);
})


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