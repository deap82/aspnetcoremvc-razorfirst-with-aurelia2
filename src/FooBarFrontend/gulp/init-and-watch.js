var gulp = require('gulp');

function InitAndWatch(cb) {
    require('child_process').execSync('npm install --no-optional', { cwd: './../' });
    require('child_process').execSync('npm prune', { cwd: './../' });
    gulp.series('watcher')(cb);
}

exports.initAndWatch = InitAndWatch;