const gulp = require('gulp'),
    gutil = require('gulp-util'),
    del = require('del'),
    zip = require('gulp-zip'),
    manifest = require('./src/manifest.json'),
    package = require('./package.json');

gulp.task('copyToDist:html', function()
{
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});
gulp.task('copyToDist:manifest', function()
{
    return gulp.src('src/manifest.json')
        .pipe(gulp.dest('dist'));
});
gulp.task('copyToDist:scripts', function()
{
    return gulp.src('src/scripts/**/*.js').pipe(gulp.dest('dist/scripts'));
});
gulp.task('copyToDist:styles', function()
{
    return gulp.src('src/styles/**/*.css').pipe(gulp.dest('dist/styles'));
});
gulp.task('copyToDist:locales', function()
{
    return gulp.src('src/_locales/**/*.json').pipe(gulp.dest('dist/_locales'));
});
gulp.task('clean-dist', function()
{
    return del.sync(['dist']);
});
gulp.task('dist', ['clean-dist', 'copyToDist:html', 'copyToDist:manifest', 'copyToDist:scripts', 'copyToDist:locales', 'copyToDist:styles'], function()
{
    var date = new Date();
    return gulp.src('./dist/**')
        .pipe(zip(package.name + "-" + manifest.version))
        .pipe(gulp.dest('zip'));
});