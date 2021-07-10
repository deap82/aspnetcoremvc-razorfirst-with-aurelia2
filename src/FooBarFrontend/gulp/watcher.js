var gulp = require('gulp');

function Watcher(cb) {
    gulp.series('build')(() => {
        gulp.watch(['../FooBarFrontend/common/**/*.ts', '../FooBarFrontend/common/**/*.ts', 'client/**/*.ts', 'client/**/*.html', '!client/common/**/*.*'], gulp.series('script-bundle'));
        gulp.watch(['client/**/*.scss'], gulp.series('sass-bundle'));
        cb();
    });
}

exports.watcher = Watcher;