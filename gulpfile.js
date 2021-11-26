const { parallel, src, dest} = require('gulp'); //gulpでタスクを呼び出す
const pug = require('gulp-pug');
const fs = require('fs'); //jsonをパースする
const gulpData = require('gulp-data'); //pugで外部ファイルを扱う
const sass = require('gulp-sass')(require('sass')); //sassをコンパイルする

function htmlBuild(){
  return src(['src/*.pug', '!'+ 'src/_*.pug'])
  //jsonファイルを読み込む処理
  .pipe(gulpData(function(file){
    return JSON.parse(fs.readFileSync('./src/data.json'))
  }))
  .pipe(pug({pretty:true}))
  .pipe(dest('./dist'))
};

function sassBuild(){
  return src('src/css/*.scss')
  .pipe(sass({outputStyle:"expanded"}))
  .pipe(dest('./dist/css'))
};

function jsBuild(){
  return src('src/*.js')
  .pipe(dest('./dist/js'))
};

exports.build = parallel(htmlBuild, sassBuild);
