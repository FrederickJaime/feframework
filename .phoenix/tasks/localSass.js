const { src, dest, } = require('gulp');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const rename = require("gulp-rename");
const discardcomments = require('postcss-discard-comments');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const config = require('../config');


export function localSass() {
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


