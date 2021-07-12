const gulp = require('gulp');
const dumber = require('gulp-dumber');
const merge2 = require('merge2');
const au2 = require('@aurelia/plugin-gulp').default;
const del = require('del');
const typescript = require('gulp-typescript');
const fs = require('fs');


var isCI = false; //TODO: Parallell tasks where this is true, for production ready version
var dist = isCI ? 'dist' : 'dist-local';

var lastFilenameMap = null;

const dr = dumber({
    src: 'client',
    entryBundle: 'entry-bundle',
    baseUrl: `/${dist}`,
    codeSplit: function (moduleId, packageName) {
        if (!packageName) {
            return 'client-bundle';
        }
    },
    hash: true,
    onManifest: (filenameMap) => { lastFilenameMap = filenameMap; }
});

function ScriptBundlePrepair(cb) {
    del(['client/common', 'wwwroot/dist-local/*.js', 'wwwroot/dist-local/*.map']).then(function () {
        gulp.src(['./../FooBarFrontend/common/**/*.ts', './../FooBarFrontend/common/**/*.html'])
            .pipe(gulp.dest('client/common'))
            .on('end', cb);
    })
}

function ScriptBundle() {
    var buildJs = () => {
        const ts = typescript.createProject('tsconfig.json', { noEmitOnError: true, paths: { 'common/*': ['common/*'] } });

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

function ScriptBundleFinish(cb) {
    //For entry-bundle, lets rename the file back, because we include it with asp.net taghelper asp-append-version.
    //The source map file does not need to be renamed, because the hashed filename is referenced inside
    //entry-bundle.js int the`//# sourceMappingURL=` comment.
    fs.renameSync(`wwwroot/${dist}/${lastFilenameMap['entry-bundle.js']}`, `wwwroot/${dist}/entry-bundle.js`);
    cb();
}

exports.scriptBundle = (cb) => gulp.series(ScriptBundlePrepair, ScriptBundle, ScriptBundleFinish)(cb);