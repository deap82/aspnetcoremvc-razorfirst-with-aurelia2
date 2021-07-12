var gulp = require('gulp');
var fs = require('fs');
var slash = require('slash');
var del = require('del');

//https://stackoverflow.com/a/24594123/226589
const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');
const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(isDirectory);

//https://www.gregjs.com/javascript/2016/checking-whether-a-file-directory-exists-without-using-fs-exists
function isDirSync(aPath) {
	try {
		return fs.statSync(aPath).isDirectory();
	} catch (e) {
		if (e.code === 'ENOENT') {
			return false;
		} else {
			throw e;
		}
	}
}

var isCI = false; //TODO: Parallell tasks where this is true, for production ready version

function CommonCshtmlClean(cb) {
	var destPath = 'Views/_CommonLocal/';
	del([destPath]).then(async () => {
		cb();
	});
}

function CommonCshtmlToApp(cb) {
	var destPath = isCI ? 'Views/_Common/' : 'Views/_CommonLocal/';
	
	del([destPath]).then(async () => {
		await gulp.src(['./../FooBarFrontend/ViewsCommon/**/*.cshtml', '!./../FooBarFrontend/Views/_View*.cshtml']).pipe(gulp.dest(destPath));
		await gulp.src(['./../FooBarFrontend/ViewsCommon/_View*.cshtml']).pipe(gulp.dest('Views/'));

		let sharedAreas = [];
		if (isDirSync('./../FooBarFrontend/Areas')) {
			let folders = getDirectories('./../FooBarFrontend/Areas');
			for (var i = 0; i < folders.length; i++) {
				let folder = slash(folders[i]);
				sharedAreas.push(folder.substring(folder.lastIndexOf('/') + 1));
				var folderName = folder.substring(folder.lastIndexOf('/') + 1);
				await gulp.src([`./../FooBarFrontend/Areas/${folderName}/Views/**/*.cshtml`, `!./../FooBarFrontend/Areas/${folderName}/Views/_View*.cshtml`])
					.pipe(gulp.dest(`Areas/${folderName}/` + destPath));
			}
		}

		setTimeout(() => {
			if (isDirSync('Areas')) {
				let folders = getDirectories('Areas');
				for (var i = 0; i < folders.length; i++) {
					let folder = slash(folders[i]);
					let srcPath = './../FooBarFrontend/ViewsCommon';
					let viewsPath = folder + '/Views/';
					gulp.src([`${srcPath}/_View*.cshtml`]).pipe(gulp.dest(viewsPath));
				}
			}
			cb();
		}, 100);
	});
}

exports.commonCshtmlClean = CommonCshtmlClean;
exports.commonCshtmlToApp = CommonCshtmlToApp