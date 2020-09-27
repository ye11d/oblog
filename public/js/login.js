$('.login-menu-item').click(function (event) {
    $('.login-menu-item').removeClass('menu-active')
    $('form').removeClass('hide')
    $(event.target).addClass('menu-active')
    if ($(event.target).html() === '登录') {
        $('#form-register').addClass('hide')
    } else {
        $('#form-login').addClass('hide')
    }
})