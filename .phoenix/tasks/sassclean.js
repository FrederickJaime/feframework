

const { src } = require('gulp');
const sasslint = require('gulp-sass-lint');
const config = require('../config');

export function sassClean(){

  return src([`${config.css.scssDir}/**/*`])
  .pipe(sasslint())
  .pipe(sasslint.format())
  .pipe(sasslint.failOnError());

}



