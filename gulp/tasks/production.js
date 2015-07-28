var rimraf = require('rimraf');
var gulp = require('gulp');
var glob = require('glob');
var del = require('del');
var config = require('../config').production;

gulp.task('production', ['build'], function() {

  return rimraf(config.destMaps, function(err){
    gulp.src(config.src)
      .pipe(gulp.dest(config.destMaps));

    glob(config.src, function (err, files) {
      del(files);
    });
  });
});
