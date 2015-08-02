var gulp = require('gulp');

gulp.task('build', ['markup',
  'images',
  'fonts',
  'less',
  'vendor',
]);
