const { src, dest } = require('gulp');
const argv = require('yargs').argv;
const isMVP = (argv.mvp === undefined) ? false : true;
const config = require('../config');

export function phoenixFonts(cb) {

  if (!isMVP) {

    return src(frameworkBuild)
    .pipe(dest(`${config.css.distDirMin}/fonts`))
    .pipe(dest(`${config.css.distDir}/fonts`))
    .pipe(dest(`${config.localDir}/phoenix/css/fonts`));

  } else {
    console.log('MVP does no include font directory');
    cb();
  }
  

  
}