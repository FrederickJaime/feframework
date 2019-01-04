
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


