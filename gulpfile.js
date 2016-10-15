const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const appStyle = {
  source: './app/styles/**/*.scss',
  dest: './app/styles'
};
const ghPageStyle = {
  source:  './assets/**/*.scss',
  dest:  './assets'
};

gulp.task('sass:app', () => { return compileSCSS(appStyle) } );
gulp.task('sass:gh', () => { return compileSCSS(ghPageStyle) } );

gulp.task('sass:app:watch', () => {
  gulp.watch(appStyle.source, ['sass']);
});

gulp.task('sass:gh:watch', () => {
  gulp.watch(ghPageStyle.source, ['sass']);
});

function compileSCSS(path) {
  return gulp.src(path.source)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 5%']
    }))
    .pipe(gulp.dest(path.dest));
}
