const gulp = require('gulp');
const dumber = require('gulp-dumber');
const merge2 = require('merge2');
const au2 = require('@aurelia/plugin-gulp').default;
const del = require('del');
const typescript = require('gulp-typescript');
const replace = require('gulp-replace');

const dr = dumber({
    src: 'app',
    baseURL: '/dist',
    codeSplit: function (moduleId, packageName) {
        if (!packageName) {
            return 'app-bundle';
        }
    }
});

var isCI = false;

function ScriptBundlePrepair(cb) {
    del(['app/common']).then(function () {
        gulp.src(['./../FooBarFrontend/common/**/*.ts', './../FooBarFrontend/common/**/*.html']).pipe(gulp.dest('app/common')).on('end', cb);
    })
}

function ScriptBundle() {
    var buildJs = () => {
        const ts = typescript.createProject('tsconfig.json', { noEmitOnError: true, paths: { "SHARED/*": ["common/*"] } });

        var globs = ['app/**/*.ts'];
        return gulp.src(globs, { sourcemaps: !isCI })
            .pipe(au2())
            .pipe(ts())
            .pipe(replace("from 'SHARED/", "from 'common/"));
    }

    var buildHtml = () => {
        return gulp.src('app/**/*.html')
            .pipe(au2());
    }

    return merge2(buildJs(), buildHtml())
        .pipe(dr())
        .pipe(gulp.dest('wwwroot/dist', { sourcemaps: isCI ? false : '.' }));
}

exports.scriptBundle = (cb) => gulp.series(ScriptBundlePrepair, ScriptBundle)(cb);;