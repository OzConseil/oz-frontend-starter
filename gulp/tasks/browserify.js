/* browserify task
   ---------------
   Bundle javascripty things with browserify!

   This task is set up to generate multiple separate bundles, from
   different sources, and to use Watchify when run from the default task.

   See browserify.bundleConfigs in gulp/config.js
*/

var browserify = require('browserify');
var watchify = require('watchify');
var bundleLogger = require('../util/bundleLogger');
var gulp = require('gulp');
var handleErrors = require('../util/handleErrors');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var config = require('../config').browserify;
var reload = require('../util/bs').reload;
var _ = require('lodash');
var sourcemaps = require('gulp-sourcemaps');

var browserifyTask = function(callback, devMode) {
  process.env.BROWSERIFYSWAP_ENV = 'dist';

  if (!devMode) {
    config.bundleConfigs.push(config.pluginsBundleConfig);
  }

  var bundleQueue = config.bundleConfigs.length;

  var browserifyThis = function(bundleConfig) {

    if (devMode) {
      // Add watchify args
      _.extend(bundleConfig, watchify.args);
    }

    var b = browserify(bundleConfig);

    var bundle = function() {
      // Log when bundling starts
      bundleLogger.start(bundleConfig.outputName);

      return b.bundle()
        .on('error', handleErrors)
        .pipe(source(bundleConfig.outputName))
        .pipe(buffer())
        .pipe(sourcemaps.init({
          loadMaps: true
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(bundleConfig.dest))
        .on('end', reportFinished)
        .pipe(reload({
          stream: true
        }));
    };

    if (devMode) {
      // Wrap with watchify and rebundle on changes
      b = watchify(b);

      // Rebundle on update
      b.on('update', bundle);
      bundleLogger.watch(bundleConfig.outputName);
    }

    // Sort out shared dependencies.
    // b.require exposes modules externally
    if (bundleConfig.require) b.require(bundleConfig.require);

    // b.external excludes modules from the bundle, and expects
    // they'll be available externally
    if (bundleConfig.external) b.external(bundleConfig.external);

    var reportFinished = function() {
      // Log when bundling completes
      bundleLogger.end(bundleConfig.outputName);

      if (bundleQueue) {
        bundleQueue--;
        if (bundleQueue === 0) {
          // If queue is empty, tell gulp the task is complete.
          // https://github.com/gulpjs/gulp/blob/master/docs/API.md#accept-a-callback
          callback();
        }
      }
    };

    return bundle();
  };

  // Start bundling with Browserify for each bundleConfig specified
  config.bundleConfigs.forEach(browserifyThis);
};

gulp.task('browserify', ['lint'], browserifyTask);

module.exports = browserifyTask;
