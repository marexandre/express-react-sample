var gulp       = require('gulp');
var nodemon    = require('gulp-nodemon');
var browserify = require('browserify');
var reactify   = require('reactify');
var source     = require('vinyl-source-stream');

var paths = {
  app: ['./components/app.jsx'],
  jsx: ['./components/*.jsx'],
};

gulp.task('jsx', function() {
  browserify(paths.app)
    .transform(reactify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('nodemon', function() {
  nodemon({
    script: 'server.js',
    ext: 'handlebars js',
    ignore: ['*.jsx'],
    env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('watch', function() {
  gulp.watch(paths.jsx, ['jsx']);
});


gulp.task('dev', ['nodemon', 'watch']);
gulp.task('default', ['watch', 'jsx']);
