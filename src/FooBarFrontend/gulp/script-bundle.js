const gulp = require('gulp');
const dumber = require('gulp-dumber');
const merge2 = require('merge2');
const au2 = require('@aurelia/plugin-gulp').default;
const del = require('del');
const typescript = require('gulp-typescript');

var isCI = false; //TODO: Parallell tasks where this is true, for production ready version
var dist = isCI ? 'dist' : 'dist-local';

const dr = dumber({
    src: 'client',
    baseUrl: `/${dist}`,
    codeSplit: function (moduleId, packageName) {
        if (!packageName) {
            return 'client-bundle';
        }
    }
});

function ScriptBundlePrepair(cb) {
    del(['client/common']).then(function () {
        gulp.src(['./../FooBarFrontend/common/**/*.ts', './../FooBarFrontend/common/**/*.html'])
            .pipe(gulp.dest('client/common'))
            .on('end', cb);
    })
}

function ScriptBundle() {
    var buildJs = () => {
        const ts = typescript.createProject('tsconfig.json', { noEmitOnError: true, paths: { 'common/*': [ 'common/*' ] } });

        var globs = ['client/**/*.ts'];
        return gulp.src(globs, { sourcemaps: !isCI })
            .pipe(au2())
            .pipe(ts());
    }

    var buildHtml = () => {
        return gulp.src('client/**/*.html')
            .pipe(au2());
    }

    return merge2(buildJs(), buildHtml())
        .pipe(dr())
        .pipe(gulp.dest(`wwwroot/${dist}`, { sourcemaps: isCI ? false : '.' }));
}

exports.scriptBundle = (cb) => gulp.series(ScriptBundlePrepair, ScriptBundle)(cb);