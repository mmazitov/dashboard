const gulp = require("gulp");
const fileInclude = require("gulp-file-include");
const htmlBeautify = require("gulp-html-beautify"); // Для форматирования HTML
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const eslint = require("gulp-eslint");
const concat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const terser = require("gulp-terser");
const browserSync = require("browser-sync").create();
const gulpPostcss = require("gulp-postcss");

// Пути к файлам
const paths = {
	html: {
		src: "./src/html/**/*.html",
		dist: "./dist",
		pages: "./src/html/pages/**/*.html",
	},
	styles: {
		src: "./src/scss/**/*.scss",
		dist: "./dist/css",
	},
	scripts: {
		src: "./src/js/**/*.js",
		dist: "./dist/js",
	},
	fonts: {
		src: "./src/fonts/**/*",
		dist: "./dist/fonts",
	},
	images: {
		src: ["./src/images/**/*", "!./src/images/**/*.svg"], // Исключаем SVG
		dist: "./dist/images",
	},
	pic: {
		src: ["./src/pic/**/*", "!./src/pic/**/*.svg"], // Исключаем SVG
		dist: "./dist/pic",
	},
};

// Задача для работы с HTML
function htmlTask() {
	return gulp
		.src(paths.html.pages)
		.pipe(
			fileInclude({
				prefix: "@@",
				basepath: "@file",
			})
		)
		.pipe(
			htmlBeautify({
				indent_size: 2,
				indent_with_tabs: true,
				end_with_newline: true,
			})
		)
		.pipe(gulp.dest(paths.html.dist))
		.pipe(browserSync.stream());
}

// Задача для компиляции SCSS в CSS
function sassTask() {
	return gulp
		.src(paths.styles.src)
		.pipe(sourcemaps.init())
		.pipe(sass().on("error", sass.logError))
		.pipe(gulpPostcss([require("autoprefixer")]))
		.pipe(cleanCSS())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.styles.dist))
		.pipe(browserSync.stream());
}

// Задача для работы с JavaScript
function jsTask() {
	return gulp
		.src(paths.scripts.src)
		.pipe(sourcemaps.init())
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(terser())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.scripts.dist))
		.pipe(browserSync.stream());
}

// Остальные задачи остаются без изменений
function fontsTask() {
	return gulp.src(paths.fonts.src).pipe(gulp.dest(paths.fonts.dist));
}

async function imagesTask() {
	const imagemin = (await import("gulp-imagemin")).default;
	const imageminGifsicle = (await import("imagemin-gifsicle")).default;
	const imageminMozjpeg = (await import("imagemin-mozjpeg")).default;
	const imageminOptipng = (await import("imagemin-optipng")).default;
	const imageminSvgo = (await import("imagemin-svgo")).default;

	return gulp
		.src(paths.images.src)
		.pipe(
			imagemin([
				imageminGifsicle({ interlaced: true }),
				imageminMozjpeg({ quality: 75, progressive: true }),
				imageminOptipng({ optimizationLevel: 5 }),
				imageminSvgo({
					plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
				}),
			])
		)
		.pipe(gulp.dest(paths.images.dist));
}

async function picTask() {
	const imagemin = (await import("gulp-imagemin")).default;
	const imageminGifsicle = (await import("imagemin-gifsicle")).default;
	const imageminMozjpeg = (await import("imagemin-mozjpeg")).default;
	const imageminOptipng = (await import("imagemin-optipng")).default;
	const imageminSvgo = (await import("imagemin-svgo")).default;

	return gulp
		.src(paths.pic.src)
		.pipe(
			imagemin([
				imageminGifsicle({ interlaced: true }),
				imageminMozjpeg({ quality: 75, progressive: true }),
				imageminOptipng({ optimizationLevel: 5 }),
				imageminSvgo({
					plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
				}),
			])
		)
		.pipe(gulp.dest(paths.pic.dist));
}

// Задача для отслеживания изменений
function watchTask() {
	browserSync.init({
		server: {
			baseDir: "./dist",
		},
	});

	gulp.watch(paths.styles.src, sassTask);
	gulp.watch(paths.html.src, htmlTask);
	gulp.watch(paths.scripts.src, jsTask);
	gulp.watch(paths.images.src, imagesTask);
	gulp.watch(paths.pic.src, picTask);
	gulp.watch(paths.fonts.src, fontsTask);
}

// Сборка проекта
function buildTask(cb) {
	gulp.series(gulp.parallel(htmlTask, sassTask, jsTask, fontsTask, imagesTask, picTask))(cb);
}

exports.build = buildTask;

// Задача по умолчанию
exports.default = gulp.series(
	gulp.parallel(htmlTask, sassTask, jsTask, fontsTask, imagesTask, picTask),
	watchTask
);
