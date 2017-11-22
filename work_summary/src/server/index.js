const userApi = require('./api/userApi');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// 后端api路由,将路由中间件挂载到应用
app.use('/api/user', userApi);

// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');
