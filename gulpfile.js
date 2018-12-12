
const { series, parallel, src, dest } = require('gulp');



function build(cb) {
  cb();
  console.log('buil task')
}

function clean(cb) {
  cb();
  console.log('clean task')
}



exports.build = build;
exports.default = series(clean, build);