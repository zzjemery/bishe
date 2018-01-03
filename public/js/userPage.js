$(function() {
    var Id = sessionStorage.Id;
    var name = sessionStorage.Uname;
    var phone = sessionStorage.Phone;
    var mouth;
    $('.surerepay').on('click', function() {
        alert(1);
        // $(this).addClass('ban');
    })
    $('#headingOne').on('click', function() {
        $('#showfenqi').addClass('dis-block');
        $('#showfenqi').siblings().removeClass('dis-block');
    });
    $('#headingTwo').on('click', function() {
        $('#plan').addClass('dis-block');
        $('#plan').siblings().removeClass('dis-block');
    });
    $('#headingThree').on('click', function() {
        $('#apply').addClass('dis-block');
        $('#apply').siblings().removeClass('dis-block');
    });
    $('#headingFour').on('click', function() {
        $('#message').addClass('dis-block');
    });
    $('#pMessage').on('click', function() {
        $('.pMessage').addClass('dis-block');
        $('#message').siblings().removeClass('dis-block');
        $('.pMessage').siblings().removeClass('dis-block');
    });
    $('#rePwd').on('click', function() {
        $('.rePwd').addClass('dis-block');
        $('#message').siblings().removeClass('dis-block');
        $('.rePwd').siblings().removeClass('dis-block');
    });
    //test
    $('.radio-inline').on('click', function() {
            mouth = $(this).children().val();
        })
        // 贷款查询
    $('#headingOne').on('click', function() {
        // $('#tograde').css('display', 'block').siblings().css('display', 'none');
        $.ajax({
            type: "get",
            url: "/userPage/querylous",
            dataType: "json",
            data: { "Id": Id },
            success: function(a) {
                $('#showmessage').html("");
                for (var i = 0; i < a.length; i++) {
                    var Tt = a[i].browTime.slice(0, 10);
                    $('#showmessage').append(`<tr><th>${a[i].lous}</th><td>${a[i].idCard}</td><td>${a[i].name}</td><td>${a[i].applied}</td><td>${a[i].deadline}</td><td>${Tt}</td><td><button class="btn btn-info showpaper" data-toggle="modal" data-target="#myModal2" >查看合同</button></td></tr>`);
                }
                // history();
            }
        });
    });


    //查询还款计划
    $('#headingTwo').on('click', function() {
        // $('#tograde').css('display', 'block').siblings().css('display', 'none');
        $.ajax({
            type: "get",
            url: "/userPage/queryrepay",
            dataType: "json",
            data: { "Id": Id },
            success: function(a) {
                console.log(a);
                var deadline = a[0].deadline;
                var lous = a[0].lous;
                var applied = a[0].applied;
                var money = parseInt(a[0].applied / deadline * 100) / 100;
                var browStatus = a[0].browStatus;
                var Tt = a[0].browTime.slice(0, 10),
                    TtY = Number(a[0].browTime.slice(0, 10).split("-")[0]),
                    TtM = Number(a[0].browTime.slice(0, 10).split("-")[1]),
                    TtD = Number(a[0].browTime.slice(0, 10).split("-")[2]);
                $('#showplan').html("");
                // for (var i = 0; i < a[0].deadline; i++) {
                for (var i = 0; i < deadline; i++) {
                    // console.log($(a[i].userName));
                    TtM += 1;
                    if (TtM > 12) {
                        TtY += 1;
                        TtM = 1;
                    }
                    var TtR = String(TtY) + '-' + String(TtM) + '-' + String(TtD);
                    $('#showplan').append(`<tr><th>第${i+1}期</th><td>${lous}</td><td>${TtR}</td><td>${money}</td><td>${applied}</td><td><button class="btn btn-info" data-toggle="modal" data-target="#myModal2">还款</button></td><td><span class="surerepay">确定还款</span></td></tr>`);

                    // }
                }
                $('.surerepay').on('click', function(ev) {
                    console.log(ev.target);
                    console.log($(this).parent().prev().children());
                    $(this).parent().prev().children().addClass('disabled');
                    $(this).parent().prev().children().prop('disabled', true);
                });
                // history();
            }
        });
    });

    //申请贷款
    $('#sureApply').on('click', function() {
        var exampleID = $('#exampleID'),
            exampleMoney = $('#exampleMoney');
        var code = '';

        var codeLength = 6;
        var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //随机数   
        for (var i = 0; i < codeLength; i++) {
            var index = Math.floor(Math.random() * 36);
            code += random[index];
        }
        var data = { 'exampleID': exampleID.val(), 'exampleMoney': exampleMoney.val(), 'code': code, 'name': name, 'mouth': mouth };
        // console.log(data);
        if (Id == exampleID.val()) {
            $.ajax({
                type: "post",
                url: "/userPage/apply",
                dataType: "json",
                data: data,
                success: (d) => {
                    console.log('申请成功', d);
                    if (d.success) {
                        alert('申请成功!');
                        console.log(d);
                        // promat_info.html('恭喜，用户申请成功！请登录');
                    } else {
                        alert('您已经申请过贷款，请先还清上次贷款！')
                        console.log(d);
                        // promat_info.html(d.result);
                    }
                },
                error: (err) => {
                    console.log('出错了');
                }
            });
        } else {
            alert('两次身份证不同');
        }

    })

    //查询个人信息
    $('#pMessage').on('click', function() {
        $.ajax({
            type: "get",
            url: "/userPage/querymessage",
            dataType: "json",
            data: { "idCard": Id },
            success: function(a) {
                $('.pMessage').html("");
                // console.log(a);
                for (var i = 0; i < a.length; i++) {
                    // console.log(Number(a[i].regTime.slice(0, 10).split("-")[1]) + 1);
                    var Tt = a[i].regTime.slice(0, 10);
                    $('.pMessage').append(`<div><h2>我的联系信息</h2><div class="allmessage" style="padding-left:150px;margin-top:50px;"><p>姓<span style="visibility: hidden;">杰米</span>名：${a[i].userName}</p> <p>身份证号：${a[i].idCard}</p><p>电话号码：${a[i].phone}</p><p>登录密码：${a[i].passWord}</p><p>注册时间：${Tt}</p><p>状<span style="visibility: hidden;">分期</span>态：${a[i].regStatus}</p></div></div>`);
                }
                // history();
            }
        });
    });

    //修改密码
    $('#reset').on('click', function() {
        var pwd = $('#password').val();
        var cpwd = $('#checkpassword').val();
        if (cpwd === pwd) {
            $.ajax({
                type: "get",
                url: "/userPage/update",
                data: { "mobile": phone, "passWord": pwd },
                dataType: "json",
                success: function(response) {
                    alert("修改成功！");
                },
                err: function(err) {
                    console.log(err);
                }
            });
        } else {
            alert("两次密码不同！");
        }
    })

    //确定还款

    $('.repay').on('click', function() {
        $.ajax({
            type: "get",
            url: "/userPage/surerepay",
            data: { "Id": Id },
            dataType: "json",
            success: function(response) {
                alert("支付成功！");
            },
            err: function(err) {
                console.log(err);
            }
        });
    })



})