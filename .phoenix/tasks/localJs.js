const { src, dest } = require('gulp');
const named = require('vinyl-named');
const compiler = require('webpack');
const webpack = require('webpack-stream');
const config = require('../config');

export function localJs() {

  return src([`${config.local.devjs}/*.js`])
  .pipe(named())
  .pipe(webpack({
      mode: 'development',
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
  .pipe(dest(`${config.local.appjs}`));
  
}