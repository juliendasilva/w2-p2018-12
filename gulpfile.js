const gulp         = require('gulp'),
      sass         = require('gulp-sass'),
      babel        = require("gulp-babel"),
      path         = require('path'),
      uglifyJs     = require('gulp-uglify'),
      uglifyCss    = require('gulp-uglifycss'),
      autoprefixer = require('gulp-autoprefixer'),
      imagemin     = require('gulp-imagemin'),
      deploy       = require('gulp-gh-pages');


gulp.task('html', () => {
  return gulp.src(path.join(__dirname, "app/index.html"))
    .pipe(gulp.dest(path.join(__dirname, 'dist/')))
});

/* ------ Transpilation es6 to es5. ----- */
gulp.task('es6:dev', () => {
  return gulp.src(path.join(__dirname, 'app/js/app.js'))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(path.join(__dirname, "dist/js/")))
});

gulp.task('es6:prod', () => {
  return gulp.src(path.join(__dirname, 'app/js/app.js'))
    .pipe(babel({
      presets: ['es2015']
    }))
    // minify
    .pipe(uglifyJs())
    .pipe(gulp.dest(path.join(__dirname, "dist/js/")))
});

/* ------ Convert scss to regular css. ----- */
gulp.task('scss:dev', () => {
  return gulp.src(path.join(__dirname, "app/scss/style.scss"))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist/css'))
});

gulp.task('scss:prod', () => {
  return gulp.src(path.join(__dirname, "app/scss/style.scss"))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(uglifyCss())
    .pipe(gulp.dest('dist/css'))
});

/* ------ Convert tranfert app/images to dist/images ----- */
// And compress it later.
gulp.task('img:dev', () => {
  return gulp.src(path.join(__dirname, "app/images/*"))
    .pipe(gulp.dest(path.join(__dirname, 'dist/images')))
});

gulp.task('img:prod', () => {
  return gulp.src(path.join(__dirname, "app/images/*"))
    .pipe(imagemin())
    .pipe(gulp.dest(path.join(__dirname, 'dist/images')))
});

/* ------ Tranfert fonts folder ----- */
gulp.task('fonts', () => {
  return gulp.src(path.join(__dirname, "app/fonts/**/*"))
    .pipe(gulp.dest(path.join(__dirname, 'dist/fonts')))
});
/* ------ Watch news in html, scss, js files. ----- */
gulp.task('watch', ['build:dev'], () => {
  gulp.watch(['./app/index.html'], ['html']);
  gulp.watch(['./app/scss/**/*.scss'], ['scss:dev']);
  gulp.watch(['./app/js/**/*.js'], ['es6:dev']);
  gulp.watch(['./app/images/*'], ['img']);
});

/* ------ Build application. ----- */
gulp.task('build:dev', ['html', 'es6:dev', 'scss:dev', 'img:dev', 'fonts'], () => {
  // Make a build
  // Transpilation es6 to es5
  // Then ... adding some minification.
});

gulp.task('build:prod', ['html', 'es6:prod', 'scss:prod', 'img:prod', 'fonts'], () => {
  // Make a build
  // Transpilation es6 to es5
  // Then ... adding some minification.
});

gulp.task('deploy', ['build:prod'], () => {
  return gulp.src(path.join(__dirname, "/dist/**/*"))
    .pipe(deploy())
});