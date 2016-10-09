'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    scss = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-cssmin'),
    webserver = require('gulp-webserver');



gulp.task('js', function(){
    gulp
    	.src('src/js/**/*.js')
		.pipe(concat('app.js'))
		.pipe(gulp.dest('prod'));
});

gulp.task('css', function() {
    gulp
    	.src('src/scss/**/*.scss')
        .pipe(scss())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(concat('app.css'))
        .pipe(gulp.dest('prod'));
});



gulp.task('html', function() {
    gulp
    	.src('src/index.html')
        .pipe(gulp.dest('prod'));


});




gulp.task('watch', function(){
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/scss/**/*.scss', ['css']);
    gulp.watch('src/**/*.html', ['html']);
});



gulp.task('webserver', function(){
    gulp.src('./prod')
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});


gulp.task('default', [
     'js', 'css', 'html', 'watch', 'webserver'
]);
