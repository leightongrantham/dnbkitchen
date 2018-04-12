import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import cssnano from 'cssnano';
import mqpacker from 'css-mqpacker';
import gulp from 'gulp';
import clean from 'gulp-clean';
import eslint from 'gulp-eslint';
import htmlmin from 'gulp-htmlmin';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import prettify from 'gulp-prettify';
import postcss from 'gulp-postcss';
import postscss from 'postcss-scss';
import reporter from 'postcss-reporter';
import runSequence from 'run-sequence';
import sass from 'gulp-sass';
import size from 'gulp-size';
import sourcemaps from 'gulp-sourcemaps';
import stylelint from 'stylelint';
import twig from 'gulp-twig';
import util from 'gulp-util';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';

const pkg = require('./package.json');

// Static files to copy
// gulp static

const copy = [pkg.paths.src.images + '**/*', pkg.paths.src.fonts + '**/*'];

// const onError = (err) => {
//   console.log(err);
// };

const onError = function (err) {
  console.log(err.message);
  this.emit('end');
};

// BrowserSync

gulp.task('browserSync', () => {
  browserSync.init({
    server: pkg.paths.build.root,
    notify: false
  });
});

// Scripts

gulp.task('scripts', ['eslint'], () => {
  return gulp
    .src(pkg.paths.src.js + '**/*.js')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(
      webpackStream(
        {
          config: require('./webpack.config.js')
        },
        webpack
      )
    )
    .pipe(gulp.dest(pkg.paths.build.js));
});

gulp.task('scripts-watch', ['scripts'], done => {
  browserSync.reload();
  done();
});

gulp.task('eslint', () => {
  return gulp
    .src([pkg.paths.src.js + '**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// Styles

gulp.task('styles', ['stylelint'], () => {
  return gulp
    .src(pkg.paths.src.css + '**/*.scss')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(!util.env.production ? sourcemaps.init() : util.noop())
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(
      util.env.production
        ? postcss([
            autoprefixer,
            mqpacker({ sort: true }),
            cssnano({
              discardComments: {
                removeAll: true
              }
            })
          ])
        : util.noop()
    )
    .pipe(
      !util.env.production
        ? sourcemaps.write('.', {
            includeContent: false,
            sourceRoot: pkg.paths.src.css
          })
        : util.noop()
    )
    .pipe(
      size({
        gzip: true,
        showFiles: true
      })
    )
    .pipe(gulp.dest(pkg.paths.build.css))
    .pipe(browserSync.stream({ match: '**/*.css' }));
});

gulp.task('stylelint', () => {
  return gulp
    .src(pkg.paths.src.css + '**/*.scss')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(
      postcss([stylelint(), reporter({ clearReportedMessages: true })], {
        syntax: postscss
      })
    );
});

// Twig

gulp.task('twig', () => {
  return gulp
    .src([
      pkg.paths.src.templates + '**/*/index.html',
      pkg.paths.src.templates + 'index.html'
    ])
    .pipe(plumber({ errorHandler: onError }))
    .pipe(twig())
    .pipe(
      !util.env.production ? prettify({ indent_inner_html: true }) : util.noop()
    )
    .pipe(
      util.env.production ? htmlmin({ collapseWhitespace: true }) : util.noop()
    )
    .pipe(gulp.dest(pkg.paths.build.root));
});

gulp.task('twig-watch', ['twig'], done => {
  browserSync.reload();
  done();
});

// Static

gulp.task('static', () => {
  return gulp
    .src(copy, {
      base: pkg.paths.src.root
    })
    .pipe(gulp.dest(pkg.paths.build.root));
});

// Clean

gulp.task('clean', () => {
  return gulp
    .src(pkg.paths.build.root, {
      read: false
    })
    .pipe(clean());
});

// Build
// Run with '--production' for minified output

gulp.task('build', () => {
  runSequence('clean', 'static', ['scripts-watch', 'styles', 'twig-watch']);
});

// Watch

gulp.task('watch', ['browserSync'], () => {
  gulp.watch(pkg.paths.src.js + '**/*.js', ['scripts-watch']);
  gulp.watch(pkg.paths.src.css + '**/*.scss', ['styles']);
  gulp.watch(pkg.paths.src.templates + '**/*.html', ['twig-watch']);
});

// Default

gulp.task('default', () => {
  gulp.start('watch');
});
