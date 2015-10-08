var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var Server = require('karma').Server;

gulp.task('buildVendor', function(){
    gulp.src([
        'bower_components/jquery/dist/jquery.min.js', // Include jQuery first
        'bower_components/**/*.min.js' // all other minified vendor files
    ])
        .pipe(concat('vendors.js'))
        .pipe(uglify())
        .pipe(gulp.dest('bist'));
});