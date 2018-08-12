var gulp 		= require("gulp");
var sass 		= require("gulp-sass");
var mustache    = require("gulp-mustache-plus");
var browserSync = require("browser-sync").create();
var runSequence = require("run-sequence");
var gulpCopy    = require("gulp-copy");
// var useref		= require("gulp-useref");
// var uglify		= require("gulp-uglify");
// var gulpIf		= require("gulp-if");
// var cssnano		= require("gulp-cssnano");
// var del 		= require("del");
// var rename		= require("gulp-rename");

// Sass
gulp.task('sass', function() {
    return gulp.src("src/scss/**/*.scss")
        .pipe(sass({
            errLogtoConsole: true
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Mustache Plus
gulp.task('mustache', function() {
    gulp.src("src/templates/*.mustache")
        .pipe(mustache({},{},{
            head: "src/templates/layout/head.mustache",
            header: "src/templates/modules/header.mustache",
            footer: "src/templates/layout/footer.mustache",
        })).pipe(gulp.dest("dist"));
});

// Start browserSync
gulp.task('browserSync', function() {
    browserSync.init({
    	server: {
    		baseDir: 'dist'
    	}
    })
});

// Watchers
gulp.task('watch', function() {
    gulp.watch("src/scss/**/*.scss", ["sass"]);
    gulp.watch("src/templates/**/*.mustache", ["mustache"]);
    gulp.watch("dist/*.html", browserSync.reload);
    gulp.watch("dist/js/**/*.js", browserSync.reload);
});

// Gulp Copy
gulp.task('copy', function() {
    gulp.src('node_modules/bootstrap/**')
        .pipe(gulp.dest('dist/vendor/bootstrap'))
    gulp.src('node_modules/jquery/**')
        .pipe(gulp.dest('dist/vendor/jquery'))
    gulp.src('node_modules/popper.js/**')
        .pipe(gulp.dest('dist/vendor/popper'))
});

// // gulp.task('js', function() {
// // 	return gulp.src('source/js/**/*')
// // 		.pipe(gulp.dest('dist/js'))
// // });

// // Cleaning
// // gulp.task('clean:dist', function() {
// //     return del.sync('dist/');
// //     return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
// // });

// // Build Sequence
// // ======================================

// Default
gulp.task('default', function(callback) {
    runSequence([
        'sass',
        'mustache',
        'browserSync'], 'watch',
        callback
    )
});


// // gulp.task('default', function(callback) {
// //     runSequence([
// //         'nunjucks',
// //     	'sass',
// //     	'browserSync'], 'watch',
// //     	callback
// //     )
// // });

// // Production
// // gulp.task('build', function() {
// //     runSequence(
// //     	['sass', 'fonts', 'htmlbeautify']
// //     )
// // });