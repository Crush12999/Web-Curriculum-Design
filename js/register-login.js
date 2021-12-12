
const container = document.querySelector(".container");
const user = {
    username: '',
    password: '',
    email: ''
}



// 注册、登录界面翻转
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});



// 注册表单校验提示信息
const registerMsg = {
    username: document.getElementById('registerNameMsg'),
    email: document.getElementById('registerEmailMsg'),
    pwd1: document.getElementById('registerPwd1Msg'),
    pwd2: document.getElementById('registerPwd2Msg')
}
// 表单校验dom节点
const registerInputDom = {
    userDom: document.getElementById("registerUserName").getElementsByTagName('input')[0],
    emailDom: document.getElementById("registerEmail").getElementsByTagName('input')[0],
    pwd1Dom: document.getElementById("registerPwd1").getElementsByTagName('input')[0],
    pwd2Dom: document.getElementById("registerPwd2").getElementsByTagName('input')[0]
}

// 绑定失去焦点事件
registerInputDom.userDom.addEventListener("blur", checkUsername);
registerInputDom.emailDom.addEventListener("blur", checkUserEmail);
registerInputDom.pwd1Dom.addEventListener("blur", checkPwd1);
registerInputDom.pwd2Dom.addEventListener("blur", checkPwd2);
// document.getElementById('registerBtn').addEventListener("click", checkUsername, checkUserEmail, checkPwd1, checkPwd2)

function checkUsername () {
    // 获取到用户名字符串
    let name = registerInputDom.userDom.value.replace("/(^\s*)|(\s*$)/g", "");

    if (name.length != 0) {
        if (!checkNumStr(name)) {
            document.getElementById("registerUserName").classList.add('error');
            registerMsg.username.innerHTML = '用户名必须为字母或数字';
            registerMsg.username.style.display = "block";

        } else {
            document.getElementById("registerUserName").classList.remove('error');
            registerMsg.username.innerHTML = '';
            registerMsg.username.style.display = "none";
            return true;
        }
    } else {
        document.getElementById("registerUserName").classList.add('error');
        registerMsg.username.innerHTML = '用户名不能为空';
        registerMsg.username.style.display = "block";
    }
    return false
}


// 使用数组做字符哈希，以及初始化方法
const numStr = new Array(127);
function numStrInit () {
    for (let i = 0; i < 127; i++) {
        numStr[i] = false;
    }

    // 初始化 0~9 的数字
    for (let i = 48; i <= 57; i++) {
        numStr[i] = true
    }
    // 初始化 'A' ~ 'Z'
    for (let i = 65; i <= 90; i++) {
        numStr[i] = true
    }
    // 初始化 'a' ~ 'z
    for (let i = 97; i <= 122; i++) {
        numStr[i] = true
    }
}
numStrInit()

// 校验输入的字符串函数
function checkNumStr (str) {
    for (let i = 0; i < str.length; i++) {
        // 通过字符哈希可以以O(1)的时间复杂度匹配
        if (!numStr[str.charCodeAt(i)]) {
            return false;
        }
    }
    return true;
}


// 邮箱验证
function checkUserEmail () {
    let email = registerInputDom.emailDom.value.replace("/(^\s*)|(\s*$)/g", "");
    let str = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    if (email == '') {
        registerMsg.email.innerHTML = '邮箱地址不能为空';
        registerMsg.email.style.display = 'block';
        document.getElementById("registerEmail").classList.add('error');
    } else if (!str.test(email)) {
        registerMsg.email.innerHTML = '邮箱地址格式不正确, 例: yzm@163.com';
        registerMsg.email.style.display = 'block';
        document.getElementById("registerEmail").classList.add('error');
    } else {
        registerMsg.email.innerHTML = '';
        registerMsg.email.style.display = 'none';
        document.getElementById("registerEmail").classList.remove('error');
        return true;
    }
    return false
}

// 密码验证
function checkPwd1 () {
    let pwd1 = registerInputDom.pwd1Dom.value.replace("/(^\s*)|(\s*$)/g", "");
    // 密码长度必须大于6
    if (pwd1.length == 0) {
        registerMsg.pwd1.innerHTML = '密码不能为空';
        registerMsg.pwd1.style.display = 'block';
        document.getElementById("registerPwd1").classList.add('error');
    } else if (pwd1.length < 6) {
        registerMsg.pwd1.innerHTML = '密码长度必须大于等于6';
        registerMsg.pwd1.style.display = 'block';
        document.getElementById("registerPwd1").classList.add('error');
    } else {
        registerMsg.pwd1.innerHTML = '';
        registerMsg.pwd1.style.display = 'none';
        document.getElementById("registerPwd1").classList.remove('error');
        return true;
    }
    return false
}

// 确认密码验证
function checkPwd2 () {
    let pwd1 = registerInputDom.pwd1Dom.value.replace("/(^\s*)|(\s*$)/g", "");
    let pwd2 = registerInputDom.pwd2Dom.value.replace("/(^\s*)|(\s*$)/g", "");

    if (pwd2.length == 0) {
        registerMsg.pwd2.innerHTML = '确认密码不能为空';
        registerMsg.pwd2.style.display = 'block';
        document.getElementById("registerPwd2").classList.add('error');
    } else if (pwd1 !== pwd2) {
        registerMsg.pwd2.innerHTML = '两次输入的密码不一致';
        registerMsg.pwd2.style.display = 'block';
        document.getElementById("registerPwd2").classList.add('error');
    } else {
        registerMsg.pwd2.innerHTML = '';
        registerMsg.pwd2.style.display = 'none';
        document.getElementById("registerPwd2").classList.remove('error');
        return true;
    }
    return false
}

function register () {
    if (!checkUsername() || !checkUserEmail() || !checkPwd1() || !checkPwd2()) {
        errorMessageBox();
    } else {
        user.username = registerForm.username.value;
        user.password = registerForm.password.value;
        user.email = registerForm.email.value;
        successMessageBox();
        setTimeout(() => {
            goToHome();
        }, 2000);
    }
}


// 模拟表单提示

// 错误信息提示
function errorMessageBox () {
    let str = `<div class="my-message my-message--error">
                    <i class="iconfont icon-fail my-icon-error my-message__icon"></i>
                    <p class="my-message__content">注册失败，请检查表单信息</p>
                </div>`;

    let node = document.getElementById('myMessageBox');
    // node.insertAdjacentHTML('beforeend', str);
    node.innerHTML = str;

    setTimeout(() => {
        node.innerHTML = ''
    }, 3000);
}

// 成功消息提示
function successMessageBox () {
    let str = `<div class="my-message my-message--success">
                    <i class="iconfont icon-success my-icon-success my-message__icon"></i>
                    <p class="my-message__content">`+ `欢迎 ` + user.username + `, 您的邮箱为 ` + user.email + `</p>
                </div>`;

    let node = document.getElementById('myMessageBox');
    // node.insertAdjacentHTML('beforeend', str);
    node.innerHTML = str;

    setTimeout(() => {
        node.innerHTML = ''
    }, 3000);
}


// 前往首页
function goToHome () {
    user.password = null;
    localStorage.setItem('user', JSON.stringify(user))
    window.location.href = 'index.html';
}


// function register () {
//     user.username = registerForm.username.value;
//     user.password = registerForm.password.value;
//     user.email = registerForm.email.value;
//     sessionStorage.setItem("user", JSON.stringify(user))
//     console.log(user);
// }

function login () {
    let username = loginForm.username.value;
    let password = loginForm.username.value;

    // user = JSON.parse(sessionStorage.getItem("user"))

    if (username !== user.username) {
        alert("用户未注册！");
    } else if (password !== user.password) {
        alert("密码错误！");
    }

}
