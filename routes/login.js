var express = require('express');
var router = express.Router();

// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/usersql');

// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool(dbConfig.mysql);



//获得信息
// router.post('/queryIdCard', function(req, res, next) {
//     // // 导入MySQL模块

//     pool.getConnection(function(err, connection) {
//         console.log(req.body);
//         // getUserById: 'SELECT * FROM users WHERE userName = ? ',
//         connection.query('SELECT * FROM user WHERE phone = ? ', [req.body.mobile], function(err, result) {
//             if (result.length > 0) {
//                 if (result[0].passWord == req.body.passwd) {
//                     console.log(result);
//                     console.log('恭喜,用户登录成功！');
//                     res.send({ result: result, success: 1 });
//                 } else {
//                     res.send({ result: '密码错误！', success: 0 });
//                 }

//             } else {
//                 // console.log(result);
//                 // console.log("用户不存在！")
//                 // console.log("请联系朱鑫亮查找原因！")
//                 res.send({ result: "用户不存在！", success: 0 });
//             }
//             connection.release();
//         });
//     });

// });


//用户登录验证
router.post('/log', function(req, res, next) {
    // // 导入MySQL模块

    pool.getConnection(function(err, connection) {
        console.log(req.body);
        // getUserById: 'SELECT * FROM users WHERE userName = ? ',
        connection.query('SELECT * FROM user WHERE phone = ? ', [req.body.mobile], function(err, result) {
            if (result.length > 0) {
                if (result[0].passWord == req.body.passwd) {
                    console.log(result);
                    console.log('恭喜,用户登录成功！');
                    res.send({ result: result, success: 1 });
                } else {
                    res.send({ result: '密码错误！', success: 0 });
                }

            } else {
                // console.log(result);
                // console.log("用户不存在！")
                // console.log("请联系朱鑫亮查找原因！")
                res.send({ result: "用户不存在！", success: 0 });
            }
            connection.release();
        });
    });

});

//验证码生成
router.post('/code', function(req, res, next) {
    var code = '';
    var codeLength = 6;
    var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //随机数   
    for (var i = 0; i < codeLength; i++) {
        var index = Math.floor(Math.random() * 36);
        code += random[index];
    }
    res.send({ 'code': code });
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    // res.send('respond with a resource');
    res.render('login');
});

module.exports = router;