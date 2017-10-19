// 	MYPORTFOLIO 2 / SASS / GULP
var gulp = require('gulp');
	plugins = require('gulp-load-plugins')();

	// sass = require('gulp-sass'),
	// cssmin = require('gulp-cssmin'),
	// uglify = require('gulp-uglify');
	// sourcemaps = require('gulp-sourcemaps');

function handleError (error) {
  console.log(error.toString())
  this.emit('end')
}


// 	Compile Sass to CSS
gulp.task('sass', function() {
	// 	Compile Sass. Output file to "sass/css"
	// return gulp.src('./src/sass/*.scss')
  	return gulp.src('./scss/**/*.scss')
		// .pipe(plugins.sourcemaps.init())
		    .pipe(plugins.sass())
		    	.on('error', handleError)
		    .pipe(plugins.cssnano())

		// .pipe(plugins.sourcemaps.write(''))
		.pipe(gulp.dest('./css'))
});

// 	Compule JS
gulp.task('js', function() {
	return gulp.src([
		'./node_modules/jquery/dist/jquery.min.js',
		'./js/custom.js'
	])
		.pipe(plugins.babel({
			presets: ['es2015']
		}))
		// .pipe(plugins.concat('all.js'))
		// .pipe(plugins.uglify())
		.pipe(gulp.dest('./src/js'));
})

// 	Watch for file changes and run task
gulp.task('watch', function(){
  	// gulp.watch('./scss/*.scss', ['css']);
  	gulp.watch('./scss/**/*.scss', ['sass']);
  	gulp.watch('./js/*.js', ['js']);
});

gulp.task('default', ['sass', 'js', 'watch']);




























































































































































































































