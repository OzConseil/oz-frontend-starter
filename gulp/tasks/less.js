var gulp         = require('gulp');
var less         = require('gulp-less');
var recess       = require('gulp-recess');
var sourcemaps   = require('gulp-sourcemaps');
var minifyCSS    = require('gulp-minify-css');
var handleErrors = require('../util/handleErrors');
var config       = require('../config').less;
var reload       = require('../util/bs').reload;
var autoprefixer = require('gulp-autoprefixer');
var handleErrors = require('../util/handleErrors');

gulp.task('less', function() {
  return gulp.src(config.src)
    .pipe(recess())
    .on('error', handleErrors)
    .pipe(recess.reporter())
    .pipe(sourcemaps.init())
    .pipe(less(config.settings))
    .on('error', handleErrors)
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(minifyCSS())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.dest))
    .pipe(reload({stream:true}));
});
