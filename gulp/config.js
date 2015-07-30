var dest = 'www';
var src = 'src';
var maps = 'maps';

module.exports = {
  clean: {
    src: [dest, maps]
  },
  production: {
    src: dest + '/**/*.+(js|css).map',
    dest: dest,
    destMaps: maps
  },
  browserSync: {
    server: {
      // Serve up our build folder
      baseDir: dest
    }
  },
  lint: {
    jsSrc: src + '/**/*.js',
    jsDest: src
  },
  less: {
    autoprefixer: {
      browsers: ['last 2 version']
    },
    watchSrc: src + '/**/*.less',
    src: [dest + '/*.less',
      src + '/index.less'
    ],
    dest: dest,
    outputName: 'index.css'
  },
  images: {
    src: [src + '/images',
      src + '/images/**/*'],
    dest: dest + '/images'
  },
  markup: {
    src: [src + '/index.html',
      src + '/htdocs/**'
    ],
    dest: dest
  },
  fonts: {
    src: [src + '/fonts',
      src + '/fonts/**/*'],
    dest: dest + '/fonts'
  },
  iconFont: {
    name: 'Gulp Starter Icons',
    src: src + '/icons/*.svg',
    dest: dest + '/fonts',
    lessDest: src,
    template: './gulp/tasks/iconFont/template.less.swig',
    lessOutputName: '_icons.less',
    fontPath: 'fonts',
    className: 'icon',
    options: {
      fontName: 'Post-Creator-Icons',
      appendCodepoints: true,
      normalize: false
    }
  },
  sprite: {
    src: src + '/icons/*.png',
    destStyle: dest,
    destImage: dest + '/images',
    options: {
      base64: false,
      name: 'sprite',
      style: 'sprite.less',
      cssPath: './images',
      processor: 'less'
    }
  },
  browserify: {
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
      debug: true,
      paths: src,
      entries: src + '/index.js',
      dest: dest,
      outputName: 'index.js',

      external: ['jquery',
        'lodash',
        'debug',
        'hbsfy/runtime',
        'source-map-support/register'
      ]
    }],
    pluginsBundleConfig: {
      debug: true,
      paths: src,
      entries: [],
      dest: './vendor/js',
      outputName: 'libs.js',

      require: ['jquery',
        'lodash',
        'debug',
        'hbsfy/runtime',
        'source-map-support/register'
      ]
    }
  },
  vendorJs: {
    src: ['./vendor/js/*js'],
    dest: dest,
    outputName: 'vendor.js'
  },
  vendorCss: {
    src: ['./vendor/css/*css'],
    dest: dest,
    outputName: 'vendor.css'
  }
};
