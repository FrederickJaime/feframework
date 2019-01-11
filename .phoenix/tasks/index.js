
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
import { localViews } from './localViews';
import { localImages } from './localImages';
import { localSass } from './localSass'
import { localJs } from './localJs';
import { localServe } from './localServe';


let watchfiles = function() {
  return watch(
    [
      `${config.css.scssDir}/**/*`,
      //'./assets/src/js/sxm.phoenix.js',
      `${config.js.srcDir}/**/*`,
  
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
        localViews,
        localImages
      ),
      localSass,
      localJs
    )
  );        
}




exports.devbuild = series(
  sassClean,
  parallel(
    sassCompile,
    sassMinCompile,
    jsCompile,
    localViews,
    localImages ,
  ),
  jsCompileMin,
  localSass,
  localJs,
  //localServe,
  //watchfiles
);

exports.codebuild = series(
  sassClean,
  parallel(
    sassCompile,
    sassMinCompile,
  ),
  jsCompile,
  jsCompileMin,
);





