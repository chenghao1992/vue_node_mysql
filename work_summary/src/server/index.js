const userApi = require('./api/userApi');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var models = require('./db');
// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
// app.use(function (req, res, next) {
//   console.log('Time:', Date.now());
//   next();
// });

var sessionStore = new MySQLStore(models.mysql);

app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));

// app.use(function (req, res, next) {
//   if (req.session.user) {  // 判断用户是否登录
//     next();
//   } else {
//     // 解析用户请求的路径
//     var arr = req.url.split('/');
//     // 去除 GET 请求路径上携带的参数
//     for (var i = 0, length = arr.length; i < length; i++) {
//       arr[i] = arr[i].split('?')[0];
//     }
//     // 判断请求路径是否为根、登录、注册、登出，如果是不做拦截
//     if (arr.length > 1 && arr[1] == '') {
//       next();
//     } else if (arr.length > 2 && arr[1] == 'user' && (arr[2] == 'register' || arr[2] == 'login' || arr[2] == 'logout')) {
//       next();
//     } else {  // 登录拦截
//       req.session.originalUrl = req.originalUrl ? req.originalUrl : null;  // 记录用户原始请求路径
//       req.flash('error', '请先登录');
//       res.redirect('/user/login');  // 将用户重定向到登录页面
//     }
//   }
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// 后端api路由,将路由中间件挂载到应用
app.use('/api/user', userApi);

// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');
