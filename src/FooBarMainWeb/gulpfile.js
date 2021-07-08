/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var del = require('del');

var sassBundle = require('./gulp/sass-bundle');
exports['sass-bundle'] = sassBundle.sassBundle;

var scriptBundle = require('./../FooBarFrontend/gulp/script-bundle');
exports['script-bundle'] = scriptBundle.scriptBundle;

var watcher = require('./gulp/watcher');
exports['watcher'] = watcher.watcher;

function InitAndWatch(cb) {
    require('child_process').execSync('npm install --no-optional', { cwd: './../' });
    require('child_process').execSync('npm prune', { cwd: './../' });
    gulp.series('watcher')(cb);
}
exports['_init-and-watch'] = InitAndWatch;

function Clean() {
    return del(['wwwroot/dist-local/**/*.*', '!wwwroot/dist-local/**/*.txt']);
}
exports['clean'] = Clean;

function Build(cb) {
    gulp.series(
        'clean',
        'script-bundle',
        'sass-bundle')(cb);
}
exports['build'] = Build;