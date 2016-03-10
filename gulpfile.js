'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});


gulp.task('sass', function () {
    log('Compiling sass to css.');

    return gulp
        .src('./app/sass/**/*.scss')
        .pipe($.sass())
        .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
        .pipe(gulp.dest('./app/css/'));
});

gulp.task('serve-dev',['sass'], function () {
    serve();

    gulp.watch('./app/sass/**/*.scss', ['sass'])
});


function serve() {
    var nodeOptions = {
        script: './server.js',
        delayTime: 1
    };

    /**
     * You can add dependency tasks on any of these nodemon events
     */
    return $.nodemon(nodeOptions)
        .on('restart', function (ev) {
            log('*** nodemon restarted');
        })
        .on('start', function () {
            log('*** nodemon started');
            //startBrowserSync(isDev);
        })
        .on('crash', function () {
            log('*** nodemon crashed: script crashed for some reason');
        })
        .on('exit', function () {
            log('*** nodemon exited cleanly');
        });
}


/////////////////
function log(msg) {
    $.util.log($.util.colors.blue(msg));
}