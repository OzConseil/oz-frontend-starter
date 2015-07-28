# Oz Frontend starter

Heavily based on greypants [gulp-starter](https://github.com/greypants/gulp-starter).

## Getting started

Always use `npm` to run any node commands, including gulp.

### Install npm dependencies
```
npm install
```

There is no `dev` and `production` mode. Everything is always compiled, contatened and uglifyed with an external sourcemap.
Nonetheless there's a task 'production' to remove the sourcemaps from the `www/` folder.

### Compile everything, launch browser and watch for changes
```
npm run build
npm start
```

This will run the `default` gulp task defined in `gulp/tasks/default.js`, which has the following task dependencies: `'lint','less', 'fonts', 'images', 'markup', 'watch'`
- The `less` task compiles and minify the `index.less` file, with an `autoprefixer`.
- `fonts` doesn't do anything but copy font files over from src to build.
- `images` moves images from source folder, ~~performs optimizations~~, then outputs them into the build folder.
- `markup` doesn't do anything but copy an html file over from src to build, but here is where you could do additional templating work.
- `watch` has `watchify` as a dependency, which will run the `browserify` task with a `devMode` flag that enables watchify. The task itself starts `browser-sync`, watches source files and will re-run the appropriate tasks when those files change.

### Rebuild everything (before deployement)
```
npm run build
```

## Coding style
Use ES6 and [Airbnb style](https://github.com/airbnb/javascript) for javascript.

On SublimeText install [SublimeLinter-eslint](https://github.com/roadhump/SublimeLinter-eslint), [SublimeLinter-jscs](https://github.com/SublimeLinter/SublimeLinter-jscs/) and [EditorConfig](https://github.com/sindresorhus/editorconfig-sublime).

Rules are in `.eslintrc` and `.jscsrc`.

There is a `.jsbeautifyrc` for autoformating support with [JsFormat](https://github.com/jdc0589/JsFormat).
You could also try [JSCSFormatter](https://github.com/TheSavior/SublimeJSCSFormatter). See this [blog post by Addy Osmani](http://addyosmani.com/blog/auto-formatting-javascript-code-style-with-jscs/).

## Gulp tasks
All paths and plugin settings have been abstracted into a centralized config object in `gulp/config.js`.

### Browserify
Compile `src/index.js` with [Browserify](http://browserify.org/). It also transpiles from ES6 and compiles [Handlebars](http://handlebarsjs.com/) templates.

The task can create multiple bundles with the `bundleConfigs` array in `gulp/config.js`. By default it creates two bundles, `index.js` for your code and `libs.js` for all your deps.
The `vendor` task is configured to concat the `libs.js` with all vendor js files in a `vendor.js` file.

### Browser-sync
Launch a [BrowserSync](http://browsersync.io/) server on [http://localhost:3000](http://localhost:3000).
Admin panel is at [http://localhost:3001](http://localhost:3001).

### Build
Run all these tasks `['markup', 'images', 'fonts', 'less', 'vendor']` so all the assets are ready in `www/` folder.

### Fonts
Copy all files in `fonts/` folder.

### Images
Copy all images in `images/` folder. You can enable `imagein` inside if needed.

### Less
Lint, compile, autoprefix, concat and minify less files.

### Lint
Lint all js code with `eslint`.

### Markup
Copy all files in the folder to the root of the `www/` directory.

### Sprite
This task is disabled by default. If you enable it, it create a sprite and css file with all images in the `icons/` folder.

### Vendor
Concat and minify all `js` and `css` file from the `vendor` folder to `vendor.css` and `vendor.js`. The `vendor.js` file will be concatenated with the `libs` bundle so we end up with two js files loaded.

### Watch

### Watchify

### Icon Fonts

Generating and re-generating icon fonts is an every once and a while task, so it's not included in `tasks/default.js`. Run the task separately any time you add an svg to your icons folder. This task has a couple of parts.

#### The task
The task calls `gulp-iconfont` and passes the options we've configured in `gulp/config.js`. Then it listens for a `codepoints` that triggers the generation of the sass file you'll be importing into your stylesheets. `gulp/iconFont/generateIconLess` passes the icon data to [a template](./gulp/tasks/iconFont/template.less.swig), then outputs the resulting file to your sass directory. See the [gulp-iconFont docs](https://github.com/nfroidure/gulp-iconfont) for more config details. You may reconfigure the template to output whatever you'd like. The way it's currently set up will make icons usable as both class names and mixins.

```less
.twitter-button {
  +icon--twitter // (@include in .scss syntax)
}
```

or

```html
<span class="icon -twitter"></span>
```

--
