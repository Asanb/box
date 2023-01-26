const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const gcmq = require('gulp-group-css-media-queries');
//const less = require('gulp-less');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const smartgrid = require('smart-grid');

const isDev = (process.argv.indexOf('--dev') !== -1);
const isProd = !isDev;
const isSync = (process.argv.indexOf('--sync') !== -1);

/*
	1. browserSync для html
	2. 
		gulp-uncss - удаление неиспользуемого css
		gulp-group-css-media-queries - соединение media-запрос
	3. по желанию pug html препроц
*/

/*
let cssFiles = [
	'./node_modules/normalize.css/normalize.css',
	'./src/css/base.css',
	'./src/css/grid.css',
	'./src/css/humans.css'
];
*/

function clear(){
	return del('build/*');
}

function styles(){
	return gulp.src('./src/css/styles.sass')
			   .pipe(gulpif(isDev, sourcemaps.init()))
			   //.pipe(less())
			   .pipe(sass().on('error', sass.logError))
			   //.pipe(concat('style.css'))
			   .pipe(gcmq())
			   .pipe(autoprefixer({
				   overrideBrowserslist: ["> .5%, last 2 versions"],
		           cascade: false,
		        }))
			   //.on('error', console.error.bind(console))
			   .pipe(gulpif(isProd, cleanCSS({
			   		level: 2
			   })))
			   .pipe(gulpif(isDev, sourcemaps.write()))
			   .pipe(gulp.dest('./build/css'))
			   .pipe(gulpif(isSync, browserSync.stream()));
}

function img(){
	return gulp.src('./src/img/**/*')
			   .pipe(gulp.dest('./build/img'))
}

function html(){
	return gulp.src('./src/*.html')
			   .pipe(gulp.dest('./build'))
			   .pipe(gulpif(isSync, browserSync.stream()));
}
function js(){
	return gulp.src([
		'./src/libs/jquery/dist/jquery.min.js',
		'./src/libs/likely/likely.js',
		'./src/libs/prognroll/prognroll.js',
		'./src/js/common.js',
	])
		.pipe(concat('scripts.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('build/js'))
		.pipe(gulpif(isSync, browserSync.stream()));

}

function fonts(){
	return gulp.src('./src/fonts/**/*')
		.pipe(gulp.dest('./build/fonts'))
}

function watch(){
	if(isSync){
		browserSync.init({
	        server: {
	            baseDir: "./build/",
	        }
	    });
	}

	gulp.watch('./src/css/**/*.sass', styles);
	gulp.watch('./src/**/*.html', html);
	gulp.watch('./src/js/*.js', js);
}

function grid(done){
	let settings = {
		outputStyle: 'sass',
		columns: 12,
    	offset: "20px",
    	//mobileFirst: true,
    	container: {
	        maxWidth: "1440px",
	        fields: "20px"
	    },
    	breakPoints: {
			lg: {
				width: "1140px",
				fields: "20px"
			},
    		md: {
	            width: "960px",
	        },
	        sm: {
	            width: "720px"
	        },
	        xs: {
	            width: "540px"
	        },
    	},
	};

	smartgrid('./src/css', settings);
	done();
}

let build = gulp.series(clear, 
	gulp.parallel(styles, img, fonts, js, html)
);
gulp.task('grid', grid);
gulp.task('build', build);
gulp.task('watch', gulp.series(build, watch));
