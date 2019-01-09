

const pkg = require('../package');

const ConfigOptions = function () {
	const config = this;


  // source directory 
  config.srcDir = '../assets/src'; 
  // dist directory
  config.distDir = '../assets/dist';

  /*
   These directories are for local development
   and testing, these are not being tracked.
  */
  // local dist directory
  config.localDev = '../local.dev';
  // local development dist : for local testing
	config.localDir = '../app';

	
  /*
    Local directories
    ===================================
    local dist directories:
    appcss : compiled scss
    appjs : compiled js
    appimg : images
    -----------------------------
    local source directories:
    devcss : scss
    devjs : js
    devimg : images
    devviews : static pages
  */
	config.local = {
		appcss: `${config.localDir}/css`,
		appjs: `${config.localDir}/js`,
		appimg: `${config.localDir}/images`,

		devcss: `${config.localDev}/scss`,
		devjs: `${config.localDev}/js`,
		devimg: `${config.localDev}/images`,
		devviews: `${config.localDev}/views`
	}
  
  

  /*
   Framework Scss/css directories
   ===================================
   scssDir : location of all scss files
   distDirmin : location of minified css
   distDir : location of unminified css
  */
	config.css = {
		scssDir: `${config.srcDir}/scss`,
		distDirMin: `${config.distDir}/css/minified`,
		distDir: `${config.distDir}/css/unminified`,

		// We are supporting the last 2 browsers, any browsers with >5% market share,
		browsers: ['> 5%', 'last 2 versions', 'ie > 10'], // config.css.browsers
  };
  
  /*
   Framework Javascript directories
   ===================================
   srcDir : source javascript
   distDir : compiled javascript
  */
  config.js = {
		srcDir: `${config.srcDir}/js`, // config.js.srcDir
		distDir: `${config.distDir}/js`, // config.js.distDir
	};
	

};

module.exports = new ConfigOptions();