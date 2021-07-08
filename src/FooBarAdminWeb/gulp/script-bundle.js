const gulp = require('gulp');
const dumber = require('gulp-dumber');
const merge2 = require('merge2');
const au2 = require('@aurelia/plugin-gulp').default;
const typescript = require('gulp-typescript');

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

function ScriptBundle() {
    var buildJs = () => {
        const ts = typescript.createProject('tsconfig.json', { noEmitOnError: true });
        return gulp.src('app/**/*.ts', { sourcemaps: !isCI })
            .pipe(au2())
            .pipe(ts());
    }

    var buildHtml = () => {
        return gulp.src('app/**/*.html')
            .pipe(au2());
    }

    return merge2(buildJs(), buildHtml())
        .pipe(dr())
        .pipe(gulp.dest('wwwroot/dist', { sourcemaps: isCI ? false : '.' }));
}

exports.scriptBundle = ScriptBundle;