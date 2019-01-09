const { src, dest } = require('gulp');
const compiler = require('webpack');
const webpack = require('webpack-stream');
const config = require('../config');

export function jsCompile() {

  return src(`${config.js.srcDir}/main.js`)
  .pipe(webpack({
      mode: 'development',
      devtool: 'source-map',
      output: {
        filename: 'sxm.phoenix.js'
      },
      watch: false,
      module: {
        rules: [
          { test: /\.css$/, loader: 'style!css' },
        ],
      },

  }, compiler, function(err, stats){
    
  }))
  .pipe(dest(`${config.js.distDir}/unminified/`));
  
}

