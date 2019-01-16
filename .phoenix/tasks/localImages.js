const { src, dest } = require('gulp');
const argv = require('yargs').argv;
const isMVP = (argv.mvp === undefined) ? false : true;
const config = require('../config');

export function localImages() {
  let frameworkBuild = isMVP ? `${config.local.devimg}/mvp/*` : `${config.local.devimg}/phoenix/*`;
  let frameworkBuildDist = isMVP ? `${config.local.appimg}/mvp/images/` : `${config.local.appimg}/phoenix/images/`;

  return src(frameworkBuild )
  .pipe(dest(frameworkBuildDist));
  
}
