
const { series, parallel, watch } = require('gulp');
const argv = require('yargs').argv;
const isMVP = (argv.mvp === undefined) ? false : true;
const config = require('../config');

import { phoenixFonts } from './fonts';
import { jsClean } from './clean';
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

  let localScssWatch = isMVP ? `${config.local.devcss}/mvp/*.scss` : `${config.local.devcss}/phoenix/*.scss`;
  let localJsWatch = isMVP ? `${config.local.devjs}/mvp/*.js` : `${config.local.devcss}/phoenix/*.js`;
  let localViewsWatch = isMVP ? `${config.local.devviews}/mvp/*.html` : `${config.local.devviews}/phoenix/*.html`;

  return watch(
    [
      `${config.css.scssDir}/**/*`,
      `${config.js.srcDir}/**/*`,
  
      localScssWatch,
      localJsWatch,
      localViewsWatch,
    ],
    series(
      parallel(
      //  jsClean,
        sassClean
      ),
      parallel(
        sassCompile,
        sassMinCompile,
        jsCompile,
        localViews,
        localImages
      ),
      jsCompileMin,
      localSass,
      localJs
    )
  );        
}




exports.devbuild = series(
  parallel(
  //  jsClean,
    sassClean,
    phoenixFonts
  ),
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
  localServe,
  watchfiles
);

exports.codebuild = series(
  parallel(
    //
    jsClean,
    sassClean
  ),
  parallel(
    sassCompile,
    sassMinCompile,
  ),
  jsCompile,
  jsCompileMin,
);





