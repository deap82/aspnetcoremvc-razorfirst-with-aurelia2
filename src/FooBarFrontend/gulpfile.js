/// <binding ProjectOpened='solution-init' />

const gulp = require('gulp');

exports['common-cshtml-all-apps'] = require('./gulp/common-cshtml-to-all-apps').commonCshtmlAllApps;
exports['solution-init'] = (cb) => gulp.series('common-cshtml-all-apps')(cb);