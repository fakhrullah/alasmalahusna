// var browserSync = require('browser-sync').create()
var gulp = require('gulp')
var rename = require('gulp-rename')
var concat = require('gulp-concat')
var cssnano = require('gulp-cssnano')
var cssnext = require('postcss-cssnext')
var postCss = require('gulp-postcss')
var postcssNested = require('postcss-nested')

gulp.task('build-css', function () {
  var processors = [
    cssnext(),
    postcssNested()
  ]

  return gulp.src(['src/css/reveal.css', 'src/css/moon.css',
      'src/css/gh-fork-ribbon.css'])
    .pipe(concat('all.css'))
    .pipe(postCss(processors))
    .pipe(gulp.dest('dist/css/'))
    .pipe(cssnano({
      discardComment: true
    }))
    .pipe(rename('all.min.css'))
    .pipe(gulp.dest('dist/css/'))
    // .pipe(browserSync.stream())
})

gulp.task('build-content-html', function () {
  return gulp.src('src/index/content/*.html')
    .pipe(concat('content.html'))
    .pipe(gulp.dest('tmp/'))
})

gulp.task('build-html', ['build-content-html'], function () {
  return gulp.src(['src/index/head.html', 'tmp/content.html', 'src/index/foot.html'])
    .pipe(concat('index.html'))
    .pipe(gulp.dest('dist/'))
})

gulp.task('build-js', function () {
  return gulp.src('src/js/*.js')
    .pipe(gulp.dest('dist/js/'))
})

gulp.task('default', ['build-html', 'build-css', 'build-js'], function () {
  // content
  console.log('!!!!!   Reminder for owner  !!!!!')
  console.log('Commit generated dist/* to gh-pages branch')
})
