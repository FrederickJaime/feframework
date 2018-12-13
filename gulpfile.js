
const { series, parallel, src, dest, watch } = require('gulp');
//const requireDir = require('require-dir');
//const dir = requireDir('./.phoenix/tasks');
const config = require('./.phoenix/config');

function build(cb) {
  cb();
  console.log(config.srcDir );
}



exports.build = build;
exports.default = series( build );


