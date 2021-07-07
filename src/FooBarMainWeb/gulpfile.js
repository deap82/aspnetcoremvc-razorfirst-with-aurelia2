/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var del = require('del');

var sassBundle = require('./gulp/tasks/sass-bundle');
exports['sass-bundle'] = sassBundle.sassBundle;

var scriptBundle = require('./gulp/tasks/script-bundle');
exports['script-bundle'] = (cb) => gulp.series(scriptBundle.scriptBundlePrepair, scriptBundle.scriptBundle)(cb);

var watcher = require('./gulp/tasks/watcher');
exports['watcher'] = watcher.watcher;

function InitAndWatch(cb) {
    require('child_process').execSync('npm install --no-optional', { cwd: './../' });
    require('child_process').execSync('npm prune', { cwd: './../' });
    gulp.series('watcher')(cb);
}
exports['_init-and-watch'] = InitAndWatch;

function Clean() {
    return del(['wwwroot/dist/**/*.*', '!wwwroot/dist/**/*.txt']);
}
exports['clean'] = Clean;

function Build(cb) {
    gulp.series(
        'clean',
        'script-bundle',
        'sass-bundle')(cb);
}
exports['build'] = Build;