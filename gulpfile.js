var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var browserSync = require('browser-sync').create();
var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');

gulp.task('styles', function() {
    var processors = [
        autoprefixer({
            browsers: ['last 1 version']
        })
    ];
    gulp.src('./*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/'))
        .pipe(gulp.dest('./documentation/css/'))
        .pipe(postcss(processors))
        .pipe(browserSync.stream());
});

gulp.task('minify-css', ['styles'], function() {
    return gulp.src('css/yoyo.css')
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./css'));
});

gulp.task('build', ['styles', 'minify-css']);

// Static server
gulp.task('develop', ['default'], function() {
    browserSync.init({
        files: "../css/yoyo.css",
        server: {
            baseDir: "./documentation/"
        }
    });
    gulp.watch("documentation/*.html").on('change', browserSync.reload);
});

//Watch task
gulp.task('default', ['build'], function() {
    gulp.watch('sass/**/*.sass', ['styles', 'minify-css']);
});
