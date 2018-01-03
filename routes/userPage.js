var express = require('express');
var router = express.Router();

// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/Usersql');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool(dbConfig.mysql);
// 响应一个JSON数据
var responseJSON = function(res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '-200',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

//查询贷款
router.get('/querylous', function(req, res, next) {
    // 从连接池获取连接 
    pool.getConnection(function(err, connection) {
        var param = req.query || req.params;
        console.log(param.Id);
        connection.query(userSQL.querylous, [param.Id], function(err, result) {
            if (result) {
                result = JSON.parse(JSON.stringify(result));
            }
            console.log(result);
            // 以json形式，把操作结果返回给前台页面     
            responseJSON(res, result);

            // 释放连接  
            connection.release();

        });
    });
});

//查询还款
router.get('/queryrepay', function(req, res, next) {
    // 从连接池获取连接 
    pool.getConnection(function(err, connection) {
        var param = req.query || req.params;
        // console.log('前台ID:', param.Id);
        connection.query(userSQL.queryrepay, [param.Id, 1], function(err, result) {
            if (result) {
                result = JSON.parse(JSON.stringify(result));
            }
            console.log(result);
            // 以json形式，把操作结果返回给前台页面     
            responseJSON(res, result);

            // 释放连接  
            connection.release();

        });
    });
});

//申请贷款
router.post('/apply', function(req, res, next) {
    // 从连接池获取连接 
    console.log(req.body);
    pool.getConnection(function(err, connection) {
        // var param = req.query || req.params;
        // console.log(param.userName);
        var time = new Date();
        console.log(time);
        // var repaytime = '' + time.getFullYear() + format((time.getMonth() + 1), 2) + format(time.getDate(), 2);
        time = '' + time.getFullYear() + format((time.getMonth() + 1), 2) + format(time.getDate(), 2);
        console.log('第二个', time);
        var TtY = Number(time.slice(0, 4)),
            TtM = Number(time.slice(4, 6)),
            TtD = Number(time.slice(6, 8));
        console.log(TtY, TtM, TtM);
        console.log(req.body.mouth);
        TtM += Number(req.body.mouth);
        if (TtM > 12) {
            TtY += 1;
            TtM = 1;
        }
        var TtR = '' + String(TtY) + '-' + String(TtM) + '-' + String(TtD);
        console.log('还款日期', TtR);
        connection.query('INSERT INTO brow (idCard,lous,name, applied, deadline,browTime, browStatus,repayline,repayTime) VALUES (?,?,?,?,?,?,?,?,?)', [req.body.exampleID, req.body.code, req.body.name, req.body.exampleMoney, req.body.mouth, time, 1, 0, TtR], function(err, result) {
            console.log('贷款状态', result);
            if (result) {
                res.send({ result: result, success: 1 });
            } else {
                res.send({ result: result, success: 0 });
            }
            console.log(result);
            // 以json形式，把操作结果返回给前台页面     
            // responseJSON(res, result);

            // 释放连接  
            connection.release();

        });
    });
    //截取digit长度的字符串，data不够前面补0;
    function format(data, digit) {
        for (var i = 0; i < digit; i++) {
            data = '0' + data;
        }
        return data.substr(-digit, digit);
    }
});

//查询个人信息
router.get('/querymessage', function(req, res, next) {
    // 从连接池获取连接 
    pool.getConnection(function(err, connection) {
        var param = req.query || req.params;
        console.log(param.idCard);
        connection.query(userSQL.querymessage, [param.idCard], function(err, result) {
            if (result) {
                result = JSON.parse(JSON.stringify(result));
            }
            console.log(result);
            // 以json形式，把操作结果返回给前台页面     
            responseJSON(res, result);

            // 释放连接  
            connection.release();

        });
    });
});



//更新密码
router.get('/update', function(req, res, next) {
    // 从连接池获取连接 
    pool.getConnection(function(err, connection) {
        // 获取前台页面传过来的参数  
        var param = req.query || req.params;
        // 建立连接 增加一个用户信息 
        console.log(param);
        connection.query(userSQL.updateMsg, [param.passWord, param.mobile], function(err, result) {
            console.log(result);
            if (result) {
                result = {
                    code: 200,
                    msg: '更改成功'
                };
            }

            // 以json形式，把操作结果返回给前台页面     
            responseJSON(res, result);

            // 释放连接  
            connection.release();

        });
    });
});


//确认支付
router.get('/surerepay', function(req, res, next) {
    // 从连接池获取连接 
    pool.getConnection(function(err, connection) {
        // 获取前台页面传过来的参数  
        var param = req.query || req.params;
        // 建立连接 增加一个用户信息 
        console.log(param);
        connection.query(userSQL.queryrepay, [param.Id, 1], function(err, result) {
            console.log('确认支付', result);
            if (result) {
                var repaycount = result[0].repayline;
                repaycount++;
                console.log(repaycount);
                console.log(result[0].lous);
                if (repaycount >= result[0].deadline) {
                    connection.query(userSQL.updatebrow, [repaycount, 0, result[0].lous], function(err, result) {
                        console.log('第二步', result);
                        // console.log('确认支付222:', result[0].repayline);
                        if (result) {
                            res.send({ result: result, success: 1 });
                        } else {
                            console.log("用户注册失败！")
                            console.log("失败原因：数据库")
                            res.send({ result: "失败原因：数据库", success: 0 });
                        }
                        connection.release();
                    });
                } else {
                    connection.query(userSQL.updatebrows, [repaycount, result[0].lous], function(err, result) {
                        console.log('第二步', result);
                        // console.log('确认支付222:', result[0].repayline);
                        if (result) {
                            res.send({ result: result, success: 1 });

                        } else {
                            console.log("用户支付失败！")
                            console.log("失败原因：数据库")
                            res.send({ result: "失败原因：数据库", success: 0 });
                        }
                        connection.release();
                    });
                }


            } else {
                // 以json形式，把操作结果返回给前台页面     
                responseJSON(res, result);

                // 释放连接  
                connection.release();
            }
        });
    });
});



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('userPage');
});




module.exports = router;