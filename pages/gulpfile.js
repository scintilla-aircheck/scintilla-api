var gulp = require('gulp');
var compass = require('gulp-compass');

gulp.task('styles', function() {
    gulp.src('./static/sass/**/*.scss')
        .pipe(compass({
            config_file: './config.rb',
            css: 'stylesheets',
            sass: 'static/sass'
        }))
        .pipe(gulp.dest('static/build/css'));
});

gulp.task('default',function() {
    gulp.watch('static/sass/**/*.scss',['styles']);
});