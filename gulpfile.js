import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';
import browserSync from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';
import clean from 'gulp-clean';
import imagemin from 'gulp-imagemin';
import newer from 'gulp-newer';
import include from 'gulp-include';
import cleanCSS from 'gulp-clean-css';
// import version from 'gulp-version-number'
import rev from 'gulp-rev';
import revCollector from 'gulp-rev-collector';  

const sass = gulpSass(dartSass);

export function pages() {

    return gulp.src('app/pages/*.html')
        .pipe(include({
            includePaths: 'app/components'
        }))
        .pipe(gulp.dest('app'))
        .pipe(browserSync.stream())
}

export function fonts() {
    return gulp.src('/app/fonts/src/*.*')
        .pipe(fonter({
            formats: ['woff', 'ttf']
        }))
        .pipe(gulp.src('app/fonts/*.ttf'))
        .pipe(ttf2woff2())
        .pipe(gulp.dest('/app/fonts'))
}

export function images() {
    return gulp.src(['app/images/src/**/*', '!app/images/src/*.svg'])
        .pipe(newer('app/images'))
        .pipe(imagemin())

        .pipe(gulp.src('app/images/src/*.svg'))
        .pipe(newer('app/images'))

        .pipe(gulp.dest('app/images'))
}

export function styles() {
    return gulp.src([
        'app/sass/**/*.scss'
    ])
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer({ovverrideBrowserslist: ['last 10 version']}))
        .pipe(cleanCSS())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
}

export function revCss() {
    return gulp.src('app/css/style.min.css')  
        .pipe(rev())  
        .pipe(gulp.dest('dist/css'))  
        .pipe(rev.manifest())  
        .pipe(gulp.dest('rev/css'));  
}

export function revJs() {
    return gulp.src('app/js/main.min.js')  
        .pipe(rev())  
        .pipe(gulp.dest('dist/js'))  
        .pipe(rev.manifest())  
        .pipe(gulp.dest('rev/js'));  
}

export function revHtmlCss() {
    return gulp.src(['rev/**/*.json', 'dist/*.html'])  
    .pipe(revCollector({
        replaceReved: true,
        dirReplacements: {
            'css': 'css',
            '/js/': 'js/',
        }
    })) 
    .pipe(gulp.dest('dist')); 
}

export function scripts() {
    return gulp.src([
        'node_modules/inputmask/dist/inputmask.min.js',
        'node_modules/axios/dist/axios.min.js',
        'app/js/main.js',
    ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.stream());
}

export function watching() {
    browserSync.init({
        // proxy: 'conditioners'
        server: {
            baseDir: "app/"
        }
    });
    gulp.watch(['app/sass/**/*.scss'], styles);
    gulp.watch(['app/js/main.js'], scripts);
    gulp.watch(['app/images/src'], images);
    gulp.watch(['app/components/*', 'app/pages/*'], pages);
    gulp.watch(['app/**/*.html']).on('change', browserSync.reload);
    // gulp.watch(['app/**/*.php']).on('change', browserSync.reload);
}

export function cleanDist() {
    return gulp.src('dist')
        .pipe(clean())
}

export function building() {
    return gulp.src([
        'app/css/style.min.css',
        'app/js/main.min.js',
        'app/**/*.html',
        '!app/components/*',
        '!app/pages/*',
        'app/fonts/*.*',
        'app/**/*.php',
        'app/images/**/*',
        'app/php-scripts/**/*.*'
    ], {
        base: 'app'
    })
    .pipe(gulp.dest('dist'))
}

export const build = gulp.series(cleanDist, building, revCss, revJs, revHtmlCss);
export const start = gulp.parallel(styles, scripts, images, pages, watching);
