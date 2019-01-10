
const { series, parallel, watch } = require('gulp');
const config = require('../config');


import { jsCompile } from './jscompile';
import { jsCompileMin } from './jscompile.min';
import { sassClean } from './sassclean';
import { sassCompile } from './sasscompile';
import { sassMinCompile } from './sasscompile.min';

/*
  Local development
  ============================
  These are the tasks for local development for
  testing and/or viewing items for the framework
*/
import { views } from './localViews';
import { images } from './localImages';
import { localSass } from './localSass'
import { localJs } from './localJs';
import { localServe } from './localServe';





exports.devbuild = series(
  sassClean,
  parallel(
    sassCompile,
    sassMinCompile,
    jsCompile,
    views,
    images,
  ),
  jsCompileMin,
  localSass,
  localJs,
  localServe,
  
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

//export const dev   = series( server )
//export const build = series( scripts )




//export default dev
