var gulp = require('gulp');
var jscs = require('gulp-jscs');
var eslint = require('gulp-eslint');
var handleErrors = require('../util/handleErrors');
var config = require('../config').lint;

gulp.task('lint', function lint() {
  return gulp.src(config.js.src)
    .pipe(jscs())
    .on('error', handleErrors)
    .pipe(eslint())
    .pipe(eslint.format());
});
