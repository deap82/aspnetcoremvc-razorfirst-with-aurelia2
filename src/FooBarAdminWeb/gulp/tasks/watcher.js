var gulp = require('gulp');

function Watcher(cb) {
    gulp.parallel('script-bundle', 'sass-bundle')(() => {
        gulp.watch(['app/**/*.ts', 'app/**/*.html'], gulp.series('script-bundle'));
        gulp.watch(['app/**/*.scss'], gulp.series('sass-bundle'));
        cb();
    });
}
exports.watcher = Watcher;