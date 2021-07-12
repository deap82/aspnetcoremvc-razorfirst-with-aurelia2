exports['_init-and-watch'] = require('./init-and-watch').initAndWatch;
exports['_watch'] = require('./watcher').watcher;
exports['build'] = require('./build').build;
exports['clean'] = require('./clean').clean;
exports['common-cshtml-clean'] = require('./common-cshtml-to-app').commonCshtmlClean;
exports['common-cshtml-to-app'] = require('./common-cshtml-to-app').commonCshtmlToApp;
exports['sass-bundle'] = require('./sass-bundle').sassBundle;
exports['script-bundle'] = require('./script-bundle').scriptBundle;