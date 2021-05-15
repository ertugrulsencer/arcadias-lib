const gulp = require("gulp");
/* Plugins */
const gulpRename = require("gulp-rename");
const gulpConcat = require("gulp-concat");
/* Sass Plugins */
const sass = require("gulp-sass");
const cssmin = require("gulp-cssmin");
const concatCss = require("gulp-concat-css");
/* Js Plugins */
const jsmin = require("gulp-jsmin");
const gulpJsmin = require("gulp-jsmin");

/* Sass Tasks */
gulp.task("sass", () => {
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("./dist/css"));
});
gulp.task("sass-min", () => {
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(sass())
    .pipe(cssmin())
    .pipe(gulpRename({ suffix: ".min" }))
    .pipe(gulp.dest("./dist/css"));
});
gulp.task("sass-all-min", () => {
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(sass())
    .pipe(concatCss("all.min.css"))
    .pipe(cssmin())
    .pipe(gulp.dest("./dist/css"));
});
/* Js Tasks */
gulp.task("js-min", () => {
  return gulp
    .src("./src/js/**/*.js")
    .pipe(gulpJsmin())
    .pipe(gulp.dest("./dist/js/"));
});
gulp.task("js-all-min", () => {
  return gulp
    .src("./src/js/**/*.js")
    .pipe(gulpConcat("all-min.js"))
    .pipe(gulpJsmin())
    .pipe(gulp.dest("./dist/js/"));
});
/* Watch Sass */
gulp.task("watch-sass", () => {
  return gulp.watch(
    "./src/scss/**/*.scss",
    gulp.series("sass", "sass-min", "sass-all-min")
  );
});
gulp.task("watch-js", () => {
  return gulp.watch("./src/js/**/*.js", gulp.series("js-min", "js-all-min"));
});
