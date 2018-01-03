$(function() {
    var mobile = $('#mobile');
    var passwd = $('#passwd');
    var ck_code = '', //保存后台送过来的验证码
        var_code = $('#messageNumber'); //用户输入的验证码

    $('#bbut').on('click', function() {
        var data = { 'mobile': mobile.val(), 'passwd': passwd.val() }
        if (ck_code == var_code.val()) {
            $.ajax({
                url: '/login/log',
                data: data,
                type: 'post',
                datatype: 'json',
                success: (d) => {
                    console.log(d.result);
                    if (d.success === 1) {
                        sessionStorage.setItem("Id", d.result[0].idCard);
                        sessionStorage.setItem("Uname", d.result[0].userName);
                        sessionStorage.setItem("Phone", d.result[0].phone);

                        if (mobile.val() === "15979083783") {
                            window.open('/adminPage', '_self');

                        } else {
                            window.open('/userPage', '_self');
                        }
                    } else {
                        console.log('用户' + mobile + '登录失败');
                        console.log("登录失败的Result:", d.result);
                        // promat_info.html(d.result);
                    }

                },
                error: (err) => {
                    // console.log('出错了');
                    console.log(err);
                }
            });
        } else {
            // console.log();
            alert('验证码错误!');
        }

    });
    /**
     * 验证码获取
     */

    $('#text_pwd_txt').on('click', function() {
        // alert(1);
        $.ajax({
            url: '/login/code',
            data: 'data',
            type: 'post',
            datatype: 'json',
            success: function(d) {
                // console.log(1);
                ck_code = d.code;
                $('#text_pwd_txt').html(d.code);
            },
            err: function(err) {
                console.log('获取验证码失败!');
            }
        });
    });
})