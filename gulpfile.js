// var browserSync = require('browser-sync').create()
var gulp = require('gulp')
var rename = require('gulp-rename')
var concat = require('gulp-concat')
var cssnano = require('gulp-cssnano')
var cssnext = require('postcss-cssnext')
var postCss = require('gulp-postcss')
var postcssNested = require('postcss-nested')
var uglify = require('gulp-uglify')
var clean = require('gulp-clean')

gulp.task('build-css', function () {
  var processors = [
    cssnext(),
    postcssNested()
  ]

  gulp.src(['src/css/reveal.css', 'src/css/moon.css',
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
  gulp.src(['src/index/head.html', 'tmp/content.html', 'src/index/foot.html'])
    .pipe(concat('index.html'))
    .pipe(gulp.dest('dist/'))
})

gulp.task('build-js', function () {
  gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'))
})

gulp.task('default', ['build-html', 'build-css', 'build-js'], function () {
  // content
  console.log('\n\t\t-------------\n')
  console.log('!!!   Reminder for owner  !!!\n')
  console.log('Run `gulp build-gh-pages` to build page')
  console.log('\n\t\t-------------\n')
})

// build for gh-pages
gulp.task('build-gh-pages', ['clean-gh-pages'], function () {
  gulp.src('dist/**')
    .pipe(gulp.dest('docs/'))
})

// remove all generated files from gh-pages
gulp.task('clean-gh-pages', function () {
  return gulp.src('docs/', {read: false})
    .pipe(clean())
})
