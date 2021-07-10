var gulp = require('gulp');

function Build(cb) {
    gulp.series(
        'clean',
        gulp.parallel('script-bundle', 'sass-bundle')
    )(cb);
}

exports.build = Build;
