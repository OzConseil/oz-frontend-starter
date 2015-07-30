var gulp = require('gulp');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var config = require('../config').production;

gulp.task('production', ['build'], function(done) {
  return gulp.src(config.src)
      .pipe(gulp.dest(config.destMaps))
      .pipe(vinylPaths(del));
});
