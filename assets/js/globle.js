function dateTime() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
};
function time() {
    var date = new Date();
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
};
function date() {
    var date = new Date();
    var seperator1 = "-";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate;
};
function getUrl() {
    const imgArr = [], max = 25;
    for (let index = 0; index < max; index++) {
        imgArr.push('head' + index + '.jpg');
    };
    const random = parseInt(Math.random() * max, 10);
    return "images/headimg/" + imgArr[random];
};
//判断用户输入的电子邮箱格式是否正确
function checkEmail(myemail) {
    const myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
    if (myReg.test(myemail)) {
        return true;
    } else {
        return false;
    }
};
//判断浏览器类型
function checkIe() {
    const theUA = window.navigator.userAgent.toLowerCase();
    if ((theUA.match(/msie\s\d+/) && theUA.match(/msie\s\d+/)[0]) || (theUA.match(/trident\s?\d+/) && theUA.match(/trident\s?\d+/)[0])) {
        const ieVersion = theUA.match(/msie\s\d+/)[0].match(/\d+/)[0] || theUA.match(/trident\s?\d+/)[0];
        return ieVersion;
    }

    // this.$Modal.info({
    //     title: title,
    //     content: content
    // });
};

//返回顶部
function goBack() {
    //清除定时器
    clearInterval(timer);
    //设置定时器
    let timer = setInterval(function () {
        //获取滚动条到顶部的距离
        var osTop = document.documentElement.scrollTop || document.body.scrollTop;
        var ispeed = Math.floor(-osTop / 6);
        document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
        if (osTop == 0) {
            clearInterval(timer);
        };
    }, 30);
};

export {
    dateTime,
    time,
    date,
    getUrl,
    checkEmail,
    checkIe,
    goBack
};