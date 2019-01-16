
const { src, dest } = require('gulp');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const rename = require("gulp-rename");
const discardcomments = require('postcss-discard-comments');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const argv = require('yargs').argv;
const isMVP = (argv.mvp === undefined) ? false : true;
const config = require('../config');



export function sassCompile() {
  let plugins = [
    autoprefixer({ browsers: ['last 2 version'] }),
    discardcomments(),
    //stylelint()
  ];
  let frameworkBuild = isMVP ? `${config.css.scssDir}/sxm.mvp.phoenix.scss` : `${config.css.scssDir}/sxm.phoenix.scss`;

  return src(frameworkBuild)
  
  .pipe(sourcemaps.init())
  .pipe(sass({ outputStyle: 'expanded' }).on('error',sass.logError))


  .pipe(postcss(plugins))

  
  .pipe(sourcemaps.write('.'))
  .pipe(dest(config.css.distDir));
  
}
