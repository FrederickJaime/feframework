
const { series, parallel, src, dest, watch } = require('gulp');
const sass  = require('gulp-sass');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const config = require('./.phoenix/config');
const cssnano = require('cssnano');




function build(cb) {
  cb();
  console.log(config.css.scssDir );
 // console.log(config.pkg.title);
}

let sassCompile = function(cb) {

  let plugins = [
    autoprefixer({browsers: ['last 2 version']}),
    cssnano()
  ];

  return src([`${config.css.scssDir}/sxm.phoenix.scss`])
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe(sass().on('error',sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(config.css.distDir));

}



exports.build = build;
exports.default = series(
  build,
  sassCompile
);


