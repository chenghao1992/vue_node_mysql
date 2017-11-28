const userApi = require('./api/userApi');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var models = require('./db');
var sessionStore = new MySQLStore(models.mysql);
var flash = require('connect-flash');

app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  cookie: {maxAge: 1000*60*30},//设置session有效期，来保存登录态的有效期，可能受浏览器缓存影响
  store: sessionStore,
  resave: true,
  rolling:true,//每个请求都重新设置一个 cookie，默认为 false。用了刷新登录态
  saveUninitialized: false
}));
app.use(flash());
app.use(function (req, res, next) {
  res.locals.errors = req.flash('error');
  res.locals.infos = req.flash('info');
  next();
});

app.use(function (req,res,next) {
  console.log(req.session.cookie.maxAge);
  if(req.session.user != null){
    console.log('已登录');
    // req.session.cookie.maxAge=30000;//有操作时重置登录态时间
    // console.log('ss:'+req.session.cookie.maxAge);
    next();
  } else{
    console.log('已失去登录态');
    next();
  }
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// 后端api路由,将路由中间件挂载到应用
app.use('/api/user', userApi);

// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');
