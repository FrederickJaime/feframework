
const { series, parallel, src, dest } = require('gulp');
//const requireDir = require('require-dir');
//const dir = requireDir('./.phoenix/tasks');


function build(cb) {
  cb();
  console.log('buil task')
}




exports.build = build;
exports.default = series(clean, build);


