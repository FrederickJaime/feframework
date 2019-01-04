
const { series, parallel, src, dest, watch } = require('gulp');
const sass  = require('gulp-sass');
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
const gulpZip = require('gulp-zip');
const gulpUglify = require('gulp-uglify');
const postcssUncss = require('postcss-uncss');
const gulpSourcemaps = require('gulp-sourcemaps');
const gulpPostcss = require('gulp-postcss');
const gulpBabel = require('gulp-babel');




function build(cb) {
  cb();
 // console.log(config.pkg.title);
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


