var gulp = require('gulp');

function Build(cb) {
    gulp.series(
        'clean',
        gulp.parallel('script-bundle', 'sass-bundle', 'common-cshtml-to-app')
    )(cb);
}

exports.build = Build;