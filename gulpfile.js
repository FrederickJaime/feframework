
const { series, parallel, src, dest, watch } = require('gulp');
const config = require('./.phoenix/config');



function build(cb) {
  cb();
  console.log(config.gulp );
 // console.log(config.pkg.title);
}



exports.build = build;
exports.default = series(
  build
  );


