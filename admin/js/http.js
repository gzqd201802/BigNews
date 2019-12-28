/* 沙箱模式 */
(function (window) {
    // 获取有没有 token 令牌
    const token = localStorage.getItem('token');
    // ajaxSetup() 方法为将来的 AJAX 请求设置默认值。
    $.ajaxSetup({
        // 发送请求前运行的函数。
        beforeSend(xhr) {
            // 没有令牌跳转会登录页(登录接口用户用于获取令牌的)
            if (!token) {
                location.href = './login.html';
            }
            // 如果不是 login.html 登录页，就统一添加请求头
            if (location.href.indexOf('login.html') === -1) {
                // 注意这里的 xhr 是原生的对象，所以用原生的方式添加请求头
                xhr.setRequestHeader("Authorization", token);
            }
        }
    });

    // 完整的URL参考: http://localhost:8080/api/v1/admin/user/info

    // 设置请求的服务器根路径，用于后续完整 url 的拼接
    const baseURL = 'http://localhost:8080/api/v1';
    // 用一个 urls 对象管理项目所有的请求地址
    const urls = {
        // 2、获取用户信息
        userInfo: baseURL + '/admin/user/info',
        // 3、获取用户详情
        userDetail: baseURL + '/admin/user/detail',
        //  4、编辑用户信息
        userDetail: baseURL + '/admin/user/edit',
        // 后续其他的请求地址自己拼接完善
    };

    // 把 urls 对象暴露到全局 window 对象中
    window.urls = urls;

})(window);