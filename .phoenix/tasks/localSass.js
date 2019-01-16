const { src, dest, } = require('gulp');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const rename = require("gulp-rename");
const discardcomments = require('postcss-discard-comments');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const argv = require('yargs').argv;
const isMVP = (argv.mvp === undefined) ? false : true;
const config = require('../config');


export function localSass() {
  let plugins = [
    autoprefixer({ browsers: ['last 2 version'] }),
    discardcomments()
  ];

  let frameworkBuild = isMVP ? `${config.local.devcss}/mvp/*.scss` : `${config.local.devcss}/phoenix/*.scss`;
  let frameworkBuildDist = isMVP ? `${config.local.appcss}/mvp/css/` : `${config.local.appcss}/phoenix/css/`;

  return src(frameworkBuild)

    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }).on('error',sass.logError))
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(frameworkBuildDist));
  
}


