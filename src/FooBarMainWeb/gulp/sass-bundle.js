var gulp = require('gulp');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');


var isCI = false; //TODO: Parallell tasks where this is true, for production ready version
var dist = isCI ? 'dist' : 'dist-local';

function SassBundle() {
	del(`wwwroot/${dist}/site.css`);
	return gulp
		.src('app/**/*.scss')
		.pipe(sass(/*{ includePaths: ['node_modules/material-components-web', 'node_modules']}*/).on('error', sass.logError))
		.pipe(concatCss('site.css'))
		.pipe(autoprefixer({ overrideBrowserslist: ['> 0%'], cascade: false, grid: false }))
		.pipe(gulp.dest(`./wwwroot/${dist}/`));
}
exports.sassBundle = SassBundle;