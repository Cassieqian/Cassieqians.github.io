
var gulp = require('gulp');

var less = require('gulp-less');

var cssmin = require('gulp-cssmin');

var autoprefixer = require('gulp-autoprefixer');

var rename = require('gulp-rename');

var imagemin = require('gulp-imagemin');

var uglify = require('gulp-uglify');

var concat = require('gulp-concat');

var htmlmin = require('gulp-htmlmin');

var rev = require('gulp-rev');

var revCollector = require('gulp-rev-collector');

var useref = require('gulp-useref');

var gulpif = require('gulp-if');

// css 任务
gulp.task('less2css', function () {

	gulp.src('./less/*.less')
		.pipe(less())
		.pipe(cssmin())
		.pipe(autoprefixer())
		.pipe(rev())
		.pipe(gulp.dest('./release/css'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('./release/rev'))

});

gulp.task('rename', function () {

	gulp.src('./settings.html')
		.pipe(rename('abc.html'))
		.pipe(gulp.dest('./release'))

});

// 图片任务
gulp.task('image', function () {

	gulp.src(['./images/**/*', './uploads/*'], {base: './'})
		.pipe(imagemin())
		.pipe(gulp.dest('./release'));

});

// js
gulp.task('js', function () {

	gulp.src('./libs/*.js')
		.pipe(uglify())
		.pipe(concat('all.js'))
		.pipe(gulp.dest('./release/libs'));

});

gulp.task('html', function () {

	gulp.src('./*.html')
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true,
			minifyJS: true
		}))
		.pipe(gulp.dest('./release'));

});

gulp.task('revCollector', function () {

	gulp.src(['./release/rev/*.json', './*.html'])
		.pipe(revCollector())
		.pipe(gulp.dest('./release'));

});

gulp.task('useref', function () {

	gulp.src('./index.html')
		.pipe(useref())
		// .pipe(uglify())
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulp.dest('./release/views'));

});