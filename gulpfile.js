var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var Server = require('karma').Server;
var connect = require('gulp-connect');

//********** build stuff *****************

gulp.task('buildVendor', function(){
    return gulp.src([
        'bower_components/jquery/dist/jquery.min.js', // Include jQuery first
        'bower_components/**/*.min.js' // all other minified vendor files
    ])
        .pipe(concat('vendors.js'))
        .pipe(uglify())
        .pipe(gulp.dest('bist'))
        .pipe(connect.reload());
});

gulp.task('buildApp', function(){
    return gulp.src('src/js/**/*.js')
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('bist'))
        .pipe(connect.reload());
});

gulp.task('buildCSS', function(){
    return gulp.src([
        'bower_components/bootstrap/dist/css/bootstrap.css',
        'src/css/**/*.css'
    ])
        .pipe(concat('styles.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('bist'))
        .pipe(connect.reload());
});

gulp.task('moveHTML', function(){
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('bist'));
});

gulp.task('build', ['buildVendor', 'buildCSS', 'buildApp', 'moveHTML']);

//************************************************

gulp.task('karma', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('jshint', function () {
    return gulp.src(['src/js/**/*.js', 'src/tests/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', ['jshint', 'karma']);

gulp.task('default', ['build', 'test', 'connect', 'watch']);

//************************************************

gulp.task('connect', function(){
    connect.server({
        root: 'bist',
        livereload: true
    });
});
//********* watches *************************

gulp.task('watch', function(){
    gulp.watch('src/js/**/*.js', ['buildApp', 'test']);
    gulp.watch('src/css/**/*.css', ['buildCSS']);
    gulp.watch('src/**/*.html', ['moveHTML']);
});
