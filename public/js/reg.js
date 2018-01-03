$("#rbut").click(function(event) {
    // alert('1');
    var passwd = $("#passwd");
    var mobile = $("#mobile");
    var idCardNo = $("#idCardNo");
    var realName = $("#realName");
    var registerUrl = '/register'; //注册地址
    var ck_code = ''; //保存后台送过来的验证码
    var code = $('#messageNumber'); //用户输入的验证码
    /************************************************************************/

    /************************************************************************/
    /**
     * 注册
     */

    var data = { 'realName': realName.val(), 'passwd': passwd.val(), 'idCardNo': idCardNo.val(), 'mobile': mobile.val() };
    console.log(data);

    if ($('#mobile').siblings('div').hasClass('vi-hidden') && $('#realName').siblings('div').hasClass('vi-hidden') && $('#passwd').siblings('div').hasClass('vi-hidden') && $('#idCardNo').siblings('div').hasClass('vi-hidden') && $('#mobile').val() != '' && $('#passwd').val() != '' && $('#idCardNo').val() != '' && $('#realName').val() != '' && $('#messageNumber').val() == $('#text_pwd_txt').html()) {

        $.ajax({
            url: '/reg/register',
            data: data,
            type: 'post',
            datatype: 'json',
            success: (d) => {
                if (d.success) {
                    console.log('注册成功:');
                    console.log(d);
                    // promat_info.html('恭喜，用户注册成功！请登录');
                } else {
                    console.log('注册失败：');
                    console.log(d);
                    // promat_info.html(d.result);
                }
            },
            error: (err) => {
                console.log('出错了');
            }
        });
    } else {
        alert('请按正确提示填写信息！');
    }

})

/**
 * 验证码获取
 */

$('#text_pwd_txt').on('click', function() {
    // alert(1);
    $.ajax({
        url: '/reg/code',
        data: 'data',
        type: 'post',
        datatype: 'json',
        success: function(d) {
            console.log(1);
            ck_code = d.code;
            $('#text_pwd_txt').html(d.code);
        },
        err: function(err) {
            console.log('获取验证码失败!');
        }
    });
});

$('#selected').on('click', function() {
    $('#selected').toggleClass('selected');
})