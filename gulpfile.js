
const { series, parallel, src, dest, watch } = require('gulp');
const sass  = require('gulp-sass');
const postcss = require('gulp-postcss');
const rename = require("gulp-rename");
const discardcomments = require('postcss-discard-comments');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const config = require('./.phoenix/config');
const cssnano = require('cssnano');






function build(cb) {
  cb();
  console.log(config.css.scssDir );
 // console.log(config.pkg.title);
}

let sassCompile = function() {

  let plugins = [
    autoprefixer({ browsers: ['last 2 version'] }),
    //cssnano(),
    discardcomments()
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
  .pipe(dest(config.css.distDirMin));
}


exports.build = build;
exports.default = series(
  build,
  parallel(sassCompile,sassMinCompile),
  
);


