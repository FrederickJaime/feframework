const { src } = require('gulp');
const clean = require('gulp-clean');
const config = require('../config');



export function jsClean() {

  return src([
    `${config.js.distDir}/unminified/`,
    `${config.js.distDir}/minified/`,
    `${config.local.appjs}`
  ])
  .pipe(clean({force: true}));

}
