
const { src, dest, } = require('gulp');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const rename = require("gulp-rename");
const discardcomments = require('postcss-discard-comments');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const config = require('../config');

export function sassCompile() {
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
