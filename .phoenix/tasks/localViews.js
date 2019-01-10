const { src, dest } = require('gulp');
const config = require('../config');

export function localViews() {
  return src([`${config.local.devviews}/*.html`])
  .pipe(dest(`${config.localDir}`));
  
}

