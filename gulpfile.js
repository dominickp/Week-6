var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var Server = require('karma').Server;

//********** build stuff *****************

gulp.task('buildVendor', function(){
    gulp.src([
        'bower_components/jquery/dist/jquery.min.js', // Include jQuery first
        'bower_components/**/*.min.js' // all other minified vendor files
    ])
        .pipe(concat('vendors.js'))
        .pipe(uglify())
        .pipe(gulp.dest('bist'));
});

gulp.task('buildCSS', function(){
    gulp.src([
        'bower_components/bootstrap/dist/css/bootstrap.css',
        'src/css/**/*.css'
    ])
        .pipe(concat('styles.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('bist'));
});

gulp.task('build', ['buildVendor', 'buildCSS']);

//************************************************

gulp.task('karma', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('jshint', function () {
    gulp.src(['src/js/**/*.js', 'src/tests/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', ['jshint', 'karma']);

