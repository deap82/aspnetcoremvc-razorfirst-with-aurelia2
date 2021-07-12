const gulp = require('gulp');
const cshtml = require('./common-cshtml-to-app');

function commonCshtmlAllApps(cb) {
	var commonCshtmlClean = (dir, innerCb) => {
		process.chdir(dir);
		gulp.series(cshtml.commonCshtmlClean)(innerCb);
	}

	var commonCshtmlToApp = (dir, innerCb) => {
		setTimeout(() => {
			process.chdir(dir);
			gulp.series(cshtml.commonCshtmlToApp)(innerCb);
		}, 1000); //This timeout is always needed but needed to be increased for the run triggered by "VS ProjectOpened binding". Use same timeout in TsCompileAllApps.js.
	}

	var mainClean = (mainCb) => { commonCshtmlClean('./../FooBarMainWeb/', mainCb); };
	var adminClean = (adminCb) => { commonCshtmlClean('./../FooBarAdminWeb/', adminCb); };

	var main = (mainCb) => { commonCshtmlToApp('./../FooBarMainWeb/', mainCb); };
	var admin = (adminCb) => { commonCshtmlToApp('./../FooBarAdminWeb/', adminCb); };
	gulp.series(mainClean, adminClean, main, admin)(cb);
}

exports.commonCshtmlAllApps = commonCshtmlAllApps;