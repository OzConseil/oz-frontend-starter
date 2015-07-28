var rimraf = require('rimraf');
var gulp = require('gulp');
var config = require('../config').clean;

gulp.task('clean', function(done) {
  return rimraf(config.src, done);
});
