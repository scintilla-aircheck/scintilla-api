var gulp = require('gulp');
var compass = require('gulp-compass');

function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}

gulp.task('styles', function() {
    gulp.src('./static/sass/**/*.scss')
        .pipe(compass({
            config_file: './config.rb',
            css: 'static/build/css',
            sass: 'static/sass'
        }))
        .on('error', handleError);
        //.pipe(gulp.dest('static/build/css'));
});

gulp.task('default',function() {
    gulp.watch('static/sass/**/*.scss',['styles']);
});
