const { src, dest } = require('gulp');
const config = require('../config');

export function images() {
  return src([`${config.local.devimg}/*`])
  .pipe(dest(`${config.local.appimg}`));
  
}
