// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
//Подключение require
const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const fileInclude = require('gulp-file-include');
const uglify = require('gulp-uglify-es').default;
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
//Автоматическое обновление браузеров
gulp.task('server', function () {
    browserSync({
        server: {
            baseDir: "dist"
        }
    });
    gulp.watch("src/*.html").on('change', browserSync.reload);
});
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
//Вся необходимая работа с файласи scss
gulp.task('styles', function () {
    return gulp.src("src/scss/**/*.+(scss|sass)")
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename({ suffix: '.min', prefix: '' }))
        .pipe(autoprefixer({ overrideBrowserslist: ['last 2 versions'], cascade: false }))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
//Автообновление файлов в указанных путей
gulp.task('watch', function () {
    gulp.watch("src/scss/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
    gulp.watch('src/js/**/*.js', gulp.parallel('scripts'));
    gulp.watch('src/img/**/*', gulp.parallel('del'));
    gulp.watch('src/img/**/*', gulp.parallel('images'));
});
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
//Выполняет все необходимые задачи с html файлов
gulp.task('html', function () {
    return gulp.src("src/index.html")
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        // .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"));
});
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
//Выполняет все необходимые задачи с js файлом
gulp.task('scripts', function () {
    return gulp.src('src/js/*.js')
        .pipe(concat('script.js'))
        // .pipe(uglify({
        //     toplevel: true
        // }))
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.stream());
});
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
//Перемещает шрифты в основную папку
gulp.task('fonts', function () {
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest("dist/fonts"));
});
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
//Выполняются задачи по оптимизации фото и перемещаются в основную папку
gulp.task('images', function () {
    return gulp.src("src/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img"));
});
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

gulp.task('del', function () {
    return del.sync('dist');
});

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
//Все функции объединяются в одну команду по умолчанию
gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'scripts', 'fonts', 'html', 'images', 'del'));
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //