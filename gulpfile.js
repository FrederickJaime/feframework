
const { series, parallel, src, dest, watch, task } = require('gulp');

const args = require('yargs').argv;
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const rename = require("gulp-rename");
const discardcomments = require('postcss-discard-comments');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const config = require('./.phoenix/config');
const cssnano = require('cssnano');
const server = require('gulp-server-livereload');
const sasslint = require('gulp-sass-lint');


const pump = require('pump');
const del = require('del');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const browserSync = require('browser-sync').create();
const vinylNamed = require('vinyl-named');
const through2 = require('through2');

const gulpUglify = require('gulp-uglify');
const postcssUncss = require('postcss-uncss');
const gulpSourcemaps = require('gulp-sourcemaps');
const gulpPostcss = require('gulp-postcss');
const gulpBabel = require('gulp-babel');



/*
* LOCAL TASK FOR GENERATING STATIC PAGES 
*/
let views = function() {

  return src([`${config.local.devviews}/*.html`])
  .pipe(dest(config.localDir));

}

let images = function() {

  return src([`${config.local.devimg}/*`])
  .pipe(dest(config.local.appimg));

}

let localSass = function() {
  let plugins = [
    autoprefixer({ browsers: ['last 2 version'] }),
    discardcomments()
  ];

  return src([`${config.local.devcss}/*.scss`])

    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }).on('error',sass.logError))
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(config.local.appcss));
}

let localJs = function() {

  return src([`${config.local.devjs}/*.js`])
  .pipe(dest(config.local.appjs));

}


let localServe = function() {

  return src('app')
  .pipe(server({
    host: '127.0.0.1',
    livereload: true,
    open: true,
    log: 'debug',
    clientConsole: true,
    port: 8081
  }));
   
}


/**
 * Generic Task for all Main Gulp Build/Export Tasks
*/

// Generic Task
const genericTask = (mode, context = 'building') => {
  let port;
  let modeName;

  if (mode === 'development') {
    port = '3000';
    modeName = 'Development Mode';
  } else if (mode === 'production') {
    port = '8000';
    modeName = 'Production Mode';
  } else {
    port = undefined;
    modeName = undefined;
  }

  console.log(port);
  console.log(modeName);
  // No Side-Effects Please
  return undefined;
};



exports.devbuild = series(
  sassClean,
  parallel(
   
    sassCompile,
    sassMinCompile,
    jsCompile,
    views,
    images
  ),
  localSass,
  localJs,
  localServe

);
exports.build = build;
exports.default = series(
  build,
  sassClean,
  parallel(
    sassCompile,
    sassMinCompile,
    jsCompile,
    views,
    
  ),
  
);



watch(
  [
    `${config.css.scssDir}/**/*`,
    './assets/src/js/sxm.phoenix.js',

    `${config.local.devcss}/*.scss`,
    `${config.local.devjs}/*.js`,
    `${config.local.devviews}/*.html`,
  ],
  series(
    sassClean,
    parallel(
      sassCompile,
      sassMinCompile,
      jsCompile,
      views,
      images
    ),
    localSass,
    localJs
  )
)


