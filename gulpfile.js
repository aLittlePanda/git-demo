// 1.less编译 压缩 合并
//2.js合并 压缩 混淆
//3.img复制
//4.html压缩

var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

// 1.less编译 压缩 合并
gulp.task('style',function(){
//执行style任务的时候自动执行
   //找到less统一处理成css然后拷贝
   gulp.src('src/styles/*.less')
   .pipe(less())
   .pipe(cssnano())
   .pipe(gulp.dest('dist/styles'))
   .pipe(reload({stream:true}));

});

var uglify = require('gulp-uglify');
//2.js合并 压缩 混淆
gulp.task('script',function(){
	gulp.src('src/scripts/*.js')
	.pipe(concat('all.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/scripts'))
	.pipe(reload({stream:true}));
});

//3.img复制
gulp.task('image',function(){
	gulp.src('src/images/*.*')
	.pipe(gulp.dest('dist/images'))
	.pipe(reload({stream:true}));
});

var htmlmin = require('gulp-htmlmin');
//3.html复制
gulp.task('html',function(){	
	gulp.src('src/*.html')
    .pipe(htmlmin({
    	collapseWhitespace:true,
    	removeComments:true
    }))
	.pipe(gulp.dest('dist'))
	.pipe(reload({stream:true}));
});

//启动serve服务

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "dist/"
        }
    });

    gulp.watch('src/styles/*.less',['style']);
    gulp.watch('src/scripts/*.js',['script']);
    gulp.watch('src/images/*.*',['image']);
    gulp.watch('src/*.html',['html']);
});




