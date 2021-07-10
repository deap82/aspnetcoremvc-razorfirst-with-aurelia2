var del = require('del');

function Clean() {
    return del(['wwwroot/dist-local/**/*.*']);
}

exports.clean = Clean;