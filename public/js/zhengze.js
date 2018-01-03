window.onload = function() {
    function $2(id) {
        return document.getElementById(id);
    }
    //获取元素
    var passwd = $2('passwd'); //密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)：
    var mobile = $2('mobile');
    var idCardNo = $2('idCardNo');
    var realName = $2('realName');

    // 封装检测函数
    // inp 传入的元素
    // reg 检测方式的正则对象
    function check(inp, reg) {
        // 当输入框失去焦点触发
        inp.onblur = function() {
            // console.log(this.nextSibling);
            if (reg.test(this.value)) {
                // nextSibling 下一个兄弟
                this.nextElementSibling.className = 'vi-hidden';
                register_flag = 1;
                // this.nextSibling.addClass('vi-hidden');

            } else {

                this.nextElementSibling.className = 'vi-visible';
            }
        }
    }
    // 编写正则规则
    var regPwd = /^[a-zA-Z]\w{5,17}$/;
    var regMobile = /^(13[0-9]|14[57]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;
    // var regId = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$))|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
    var regId = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    var regName = /^[\u4e00-\u9fa5]{2,}$/;
    // 函数调用
    check(passwd, regPwd);
    check(mobile, regMobile);
    check(idCardNo, regId);
    check(realName, regName);

}