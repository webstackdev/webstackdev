const gulp = require('gulp')

gulp.task('copy', () => {
  return src('.cache/README.md').dest('./README.md')
})
