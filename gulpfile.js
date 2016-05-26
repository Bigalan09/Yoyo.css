var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");

gulp.task('styles', function() {
    gulp.src('./*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/'))
});

gulp.task('minify-css', ['styles'], function() {
    return gulp.src('css/*.css')
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./css'));
});

gulp.task('build', ['styles', 'minify-css']);

//Watch task
gulp.task('default', function() {
    gulp.watch('sass/**/*.scss', ['styles', 'minify-css']);
});
