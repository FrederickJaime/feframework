
const { series, parallel, src, dest, watch, task } = require('gulp');
//const gulp = require('gulp');
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

// Entry point retreive from webpack
const entry = require('./webpack/entry');

// Transform Entry point into an Array for defining in gulp file
const entryArray = Object.values(entry);
// Supported Browsers
const supportedBrowsers = [
  'last 2 versions', // http://browserl.ist/?q=last+3+versions
  'ie >= 11', // https://browserl.ist/?q=ie+%3E%3D+11
  'edge >= 16', // https://browserl.ist/?q=edge+%3E%3D+16
  'firefox >= 60', // https://browserl.ist/?q=firefox+%3E%3D+60
  'chrome >= 68', // https://browserl.ist/?q=chrome+%3E%3D+68
  'safari >= 10', // https://browserl.ist/?q=safari+%3E%3D+10
  'opera >= 54', // https://browserl.ist/?q=opera+%3E%3D+54
  'ios >= 10', // http://browserl.ist/?q=ios+%3E%3D+7
  'android >= 4.4', // http://browserl.ist/?q=android+%3E%3D+4.4
  'blackberry >= 10', // https://browserl.ist/?q=ios+%3E%3D+10
  'operamobile >= 12.1', // http://browserl.ist/?q=operamobile+%3E%3D+12.1
  'samsung >= 4', // http://browserl.ist/?q=samsung+%3E%3D+4
];

// Config
const autoprefixConfig = { browsers: supportedBrowsers, cascade: false };
const babelConfig = { targets: { browsers: supportedBrowsers } };
const isProduction = args.env === 'production';

// Paths for reuse
const exportPath = './website/dist/**/*';


// Clean Styles Task
const cleanStyles = (mode) => () => {
  return ['development', 'production'].includes(mode) ? del([distPath('css')]) : undefined;
};




function build(cb) {
  // body omitted
  if(isProduction) {
    console.log('tis prod');
  } else {
    console.log('not prod');
  }
  cb();
}
build.description = 'Build the project';


task(build);


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
  .pipe(dest(config.local.appcss))
  .pipe(dest(config.css.distDirMin));
}

let jsCompile = function() {

    return src([
      './assets/src/js/sxm.phoenix.js',
    ])
    .pipe(dest(config.local.appjs))
    .pipe(dest(config.js.distDir));
}

// Build Scripts Task
const buildScripts = (mode) => (done) => {
  let streamMode;
  if (mode === 'development') streamMode = require('./webpack/config.development.js');
  else if (mode === 'production') streamMode = require('./webpack/config.production.js');
  else streamMode = undefined;

  ['development', 'production'].includes(mode) ? pump([
    gulp.src(srcPath('js')),
    vinylNamed(),
    webpackStream(streamMode, webpack),
    gulpSourcemaps.init({ loadMaps: true }),
    through2.obj(function (file, enc, cb) {
      const isSourceMap = /\.map$/.test(file.path);
      if (!isSourceMap) this.push(file);
      cb();
    }),
    gulpBabel({ presets: [['env', babelConfig]] }),
    ...((mode === 'production') ? [gulpUglify()] : []),
    gulpSourcemaps.write('./'),
    gulp.dest(distPath('js')),
    browserSync.stream(),
  ], done) : undefined;
};


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


