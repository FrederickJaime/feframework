const { src, dest } = require('gulp');
const config = require('../config');

export function views() {
  return src([`${config.local.devviews}/*.html`])
  .pipe(dest(`${config.localDir}`));
  
}

