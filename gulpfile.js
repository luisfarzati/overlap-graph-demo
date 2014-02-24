var gulp = require('gulp'),
    rename = require('gulp-rename'),
    inject = require('gulp-inject'),
    refresh = require('gulp-livereload'),
    server = require('tiny-lr')(),
    karma = require('gulp-karma');

// web server support
var connect = require('connect'),
    rewrite = require('connect-modrewrite'),
    http = require('http'),
    path = require('path');

gulp.task('webserver', function () {
    var port = 3000,
        hostname = null,
        base = path.resolve('src'),
        directory = path.resolve('src'),
        routes = [
            '^/$ /.index.html'
        ];

    var app = connect()
                .use(rewrite(routes))
                .use(connect.static(base, { hidden: true }))
                .use(connect.directory(directory));

    http.createServer(app).listen(port, hostname);
});

gulp.task('livereload', function () {  
    server.listen(35729, function (err) {
        if (err) return console.log(err);
    });
});

gulp.task('build', function () {
    return gulp.src('src/index.html')
        .pipe(inject(gulp.src('src/**/*.js', { read: false }), { ignorePath: 'src', addRootSlash: false }))
        .pipe(rename('.index.html'))
        .pipe(gulp.dest('src'))
        .pipe(refresh(server));
});

gulp.task('watch', function () {
    gulp.watch(['src/index.html', 'src/**/*.js'], ['build']);
    gulp.src(['src/**/*.js'], ['test/**/*.js'])
        .pipe(karma({ action: 'watch' }));
});

gulp.task('test', function () {
    return gulp.src(['src/**/*.js'], ['test/**/*.js'])
        .pipe(karma({ action: 'run' }));
});

gulp.task('default', ['build', 'livereload', 'webserver', 'watch']);