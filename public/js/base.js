(function() {
    $(function() {
        var username = sessionStorage.Uname;
        if (!username) {
            $("body").html("您未登录，将在5s后跳转到登录页面");
            setTimeout(function() {
                window.open("/login", "_self");
            }, 5000);
        } else {
            $("#userName").text(username);
        }

    });
})()