const { src, dest } = require('gulp');
const argv = require('yargs').argv;
const isMVP = (argv.mvp === undefined) ? false : true;
const config = require('../config');

export function localViews() {
  let frameworkBuild = isMVP ? `${config.local.devviews}/mvp/*.html` : `${config.local.devviews}/phoenix/*.html`;
  let frameworkBuildDist = isMVP ? `${config.localDir}/mvp/` : `${config.localDir}/phoenix/`;
  
  return src(frameworkBuild)
  .pipe(dest(frameworkBuildDist));
  
}

