var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// mongoose.set('useFindAndModify', false)

var login = require('./routes/login');   //登录注册页接口
var tuijian = require('./routes/tab1');   //首页推荐接口
var detail = require('./routes/detail');   //商品详情页接口
var aboutMe = require('./routes/aboutMe');   //关于我 页面接口
var collect = require('./routes/collect');   //我的收藏 页面接口
var address = require('./routes/address');   //我的地址 页面接口
var waitSend= require('./routes/waitSend');    //购买 页面接口

var app = express();
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 要接收客户端上传的文件时必须写
var bodyParser = require('body-parser')
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb',extended:false}));

app.use('/', login);
app.use('/', tuijian);
app.use('/', detail);
app.use('/', aboutMe);
app.use('/', collect);
app.use('/', address);
app.use('/', waitSend);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen('3200',function(){
  console.log("服务器已经运行：127.0.0.1:3200")
})
module.exports = app;
