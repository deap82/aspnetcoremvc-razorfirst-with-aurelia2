const gulp = require('gulp');
const del = require('del');

function Clean() {
    return del(['wwwroot/dist-local/**/*.*', 'client/common/**/*.*']);
}

exports.clean = (cb) => gulp.series('common-cshtml-clean', Clean)(cb);