const { src, dest } = require('gulp');
const server = require('gulp-server-livereload');
const config = require('../config');

export function localServe() {

  return src(config.localDir)
  .pipe(server({
    host: '127.0.0.1',
    livereload: true,
    open: true,
    log: 'debug',
    clientConsole: true,
    port: 8081
  }));
  
}


