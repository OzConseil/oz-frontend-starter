// var gulp = require('gulp');
// var newer = require('gulp-newer');
// var gulpif = require('gulp-if');
// var sprite = require('css-sprite').stream;
// var config = require('../config').sprite;

// // generate sprite.png and _sprite.scss
// gulp.task('sprite', function() {
//   return gulp.src(config.src)
//     .pipe(newer(config.destStyle + '/' + config.options.style))
//     .pipe(sprite(config.options))
//     .pipe(gulpif('*.png',
//                  gulp.dest(config.destImage),
//                  gulp.dest(config.destStyle)
//     ));
// });
