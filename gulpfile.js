var gulp = require('gulp'),
		prefixer = require('gulp-autoprefixer'),
		rigger = require('gulp-rigger'),
		cssnano = require('gulp-cssnano'),
		less = require('gulp-less'),
		rimraf = require('rimraf'),
		rename = require('gulp-rename'),
		cached = require('gulp-cached'),
    gulpSequence = require('gulp-sequence'),
		imagemin = require('gulp-imagemin'),
		sourcemaps = require('gulp-sourcemaps'),
		browserSync = require('browser-sync').create();



gulp.task('html', function() {
		gulp.src('__clean_html_original/index.html') // Выберем файлы по нужному пути
				.pipe(sourcemaps.init())
				.pipe(rigger()) // Прогоним через rigger
				.pipe(sourcemaps.write())
				.pipe(gulp.dest('public/'))
				.pipe(browserSync.stream());
		// Переместим их в папку build
});

gulp.task('css', function() {
		gulp.src('__clean_html_original/css/less/**/*.less') // Выберем наш style.less
				//.pipe(cached('css'))
				.pipe(sourcemaps.init())
				.pipe(less()) // Скомпилируем
				.pipe(prefixer()) // Добавим вендорные префиксы
				.pipe(sourcemaps.write())
				.pipe(gulp.dest('public/css/'))
				.pipe(browserSync.stream());
});

gulp.task('js', function(){
		gulp.src('__clean_html_original/js/*.js') // Выберем файлы по нужному пути
				.pipe(gulp.dest('public/js/'))
				.pipe(browserSync.stream());
});

gulp.task('libs', function(){
	gulp.src('__clean_html_original/libs/**/*.*')
		.pipe(gulp.dest('public/libs/'));
	});

gulp.task('fonts', function(){
	gulp.src('__clean_html_original/fonts/')
		.pipe(gulp.dest('public/fonts/'));
});

gulp.task('img', function(){
	gulp.src('__clean_html_original/img/**/*.*')
		.pipe(gulp.dest('public/img/'))
		.pipe(browserSync.stream());
	});

gulp.task('clean', function(cb) {
		rimraf('public/', cb);
});

gulp.task('build', gulpSequence(
    'clean',                            
    'html',      
		'css',
		'js',
		'libs',
		'fonts',
		'img'
	)	
);

gulp.task('browser-sync', function() {

		browserSync.init({
				proxy: "webdesignwp/wordpress-landing-page-lesson/public",
				notify: false
		});
});

gulp.task('watch', function() {
		gulp.watch('__clean_html_original/**/*.html', ['html']);
		gulp.watch('__clean_html_original/css/**/*.less', ['css']);
		gulp.watch('__clean_html_original/js/**/*.js', ['js']);
		gulp.watch('__clean_html_original/img/**/*.*', ['img']);
});


//     // Serve files from the root of this project
gulp.task('default', ['build', 'browser-sync', 'watch']);
//     // add browserSync.reload to the tasks array to make
//     // all browsers reload after tasks are complete.
