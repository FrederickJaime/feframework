const { src, dest } = require('gulp');
const config = require('../config');

export function localImages() {
  return src([`${config.local.devimg}/*`])
  .pipe(dest(`${config.local.appimg}`));
  
}
