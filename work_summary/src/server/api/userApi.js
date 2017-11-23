var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

//使用连接池链接数据库

var pool = mysql.createPool(models.mysql);
// 把从数据库里查收的对象返回去直接用res.json(doc)
var jsonWrite = function(res, ret) {
    if (!ret) {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

//检测用户信息登录态
router.use('/isLogin', (req, res) => {
  if(req.session.user){
    json={
      code:0,
      msg:'登录态存在'
    };
  } else{
    json={
      code:-1,
      msg:'已失去登录态'
    };
  }
  jsonWrite(res, json);
});

//登录，查库操作(检测用户信息)
router.use('/searchUser', (req, res) => {
    var sql = $sql.user.check;
    var params = req.query;
    console.log(params);
    pool.query(sql, [params.username, params.pwd], function(error, results, fields) {
        if (error) throw error;
        if (results) {
          console.log(results);
          var json={};
          for (i in results) {
            if (params.username == results[i].user_name && params.pwd == results[i].user_pwd && params.username != '' && params.pwd != '') {
              json={
                code:0,
                msg:'操作成功'
              };
              req.session.user=params.username;
              break;
            }else {
              json={
                code:1,
                msg:'用户名或密码错误'
              }
            }
          }
          // setTimeout(function () {
          //   console.log('清除登录态');
          //   req.session.user=null;
          //   console.log(req.session)
          //
          // },3000)
            jsonWrite(res, json);
        }
    })
});
//注销(检测用户信息)
router.use('/loginOut', (req, res) => {
  req.session.user=null;
  json={
    code:0,
    msg:'注销成功'
  };
  jsonWrite(res, json);
});
// 增加用户接口
router.use('/register', (req, res) => {
    var params = req.body;
    console.log(params);
    var json={};
    var sql = $sql.user.check;
    pool.query(sql, [params.username, params.pwd], function(error, results, fields) {
      if (error) throw error;
      if (results) {
        console.log(results);
        for (i in results) {
          if (params.username == results[i].user_name && params.pwd == results[i].user_pwd && params.username != '' && params.pwd != '') {
            json={
              code:1,
              msg:'该用户已存在'
            };
            jsonWrite(res, json);
            return false;
          }
        }
        var sql = $sql.user.add;
        pool.query(sql, [params.username, params.pwd], function(error, results, fields) {
          if (error) throw error;
          if (results) {
            json={
              code:0,
              msg:'操作成功'
            }
            jsonWrite(res, json);
          }
        })
      }
    })

});

module.exports = router;
