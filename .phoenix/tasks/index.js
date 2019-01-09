
const { series, parallel, src, dest, watch, task } = require('gulp');
//const gulp = require('gulp');
const args = require('yargs').argv;
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const rename = require("gulp-rename");
const discardcomments = require('postcss-discard-comments');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const config = require('../config');
const cssnano = require('cssnano');
const server = require('gulp-server-livereload');
const sasslint = require('gulp-sass-lint');

const gprint = require('gulp-print').default;

const del = require('del');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const browserSync = require('browser-sync').create();
const gulpUglify = require('gulp-uglify');
const postcssUncss = require('postcss-uncss');
const gulpSourcemaps = require('gulp-sourcemaps');
const gulpPostcss = require('gulp-postcss');
















let jsClean = function() {

  return src([`${config.js.distDir}/**/*`])
    .pipe(gprint())
    .pipe(vinylPaths(del));
}

let jsCompile = function() {

    return src([
      `../${config.js.srcDir}/sxm.phoenix.js`,
    ])
    .pipe(dest(`../../${config.local.appjs}`))
    .pipe(dest(`../../${config.js.distDir}`));
}




let sassClean = function() {

  return src([`${config.css.scssDir}/**/*`])
    .pipe(sasslint())
    .pipe(sasslint.format())
    .pipe(sasslint.failOnError());
  
}



let sassCompile = function() {
  let plugins = [
    autoprefixer({ browsers: ['last 2 version'] }),
    discardcomments(),
    //stylelint()
  ];

  return src([`${config.css.scssDir}/sxm.phoenix.scss`])
  
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }).on('error',sass.logError))


    .pipe(postcss(plugins))
  
    
    .pipe(sourcemaps.write('.'))
    .pipe(dest(config.css.distDir));
}

let sassMinCompile = function() {
  let plugins = [
    autoprefixer({ browsers: ['last 2 version'] }),
    cssnano(),

  ];

  return src([`${config.css.scssDir}/sxm.phoenix.scss`])
  .pipe(sourcemaps.init())
  .pipe(sass({ outputStyle: 'compressed' }).on('error',sass.logError))
  .pipe(postcss(plugins))
  .pipe(rename('sxm.phoenix.min.css'))
  .pipe(sourcemaps.write('.'))
  .pipe(dest(`${config.local.appcss}`))
  .pipe(dest(`${config.css.distDirMin}`));
}

/*
* LOCAL TASK FOR GENERATING STATIC PAGES 
*/
let views = function() {

  return src([`${config.local.devviews}/*.html`])
  .pipe(dest(`${config.localDir}`));

}

let images = function() {

  return src([`${config.local.devimg}/*`])
  .pipe(dest(`${config.local.appimg}`));

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
    .pipe(dest(`${config.local.appcss}`));
}

let localJs = function() {

  return src([`${config.local.devjs}/*.js`])
  .pipe(dest(`${config.local.appjs}`));

}


let localServe = function() {

  return src(config.localDir)
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
    //jsCompile,
    views,
    images
  ),
  localSass,
  localJs,
  localServe

);

exports.build = series(
  jsClean,
  
);

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





