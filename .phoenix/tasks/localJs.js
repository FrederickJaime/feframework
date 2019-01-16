const { src, dest } = require('gulp');
const named = require('vinyl-named');
const compiler = require('webpack');
const webpack = require('webpack-stream');
const isMVP = (argv.mvp === undefined) ? false : true;
const config = require('../config');

export function localJs() {
  let frameworkBuild = isMVP ? `${config.local.devjs}/mvp/*.js` : `${config.local.devjs}/phoenix/*.js`;
  let frameworkBuildDist = isMVP ? `${config.local.appjs}/mvp/js/` : `${cconfig.local.appjs}/phoenix/js/`;

  return src(frameworkBuild)
  .pipe(named())
  .pipe(webpack({
      mode: 'production',
      devtool: 'source-map',
      output: {
        filename: '[name].js'
      },
      watch: false,
      module: {
        rules: [
          { test: /\.css$/, loader: 'style!css' },
        ],
      },

  }, compiler, function(err, stats){
    
  }))
  .pipe(dest(frameworkBuildDist));
  
}